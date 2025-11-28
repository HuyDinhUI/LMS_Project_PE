import { Button } from "@/components/ui/button";
import type { TeacherDTO } from "@/types/TeacherType";
import API from "@/utils/axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import bg_light from "@/assets/v904-nunny-012.jpg";
import { ChevronLeft, Pen } from "lucide-react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

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
                Teaching
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
                  Personal
                </h1>
              </div>
              <div className="mt-10">
                <h1 className="text-xl mb-5 font-bold uppercase border-b pb-3">
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

  const getOneTeacher = async () => {
    try {
      const res = await API.get(
        "/teacher/getOneTeacher/" + localStorage.getItem("username")
      );
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
      await API.put(`teacher/updateTeacher`, data);
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
          I. Personal
        </h1>
        <div className="grid grid-cols-3 gap-3 py-5">
          <TextField
            label="Fullname"
            type="text"
            placeholder="Nguyễn Văn A"
            {...register("hoten", { required: "Họ tên là bắt buộc" })}
            slotProps={{ inputLabel: { shrink: true } }}
          />

          <TextField
            label="Date"
            type="date"
            {...register("ngaysinh", {
              required: "Ngày sinh là bắt buộc",
            })}
            slotProps={{ inputLabel: { shrink: true } }}
          />

          <TextField
            select
            label="Gender"
            {...register("gioitinh", {
              required: "Giới tính là bắt buộc",
            })}
            slotProps={{ inputLabel: { shrink: true } }}
          >
            <MenuItem value="Nam">Nam</MenuItem>
            <MenuItem value="Nữ">Nữ</MenuItem>
          </TextField>

          <TextField
            label="Phone"
            type="text"
            placeholder="+86 54382607"
            {...register("sdt", {
              required: "Số điện thoại là bắt buộc",
            })}
            slotProps={{ inputLabel: { shrink: true } }}
          />

          <TextField
            label="Email"
            type="email"
            placeholder="m@example.com"
            {...register("email", { required: "Email là bắt buộc" })}
            slotProps={{ inputLabel: { shrink: true } }}
          />

          <TextField
            label="Address"
            type="text"
            placeholder="15/8 Nguyễn Hữu Tiến"
            {...register("diachi", { required: "Địa chỉ là bắt buộc" })}
            slotProps={{ inputLabel: { shrink: true } }}
          />
        </div>
        {/* Thông tin cá nhân */}
        <h1 className="text-orange-400 font-bold uppercase pb-3 border-b">
          II. Family
        </h1>
        <div className="absolute flex gap-2 justify-end left-0 bottom-0 p-4 border-t border-gray-200 w-full">
          <Button variant="dark" title="Save" type="submit" />
        </div>
      </form>
    </div>
  );
};

export default TeacherInformation;
