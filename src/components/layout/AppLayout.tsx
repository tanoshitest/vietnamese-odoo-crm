import { ReactNode } from "react";
import { TopNavbar } from "./TopNavbar";
import { Sidebar } from "./Sidebar";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

interface Props {
  children: ReactNode;
  requireRole: "admin" | "staff";
}

export const AppLayout = ({ children, requireRole }: Props) => {
  const { role } = useAuth();

  if (!role) return <Navigate to="/" replace />;
  if (role !== requireRole) return <Navigate to={role === "admin" ? "/admin" : "/staff"} replace />;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <TopNavbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 min-w-0 overflow-x-hidden">{children}</main>
      </div>
    </div>
  );
};
