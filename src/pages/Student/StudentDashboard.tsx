import { Calendar, CalendarToday, type EventType } from "@/components/ui/calendar";
import type { ClassCourseType } from "@/types/ClassCourseType";

import API from "@/utils/axios";
import { formatterDataEventCalendar } from "@/utils/formatters";
import {
  BookText,
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
import type { StudentEducation, StudentType } from "@/types/StudentType";

const list_feature = [
  {
    name: "Danh sách lớp học",
    href: "/student/class",
    icon: <Presentation size={30} />,
    color: "from-blue-400 to-blue-500",
  },
  {
    name: "Kết quả học tập",
    href: "/student/grades",
    icon: <GraduationCap size={30} />,
    color: "from-purple-400 to-purple-500",
  },
  {
    name: "Chương trình khung",
    href: "/student/program",
    icon: <BookText size={30} />,
    color: "from-pink-400 to-pink-500",
  },
  {
    name: "Cập nhật hồ sơ",
    href: "/student/information/update",
    icon: <FileUser size={30} />,
    color: "from-rose-400 to-rose-500",
  },
];

const StudentDashboard = () => {
  const [ListClassCourse, setListClassCourse] = useState<ClassCourseType[]>();
  const [dataStudent, setDataStudent] = useState<StudentEducation>();
  const [events, setEvents] = useState<EventType[]>([]);

  const getListClassCourse = async () => {
    const res = await API.get(
      "/classCourse/getClassCourseByTeacher/" + localStorage.getItem("username")
    );
    setListClassCourse(res.data.result.data);
  };

  const getOneStudent = async () => {
    try {
      const res = await API.get(
        "/student/getOneStudent/" + localStorage.getItem("username")
      );
      console.log(res.data)
      localStorage.setItem('MaNganh',res.data.result.data[0].MaNganh)
      setDataStudent(res.data.result.data[0]);

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
    getOneStudent();
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
                MSSV: <strong>{dataStudent?.MaSV}</strong>
              </p>
              <p>
                Họ tên: <strong>{dataStudent?.hoten}</strong>
              </p>
              <p>
                Giới tính: <strong>{dataStudent?.gioitinh}</strong>
              </p>
              <p>
                Ngày sinh: <strong>{String(dataStudent?.ngaysinh)}</strong>
              </p>
              <p>Nơi sinh: </p>
            </div>
            <div className="flex flex-col gap-2">
              <p>
                Khoa: <strong>{dataStudent?.ten_khoa}</strong>
              </p>
              <p>Hệ đào tạo:</p>
              <p>Ngành: <strong>{dataStudent?.ten_nganh}</strong></p>
              <p>
                Lớp: <strong>{dataStudent?.MaLopHC}</strong>
              </p>
              <p>
                Ngày nhập học: <strong></strong>
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
              className={`flex items-center gap-4 dark:text-white ring ring-gray-200 rounded-md p-4 h-20`}
            >
              {f.icon}
              {f.name}
            </Link>
          ))}
        </div>
      </div>
      {/* Nhắc nhở & Lịch dạy */}
      <div className="px-2">
        <div className="grid grid-cols-2 gap-2 mt-3">
          <div className="p-4 rounded-md ring ring-gray-200">
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
            <Link to={'/teacher/classmanagement'} className="flex items-center justify-center ring ring-gray-200 rounded-md overflow-hidden">
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

export default StudentDashboard;
