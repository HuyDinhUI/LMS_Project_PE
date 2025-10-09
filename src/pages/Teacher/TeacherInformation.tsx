import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { TeacherDTO } from "@/types/TeacherType";
import API from "@/utils/axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const ListKhoa = [
  {
    id: "0100",
    name: "Công nghệ thông tin",
  },
  {
    id: "0200",
    name: "Công nghệ thực phẩm",
  },
  {
    id: "0300",
    name: "Ngoại ngữ",
  },
  {
    id: "0400",
    name: "Kinh tế",
  },
];

const TeacherInformation = () => {
  const [dataTeach, setDataTeach] = useState<TeacherDTO>();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const getOneTeacher = async () => {
    try {
      const res = await API.get(
        "/teacher/getOneTeacher/" + localStorage.getItem("username")
      );
      setDataTeach(res.data.data[0]);
      reset(res.data.data[0]);
    } catch (err: any) {
      toast.error(err?.response?.message);
    }
  };

  useEffect(() => {
    getOneTeacher();
  }, [reset]);

  const handleUpdateInformation = async (data: any) => {
    try {
      const res = await API.put(`teacher/updateTeacher`, data);
      toast.success("Update giảng viên thành công");
    } catch (err) {
      console.log(err);
    }
    getOneTeacher();
  };
  return (
    <div className="py-5 px-10 w-full h-full bg-white dark:bg-card rounded-md">
      <div className="w-full px-2">
        <h2 className="text-2xl uppercase">Hồ sơ cá nhân</h2>
      </div>
      <div className="flex flex-col gap-5 px-2 py-3 h-full">
        {/* Thông tin giảng dạy*/}
        <form onSubmit={handleSubmit(handleUpdateInformation)} className="relative h-full">
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

export default TeacherInformation;
