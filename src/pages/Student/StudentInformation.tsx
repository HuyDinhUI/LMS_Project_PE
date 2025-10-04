import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { StudentEducation } from "@/types/StudentType";
import type { TeacherDTO } from "@/types/TeacherType";
import API from "@/utils/axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const StudentInformation = () => {
  const [dataStudent,setDataStudent] = useState<StudentEducation>();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const getOneStudent = async () => {
    try {
      const res = await API.get(
        "/student/getOneStudent/" + localStorage.getItem("username")
      );
      setDataStudent(res.data.result.data[0]);
      reset(res.data.result.data[0]);
    } catch (err: any) {
      toast.error(err?.response?.message);
    }
  };

  useEffect(() => {
    getOneStudent();
  }, [reset]);

  const handleUpdateInformation = async (data: any) => {
    try {
      const res = await API.put(`student/updateStudent`, data);
      toast.success("Cập nhật thành công");
    } catch (err) {
      console.log(err);
    }
    getOneStudent();
  };
  return (
    <div className="py-5 px-10 w-full h-full bg-white dark:bg-card rounded-md relative">
      <div className="w-full px-2">
        <h2 className="text-2xl uppercase">Hồ sơ cá nhân</h2>
      </div>
      <div className="flex flex-col mt-5 gap-5 px-2">
        
        <form onSubmit={handleSubmit(handleUpdateInformation)}>
          <h1 className="text-orange-400 font-bold uppercase pb-3 border-b">
            I. Thông tin cá nhân
          </h1>
          <div className="grid grid-cols-3 gap-3 py-5">
            <div className="grid gap-2">
              <label>Họ tên</label>
              <Input
                type="text"
                placeholder="Nguyễn Văn A"
                {...register("hoten", { required: "Họ tên là bắt buộc" })}
              />
            </div>
            <div className="grid gap-2">
              <label>Ngày sinh</label>
              <Input
                type="date"
                {...register("ngaysinh", {
                  required: "Ngày sinh là bắt buộc",
                })}
              />
            </div>
            <div className="grid gap-2">
              <label>Giới tính</label>
              <select
                className="ring ring-gray-200 rounded-sm p-2"
                {...register("gioitinh", {
                  required: "Giới tính là bắt buộc",
                })}
              >
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
              </select>
            </div>
            <div className="grid gap-2">
              <label>Số điện thoại</label>
              <Input
                type="text"
                placeholder="+86 54382607"
                {...register("sdt", {
                  required: "Số điện thoại là bắt buộc",
                })}
              />
            </div>
            <div className="grid gap-2">
              <label>Email</label>
              <Input
                type="email"
                placeholder="m@example.com"
                {...register("email", { required: "Email là bắt buộc" })}
              />
            </div>
            <div className="grid gap-2">
              <label>Địa chỉ </label>
              <Input
                type="text"
                placeholder="15/8 Nguyễn Hữu Tiến"
                {...register("diachi", { required: "Địa chỉ là bắt buộc" })}
              />
            </div>
          </div>
          {/* Thông tin cá nhân */}
          <h1 className="text-orange-400 font-bold uppercase pb-3 border-b">
            II. Quan hệ gia đình
          </h1>
          <div className="absolute flex gap-2 justify-end left-0 bottom-0 p-4 border-t border-gray-200 w-full">
            <Button variant="dark" title="Lưu" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentInformation;
