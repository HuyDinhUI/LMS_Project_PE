import type { ClassCourseType } from "@/types/ClassCourseType";
import API from "@/utils/axios";
import { User } from "lucide-react";
import { useEffect, useState } from "react";

const TeacherDashboard = () => {
  const [ListClassCourse, setListClassCourse] = useState<ClassCourseType[]>();

  useEffect(() => {
    const getListClassCourse = async () => {
      const res = await API.get(
        "/classCourse/getClassCourseByTeacher/" +
          localStorage.getItem("username")
      );
      setListClassCourse(res.data.result.data);
    };
    getListClassCourse();
  }, []);
  return (
    <div className="py-5 px-10 w-full h-full bg-white dark:bg-card rounded-md">
      <div className="w-full px-2">
        <h1 className="text-2xl uppercase">Dashboard</h1>
      </div>
      <div className="mt-5 px-2">
        <h2 className="text-amber-500 font-bold text-xl uppercase pb-3 border-b">
          lớp học
        </h2>
        <div className="grid grid-cols-4 gap-2 mt-3">
          {ListClassCourse?.map((l, i) => (
            <div key={i} className="flex flex-col ring ring-gray-100 rounded-md overflow-hidden">
              <div className="bg-linear-to-r from-amber-200 to-amber-500 h-25"></div>
              <div className="p-3 flex justify-between">
                <p>{l.ten_lop}</p>
                <span className="flex items-center">
                  <User size={18} />
                  {l.si_so}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
