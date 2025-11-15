import AlertDialogDemo from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import type { ClassCourseType } from "@/types/ClassCourseType";
import type { CourseType } from "@/types/CourseType";
import type { EnrollCourseType } from "@/types/EnrolledCourseType";
import API from "@/utils/axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const headerTableCourse = [
  "Mã học phần",
  "Tên học phần",
  "Số tín chỉ",
  "Học phí",
];
const headerTableClassCourse = [
  "Mã lớp",
  "Giảng viên",
  "Lịch học",
  "Phòng học",
  "Số lượng",
  "",
];

const headerTableEnrolledCourse = [
  "Mã lớp",
  "Tên học phần",
  "Học phí",
  "Trạng thái công nợ",
  "Ngày đăng ký",
  "",
];

const StudentEnrollClassCourse = () => {
  const [dataCourse, setDataCourse] = useState<CourseType[]>();
  const [dataClassCourse, setDataClassCourse] = useState<ClassCourseType[]>();
  const [CourseSelected, setCourseSelected] = useState<CourseType>();
  const [dataEnrolledCourse, setDataEnrolledCourse] = useState<
    EnrollCourseType[]
  >([]);
  const MaSV: string = localStorage.getItem("username") ?? "";

  const getCourseByPrograme = async () => {
    try {
      const res = await API.get(
        "enrollClassCourse/getCourseByProgram/" +
          localStorage.getItem("MaNganh")
      );
      setDataCourse(res.data.result.data);
    } catch (err: any) {
      toast.error(err?.response?.data?.message);
    }
  };

  const getClassCourseByPrograme = async (course: CourseType | undefined) => {
    try {
      const res = await API.get(
        `enrollClassCourse/getClassCourseByProgram?manganh=${localStorage.getItem(
          "MaNganh"
        )}&mahp=${course?.MaHP}`
      );
      setCourseSelected(course);
      setDataClassCourse(res.data.result.data);
    } catch (err: any) {
      toast.error(err?.response?.data?.message);
    }
  };

  const getEnrolledCourse = async () => {
    try {
      const res = await API.get(`enrollClassCourse/getEnrolledCourse/${MaSV}`);
      setDataEnrolledCourse(res.data.result.data);
    } catch (err: any) {
      toast.error(err?.response?.data?.message);
    }
  };

  const enrollClassCourse = async (
    MaSV: string,
    MaLop: string,
    MaHK: string,
    HocPhi: number,
    MaHP: string
  ) => {
    const data = {
      MaSV,
      MaLop,
      MaHK,
      HocPhi,
      MaHP,
    };
    console.log(data);
    try {
      await API.post("/enrollClassCourse/enroll", {
        MaSV,
        MaLop,
        MaHK,
        HocPhi,
        MaHP,
      });
      getClassCourseByPrograme(CourseSelected);
      getEnrolledCourse();
      toast.success("Đăng ký học phần thành công");
    } catch (err: any) {
      toast.error(err?.response?.data?.message);
    }
  };

  const CancleEnrollCourse = async (MaLop: string, MaHP: string) => {
    try {
      await API.delete(
        `/enrollClassCourse/cancle?masv=${MaSV}&malop=${MaLop}&mahp=${MaHP}`
      );
      getEnrolledCourse();
      toast.success("Huỷ học phần thành công");
    } catch (err: any) {
      toast.error(err?.response?.data?.message);
    }
  };

  useEffect(() => {
    getCourseByPrograme();
    getEnrolledCourse();
  }, []);
  return (
    <div className="py-5 px-10 w-full h-175 overflow-auto">
      <div className="w-full p-2">
        {/* Bảng danh sách học phần */}
        <h2 className="py-3 text-xl uppercase text-center bg-black/5 font-semibold rounded-lg">
          COURSES
        </h2>
        <div className="w-full p-4 shadow-sm rounded-xl">
          <table className="table-auto w-full bg-black/3">
            <thead>
              <tr className="text-left bg-green-brand text-white">
                {headerTableCourse.map((h) => (
                  <th className="py-2 px-2">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dataCourse?.map((t: CourseType, i) => (
                <tr
                  onClick={() => getClassCourseByPrograme(t)}
                  key={i}
                  className={`text-left hover:bg-black/3 cursor-pointer ${
                    CourseSelected?.MaHP === t.MaHP ? "bg-black/5" : ""
                  }`}
                >
                  <td className="py-3 px-2">{t.MaHP}</td>
                  <td>{t.ten_hocphan}</td>
                  <td>{t.so_tinchi}</td>
                  <td>{t.HocPhi.toLocaleString("vi-VN")}đ</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h2 className="py-3 text-xl uppercase mt-5 text-center bg-black/5 font-semibold rounded-lg">
          Class
        </h2>
        <div className="w-full p-4 shadow-sm rounded-xl">
          <table className="table-auto w-full bg-black/3">
            <thead>
              <tr className="text-left bg-yellow-brand text-white">
                {headerTableClassCourse.map((h) => (
                  <th className="py-2 px-2">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dataClassCourse?.map((c, i) => (
                <tr key={i} className="text-left">
                  <td className="py-3 px-2">{c.MaLop}</td>
                  <td>{c.giangvien}</td>
                  <td>
                    Thứ {c.ThuTrongTuan + 1}, Tiết {c.tiet_batdau} -
                    {c.tiet_kethuc}
                  </td>
                  <td>{c.phonghoc}</td>
                  <td>
                    {c.sl_dangky}/{c.si_so}
                  </td>
                  <td>
                    <Button
                      disabled={dataEnrolledCourse.some(
                        (e) => e.MaHP === c.MaHP
                      )}
                      onClick={() =>
                        enrollClassCourse(
                          MaSV,
                          c.MaLop,
                          c.MaHK,
                          CourseSelected?.HocPhi ?? 0,
                          CourseSelected?.MaHP ?? ""
                        )
                      }
                      variant="primary"
                      title="Enroll"
                      size="sm"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!dataClassCourse && (
            <p className="text-center py-5">Select a course to view the class list.</p>
          )}
        </div>
        <h2 className="py-3 text-xl uppercase mt-5 text-center bg-black/5 font-semibold rounded-lg">
          Enrolled
        </h2>
        <div className="w-full p-4 shadow-sm rounded-xl">
          <table className="table-auto w-full bg-black/3">
            <thead>
              <tr className="text-left bg-orange-brand text-white">
                {headerTableEnrolledCourse.map((h) => (
                  <th className="py-2 px-2">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dataEnrolledCourse?.map((c, i) => (
                <tr key={i} className="text-left">
                  <td className="py-3 px-2">{c.MaLop}</td>
                  <td>{c.ten_hocphan}</td>
                  <td>{c.HocPhi.toLocaleString("vi-VN")}đ</td>
                  <td>{c.TrangThai}</td>

                  <td>{String(c.NgayDangKy)}</td>
                  <td>
                    <AlertDialogDemo
                      label="Bạn có muốn huỷ đăng ký không ?"
                      description="Lưu ý: trong thời gian đăng ký bạn có thể huỷ hoặc đăng ký lại, nếu hết thời gian sẽ không được huỷ."
                      onclick={() => CancleEnrollCourse(c.MaLop, c.MaHP)}
                      trigger={
                        <Button variant="danger" title="Cancle" size="sm" />
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentEnrollClassCourse;
