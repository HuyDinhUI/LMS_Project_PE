import { Header } from "@/components/layout/header";
import { Sidebar, type SidebarItem } from "@/components/layout/side-bar";
import {
  SidebarAdminData,
  SidebarStudentData,
  SidebarTeacherData,
} from "@/mock/sidebar-data";
import { useRef, type ReactNode } from "react";

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
  };

  
  return (
    <div className="h-full dark:bg-background bg-[#fff8f0] p-5">
      <div className="flex h-full items-center">
        <Sidebar items={getSidebarItems()} />
        <div className="dark:bg-background flex flex-col flex-1 h-full overflow-y-hidden">
          <Header />
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
