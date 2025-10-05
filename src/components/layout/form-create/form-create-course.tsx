import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";


type Props = {
  submitCreateCourse: (data: any) => void;
 
};


const ListKhoa = [
  {
    id: '0100',
    name: 'Công nghệ thông tin'
  },
  {
    id: '0200',
    name: 'Công nghệ thực phẩm'
  },
  {
    id: '0300',
    name: 'Ngoại ngữ'
  },
  {
    id: '0400',
    name: 'Kinh tế'
  }
]


export const FormCreateCourse = ({ submitCreateCourse }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  

  return (
    <div className="p-5 h-full relative">
      <div className="border-b py-2">
        <h1 className="text-2xl uppercase">Thêm học phần</h1>
      </div>
      <div className="py-4 overflow-auto relative">
        <form className="p-2" onSubmit={handleSubmit(submitCreateCourse)}>
          <div>
            <div className="grid grid-cols-4 gap-4 mt-3">
              <div className="grid gap-2">
                <label>Tên học phần</label>
                <Input
                  type="text"
                  placeholder="Công nghệ phần mềm"
                  {...register("ten_hocphan", { required: "Tên học phần là bắt buộc" })}
                />
              </div>
              <div className="grid gap-2">
                <label>Số tín chỉ</label>
                <Input
                  type="number"
                  {...register("so_tinchi", {
                    required: "Số tín chỉ là bắt buộc",
                  })}
                />
              </div>
              <div className="grid gap-2">
                <label>Khoa</label>
                <select
                  className="ring ring-gray-200 rounded-sm p-2"
                  {...register("MaKhoa", {
                    required: "Mã khoa là bắt buộc",
                  })}
                >
                  {ListKhoa.map(k => (
                    <option value={k.id}>{k.name}</option>
                  ))}
                </select>
              </div>
              <div className="grid gap-2">
                <label>Học phí</label>
                <Input
                  type="number"
                  {...register("HocPhi", {
                    required: "Học phí là bắt buộc",
                  })}
                />
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
