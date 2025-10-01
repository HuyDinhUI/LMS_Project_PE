import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { CourseType } from "@/types/CourseType";
import type { TeacherDTO } from "@/types/TeacherType";
import API from "@/utils/axios";
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
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [course, setCourse] = useState<CourseType[]>();
  const [teacher, setTeacher] = useState<TeacherDTO[]>();

  useEffect(() => {
    const getOneClassCourse = async () => {
      const res = await API.get("/classCourse/getOneClassCourse/" + MaLop)
      reset(res.data.result.data[0])
    }
    const getAllTeacher = async () => {
      const res = await API.get("/teacher/getAllTeacher");
      setTeacher(res.data.data);
    };
    const getAllCourse = async () => {
      const res = await API.get("/course/getAllCourse");
      setCourse(res.data.result.data);
    };
    getOneClassCourse()
    getAllCourse();
    getAllTeacher();
  }, [reset]);



  return (
    <div className="p-5 h-full relative">
      <div className="border-b py-2">
        <h1 className="text-2xl uppercase">Cập nhật lớp học phần</h1>
      </div>
      <div className="py-4 overflow-auto relative">
        <form className="p-2" onSubmit={handleSubmit(submitUpdateClassCourse)}>
          <div>
            <div className="grid grid-cols-3 gap-4 mt-3">
              <div className="grid gap-2">
                <label>Mã lớp học phần</label>
                <Input
                  type="text"
                  placeholder="Công nghệ phần mềm"
                  {...register("MaLop", {
                    required: "Tên lớp học phần là bắt buộc",
                  })}
                />
              </div>
              <div className="grid gap-2">
                <label>Tên lớp học phần</label>
                <Input
                  type="text"
                  placeholder="Công nghệ phần mềm"
                  {...register("ten_lop", {
                    required: "Tên lớp học phần là bắt buộc",
                  })}
                />
              </div>
              <div className="grid gap-2">
                <label>Học kỳ</label>
                <select
                  className="ring ring-gray-200 rounded-sm p-2"
                  {...register("MaHK", {
                    required: "Học kỳ là bắt buộc",
                  })}
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
                >
                  <option value={undefined} selected disabled>
                    Chọn phòng học
                  </option>
                  {PHONG_HOC_DATA_MOCK.map((k) => (
                    <option value={k}>{k}</option>
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
                />
              </div>
              <div className="grid gap-2">
                <label>Học phần</label>
                <select
                  className="ring ring-gray-200 rounded-sm p-2"
                  {...register("MaHP", {
                    required: "Học phần là bắt buộc",
                  })}
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
                >
                  <option value={undefined} selected disabled>
                    Chọn giảng viên
                  </option>
                  {teacher?.map((t) => (
                    <option value={t.MSGV}>{t.MSGV + " - " + t.hoten}</option>
                  ))}
                </select>
              </div>
              
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
