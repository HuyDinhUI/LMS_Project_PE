import {
  Calendar,
  CalendarToday,
  type EventType,
} from "@/components/ui/calendar";
import type { ClassCourseType } from "@/types/ClassCourseType";
import type { TeacherDTO } from "@/types/TeacherType";
import API from "@/utils/axios";
import { formatterDataEventCalendar } from "@/utils/formatters";
import {
  ChartColumn,
  ChartPie,
  ChevronRight,
  FileUser,
  GraduationCap,
  icons,
  Info,
  LogIn,
  Pencil,
  Plus,
  Presentation,
  ScanFace,
  School,
  ScrollText,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";


const list_feature = [
  {
    name: "Tạo bài tập mới",
    href: "/teacher/classmanagement/assignment/create",
    icon: <Plus size={20} />,
    color: "bg-blue-50 text-blue-700",
  },
  {
    name: "Nhập điểm",
    href: "/teacher/gradesmanagement",
    icon: <Pencil size={20} />,
    color: "bg-green-50 text-green-700",
  },
  {
    name: "Báo cáo điểm danh",
    href: "/teacher/attendancemanagement",
    icon: <ScanFace size={20} />,
    color: "bg-violet-50 text-violet-700",
  },
  {
    name: "Cập nhật hồ sơ",
    href: "/teacher/information/update",
    icon: <FileUser size={20} />,
    color: "bg-amber-50 text-amber-700",
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
    <div className="py-5 px-10 w-full h-full overflow-auto">
      
    </div>
  );
};

export default TeacherDashboard;
