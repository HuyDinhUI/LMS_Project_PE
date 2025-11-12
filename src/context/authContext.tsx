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
  const [user, setUser] = useState<UserType | null>(null); // {id, email, role, name, ...}
  const [loading, setLoading] = useState<boolean>(true);

  // Khi app load lần đầu → tự động lấy thông tin user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.post("/auth/getUserInfo");
        setUser(res.data.user[0]); // { id, email, role, ... }
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
