import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { StudentType } from "@/types/StudentType";
import type { TeacherDTO } from "@/types/TeacherType";
import API from "@/utils/axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";


type Props = {
  submitUpdateStudent: (data: any) => void;
  masv: string;
};

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

export const FormUpdateStudent = ({ submitUpdateStudent, masv }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [dataStudent, setDataStudent] = useState<StudentType>();

  useEffect(() => {
    const getStudent = async () => {
      try {
        const res = await API.get("/student/getOneStudent/" + masv);
        console.log(res.data);
        setDataStudent(res.data.result.data[0]);
        reset(res.data.result.data[0]);
      } catch (err) {
        console.log(err);
      }
    };

    getStudent();
  }, [reset]);

  return (
    <div className="p-5 h-full relative">
      <div className="border-b py-2">
        <h1 className="text-2xl uppercase">Cập nhật sinh viên</h1>
      </div>
      <div className="py-4 overflow-auto relative">
        <form className="p-2" onSubmit={handleSubmit(submitUpdateStudent)}>
          <div>
            <div>
              <h2 className="uppercase font-bold text-blue-600">
                I. Thông tin học vấn
              </h2>
            </div>
            <div className="grid grid-cols-4 gap-4 mt-3">
              <div className="grid gap-2">
                <label>Mã số sinh viên</label>
                <Input
                  readOnly
                  type="text"
                  {...register("MaSV", { required: "Mã sinh viên là bắt buộc" })}
                />
              </div>
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
              <div className="grid gap-2">
                <label>Khoa</label>
                <select
                  className="ring ring-gray-200 rounded-sm p-2"
                  {...register("MaKhoa", { required: "Khoa là bắt buộc" })}
                >
                  {ListKhoa.map((k) => (
                    <option value={k.id}>{k.name}</option>
                  ))}
                </select>
              </div>
              <div className="grid gap-2">
                <label>Lớp</label>
                <Input type="text" {...register("MaLopHC",{required: "Lớp là bắt buộc"})} />
              </div>
              <div className="grid gap-2">
                <label>Ngày nhập học</label>
                <Input type="date" {...register("ngay_nhaphoc")} />
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
