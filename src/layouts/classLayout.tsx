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
import { useAuth } from "@/hooks/useAuth";

type Props = {
  children: ReactNode;
};

const ClassLayout = ({ children }: Props) => {
  const { id } = useParams();
  const {user} = useAuth();
  const [classCourseData, setClassCourseData] = useState<ClassCourseType>();

  const getSidebarItems = () => {
    if (user?.role === "SV") {
      return SidebarStudentData;
    } else if (user?.role === "GV") {
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
    {
      title: "Attendance",
      href: `/classcourse/${id}/attendance`,
    },
    {
      title: "Resources",
      href: `/classcourse/${id}/resources`,
    },
    {
      title: "Group",
      href: `/classcourse/${id}/groups`,
    },
    {
      title: "Modules",
      href: `/classcourse/${id}/modules`,
    }
  ];
  return (
    <div className="h-full dark:bg-background bg-[#fff8f0] p-5">
      <div className="flex h-full items-center">
        <Sidebar items={getSidebarItems()} ishidden={true}/>
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
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassLayout;
