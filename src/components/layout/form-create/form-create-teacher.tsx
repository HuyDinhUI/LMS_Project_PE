import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

export const FormCreateTeacher = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <div className="p-5">
      <div className="border-b py-2">
        <h1 className="text-2xl uppercase">Thêm giảng viên</h1>
      </div>
      <div className="py-4 grid grid-cols-2">
        <form className="grid grid-cols-2 gap-3">
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
              {...register("ngaysinh", { required: "Ngày sinh là bắt buộc" })}
            />
          </div>
          <div className="grid gap-2">
            <label>Giới tính</label>
            <select
              className="ring ring-gray-200 rounded-sm p-2"
              {...register("gioitinh", { required: "Giới tính là bắt buộc" })}
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
              {...register("sdt", { required: "Số điện thoại là bắt buộc" })}
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
            <label>Chức danh</label>
            <select
              className="ring ring-gray-200 rounded-sm p-2"
              {...register("gioitinh", { required: "Giới tính là bắt buộc" })}
            >
              <option value="Giáo viên bộ môn">Giáo viên bộ môn</option>
              <option value="Trưởng bộ môn">Trưởng bộ môn</option>
              <option value="Trưởng khoa">Trưởng khoa</option>
            </select>
          </div>
        </form>
      </div>
    </div>
  );
};
