import { Button } from "@/components/ui/button";
import type { ClassCourseType } from "@/types/ClassCourseType";
import API from "@/utils/axios";
import { LayoutGrid, LayoutList } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ClassCourseList = () => {
  const [classData, setClassData] = useState<ClassCourseType[]>([]);
  const role = localStorage.getItem("role");
  const id = localStorage.getItem("username");

  const getClassByTeacher = async () => {
    try {
      const res = await API.get(`/classCourse/getClassCourseByTeacher/${id}`);
      setClassData(res.data.result.data);
    } catch (err: any) {
      toast.error(err?.response?.data?.message);
    }
  };

  const getClassByStudent = async () => {
    try {
      const res = await API.get(`/classCourse/getClassCourseByStudent/${id}`);
      setClassData(res.data.result.data);
    } catch (err: any) {
      toast.error(err?.response?.data?.message);
    }
  };

  useEffect(() => {
    if (role === "GV") {
      getClassByTeacher();
    } else {
      getClassByStudent();
    }
  }, []);
  return (
    <div className="py-5 px-5 w-full h-full dark:bg-card overflow-auto">
      <div className="w-full px-2">
        {/* layout */}
        <div className="flex">
          <Button variant="icon" icon={<LayoutGrid size={18}/>}/>
          <Button variant="transparent" icon={<LayoutList size={18}/>}/>
        </div>
      </div>
      <div className="mt-5">
        <div></div>
        <div className="grid grid-cols-3 gap-5">
          {classData.map((c) => (
            <Link
              to={`/classcourse/${c.MaLop}`}
              key={c.MaLop}
              className="rounded-xl overflow-hidden hover:-translate-y-1 transition-transform"
            >
              <div className="h-70 w-full flex items-end bg-[url('https://img.freepik.com/free-vector/hand-drawn-minimal-background_23-2149008068.jpg?uid=R40278496&ga=GA1.1.12754122.1753975824&semt=ais_hybrid&w=740&q=80')] bg-cover">
                <div className="p-3">
                  <h3 className="text-xl font-bold">{c.ten_lop}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClassCourseList;
