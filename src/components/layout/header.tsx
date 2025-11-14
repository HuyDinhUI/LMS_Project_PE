import { Button } from "../ui/button";

import {
  Menu,
  HelpCircle,
  Bell,
  Sun,
  Moon,
  LogOut,
  Settings,
  User,
  CircleUser,
  Fullscreen,
} from "lucide-react";

import { useEffect, useState } from "react";

import type { MenuItem } from "@/types/MenuItemType";

import { Link, useNavigate } from "react-router-dom";
import API from "@/utils/axios";
import { Bounce, toast } from "react-toastify";
import { AlertDialogLogout } from "@/mock/AlertDialog-MockData";
import { DropdownMenu, Notification } from "../ui/dropdown";
import { SearchForm } from "../ui/search-form";
import { useSocket } from "@/hooks/useSocket";
import { useAuth } from "@/hooks/useAuth";

type props = {
  router?: string;
};

export const Header = ({ router }: props) => {
  const [notification, setNotifications] = useState<any>([]);
  const [listClass, setListClass] = useState<any>([]);
  const [theme, setTheme] = useState<string>(
    localStorage.getItem("theme") ?? "light"
  );

  const { user } = useAuth();
  const navigate = useNavigate();

  const getClassByStudent = async () => {
    try {
      const res = await API.get(
        `/classCourse/getClassCourseByStudent/${user?.username}`
      );
      setListClass(res.data.result.data);
    } catch (err: any) {
      console.log(err?.response?.data?.message);
    }
  };

  useSocket(
    user?.username ?? null,
    listClass.map((item: any) => item.MaLop),
    (data) => {
      setNotifications((prev: any) => [...prev, data]);
    toast(`${data.message}!`,{
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    }
  );

  useEffect(() => {
    localStorage.setItem("theme", theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  useEffect(() => {
    getClassByStudent();
  }, []);

  const AccountItems: MenuItem[] = [
    {
      label: "Information",
      icon: <CircleUser size={16} />,
      onClick: () =>
        navigate(`/${user?.role === "GV" ? "teacher" : "student"}/information`),
    },
    { label: "Setting", icon: <Settings size={16} /> },
    { label: "Help", icon: <HelpCircle size={16} /> },
    { separator: true },
    {
      label: "Logout",
      icon: <LogOut size={16} />,
      onClick: () => Logout(),
      dialog: AlertDialogLogout,
    },
  ];

  const Logout = async () => {
    try {
      await API.delete("/auth/logout");
      toast.success("Log out is success");
      localStorage.removeItem("username");
      localStorage.removeItem("role");
      navigate("/auth/login");
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  const handleSearch = () => {};

  const handleFullscreen = () => {
    const elem = document.documentElement; // toàn bộ trang

    if (!document.fullscreenElement) {
      elem.requestFullscreen().catch((err) => {
        console.error(`Lỗi khi bật fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div className="flex px-3 py-2 items-center justify-between">
      <div className="w-[40%] ms-4 md:flex gap-2 items-center hidden">
        <Button
          variant="transparent"
          size="ic"
          icon={<Fullscreen />}
          onClick={() => handleFullscreen()}
        />
        <div>
          <div className="flex gap-2 text-sm">
            {" "}
            {router && <Link to={`/classcourse/list`}>Class /</Link>}
            <strong>{router}</strong>
          </div>
        </div>
      </div>

      <div className="md:w-[30%] flex justify-end items-center gap-2">
        <SearchForm handleSearch={handleSearch} />
        {theme === "light" ? (
          <Button
            variant="icon"
            size="ic"
            icon={<Sun size={20} />}
            onClick={() => setTheme("dark")}
          />
        ) : (
          <Button
            variant="icon"
            size="ic"
            icon={<Moon size={20} />}
            onClick={() => setTheme("light")}
          />
        )}
        <Notification
          data={notification}
          trigger={
            <div className="relative">
              <Button variant="icon" size="ic" icon={<Bell size={20} />} />
              <div className="absolute -top-1 right-0 w-5 h-5 bg-rose-500 rounded-full text-sm text-white flex justify-center items-center">
                <p>{notification.length}</p>
              </div>
            </div>
          }
        />

        <DropdownMenu
          label="Account"
          side="bottom"
          align="end"
          trigger={
            <Button variant="icon" size="ic" icon={<User size={20} />} />
          }
          items={AccountItems}
          size="sm"
        />
      </div>
    </div>
  );
};
