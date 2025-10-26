import { Button } from "@/components/ui/button";
import { FilterForm } from "@/components/ui/filter-form";
import type { ClassCourseType } from "@/types/ClassCourseType";
import API from "@/utils/axios";
import { LayoutGrid, LayoutList, User } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";


const data_mock = [
    {
      key: "order",
      select: [
        {
          name: "Last create",
          value: "asc",
        },
        {
          name: "New create",
          value: "desc",
        },
      ],
    },
  ];

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

  const handleFilter = (filter: string) => {
    // Xử lý lọc ở đây
    console.log("Lọc theo:", filter);
  };

  useEffect(() => {
    if (role === "GV") {
      getClassByTeacher();
    } else {
      getClassByStudent();
    }
  }, []);
  return (
    <div className="py-5 px-10 w-full h-full dark:bg-card overflow-auto">
      <div className="w-full px-2 flex gap-2">
        {/* layout */}
        <div className="flex">
          <Button variant="icon" icon={<LayoutGrid size={18}/>}/>
          <Button variant="transparent" icon={<LayoutList size={18}/>}/>
        </div>
        <FilterForm data={data_mock} handleFilter={handleFilter}/>
      </div>
      <div className="mt-5">
        <div></div>
        <div className="grid grid-cols-3 gap-5">
          {classData.map((c) => (
            <Link
              to={`/classcourse/${c.MaLop}`}
              key={c.MaLop}
              className="rounded-xl shadow-sm overflow-hidden hover:-translate-y-1 transition-transform"
            >
              <div className={`h-50 w-full relative bg-cover`} style={{backgroundImage:`url(${c.cover})`}}>
              </div>
              <div className="p-2">
                  <h3 className="text-md font-bold">{c.ten_lop}</h3>
                </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClassCourseList;
