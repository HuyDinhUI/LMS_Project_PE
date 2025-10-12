import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";

import API from "@/utils/axios";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AlertDanger } from "@/components/ui/alert";
import bg_dark from "@/assets/10139763.jpg"
import bg_light from "@/assets/7402282.jpg"
import logo from "@/assets/logo_lms.webp"

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [error, setError] = useState<any>(undefined)
  const navigate = useNavigate();
  const theme = localStorage.getItem('theme') ?? 'light'


  const submitLogin = async (data: any) => {
    console.log(data)
    try {
      const res = await API.post('/auth/login', data)
      if (res.data.role === "GV") {
        navigate('/teacher/dashboard')
      }

      if (res.data.role === "admin") {
        navigate('/teachermanagement/listteacher')
      }

      if (res.data.role === "SV") {
        navigate('/student/dashboard')
      }
    }
    catch (error: any) {
      setError(error.response?.data?.message)
    }

  };

  return (
    <div 
    className="h-[100vh] shadow-lg flex items-center justify-center bg-cover"
    style={theme === 'dark' ? {backgroundImage:`url("${bg_dark}")`}:{backgroundImage:`url("${bg_light}")`}}>
      <div className="w-100 min-h-[100px] rounded-xl bg-white dark:bg-transparent dark:backdrop-blur-md dark:ring dark:ring-gray-500 shadow-md flex overflow-hidden">
        <form className="w-full p-5" onSubmit={handleSubmit(submitLogin)}>
          <div className="text-center mb-5">
            <div className="flex justify-center">
              <img width={100} src={logo}></img>
            </div>
            <p className="font-light m-0">Learning Management System</p>
          </div>
          {error && <AlertDanger title={error} />}
          <div className="mt-10">
            <div className="grid gap-2 mb-5">
              <label>Username</label>
              <Input
                type="username"
                placeholder="01001234"
                {...register("username", { required: "Email cannot be blank" })} />
            </div>
            <div className="grid gap-2 mb-5 relative">
              <label>Password</label>
              <Input
                required
                type="password"
                {...register("password", { required: "Password cannot be blank" })} />
              <Link className="absolute top-0 right-0" to={'/restpassword'}>Quên mật khẩu ?</Link>
            </div>
          </div>
          <Button type="submit" className="w-full justify-center rounded-sm" variant="dark" size="md" title="Login" />
          
        </form>
        
      </div>
    </div>
  );
};

export default Login;
