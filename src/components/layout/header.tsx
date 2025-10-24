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
} from "lucide-react";

import { useEffect, useState } from "react";

import type { MenuItem } from "@/types/MenuItemType";

import { useNavigate } from "react-router-dom";
import API from "@/utils/axios";
import { toast } from "react-toastify";
import { AlertDialogLogout } from "@/mock/AlertDialog-MockData";
import { DropdownMenu } from "../ui/dropdown";

export const Header = () => {
  const [theme, setTheme] = useState<string>(
    localStorage.getItem("theme") ?? "light"
  );
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("theme", theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const AccountItems: MenuItem[] = [
    {
      label: "Information",
      icon: <CircleUser size={16} />,
      onClick: () =>
        navigate(`/${role === "GV" ? "teacher" : "student"}/information`),
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
      const res = await API.delete("/auth/logout");
      toast.success("Log out is success");
      localStorage.removeItem("username");
      localStorage.removeItem("role");
      navigate("/auth/login");
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="flex px-3 py-2 items-center justify-between">
      <div className="w-[20%] ms-4">
        
      </div>

      <div className="w-[25%] flex justify-end items-center gap-2">
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
        <Button variant="icon" size="ic" icon={<Bell size={20} />} />
        <DropdownMenu
          label="Account"
          side="bottom"
          align="end"
          trigger={
            <Button variant="icon" size="ic" icon={<User size={20} />} />
          }
          items={AccountItems}
          size="md"
        />
      </div>
    </div>
  );
};
