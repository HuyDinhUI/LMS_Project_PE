import { Button } from "@/components/ui/button";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";

type Props = {
  submitCreateCourse: (data: any) => void;
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

export const FormCreateCourse = ({ submitCreateCourse }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className="h-full relative">
      <div className="border-b py-4">
        <h1 className="text-xl text-center font-bold uppercase">Thêm học phần</h1>
      </div>
      <div className="py-4 px-5 overflow-auto relative">
        <form className="p-2" onSubmit={handleSubmit(submitCreateCourse)}>
          <div>
            <div className="grid grid-cols-1 gap-4 mt-3">
              <TextField
                label="Tên học phần"
                type="text"
                placeholder="Công nghệ phần mềm"
                {...register("ten_hocphan", {
                  required: "Tên học phần là bắt buộc",
                })}
                aria-invalid={errors.ten_hocphan ? "true" : "false"}
                required
                error={errors.ten_hocphan ? true : false}
              />

              <TextField
                label="Số tín chỉ"
                type="number"
                {...register("so_tinchi", {
                  required: "Số tín chỉ là bắt buộc",
                })}
                aria-invalid={errors.so_tinchi ? "true" : "false"}
                required
                error={errors.so_tinchi ? true : false}
              />

              <TextField
                label="Khoa"
                select
                className="ring ring-gray-200 rounded-sm p-2"
                {...register("MaKhoa", {
                  required: "Mã khoa là bắt buộc",
                })}
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
                label="Học phí"
                type="number"
                {...register("HocPhi", {
                  required: "Học phí là bắt buộc",
                })}
                aria-invalid={errors.HocPhi ? "true" : "false"}
                required
                error={errors.HocPhi ? true : false}
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
