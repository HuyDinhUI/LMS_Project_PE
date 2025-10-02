import {Header} from "@/components/layout/header";
import { Sidebar, type SidebarItem } from "@/components/layout/side-bar";
import { slugtify } from "@/utils/formatters";
import {
  LayoutDashboard,
  Settings,
  SquareKanban,
  Home,
  Users2,
  CreditCard,
  Rocket,
  FileUser,
  CircleUser,
  Shield,
  BookUser,
  Presentation,
  Clipboard,
  Calendar,
} from "lucide-react";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  sidebarItems: SidebarItem[]
};



const MainLayout = ({ children, sidebarItems }: Props) => {
  return (
    <div className="h-full dark:bg-background">
      <Header/>
      <div className="flex max-h-[95vh]">
        <Sidebar items={sidebarItems} />
        <div className="bg-gray-50 dark:bg-background p-6 flex-1 h-[92vh]">{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;
