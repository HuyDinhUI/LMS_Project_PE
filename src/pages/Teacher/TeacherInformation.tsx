import type { TeacherDTO } from "@/types/TeacherType";
import API from "@/utils/axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const TeacherInformation = () => {
  const [dataTeach, setDataTeach] = useState<TeacherDTO>();
  

  useEffect(() => {
    const getOneTeacher = async () => {
      try {
        const res = await API.get("/teacher/getOneTeacher/" + localStorage.getItem("username"));
        setDataTeach(res.data.data[0]);
      } catch (err: any) {
        toast.error(err?.response?.message);
      }
    };

    getOneTeacher();
  }, []);
  return (
    <div className="py-5 px-10 w-full h-full bg-white dark:bg-card rounded-md">
      <div className="w-full px-2">
        <h2 className="text-2xl uppercase">Hồ sơ cá nhân</h2>
      </div>
      <div className="flex flex-col mt-5 gap-5 px-2">
        {/* Thông tin giảng dạy*/}
        <h1 className="text-orange-400 font-bold uppercase pb-3 border-b">
          I. Thông tin giảng dạy
        </h1>
        <div className="flex gap-10 mt-3">
          <div className="w-60 h-70 bg-gray-100">
            <img></img>
          </div>
          <div className="flex-1 flex-col gap-2">
            <div className="flex gap-20 text-md">
              <div className="flex flex-col gap-2">
                <p>MSGV: <strong>{dataTeach?.MSGV}</strong></p>
                <p>Họ tên: <strong>{dataTeach?.hoten}</strong></p>
                <p>Giới tính: <strong>{dataTeach?.gioitinh}</strong></p>
                <p>Ngày sinh: <strong>{String(dataTeach?.ngaysinh)}</strong></p>
                <p>Trình độ: <strong>{dataTeach?.trinhdo}</strong></p>
              </div>
              <div className="flex flex-col gap-2">
                <p>Cơ sở:</p>
                <p>Chức vụ: <strong>{dataTeach?.loai_giangvien}</strong></p>
                <p>Trạng thái: <strong>{dataTeach?.trangthai}</strong></p>
                <p>Khoa: <strong>{dataTeach?.ten_khoa}</strong></p>
                <p>Ngày tuyển dụng: <strong>{String(dataTeach?.ngaytuyendung)}</strong></p>
              </div>
            </div>
          </div>
        </div>
        {/* Thông tin cá nhân */}
        <h1 className="text-orange-400 font-bold uppercase pb-3 border-b">
          II. Thông tin cá nhân
        </h1>
      </div>
    </div>
  );
};

export default TeacherInformation;
