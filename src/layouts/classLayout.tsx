import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/side-bar";
import {
  SidebarAdminData,
  SidebarStudentData,
  SidebarTeacherData,
} from "@/mock/sidebar-data";
import type { ClassCourseType } from "@/types/ClassCourseType";
import API from "@/utils/axios";
import { useEffect, useState, type ReactNode } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import catImg from "@/assets/Character_Cat_3.svg"

type Props = {
  children: ReactNode;
};

const ClassLayout = ({ children }: Props) => {
  const { id } = useParams();
  const role = localStorage.getItem("role");
  const [classCourseData, setClassCourseData] = useState<ClassCourseType>();

  const getSidebarItems = () => {
    if (role === "SV") {
      return SidebarStudentData;
    } else if (role === "GV") {
      return SidebarTeacherData;
    } else {
      return SidebarAdminData;
    }
  }

  const location = useLocation();

  const getClassCourse = async () => {
    try {
      const res = await API.get(`/classCourse/getOneClassCourse/${id}`);
      setClassCourseData(res.data.result.data[0]);
    } catch (err: any) {
      toast.error(err?.response?.data?.message);
    }
  };

  useEffect(() => {
    getClassCourse()
  },[id])

  const navbarClassItems = [
    {
      title: "Home",
      href: `/classcourse/${id}`,
    },
    {
      title: "Assignment",
      href: `/classcourse/${id}/assignments`,
    },
    {
      title: "Quiz",
      href: `/classcourse/${id}/quiz`,
    },
    {
      title: "Grade",
      href: `/classcourse/${id}/grades`,
    },
    {
      title: "Member",
      href: `/classcourse/${id}/members`,
    },
  ];
  return (
    <div className="h-full dark:bg-background bg-amber-50 p-5">
      <div className="flex h-full items-center">
        <Sidebar items={getSidebarItems()} />
        <div className="dark:bg-background flex-1 h-full overflow-hidden">
          <Header router={classCourseData?.ten_lop}/>
          <div className="flex px-5 gap-5 mt-5 h-full">
            <div className="flex flex-col gap-5">
              {navbarClassItems.map((c, i) => (
                <Link
                  key={i}
                  to={c.href}
                  className={`px-2 ${
                    location.pathname === c.href
                      ? "text-black"
                      : "text-black/60"
                  }`}
                >
                  {location.pathname === c.href && <span>&sdot;</span>} {c.title} 
                </Link>
              ))}
            </div>
            <div className="overflow-y-hidden flex-1">
              {/* <div className="relative px-20 pb-5">
                <div className="border-b border-gray-500 flex items-end justify-center">
                  <div className=""><img width={90} src={catImg}/></div>
                  <div className="">
                    <h1 className="text-3xl font-brand-logo">{classCourseData?.ten_lop}</h1>
                  </div>
                </div>
              </div> */}
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassLayout;
