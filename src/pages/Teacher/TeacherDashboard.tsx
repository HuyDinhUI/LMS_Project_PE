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
import bg_light from "@/assets/v904-nunny-012.jpg";

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
    <div className="py-5 px-10 w-full h-full bg-white dark:bg-card overflow-auto">
      <div className="flex items-center mt-3 gap-2 px-2">
        <div className="h-70 w-70 rounded-full">
          <img className="h-full rounded-full" src={bg_light}></img>
        </div>
        <div className="flex-1 flex-col gap-2 ms-10">
          <h1 className="text-2xl mb-5 font-bold uppercase text-green-600">
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
        <div className="grid grid-cols-4 gap-4 mt-3">
          <div className="shadow-md p-4 flex justify-between items-center rounded-md gap-5 hover:scale-105 transition-transform">
            <div>
              <label className="font-light">Tổng số lớp</label>
              <p className="text-xl font-bold">
                {ListClassCourse?.length}
              </p>
            </div>
            <div className="flex justify-center p-2 bg-blue-50 rounded-full">
              <School color="blue" size={30} />
            </div>
          </div>
          <div className="shadow-md p-4 flex justify-between items-center rounded-md gap-5 hover:scale-105 transition-transform">
            <div>
              <label className="font-light">Tổng tiết dạy</label>
              <p className="text-xl font-bold">0</p>
            </div>
            <div className="flex justify-center p-2 bg-green-50 rounded-full">
              <ChartColumn color="green" size={30} />
            </div>
          </div>
          <div className="shadow-md p-4 flex justify-between items-center rounded-md gap-5 hover:scale-105 transition-transform">
            <div>
              <label className="font-light">Bài tập chờ chấm</label>
              <p className="text-xl font-bold">0</p>
            </div>
            <div className="flex justify-center p-2 bg-violet-50 rounded-full">
              <ScrollText color="purple" size={30} />
            </div>
          </div>
          <div className="shadow-md p-4 flex justify-between items-center rounded-md gap-5 hover:scale-105 transition-transform">
            <div>
              <label className="font-light">Điểm trung bình</label>
              <p className="text-xl font-bold">0</p>
            </div>
            <div className="flex justify-center p-2 bg-amber-50 rounded-full">
              <ChartPie color="orange" size={30} />
            </div>
          </div>
        </div>
      </div>
      <div className="px-2">
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="flex flex-col gap-4">
            <div className="p-4 rounded-md shadow-md">
              <h2 className="text-xl font-bold pb-3">Lịch dạy hôm nay</h2>
              <CalendarToday data={events} />
            </div>
            <div className="flex flex-col gap-4 p-4 rounded-md shadow-md">
              <h2 className="text-xl font-bold pb-3">Danh sách lớp học</h2>
              {ListClassCourse?.map((c, i) => (
                <Link
                  to={`/classcourse/${c.MaLop}`}
                  key={i}
                  className="p-3 shadow-md rounded-md border-l-5 border-green-500 flex items-center justify-between"
                >
                  <div>
                    <span className="font-bold">
                      {c.ten_lop} - {c.MaHP}
                    </span>
                    <p className="flex items-center mt-2">
                      <User size={18} />
                      {c.si_so}
                    </p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-full">
                    <LogIn color="green" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-3 p-4 shadow-md rounded-md">
              {/* Thao tác nhanh */}
              <h2 className="text-xl font-bold col-span-2">Thao tác nhanh</h2>
              {list_feature.map((f, i) => (
                <Link
                  to={f.href}
                  key={i}
                  className={`flex items-center p-2 gap-3 ${f.color} rounded-md`}
                >
                  <div>{f.icon}</div>
                  <div>{f.name}</div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
