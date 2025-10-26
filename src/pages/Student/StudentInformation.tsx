import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { StudentEducation } from "@/types/StudentType";
import API from "@/utils/axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import bg_light from "@/assets/v904-nunny-012.jpg";
import { ArrowBigRight, ChevronLeft, ChevronRight, Pen } from "lucide-react";

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
                Thông tin học vấn
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
                  Thông tin cá nhân
                </h1>
              </div>
              <div className="mt-10">
                <h1 className="text-xl mb-5 font-bold uppercase border-b border-gray-500 pb-3">
                  Quan hệ gia đình
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
  const [dataStudent, setDataStudent] = useState<StudentEducation>();

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
    <div className="flex flex-col gap-5 px-2 py-3 h-full mt-10">
      <form
        onSubmit={handleSubmit(handleUpdateInformation)}
        className="h-full"
      >
        <h1 className="text-orange-400 font-bold uppercase pb-3 border-b">
          I. Thông tin cá nhân
        </h1>
        <div className="grid grid-cols-3 gap-3 py-5">
          <div className="grid gap-2">
            <label>Họ tên</label>
            <Input
              type="text"
              placeholder="Nguyễn Văn A"
              {...register("hoten", { required: "Họ tên là bắt buộc" })}
            />
          </div>
          <div className="grid gap-2">
            <label>Ngày sinh</label>
            <Input
              type="date"
              {...register("ngaysinh", {
                required: "Ngày sinh là bắt buộc",
              })}
            />
          </div>
          <div className="grid gap-2">
            <label>Giới tính</label>
            <select
              className="ring ring-gray-200 rounded-sm p-2"
              {...register("gioitinh", {
                required: "Giới tính là bắt buộc",
              })}
            >
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
            </select>
          </div>
          <div className="grid gap-2">
            <label>Số điện thoại</label>
            <Input
              type="text"
              placeholder="+86 54382607"
              {...register("sdt", {
                required: "Số điện thoại là bắt buộc",
              })}
            />
          </div>
          <div className="grid gap-2">
            <label>Email</label>
            <Input
              type="email"
              placeholder="m@example.com"
              {...register("email", { required: "Email là bắt buộc" })}
            />
          </div>
          <div className="grid gap-2">
            <label>Địa chỉ </label>
            <Input
              type="text"
              placeholder="15/8 Nguyễn Hữu Tiến"
              {...register("diachi", { required: "Địa chỉ là bắt buộc" })}
            />
          </div>
        </div>
        {/* Thông tin cá nhân */}
        <h1 className="text-orange-400 font-bold uppercase pb-3 border-b">
          II. Quan hệ gia đình
        </h1>
        <div className="absolute flex gap-2 justify-end bottom-10 right-25">
          <Button variant="dark" title="Lưu" type="submit" />
        </div>
      </form>
    </div>
  );
};

export default StudentInformation;
