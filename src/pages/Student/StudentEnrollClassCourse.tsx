import { Button } from "@/components/ui/button";
import type { ClassCourseType } from "@/types/ClassCourseType";
import type { CourseType } from "@/types/CourseType";
import API from "@/utils/axios";
import { Plus } from "lucide-react";
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



const StudentEnrollClassCourse = () => {
  const [dataCourse, setDataCourse] = useState<CourseType[]>();
  const [dataClassCourse, setDataClassCourse] = useState<ClassCourseType[]>();
  const [CourseSelected, setCourseSelected] = useState<CourseType>();
  const MaSV: string = localStorage.getItem("username") ?? ''


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

  const enrollClassCourse = async (
    MaSV: string,
    MaLop: string,
    MaHK: string,
    HocPhi: number,
    MaHP: string,
  ) => {
    const data = {
      MaSV,
      MaLop,
      MaHK,
      HocPhi,
      MaHP
    }
    console.log(data)
    try {
      const res = await API.post("/enrollClassCourse/enroll", {
        MaSV,
        MaLop,
        MaHK,
        HocPhi,
        MaHP,
      });
      getClassCourseByPrograme(CourseSelected)
      toast.success('Đăng ký học phần thành công')
      setCourseSelected(undefined)
    } catch (err: any) {
      toast.error(err?.response?.message);
    }
  };

  useEffect(() => {
    getCourseByPrograme();
  }, []);
  return (
    <div className="py-5 px-10 w-full h-full bg-white dark:bg-card rounded-md overflow-auto">
      <div className="w-full px-2">
        <h1 className="text-2xl uppercase text-amber-400 text-center font-bold">
          Đăng ký học phần
        </h1>
      </div>
      <div className="w-full p-2">
        {/* Bảng danh sách học phần */}
        <h2 className="py-3 border-b text-xl text-green-600 uppercase">
          Danh sách học phần
        </h2>
        <div className="w-full">
          <table className="table-auto w-full">
            <thead>
              <tr className="text-left border-b bg-gray-100">
                {headerTableCourse.map((h) => (
                  <th className="py-2">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dataCourse?.map((t: CourseType, i) => (
                <tr
                  onClick={() => getClassCourseByPrograme(t)}
                  key={i}
                  className={`border-b text-left hover:bg-green-100 ${
                    CourseSelected?.MaHP === t.MaHP ? "bg-green-100" : ""
                  }`}
                >
                  <td className="py-3">{t.MaHP}</td>
                  <td>{t.ten_hocphan}</td>
                  <td>{t.so_tinchi}</td>
                  <td>{t.HocPhi.toLocaleString("vi-VN")}đ</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h2 className="py-3 border-b text-xl text-green-600 uppercase mt-5">
          Danh sách lớp học phần
        </h2>
        <div className="w-full">
          <table className="table-auto w-full">
            <thead>
              <tr className="text-left border-b bg-gray-100">
                {headerTableClassCourse.map((h) => (
                  <th className="py-2">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dataClassCourse?.map((c, i) => (
                <tr key={i} className="border-b text-left">
                  <td className="py-3">{c.MaLop}</td>
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
                    <Button onClick={() => enrollClassCourse(MaSV,c.MaLop,c.MaHK,CourseSelected?.HocPhi ?? 0,CourseSelected?.MaHP ?? '')} variant="primary" title="Đăng ký" size="sm" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h2 className="py-3 border-b text-xl text-green-600 uppercase mt-5">
          Đã đăng ký
        </h2>
        <div className="w-full">
          <table className="table-auto w-full">
            <thead>
              <tr className="text-left border-b bg-gray-100">
                {headerTableClassCourse.map((h) => (
                  <th className="py-2">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dataClassCourse?.map((c, i) => (
                <tr key={i} className="border-b text-left">
                  <td className="py-3">{c.MaLop}</td>
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
                    <Button  variant="primary" title="Đăng ký" size="sm" />
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
