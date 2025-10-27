import {
  Calendar,
  CalendarToday,
  type EventType,
} from "@/components/ui/calendar";
import type { ClassCourseType } from "@/types/ClassCourseType";

import API from "@/utils/axios";
import { formatterDataEventCalendar } from "@/utils/formatters";
import {
  
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import type { StudentEducation, StudentType } from "@/types/StudentType";
import { Process } from "@/components/ui/process";




const StudentDashboard = () => {
  const [dataStudent, setDataStudent] = useState<StudentEducation>();
  const [events, setEvents] = useState<EventType[]>([]);
  const [dueSoon, setDueSoon] = useState<any[]>([]) 

  const getOneStudent = async () => {
    try {
      const res = await API.get(
        "/student/getOneStudent/" + localStorage.getItem("username")
      );
      console.log(res.data);
      localStorage.setItem("MaNganh", res.data.result.data[0].MaNganh);
      setDataStudent(res.data.result.data[0]);
    } catch (err: any) {
      toast.error(err?.response?.message);
    }
  };

  const getDueSoon = async () => {
    try{
      const res =await API.get('/assignments/getAllDueSoon')
      setDueSoon(res.data.result.data)
    }catch(err: any) {
      toast.error(err?.response?.data?.message);
    }
  }

  const getSchedule = async () => {
    const res = await API.get(
      "/student/getSchedule/" + localStorage.getItem("username")
    );
    console.log(res.data);
    console.log(formatterDataEventCalendar(res.data.result.data));
    setEvents(formatterDataEventCalendar(res.data.result.data));
  };

  useEffect(() => {
    getOneStudent();
    getSchedule();
    getDueSoon()
  }, []);

  useEffect(() => {
    document.title = dataStudent?.hoten ?? 'Dashboard'
  }, [dataStudent]);

  return (
    <div className="py-5 px-10 w-full h-170 overflow-auto">
      <div className="flex gap-3 h-full">
        {/* statistical */}
        <div className="w-[50%] grid grid-rows-2 gap-5 col-span-3">
          <div className="grid gap-2 grid-cols-2 grid-rows-2">
            {/* điểm trung bình */}
            <div className="flex flex-col bg-linear-65 from-[#a3a380] to-[#d6ce93] rounded-xl p-10 font-brand-logo">
              <span className="">Average point</span>
              <span className="text-7xl text-green-brand font-bold">9.0</span>
            </div>
            {/* lịch hoc trong tuần */}
            <div className="flex flex-col bg-linear-65 from-[#e8ac65] to-[#ffcb69]  rounded-xl p-10 font-brand-logo">
              <span className="">Week schedule</span>
              <span className="text-7xl text-[#e2711d] font-bold">4</span>
            </div>
            {/* bài tập chưa làm */}
            <div className="flex flex-col bg-linear-65 from-[#b08968] to-[#ddb892]  rounded-xl p-10 font-brand-logo">
              <span className="">Assignment</span>
              <span className="text-7xl text-[#895737] font-bold">2</span>
            </div>
            {/* số tín chỉ tín luỹ */}
            <div className="flex flex-col bg-linear-65 from-[#bb8588] to-[#d8a48f]  rounded-xl p-10 font-brand-logo">
              <span className="">Credit</span>
              <span className="text-7xl text-[#b36a5e] font-bold">6</span>
            </div>
          </div>
          {/* các bài tập sắp đến hạn */}
          <div className="flex flex-col gap-2">
            <h1>Deadline</h1>
            {dueSoon.map(d => (
              <Link to={`/classcourse/${d.MaLop}/guidance/${d.MaBaiTap}`} key={d.MaBaiTap} className="block bg-yellow-brand w-full p-3 rounded-xl relative">
                <h2 className="text-xl text-yellow-700 font-bold">{d.TieuDe}</h2>
                <span>{d.ten_lop}</span>
                <span className="absolute top-1/2 -translate-y-1/2 right-10 bg-green-brand p-2 text-white rounded-xl">{d.SoGioConLai} Hour</span>
              </Link>
            ))}
          </div>
        </div>
        {/* lịch học rút gọn & công cụ */}
        <div className="grid grid-rows-2 gap-5">
          {/* lịch học */}
          <div className="w-full">
            
          </div>
          {/* công cụ */}
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
