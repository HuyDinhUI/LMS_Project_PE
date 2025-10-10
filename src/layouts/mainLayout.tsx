import {Header} from "@/components/layout/header";
import { Sidebar, type SidebarItem } from "@/components/layout/side-bar";
import { SidebarAdminData, SidebarStudentData, SidebarTeacherData } from "@/mock/sidebar-data";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};



const MainLayout = ({ children }: Props) => {
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
  return (
    <div className="h-full dark:bg-background">
      <div className="flex max-h-[100vh]">
        <Sidebar items={getSidebarItems()} />
        <div className="dark:bg-background flex-1 h-[90vh]">
          <Header/>
          {children}
          </div>
      </div>
    </div>
  );
};

export default MainLayout;
