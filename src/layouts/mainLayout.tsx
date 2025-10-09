import {Header} from "@/components/layout/header";
import { Sidebar, type SidebarItem } from "@/components/layout/side-bar";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  sidebarItems: SidebarItem[]
};



const MainLayout = ({ children, sidebarItems }: Props) => {
  return (
    <div className="h-full dark:bg-background">
      <div className="flex max-h-[100vh]">
        <Sidebar items={sidebarItems} />
        <div className="dark:bg-background flex-1 h-[90vh]">
          <Header/>
          {children}
          </div>
      </div>
    </div>
  );
};

export default MainLayout;
