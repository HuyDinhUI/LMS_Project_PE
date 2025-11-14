import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/side-bar";
import { useAuth } from "@/hooks/useAuth";
import {
  SidebarAdminData,
  SidebarStudentData,
  SidebarTeacherData,
} from "@/mock/sidebar-data";
import { type ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const MainLayout = ({ children }: Props) => {
  const {user} = useAuth();
  const getSidebarItems = () => {
    if (user?.role === "SV") {
      return SidebarStudentData;
    } else if (user?.role === "GV") {
      return SidebarTeacherData;
    } else {
      return SidebarAdminData;
    }
  };

  
  return (
    <div className="h-full dark:bg-background bg-[#fff8f0] p-5">
      <div className="flex h-full items-center">
        <Sidebar items={getSidebarItems()} />
        <div className="dark:bg-background flex flex-col flex-1 h-full sm:overflow-y-hidden overflow-y-scroll">
          <Header />
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
