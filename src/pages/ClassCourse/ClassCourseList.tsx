import { Button } from "@/components/ui/button";
import type { ClassCourseType } from "@/types/ClassCourseType";
import API from "@/utils/axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";


const ClassCourseList = () => {
  const [classData, setClassData] = useState<ClassCourseType[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>("All")
  const role = localStorage.getItem("role");
  const id = localStorage.getItem("username");

  const getClassByTeacher = async () => {
    try {
      const res = await API.get(`/classCourse/getClassCourseByTeacher/${id}?filter=${selectedFilter}`);
      setClassData(res.data.result.data);
    } catch (err: any) {
      toast.error(err?.response?.data?.message);
    }
  };

  const getClassByStudent = async () => {
    try {
      const res = await API.get(`/classCourse/getClassCourseByStudent/${id}?filter=${selectedFilter}`);
      setClassData(res.data.result.data);
    } catch (err: any) {
      toast.error(err?.response?.data?.message);
    }
  };

  const handleFilter = async (key: string) => {
    setSelectedFilter(key)
  }

  const FILTER_LIST = [
    {
      title: "All",
      onclick: () => handleFilter("All"),
    },
    {
      title: "Openning",
      onclick: () => handleFilter("Openning"),
    },
    {
      title: "Closed",
      onclick: () => handleFilter("Closed"),
    },
    {
      title: "Today",
      onclick: () => handleFilter("Today"),
    },
  ];

  
  useEffect(() => {
    if (role === "GV") {
      getClassByTeacher();
    } else {
      getClassByStudent();
    }
  }, [selectedFilter]);
  return (
    <div className="py-5 px-10 w-full h-full dark:bg-card overflow-auto">
      <div className="w-full px-2 flex gap-2">
        {/* Filter */}
        <div className="flex gap-2">
          {FILTER_LIST.map((f,i) => (
            <Button key={i} title={f.title} onClick={f.onclick} variant={f.title === selectedFilter ? "primary" : "outline"}/>
          ))}
        </div>
      </div>
      <div className="mt-5">
        <div className="grid grid-cols-3 gap-5">
          {classData.map((c) => (
            <Link
              to={`/classcourse/${c.MaLop}`}
              key={c.MaLop}
              className={`rounded-xl shadow-sm overflow-hidden hover:-translate-y-1 transition-transform relative`}
            >
              <div
                className={`h-50 w-full relative bg-cover ${new Date(c.ngay_kethuc) < new Date() ? 'opacity-70' : ''}`}
                style={{ backgroundImage: `url(${c.cover})` }}
              >
                
              </div>
              <div className="p-2">
                <h3 className="text-md font-bold">{c.ten_lop}</h3>
              </div>
              {new Date(c.ngay_kethuc) < new Date() && <span className="absolute bg-black p-2 text-white top-5 right-0 -left-70 -rotate-45 text-center">It's over</span>}
            </Link>
          ))}
          {classData.length === 0 && <span className="italic text-center col-span-3">No data available</span>}
        </div>
      </div>
    </div>
  );
};

export default ClassCourseList;
