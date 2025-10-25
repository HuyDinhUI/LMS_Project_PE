import {
  Calendar,
  CalendarToday,
  type EventType,
} from "@/components/ui/calendar";
import type { ClassCourseType } from "@/types/ClassCourseType";

import API from "@/utils/axios";
import { formatterDataEventCalendar } from "@/utils/formatters";
import {
  Bell,
  BookOpen,
  BookOpenCheck,
  BookText,
  ChartColumn,
  ChevronRight,
  FileUser,
  GraduationCap,
  icons,
  Info,
  LogIn,
  MessageSquareDiff,
  Presentation,
  ScanFace,
  TriangleAlert,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import type { StudentEducation, StudentType } from "@/types/StudentType";
import { Process } from "@/components/ui/process";

const list_feature = [
  {
    name: "Danh sách lớp học",
    href: "/student/class",
    icon: <Presentation size={20} />,
    color: "bg-blue-50 text-blue-700 hover:bg-blue-100",
  },
  {
    name: "Kết quả học tập",
    href: "/student/grades",
    icon: <GraduationCap size={20} />,
    color: "bg-green-50 text-green-700 hover:bg-green-100",
  },
  {
    name: "Chương trình khung",
    href: "/student/program",
    icon: <BookText size={20} />,
    color: "bg-violet-50 text-violet-700 hover:bg-violet-100",
  },
  {
    name: "Cập nhật hồ sơ",
    href: "/student/information/update",
    icon: <FileUser size={20} />,
    color: "bg-amber-50 text-amber-700 hover:bg-amber-100",
  },
];

const StudentDashboard = () => {
  const [ListClassCourse, setListClassCourse] = useState<ClassCourseType[]>();
  const [dataStudent, setDataStudent] = useState<StudentEducation>();
  const [events, setEvents] = useState<EventType[]>([]);

  const getListClassCourse = async () => {
    const res = await API.get(
      "/classCourse/getClassCourseByStudent/" + localStorage.getItem("username")
    );
    setListClassCourse(res.data.result.data);
  };

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

  const getSchedule = async () => {
    const res = await API.get(
      "/student/getSchedule/" + localStorage.getItem("username")
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

  useEffect(() => {
    document.title = dataStudent?.hoten ?? 'Dashboard'
  }, [dataStudent]);

  return (
    <div className="py-5 px-10 w-full h-full overflow-auto">
      
    </div>
  );
};

export default StudentDashboard;
