import { Button } from "@/components/ui/button";
import type { StudentEducation } from "@/types/StudentType";
import API from "@/utils/axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import bg_light from "@/assets/v904-nunny-012.jpg";
import { ChevronLeft, Pen } from "lucide-react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

const StudentInformation = () => {
  const [dataStudent, setDataStudent] = useState<StudentEducation>();
  const [isUpdateForm, setIsUpdateForm] = useState<boolean>(false);

  const getOneStudent = async () => {
    try {
      const res = await API.get(
        "/student/getOneStudent/" + localStorage.getItem("username")
      );
      setDataStudent(res.data.result.data[0]);
    } catch (err: any) {
      toast.error(err?.response?.data?.message);
    }
  };

  useEffect(() => {
    getOneStudent();
  }, []);

  return (
    <div className="py-5 px-10 w-full h-full dark:bg-card overflow-auto">
      {!isUpdateForm ? (
        <div className="mt-10">
          <div className="flex gap-2 px-2">
            <div className="h-70 w-70 rounded-md">
              <img className="h-full rounded-md" src={bg_light}></img>
            </div>
            <div className="flex-1 flex-col gap-2 ms-10">
              <h1 className="text-xl mb-5 font-bold uppercase border-b border-gray-500 pb-3">
                EDUCATION
              </h1>
              <div className="flex gap-20 text-md">
                <div className="flex flex-col gap-2">
                  <p>
                    MSSV: <strong>{dataStudent?.MaSV}</strong>
                  </p>
                  <p>
                    Họ tên: <strong>{dataStudent?.hoten}</strong>
                  </p>
                  <p>
                    Giới tính: <strong>{dataStudent?.gioitinh}</strong>
                  </p>
                  <p>
                    Ngày sinh:{" "}
                    <strong>
                      {new Date(dataStudent?.ngaysinh ?? "").toLocaleDateString(
                        "vi-VN"
                      )}
                    </strong>
                  </p>
                  <p>Nơi sinh: </p>
                </div>
                <div className="flex flex-col gap-2">
                  <p>
                    Khoa: <strong>{dataStudent?.ten_khoa}</strong>
                  </p>
                  <p>Hệ đào tạo:</p>
                  <p>
                    Ngành: <strong>{dataStudent?.ten_nganh}</strong>
                  </p>
                  <p>
                    Lớp: <strong>{dataStudent?.MaLopHC}</strong>
                  </p>
                  <p>
                    Ngày nhập học: <strong></strong>
                  </p>
                </div>
              </div>
              <div className="mt-10">
                <h1 className="text-xl mb-5 font-bold uppercase border-b border-gray-500 pb-3">
                  Personal
                </h1>
              </div>
              <div className="mt-10">
                <h1 className="text-xl mb-5 font-bold uppercase border-b border-gray-500 pb-3">
                  Family
                </h1>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <FormUpdateInformation />
      )}
      <Button
        onClick={() => setIsUpdateForm(!isUpdateForm)}
        title={isUpdateForm ? "Return" : "Update"}
        className="absolute top-30 right-15"
        variant={isUpdateForm ? "outline" : "primary"}
        icon={isUpdateForm ? <ChevronLeft size={18} /> : <Pen size={18} />}
      />
    </div>
  );
};

const FormUpdateInformation = () => {
  const { register, handleSubmit, reset } = useForm();

  const getOneStudent = async () => {
    try {
      const res = await API.get(
        "/student/getOneStudent/" + localStorage.getItem("username")
      );
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
      await API.put(`student/updateStudent`, data);
      toast.success("Cập nhật thành công",{theme: 'light'});
    } catch (err) {
      console.log(err);
    }
    getOneStudent();
  };
  return (
    <div className="flex flex-col gap-5 px-2 py-3 h-full mt-10">
      <form onSubmit={handleSubmit(handleUpdateInformation)} className="h-full relative">
        <h1 className="text-orange-400 font-bold uppercase pb-3 border-b">
          I. Personal
        </h1>
        <div className="grid grid-cols-3 gap-3 py-5">
          <TextField
            label="Fullname"
            type="text"
            placeholder="Nguyễn Văn A"
            {...register("hoten", { required: "Họ tên là bắt buộc" })}
            slotProps={{ inputLabel: { shrink: true } }}
          />

          <TextField
            label="Date"
            type="date"
            {...register("ngaysinh", {
              required: "Ngày sinh là bắt buộc",
            })}
            slotProps={{ inputLabel: { shrink: true } }}
          />

          <TextField
            select
            label="Gender"
            {...register("gioitinh", {
              required: "Giới tính là bắt buộc",
            })}
          >
            <MenuItem value="Nam">Nam</MenuItem>
            <MenuItem value="Nữ">Nữ</MenuItem>
          </TextField>

          <TextField
            label="Phone"
            type="text"
            placeholder="+86 54382607"
            {...register("sdt", {
              required: "Số điện thoại là bắt buộc",
            })}
            slotProps={{ inputLabel: { shrink: true } }}
          />

          <TextField
            label="Email"
            type="email"
            placeholder="m@example.com"
            {...register("email", { required: "Email là bắt buộc" })}
            slotProps={{ inputLabel: { shrink: true } }}
          />

          <TextField
            label="Address"
            type="text"
            placeholder="15/8 Nguyễn Hữu Tiến"
            {...register("diachi", { required: "Địa chỉ là bắt buộc" })}
          />
        </div>
        {/* Thông tin cá nhân */}
        <h1 className="text-orange-400 font-bold uppercase pb-3 border-b">
          II. Family
        </h1>
        <div className="sticky bottom-0 flex gap-2 justify-end p-4 border-t border-gray-200 w-full">
          <Button variant="dark" title="Save" type="submit" />
        </div>
      </form>
    </div>
  );
};

export default StudentInformation;
