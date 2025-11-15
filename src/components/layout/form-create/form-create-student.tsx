import { Button } from "@/components/ui/button";
import API from "@/utils/axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

type Props = {
  submitCreateStudent: (data: any) => void;
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

type MajorType = {
  MaNganh: string;
  ten_nganh: string;
};

export const FormCreateStudent = ({ submitCreateStudent }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [major, setMajor] = useState<MajorType[]>([]);

  useEffect(() => {
    const getAllMajor = async () => {
      const res = await API.get("/major/getAllMajor");
      setMajor(res.data.result.data);
    };
    getAllMajor();
  }, []);

  return (
    <div className="p-5 h-full relative">
      <div className="border-b py-2">
        <h1 className="text-2xl uppercase">Thêm sinh viên</h1>
      </div>
      <div className="py-4 overflow-auto relative">
        <form className="p-2" onSubmit={handleSubmit(submitCreateStudent)}>
          <div>
            <div>
              <h2 className="uppercase font-bold text-blue-600">
                I. Thông tin học vấn
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
                type="date"
                {...register("ngaysinh", {
                  required: "Ngày sinh là bắt buộc",
                })}
                aria-invalid={errors.ngaysinh ? "true" : "false"}
                required
                error={errors.ngaysinh ? true : false}
                helperText="Ngày sinh"
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
                  <MenuItem key={k.id} value={k.id}>
                    {k.name}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                label="Chuyên ngành"
                select
                {...register("MaNganh", {
                  required: "Chuyên ngành là bắt buộc",
                })}
                aria-invalid={errors.MaNganh ? "true" : "false"}
                required
                error={errors.MaNganh ? true : false}
              >
                {major.map((m) => (
                  <MenuItem key={m.MaNganh} value={m.MaNganh}>
                    {m.ten_nganh}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                label="Lớp hành chính"
                type="text"
                {...register("MaLopHC", { required: "Lớp là bắt buộc" })}
                aria-invalid={errors.MaLopHC ? "true" : "false"}
                required
                error={errors.MaLopHC ? true : false}
              />

              <TextField
                type="date"
                {...register("ngay_nhaphoc")}
                aria-invalid={errors.ngay_nhaphoc ? "true" : "false"}
                required
                error={errors.ngay_nhaphoc ? true : false}
                helperText="Ngày nhập học"
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
