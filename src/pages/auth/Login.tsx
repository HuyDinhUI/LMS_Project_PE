import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import API from "@/utils/axios";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { AlertDanger } from "@/components/ui/alert";
import bg_dark from "@/assets/10139763.jpg";
import bg_light from "@/assets/v567-n-50-doodles.jpg";
import logo from "@/assets/logo_cat_black.svg";
import { useAuth } from "@/hooks/useAuth";
import { useSubmitLoading } from "@/hooks/useLoading";
import { LoadingOverlay } from "@/components/ui/loading-overlay";
import TextField from "@mui/material/TextField";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [error, setError] = useState<any>(undefined);
  const navigate = useNavigate();
  const theme = localStorage.getItem("theme") ?? "light";
  const { setUser } = useAuth();
  const { loading, withLoading } = useSubmitLoading();

  const submitLogin = async (data: any) => {
    withLoading(async () => {
      try {
        const res = await API.post("/auth/login", data);
        setUser(res.data);

        if (res.data.role === "GV") {
          navigate("/teacher/dashboard");
        }

        if (res.data.role === "admin") {
          navigate("/teachermanagement/listteacher");
        }

        if (res.data.role === "SV") {
          navigate("/student/dashboard");
        }
      } catch (error: any) {
        setError(error.response?.data?.message);
      }
    });
  };

  useEffect(() => {
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    document.title = "Login - LMS";
  }, []);

  return (
    <div
      className="h-[100vh] shadow-lg flex items-center justify-center bg-cover"
      style={
        theme === "dark"
          ? { backgroundImage: `url("${bg_dark}")` }
          : { backgroundImage: `url("${bg_light}")` }
      }
    >
      <LoadingOverlay show={loading} />
      <div className="w-100 min-h-[100px] rounded-xl bg-white/5 dark:bg-transparent dark:backdrop-blur-md dark:ring dark:ring-gray-500 shadow-md flex overflow-hidden">
        <form className="w-full p-5" onSubmit={handleSubmit(submitLogin)}>
          <div className="text-center mb-5 mt-4">
            <div className="flex justify-center items-center">
              <img width={50} src={logo} className="mb-8"></img>
              <h1 className="font-brand-logo text-4xl font-bold">eduCat</h1>
            </div>
          </div>
          {error && <AlertDanger title={error} />}
          <div className="flex flex-col gap-5 mb-5">
            <TextField
              error={errors.username ? true : false}
              {...register("username", { required: "" })}
              label="Username"
              helperText={errors.username ? "Incorrect entry." : ""}
              required
              aria-invalid={errors.username ? "true" : "false"}
              fullWidth
              size="small"
            />
            <TextField
              error={errors.password ? true : false}
              {...register("password", { required: "" })}
              type="password"
              label="Password"
              helperText={errors.password ? "Incorrect entry." : ""}
              required
              aria-invalid={errors.password ? "true" : "false"}
              fullWidth
              size="small"
            />
          </div>
          <Button
            type="submit"
            className="w-full justify-center rounded-sm"
            size="md"
            title="Login"
            variant="primary"
          />
          <Link to={"/auth/forgot"} className="mt-4 block text-center text-sm">
            Forgot password?
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
