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
          <Header />
          <div className="flex px-5 gap-5 mt-5">
            <div className="flex flex-col gap-5">
              {navbarClassItems.map((c, i) => (
                <Link
                  key={i}
                  to={c.href}
                  className={`px-2 ${
                    location.pathname === c.href
                      ? "border-l border-black text-black/60 ms-2"
                      : ""
                  }`}
                >
                  {c.title}
                </Link>
              ))}
            </div>
            <div className="max-h-165 overflow-auto flex-1">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassLayout;
