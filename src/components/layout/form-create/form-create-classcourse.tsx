import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { CourseType } from "@/types/CourseType";
import type { TeacherDTO } from "@/types/TeacherType";
import API from "@/utils/axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

type Props = {
  submitCreateClassCourse: (data: any) => void;
};

const HOC_KY_DATA_MOCK = [
  {
    id: "HK012025",
    name: "Học kỳ 1 2025-2026",
  },
];

const PHONG_HOC_DATA_MOCK = [
  "A101",
  "A202",
  "A303",
  "B101",
  "B202",
  "B303",
  "ZOOM",
];

export const FormCreateClassCourse = ({ submitCreateClassCourse }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [course, setCourse] = useState<CourseType[]>();
  const [teacher, setTeacher] = useState<TeacherDTO[]>();

  useEffect(() => {
    const getAllTeacher = async () => {
      const res = await API.get("/teacher/getAllTeacher");
      setTeacher(res.data.data);
    };
    const getAllCourse = async () => {
      const res = await API.get("/course/getAllCourse");
      setCourse(res.data.result.data);
    };

    getAllCourse();
    getAllTeacher();
  }, []);

  return (
    <div className="p-5 h-full relative overflow-hidden">
      <div className="border-b py-2">
        <h1 className="text-2xl uppercase">Thêm lớp học phần</h1>
      </div>
      <div className="py-4 overflow-auto relative h-150">
        <form
          className="p-2 min-h-200"
          onSubmit={handleSubmit(submitCreateClassCourse)}
        >
          <div>
            <div className="flex flex-col gap-4 mt-3">
              {/* Thông tin lớp học phần */}
              <div className="flex flex-col gap-5">
                <div>
                  <h1 className="text-blue-500 font-bold">
                    I. THÔNG TIN LỚP HỌC PHẦN
                  </h1>
                </div>
                <div className="grid grid-cols-3 gap-5">
                  <div className="grid gap-2">
                    <label>Tên lớp học phần</label>
                    <Input
                      type="text"
                      placeholder="Công nghệ phần mềm"
                      {...register("ten_lop", {
                        required: "Tên lớp học phần là bắt buộc",
                      })}
                      aria-invalid={errors.ten_lop ? "true" : "false"}
                      variant={errors.ten_lop ? "danger" : "default"}
                    />
                  </div>
                  <div className="grid gap-2">
                    <label>Học kỳ</label>
                    <select
                      className="ring ring-gray-200 rounded-sm p-2"
                      {...register("MaHK", {
                        required: "Học kỳ là bắt buộc",
                      })}
                      aria-invalid={errors.MaHK ? "true" : "false"}
                    >
                      <option value={undefined} selected disabled>
                        Chọn học kỳ
                      </option>
                      {HOC_KY_DATA_MOCK.map((k) => (
                        <option value={k.id}>{k.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="grid gap-2">
                    <label>Phòng học</label>
                    <select
                      className="ring ring-gray-200 rounded-sm p-2"
                      {...register("phonghoc", {
                        required: "Phòng học là bắt buộc",
                      })}
                      aria-invalid={errors.phonghoc ? "true" : "false"}
                    >
                      <option value={undefined} selected disabled>
                        Chọn học phần
                      </option>
                      {PHONG_HOC_DATA_MOCK.map((p) => (
                        <option value={p}>{p}</option>
                      ))}
                    </select>
                  </div>
                  <div className="grid gap-2">
                    <label>Sỉ số</label>
                    <Input
                      type="number"
                      {...register("si_so", {
                        required: "Sỉ số là bắt buộc",
                      })}
                      aria-invalid={errors.si_so ? "true" : "false"}
                      variant={errors.si_so ? "danger" : "default"}
                    />
                  </div>
                  <div className="grid gap-2">
                    <label>Học phần</label>
                    <select
                      className="ring ring-gray-200 rounded-sm p-2"
                      {...register("MaHP", {
                        required: "Học phần là bắt buộc",
                      })}
                      aria-invalid={errors.MaHP ? "true" : "false"}
                    >
                      <option value={undefined} selected disabled>
                        Chọn học phần
                      </option>
                      {course?.map((c) => (
                        <option value={c.MaHP}>
                          {c.MaHP + " - " + c.ten_hocphan}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="grid gap-2">
                    <label>Giảng viên</label>
                    <select
                      className="ring ring-gray-200 rounded-sm p-2"
                      {...register("MSGV", {
                        required: "Giảng viên là bắt buộc",
                      })}
                      aria-invalid={errors.MSGV ? "true" : "false"}
                    >
                      <option value={undefined} selected disabled>
                        Chọn giảng viên
                      </option>
                      {teacher?.map((t) => (
                        <option value={t.MSGV}>
                          {t.MSGV + " - " + t.hoten}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Lặp lịch */}

              <div className="flex flex-col gap-5">
                <div>
                  <h1 className="text-blue-500 font-bold">
                    II. LẶP LỊCH DẠY & HỌC
                  </h1>
                </div>
                <div className="grid grid-cols-3 gap-5">
                  <div className="grid gap-2">
                    <label>Ngày bắt đầu</label>
                    <Input
                      type="date"
                      {...register("ngay_batdau", {
                        required: "Ngày bắt đầu là bắt buộc",
                      })}
                      aria-invalid={errors.ngay_batdau ? "true" : "false"}
                      variant={errors.ngay_batdau ? "danger" : "default"}
                    />
                  </div>
                  <div className="grid gap-2">
                    <label>Ngày kết thúc</label>
                    <Input
                      type="date"
                      {...register("ngay_kethuc", {
                        required: "Ngày ngày kết thúc là bắt buộc",
                      })}
                      aria-invalid={errors.ngay_kethuc ? "true" : "false"}
                      variant={errors.ngay_kethuc ? "danger" : "default"}
                    />
                  </div>
                  <div className="grid gap-2">
                    <label>Thứ trong tuần</label>
                    <select
                      className="ring ring-gray-200 rounded-sm p-2"
                      {...register("ThuTrongTuan", {
                        required: "Thứ trong tuần là bắt buộc",
                      })}
                      aria-invalid={errors.ThuTrongTuan ? "true" : "false"}
                    >
                      <option value={undefined} selected disabled>
                        Chọn thứ trong tuần
                      </option>
                      {Array.from({ length: 7 }).map((_, k) => (
                        <option value={k + 1}>
                          {k + 1 < 7 ? `Thứ ${k + 2}` : "Chủ nhật"}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="grid gap-2">
                    <label>Tiết bắt đầu</label>
                    <select
                      className="ring ring-gray-200 rounded-sm p-2"
                      {...register("tiet_batdau", {
                        required: "Tiết bắt đầu là bắt buộc",
                      })}
                      aria-invalid={errors.tiet_batdau ? "true" : "false"}
                    >
                      <option value={undefined} selected disabled>
                        Chọn tiết bắt đầu
                      </option>
                      {Array.from({ length: 12 }).map((_, k) => (
                        <option value={k + 1}>{`Tiết ${k + 1}: ${k + 7}h -> ${
                          k + 7
                        }h50`}</option>
                      ))}
                    </select>
                  </div>
                  <div className="grid gap-2">
                    <label>Tiết kết thúc</label>
                    <select
                      className="ring ring-gray-200 rounded-sm p-2"
                      {...register("tiet_kethuc", {
                        required: "Tiết kết thúc là bắt buộc",
                      })}
                      aria-invalid={errors.tiet_kethuc ? "true" : "false"}
                    >
                      <option value={undefined} selected disabled>
                        Chọn tiết kết thúc
                      </option>
                      {Array.from({ length: 12 }).map((_, k) => (
                        <option value={k + 1}>{`Tiết ${k + 1}: ${k + 7}h -> ${
                          k + 7
                        }h50`}</option>
                      ))}
                    </select>
                  </div>
                  <div className="grid gap-2">
                    <label>Trạng thái</label>
                    <select
                      className="ring ring-gray-200 rounded-sm p-2"
                      {...register("TrangThai", {
                        required: "Trạng thái là bắt buộc",
                      })}
                      aria-invalid={errors.TrangThai ? "true" : "false"}
                    >
                      <option value="BinhThuong">Bình thường</option>
                      <option value="TamNgung">Tạm ngưng</option>
                      <option value="Nghi">Nghỉ</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="fixed flex gap-2 justify-end left-0 bottom-0 p-4 border-t border-gray-200 bg-white w-full">
                <Button variant="dark" title="Lưu và tiếp tục" type="submit" />
                <Button type="submit" title="Lưu và đóng" />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
