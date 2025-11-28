import API from "@/utils/axios";
import { createContext, useState, useEffect } from "react";

interface AuthContextType {
  user: UserType | null;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
  loading: boolean;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

interface UserType {
  id: string;
  username: string;
  role: string;
}

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserType | null>(null); 
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.post("/auth/getUserInfo");
        setUser(res.data.user[0]);
        localStorage.setItem("username", res.data.user[0].username)
        localStorage.setItem("role", res.data.user[0].role)
      } catch (err) {
        setUser({ id: "", username: "", role: "" });
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
