import { Header } from "@/components/layout/header";
import { Sidebar, type SidebarItem } from "@/components/layout/side-bar";
import type { ReactNode } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

type Props = {
  children: ReactNode;
  sidebarMainItems: SidebarItem[];
};

const ClassLayout = ({ children, sidebarMainItems }: Props) => {

    const {id} = useParams()
    const location = useLocation()
  const navbarClassItems = [
    {
        title: 'Trang chủ',
        href:  `/teacher/classcourse/${id}`
    },
    {
        title: 'Bài tập',
        href:  `/teacher/classcourse/${id}/assignments`
    },
    {
        title: 'Điểm',
        href:  `/teacher/classcourse/${id}/grades`
    },
    {
        title: 'Thành viên',
        href:  `/teacher/classcourse/${id}/users`
    },
  ]
  return (
    <div className="h-full dark:bg-background">
      <div className="flex max-h-[100vh]">
        <Sidebar items={sidebarMainItems} />
        <div className="dark:bg-background flex-1 h-[100vh]">
          <Header />
          <div className="flex flex-col px-3 gap-5">
            <div className="flex gap-2">
                {navbarClassItems.map((c,i) => (
                    <Link key={i} to={c.href} className={`p-3 hover:bg-gray-100 ${location.pathname === c.href ? 'border-b-2 border-green-600' : ''}`}>{c.title}</Link>
                ))}
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassLayout;
