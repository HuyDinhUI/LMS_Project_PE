import { Button } from "@/components/ui/button";
import type { CourseType } from "@/types/CourseType";
import type { TeacherDTO } from "@/types/TeacherType";
import API from "@/utils/axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
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
                  <TextField
                    type="text"
                    label="Tên lớp học phần"
                    {...register("ten_lop", {
                      required: "Tên lớp học phần là bắt buộc",
                    })}
                    aria-invalid={errors.ten_lop ? "true" : "false"}
                    required
                    error={errors.ten_lop ? true : false}
                  />

                  <TextField
                    select
                    label="Học kỳ"
                    {...register("MaHK", {
                      required: "Học kỳ là bắt buộc",
                    })}
                    aria-invalid={errors.MaHK ? "true" : "false"}
                    required
                  >
                    
                    {HOC_KY_DATA_MOCK.map((k) => (
                      <MenuItem key={k.id} value={k.id}>
                        {k.name}
                      </MenuItem>
                    ))}
                  </TextField>

                  <TextField
                    select
                    label="Phòng học"
                    {...register("phonghoc", {
                      required: "Phòng học là bắt buộc",
                    })}
                    aria-invalid={errors.phonghoc ? "true" : "false"}
                    required
                  >
                    {PHONG_HOC_DATA_MOCK.map((p) => (
                      <MenuItem key={p} value={p}>
                        {p}
                      </MenuItem>
                    ))}
                  </TextField>

                  <TextField
                    label="Sỉ số"
                    type="number"
                    {...register("si_so", {
                      required: "Sỉ số là bắt buộc",
                    })}
                    aria-invalid={errors.si_so ? "true" : "false"}
                    required
                  />

                  <TextField
                    select
                    label="Học phần"
                    {...register("MaHP", {
                      required: "Học phần là bắt buộc",
                    })}
                    aria-invalid={errors.MaHP ? "true" : "false"}
                    required
                  >
                    
                    {course?.map((c) => (
                      <MenuItem key={c.MaHP} value={c.MaHP}>
                        {c.MaHP + " - " + c.ten_hocphan}
                      </MenuItem>
                    ))}
                  </TextField>

                  <TextField
                    select
                    label="Giảng viên"
                    {...register("MSGV", {
                      required: "Giảng viên là bắt buộc",
                    })}
                    aria-invalid={errors.MSGV ? "true" : "false"}
                    required
                  >
                    
                    {teacher?.map((t) => (
                      <MenuItem key={t.MSGV} value={t.MSGV}>
                        {t.MSGV + " - " + t.hoten}
                      </MenuItem>
                    ))}
                  </TextField>
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
                  <TextField
                    helperText="Ngày bắt đầu"
                    type="date"
                    {...register("ngay_batdau", {
                      required: "Ngày bắt đầu là bắt buộc",
                    })}
                    aria-invalid={errors.ngay_batdau ? "true" : "false"}
                    required
                  />

                  <TextField
                    helperText="Ngày kết thúc"
                    type="date"
                    {...register("ngay_kethuc", {
                      required: "Ngày ngày kết thúc là bắt buộc",
                    })}
                    aria-invalid={errors.ngay_kethuc ? "true" : "false"}
                    required
                  />

                  <TextField
                    select
                    label="Thứ trong tuần"
                    {...register("ThuTrongTuan", {
                      required: "Thứ trong tuần là bắt buộc",
                    })}
                    aria-invalid={errors.ThuTrongTuan ? "true" : "false"}
                    required
                  >
                    
                    {Array.from({ length: 7 }).map((_, k) => (
                      <MenuItem key={k + 2} value={k + 1}>
                        {k + 1 < 7 ? `Thứ ${k + 2}` : "Chủ nhật"}
                      </MenuItem>
                    ))}
                  </TextField>

                  <TextField
                    label="Tuần học"
                    select
                    {...register("tiet_batdau", {
                      required: "Tiết bắt đầu là bắt buộc",
                    })}
                    aria-invalid={errors.tiet_batdau ? "true" : "false"}
                    required
                  >
                    
                    {Array.from({ length: 12 }).map((_, k) => (
                      <MenuItem key={k + 1} value={k + 1}>
                        {`Tiết ${k + 1}: ${k + 7}h -> ${k + 7}h50`}
                      </MenuItem>
                    ))}
                  </TextField>

                  <TextField
                    label="Tiết kết thúc"
                    select
                    {...register("tiet_kethuc", {
                      required: "Tiết kết thúc là bắt buộc",
                    })}
                    aria-invalid={errors.tiet_kethuc ? "true" : "false"}
                    required
                  >
                    
                    {Array.from({ length: 12 }).map((_, k) => (
                      <MenuItem key={k + 1} value={k + 1}>
                        {`Tiết ${k + 1}: ${k + 7}h -> ${k + 7}h50`}
                      </MenuItem>
                    ))}
                  </TextField>

                  <TextField
                    select
                    label="Trạng thái"
                    {...register("TrangThai", {
                      required: "Trạng thái là bắt buộc",
                    })}
                    aria-invalid={errors.TrangThai ? "true" : "false"}
                    required
                  >
                    <MenuItem value="BinhThuong">Bình thường</MenuItem>
                    <MenuItem value="TamNgung">Tạm ngưng</MenuItem>
                    <MenuItem value="Nghi">Nghỉ</MenuItem>
                  </TextField>
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
