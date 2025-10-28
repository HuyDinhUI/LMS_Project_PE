import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { TeacherDTO } from "@/types/TeacherType";
import API from "@/utils/axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import bg_light from "@/assets/v904-nunny-012.jpg";
import { ChevronLeft, Pen } from "lucide-react";

const TeacherInformation = () => {
  const [dataTeach, setDataTeach] = useState<TeacherDTO>();
  const [isUpdateForm, setIsUpdateForm] = useState<boolean>(false);

  const getOneTeacher = async () => {
    try {
      const res = await API.get(
        "/teacher/getOneTeacher/" + localStorage.getItem("username")
      );
      setDataTeach(res.data.data[0]);
    } catch (err: any) {
      toast.error(err?.response?.message);
    }
  };

  useEffect(() => {
    getOneTeacher();
  }, []);
  return (
    <div className="py-5 px-10 w-full h-full rounded-md">
      {!isUpdateForm ? (
        <div className="mt-10">
          <div className="flex gap-2 px-2">
            <div className="h-70 w-70 rounded-md">
              <img className="h-full rounded-md" src={bg_light}></img>
            </div>
            <div className="flex-1 flex-col gap-2 ms-10">
              <h1 className="text-xl mb-5 font-bold uppercase border-b pb-3">
                Thông tin giảng dạy
              </h1>
              <div className="flex gap-20 text-md">
                <div className="flex flex-col gap-2">
                  <p>
                    MSGV: <strong>{dataTeach?.MSGV}</strong>
                  </p>
                  <p>
                    Họ tên: <strong>{dataTeach?.hoten}</strong>
                  </p>
                  <p>
                    Giới tính: <strong>{dataTeach?.gioitinh}</strong>
                  </p>
                  <p>
                    Ngày sinh:{" "}
                    <strong>
                      {new Date(dataTeach?.ngaysinh ?? "").toLocaleDateString(
                        "vi-VN"
                      )}
                    </strong>
                  </p>
                  <p>
                    Trình độ: <strong>{dataTeach?.trinhdo}</strong>
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <p>Cơ sở:</p>
                  <p>
                    Chức vụ: <strong>{dataTeach?.loai_giangvien}</strong>
                  </p>
                  <p>
                    Trạng thái: <strong>{dataTeach?.trangthai}</strong>
                  </p>
                  <p>
                    Khoa: <strong>{dataTeach?.ten_khoa}</strong>
                  </p>
                  <p>
                    Ngày tuyển dụng:{" "}
                    <strong>
                      {new Date(
                        dataTeach?.ngaytuyendung ?? ""
                      ).toLocaleDateString("vi-VN")}
                    </strong>
                  </p>
                </div>
              </div>
              <div className="mt-10">
                <h1 className="text-xl mb-5 font-bold uppercase border-b pb-3">
                  Thông tin cá nhân
                </h1>
              </div>
              <div className="mt-10">
                <h1 className="text-xl mb-5 font-bold uppercase border-b pb-3">
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
        variant={isUpdateForm ? "transparent" : "primary"}
        icon={isUpdateForm ? <ChevronLeft size={18} /> : <Pen size={18} />}
      />
    </div>
  );
};

const FormUpdateInformation = () => {
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
    <div className="flex flex-col gap-5 px-2 py-3 h-full mt-10">
      {/* Thông tin giảng dạy*/}
      <form
        onSubmit={handleSubmit(handleUpdateInformation)}
        className="relative h-full"
      >
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
  );
};

export default TeacherInformation;
