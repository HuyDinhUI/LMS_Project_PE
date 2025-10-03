import { Calendar, CalendarToday, type EventType } from "@/components/ui/calendar";
import type { ClassCourseType } from "@/types/ClassCourseType";
import type { TeacherDTO } from "@/types/TeacherType";
import API from "@/utils/axios";
import { formatterDataEventCalendar } from "@/utils/formatters";
import {
  ChevronRight,
  FileUser,
  GraduationCap,
  icons,
  Info,
  Presentation,
  ScanFace,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import bg_light from "@/assets/v904-nunny-012.jpg";

const list_feature = [
  {
    name: "Danh sách lớp học",
    href: "/teacher/classmanagement",
    icon: <Presentation size={18} />,
    color: "from-blue-400 to-blue-500",
  },
  {
    name: "Quản lý điểm",
    href: "/teacher/gradesmanagement",
    icon: <GraduationCap size={18} />,
    color: "from-purple-400 to-purple-500",
  },
  {
    name: "Báo cáo điểm danh",
    href: "/teacher/attendancemanagement",
    icon: <ScanFace size={18} />,
    color: "from-pink-400 to-pink-500",
  },
  {
    name: "Cập nhật hồ sơ",
    href: "/teacher/information/update",
    icon: <FileUser size={18} />,
    color: "from-rose-400 to-rose-500",
  },
];

const TeacherDashboard = () => {
  const [ListClassCourse, setListClassCourse] = useState<ClassCourseType[]>();
  const [dataTeach, setDataTeach] = useState<TeacherDTO>();
  const [events, setEvents] = useState<EventType[]>([]);

  const getListClassCourse = async () => {
    const res = await API.get(
      "/classCourse/getClassCourseByTeacher/" + localStorage.getItem("username")
    );
    setListClassCourse(res.data.result.data);
  };

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

  const getSchedule = async () => {
    const res = await API.get(
      "/teacher/getSchedule/" + localStorage.getItem("username")
    );
    console.log(res.data);
    console.log(formatterDataEventCalendar(res.data.result.data));
    setEvents(formatterDataEventCalendar(res.data.result.data));
  };

  useEffect(() => {
    getListClassCourse();
    getOneTeacher();
    getSchedule();
  }, []);

  return (
    <div className="py-5 px-10 w-full h-full bg-white dark:bg-card rounded-md overflow-auto">
      <div className="w-full px-2">
        <h1 className="text-2xl uppercase text-amber-400 font-bold">
          Dashboard
        </h1>
      </div>
      <div className="grid grid-cols-4 mt-3 gap-2 px-2">
        <div className="h-70 shadow-md p-3">
          <img className="h-full" src={bg_light}></img>
        </div>
        <div className="flex-1 col-span-3 flex-col gap-2 ms-10">
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
                Ngày sinh: <strong>{String(dataTeach?.ngaysinh)}</strong>
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
                <strong>{String(dataTeach?.ngaytuyendung)}</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 px-2">
        <div className="grid grid-cols-4 gap-2 mt-3">
          {list_feature.map((f, i) => (
            <Link
              to={f.href}
              key={i}
              className={`flex items-center gap-2 text-green-700 ring ring-green-500 rounded-md p-4`}
            >
              {f.icon}
              {f.name}
            </Link>
          ))}
        </div>
      </div>
      {/* Nhắc nhở & Lịch dạy */}
      <div className="mt-5 px-2">
        <div className="grid grid-cols-2 gap-2 mt-3">
          <div className="p-4 rounded-md shadow-md">
            <CalendarToday data={events} />
          </div>
          <div className="grid grid-cols-2 grid-rows-2 gap-2">
            {ListClassCourse?.map((l, i) => (
              <div
                key={i}
                className="flex flex-col ring ring-gray-100 rounded-md overflow-hidden"
              >
                <div className="bg-linear-to-r from-green-300 to-green-400 h-25"></div>
                <div className="p-3 flex justify-between">
                  <p>{l.ten_lop}</p>
                  <span className="flex items-center">
                    <User size={18} />
                    {l.si_so}
                  </span>
                </div>
              </div>
            ))}
            <Link to={'/teacher/classmanagement'} className="flex items-center justify-center ring ring-gray-100 rounded-md overflow-hidden">
              <span className="flex items-center">
                Xem tất cả lớp học <ChevronRight size={18} />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
