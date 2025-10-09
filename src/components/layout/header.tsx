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
} from "lucide-react";

import { useEffect, useState } from "react";

import type { MenuItem } from "@/types/MenuItemType";

import { useNavigate } from "react-router-dom";
import API from "@/utils/axios";
import { toast } from "react-toastify";
import { AlertDialogLogout } from "@/mock/AlertDialog-MockData";
import { DropdownMenu } from "../ui/dropdown";
import logo from "@/assets/logo_lms.webp"

export const Header = () => {
  const [theme, setTheme] = useState<string>(
    localStorage.getItem("theme") ?? "light"
  );
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
    
    { label: "Settings", icon: <Settings size={16} /> },
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
      navigate("/auth/login");
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="flex px-3 py-2 items-center">
      <div className="w-[20%] ms-4">
        <Menu />
      </div>

      <div className="flex-1 flex justify-center items-center">
        <img width={50} src={logo}></img>
        
      </div>

      <div className="w-[25%] flex justify-end items-center">
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
        <Button variant="icon" size="ic" icon={<HelpCircle size={20} />} />
        <DropdownMenu
          label="Account"
          side="bottom"
          align="end"
          trigger={<Button variant="icon" size="ic" icon={<User size={20}/>}/>}
          items={AccountItems}
          size="md"
        />
      </div>
    </div>
  );
};
