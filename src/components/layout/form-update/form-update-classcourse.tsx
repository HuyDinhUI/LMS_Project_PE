import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { CourseType } from "@/types/CourseType";
import type { TeacherDTO } from "@/types/TeacherType";
import API from "@/utils/axios";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

type Props = {
  submitUpdateClassCourse: (data: any) => void;
  MaLop: string;
};

const HOC_KY_DATA_MOCK = [
  {
    id: "HK012025",
    name: "Học kỳ 1 025-2026",
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

export const FormUpdateClassCourse = ({
  submitUpdateClassCourse,
  MaLop,
}: Props) => {
  const { register, handleSubmit, reset } = useForm();

  const [course, setCourse] = useState<CourseType[]>();
  const [teacher, setTeacher] = useState<TeacherDTO[]>();

  useEffect(() => {
    const getOneClassCourse = async () => {
      const res = await API.get("/classCourse/getOneClassCourse/" + MaLop);
      reset(res.data.result.data[0]);
    };
    const getAllTeacher = async () => {
      const res = await API.get("/teacher/getAllTeacher");
      setTeacher(res.data.data);
    };
    const getAllCourse = async () => {
      const res = await API.get("/course/getAllCourse");
      setCourse(res.data.result.data);
    };
    getOneClassCourse();
    getAllCourse();
    getAllTeacher();
  }, [reset]);

  return (
    <div className="h-full relative">
      <div className="border-b py-4">
        <h1 className="text-xl text-center font-bold uppercase">Cập nhật lớp học phần</h1>
      </div>
      <div className="py-4 px-5 overflow-auto relative">
        <form className="p-2" onSubmit={handleSubmit(submitUpdateClassCourse)}>
          <div>
            <div className="grid grid-cols-2 gap-4 mt-3">
              <TextField
                label="Mã lớp"
                type="text"
                placeholder="Công nghệ phần mềm"
                {...register("MaLop", {
                  required: "Tên lớp học phần là bắt buộc",
                })}
                slotProps={{ inputLabel: { shrink: true } }}
              />

              <TextField
                label="Tên lớp"
                type="text"
                placeholder="Công nghệ phần mềm"
                {...register("ten_lop", {
                  required: "Tên lớp học phần là bắt buộc",
                })}
                slotProps={{ inputLabel: { shrink: true } }}
              />

              <TextField
                label="Học kỳ"
                select
                {...register("MaHK", {
                  required: "Học kỳ là bắt buộc",
                })}
                slotProps={{ inputLabel: { shrink: true } }}
              >
                {HOC_KY_DATA_MOCK.map((k) => (
                  <MenuItem value={k.id}>{k.name}</MenuItem>
                ))}
              </TextField>

              <TextField
                label="Phòng học"
                select
                {...register("phonghoc", {
                  required: "Phòng học là bắt buộc",
                })}
                slotProps={{ inputLabel: { shrink: true } }}
              >
                {PHONG_HOC_DATA_MOCK.map((k) => (
                  <MenuItem value={k}>{k}</MenuItem>
                ))}
              </TextField>

              <TextField
                label="Sỉ số"
                type="number"
                {...register("si_so", {
                  required: "Sỉ số là bắt buộc",
                })}
                slotProps={{ inputLabel: { shrink: true } }}
              />

              <TextField
                label="Học phần"
                select
                {...register("MaHP", {
                  required: "Học phần là bắt buộc",
                })}
                slotProps={{ inputLabel: { shrink: true } }}
              >
                {course?.map((c) => (
                  <MenuItem value={c.MaHP}>
                    {c.MaHP + " - " + c.ten_hocphan}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                label="Giảng viên"
                {...register("MSGV", {
                  required: "Giảng viên là bắt buộc",
                })}
                slotProps={{inputLabel:{shrink: true}}}
              >
                {teacher?.map((t) => (
                  <MenuItem value={t.MSGV}>{t.MSGV + " - " + t.hoten}</MenuItem>
                ))}
              </TextField>

              <div className="fixed flex gap-2 justify-end left-0 bottom-0 p-4 border-t border-gray-200 w-full">
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
