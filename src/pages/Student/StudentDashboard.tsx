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
import bg_light from "@/assets/v904-nunny-012.jpg";
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

  return (
    <div className="py-5 px-10 w-full h-full bg-white dark:bg-card overflow-auto">
      <div className="flex items-center mt-3 gap-2 px-2">
        <div className="h-70 w-70 rounded-full">
          <img className="h-full rounded-full" src={bg_light}></img>
        </div>
        <div className="flex-1 flex-col gap-2 ms-10">
          <h1 className="text-2xl mb-5 font-bold uppercase text-green-600">Thông tin học vấn</h1>
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
                Ngày sinh: <strong>{new Date(dataStudent?.ngaysinh ?? '').toLocaleDateString("vi-VN")}</strong>
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
        </div>
      </div>
      <div className="mt-5 px-2">
        <div className="grid grid-cols-4 gap-4 mt-3">
          <div className="shadow-md p-4 flex justify-between items-center rounded-md gap-5 hover:scale-105 transition-transform">
            <div>
              <label className="font-light">Điểm trung bình</label>
              <p className="text-x font-bold">8.5/10</p>
            </div>
            <div className="flex justify-center p-2 bg-blue-50 rounded-full"><ChartColumn color="blue" size={30}/></div>
          </div>
          <div className="shadow-md p-4 flex justify-between items-center rounded-md gap-5 hover:scale-105 transition-transform">
            <div>
              <label className="font-light">Tín chỉ hoàn thành</label>
              <p className="text-xl font-bold">0/120</p>
            </div>
            <div className="flex justify-center p-2 bg-green-50 rounded-full"><GraduationCap color="green" size={30}/></div>
          </div>
          <div className="shadow-md p-4 flex justify-between items-center rounded-md gap-5 hover:scale-105 transition-transform">
            <div>
              <label className="font-light">Môn học hiện tại</label>
              <p className="text-xl font-bold">{ListClassCourse?.length}</p>
            </div>
            <div className="flex justify-center p-2 bg-violet-50 rounded-full"><BookText color="purple" size={30}/></div>
          </div>
          <div className="shadow-md p-4 flex justify-between items-center rounded-md gap-5 hover:scale-105 transition-transform">
            <div>
              <label className="font-light">Bài tập chưa nộp</label>
              <p className="text-xl font-bold">0</p>
            </div>
            <div className="flex justify-center p-2 bg-amber-50 rounded-full"><BookOpenCheck color="orange" size={30}/></div>
          </div>
        </div>
      </div>
      <div className="px-2">
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="flex flex-col gap-4">
            <div className="p-4 rounded-md shadow-md">
              <h2 className="text-xl font-bold pb-3">Lịch học hôm nay</h2>
              <CalendarToday data={events} />
            </div>
            <div className="flex flex-col gap-4 p-4 rounded-md shadow-md">
              <h2 className="text-xl font-bold pb-3">Danh sách lớp học</h2>
              {ListClassCourse?.map((c,i) => (
                <Link to={`/classcourse/${c.MaLop}`} key={i} className="p-3 shadow-md rounded-md border-l-5 border-green-500 flex items-center justify-between">
                  <div>
                    <span className="font-bold">{c.ten_lop} - {c.MaHP}</span>
                    <p className="flex items-center mt-2"><User size={18}/>{c.si_so}</p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-full">
                    <LogIn color="green"/>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            {/* Tiến độ học tập */}
            <div className="flex flex-col gap-3 p-4 shadow-md rounded-md">
              <h2 className="text-xl font-bold">Tiến độ học tập</h2>
              <Process label="Tín chỉ tín luỹ" total={120} current={13} classname="bg-blue-400" size="sm"/>
              <Process label="Điểm trung bình" total={10} current={2} classname="bg-green-400" size="sm"/>
              <Process label="Bài tập hoàn thành" total={20} current={5} classname="bg-amber-400" size="sm"/>
            </div>
            <div className="grid grid-cols-2 gap-3 p-4 shadow-md rounded-md">
              {/* Công cụ */}
              <h2 className="text-xl font-bold col-span-2">Công cụ</h2>
              {list_feature.map((f,i) => (
                <Link to={f.href} key={i} className={`flex items-center p-2 gap-3 ${f.color} rounded-md`}>
                  <div>{f.icon}</div>
                  <div>{f.name}</div>
                </Link>
              ))}
            </div>
            <div className="flex flex-col gap-3 p-4 shadow-md rounded-md">
              {/* Thông báo */}
              <h2 className="text-xl font-bold">Thông báo</h2>
              <div className="bg-blue-50 p-3 rounded-md">
                <div className="flex gap-3 text-blue-600 font-bold">
                  <Bell/>
                  <label>Thông báo về lịch học</label>
                </div>
                <p></p>
              </div>
              <div className="bg-green-50 p-3 rounded-md">
                <div className="flex gap-3 text-green-600 font-bold">
                  <MessageSquareDiff/>
                  <label>Cập nhật điểm</label>
                </div>
                <p></p>
              </div>
              <div className="bg-amber-50 p-3 rounded-md">
                <div className="flex gap-3 text-amber-600 font-bold">
                  <TriangleAlert/>
                  <label>Nhắc nhở bài tập</label>
                </div>
                <p></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
