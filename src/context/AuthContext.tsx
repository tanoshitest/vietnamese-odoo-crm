import { createContext, useContext, useState, ReactNode } from "react";
import { UserRole } from "@/types/crm";

interface AuthContextType {
  role: UserRole;
  userName: string;
  login: (role: "admin" | "staff") => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState<UserRole>(null);
  const [userName, setUserName] = useState("");

  const login = (r: "admin" | "staff") => {
    setRole(r);
    setUserName(r === "admin" ? "Lê Quản Lý" : "Trần Minh Tú");
  };

  const logout = () => {
    setRole(null);
    setUserName("");
  };

  return <AuthContext.Provider value={{ role, userName, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
