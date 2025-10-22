import { Header } from "@/components/layout/header";
import { Sidebar, type SidebarItem } from "@/components/layout/side-bar";
import {
  SidebarAdminData,
  SidebarStudentData,
  SidebarTeacherData,
} from "@/mock/sidebar-data";
import type { ReactNode } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

type Props = {
  children: ReactNode;
};

const ClassLayout = ({ children }: Props) => {
  const { id } = useParams();
  const role = localStorage.getItem("role");

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
  const navbarClassItems = [
    {
      title: "Trang chủ",
      href: `/classcourse/${id}`,
    },
    {
      title: "Bài tập",
      href: `/classcourse/${id}/assignments`,
    },
    {
      title: "Trắc nghiệm",
      href: `/classcourse/${id}/quiz`,
    },
    {
      title: "Điểm",
      href: `/classcourse/${id}/grades`,
    },
    {
      title: "Thành viên",
      href: `/classcourse/${id}/users`,
    },
  ];
  return (
    <div className="h-full dark:bg-background">
      <div className="flex h-[100vh]">
        <Sidebar items={getSidebarItems()} />
        <div className="dark:bg-background flex-1 h-[100vh]">
          <Header />
          <div className="flex flex-col px-3 gap-5">
            <div className="flex gap-2 border-b border-gray-200">
              {navbarClassItems.map((c, i) => (
                <Link
                  key={i}
                  to={c.href}
                  className={`p-3 hover:bg-gray-100 ${
                    location.pathname === c.href
                      ? "border-b-2 border-green-600"
                      : ""
                  }`}
                >
                  {c.title}
                </Link>
              ))}
            </div>
            <div className="max-h-165 overflow-auto">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassLayout;
