import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

type Props = {
  submitCreateTeacher: (data: any) => void;
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

export const FormCreateTeacher = ({ submitCreateTeacher }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className="h-full relative">
      <div className="border-b py-4">
        <h1 className="text-xl font-bold text-center uppercase">
          Thêm giảng viên
        </h1>
      </div>
      <div className="py-4 px-5 overflow-auto relative">
        <form className="p-2" onSubmit={handleSubmit(submitCreateTeacher)}>
          <div>
            <div>
              <h2 className="uppercase font-bold text-blue-600">
                I. Thông tin cá nhân
              </h2>
            </div>
            <div className="grid grid-cols-4 gap-4 mt-3">
              <TextField
                label="Họ và tên"
                type="text"
                placeholder="Nguyễn Văn A"
                {...register("hoten", { required: "Họ tên là bắt buộc" })}
                aria-invalid={errors.hoten ? "true" : "false"}
                required
                error={errors.hoten ? true : false}
              />

              <TextField
                label="Ngày sinh"
                type="date"
                {...register("ngaysinh", {
                  required: "Ngày sinh là bắt buộc",
                })}
                aria-invalid={errors.ngaysinh ? "true" : "false"}
                required
                error={errors.ngaysinh ? true : false}
                slotProps={{ inputLabel: { shrink: true } }}
              />

              <TextField
                label="Giới tính"
                select
                {...register("gioitinh", {
                  required: "Giới tính là bắt buộc",
                })}
                aria-invalid={errors.gioitinh ? "true" : "false"}
                required
                error={errors.gioitinh ? true : false}
              >
                <MenuItem value="Nam">Nam</MenuItem>
                <MenuItem value="Nữ">Nữ</MenuItem>
              </TextField>

              <TextField
                label="Số điện thoại"
                type="text"
                placeholder="+86 54382607"
                {...register("sdt", {
                  required: "Số điện thoại là bắt buộc",
                })}
                aria-invalid={errors.sdt ? "true" : "false"}
                required
                error={errors.sdt ? true : false}
              />

              <TextField
                label="Email"
                type="email"
                placeholder="m@example.com"
                {...register("email", { required: "Email là bắt buộc" })}
                aria-invalid={errors.email ? "true" : "false"}
                required
                error={errors.email ? true : false}
              />

              <TextField
                label="Địa chỉ"
                type="text"
                placeholder="15/8 Nguyễn Hữu Tiến"
                {...register("diachi", { required: "Địa chỉ là bắt buộc" })}
                aria-invalid={errors.diachi ? "true" : "false"}
                required
                error={errors.diachi ? true : false}
              />

              <TextField
                label="Khoa"
                select
                {...register("MaKhoa", { required: "Khoa là bắt buộc" })}
                aria-invalid={errors.MaKhoa ? "true" : "false"}
                required
                error={errors.MaKhoa ? true : false}
              >
                {ListKhoa.map((k) => (
                  <MenuItem value={k.id} key={k.id}>
                    {k.name}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                label="Trình độ"
                select
                {...register("trinhdo", { required: "Trình độ là bắt buộc" })}
                aria-invalid={errors.trinhdo ? "true" : "false"}
              >
                <MenuItem value="Thạc sĩ">Thạc sĩ</MenuItem>
                <MenuItem value="Tiến sĩ">Tiến sĩ</MenuItem>
                <MenuItem value="Kỹ sư">Kỹ sư</MenuItem>
                <MenuItem value="Cử nhân">Cử nhân</MenuItem>
              </TextField>

              <TextField
                label="Loại giảng viên"
                select
                {...register("loaigiangvien", {
                  required: "Loại giảng viên là bắt buộc",
                })}
                aria-invalid={errors.loaigiangvien ? "true" : "false"}
                required
                error={errors.loaigiangvien ? true : false}
              >
                <MenuItem value="Cơ hữu">Cơ hữu</MenuItem>
                <MenuItem value="Thỉnh giảng">Thỉnh giảng</MenuItem>
              </TextField>

              <TextField
                label="Đơn vị công tác"
                type="text"
                placeholder="Công thương"
                {...register("donvicongtac")}
                aria-invalid={errors.donvicongtac ? "true" : "false"}
                required
                error={errors.donvicongtac ? true : false}
              />

              <TextField
                label="Ngày tuyển dụng"
                type="date"
                {...register("ngaytuyendung")}
                aria-invalid={errors.ngaytuyendung ? "true" : "false"}
                slotProps={{ inputLabel: { shrink: true } }}
              />

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
