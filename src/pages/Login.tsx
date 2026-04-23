import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Shield, UserCog, Zap } from "lucide-react";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (role: "admin" | "staff") => {
    login(role);
    navigate(role === "admin" ? "/admin" : "/staff");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
      {/* Subtle bg pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
           style={{ backgroundImage: "radial-gradient(hsl(var(--primary)) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />

      <div className="w-full max-w-md relative">
        <div className="bg-card border border-border rounded-lg shadow-[var(--shadow-card-hover)] p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-11 h-11 rounded-md bg-primary flex items-center justify-center">
              <Zap className="w-6 h-6 text-primary-foreground" strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-foreground">SolarEV CRM</h1>
              <p className="text-xs text-muted-foreground">Hệ thống quản lý lắp đặt</p>
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-foreground mb-1">Đăng nhập</h2>
          <p className="text-sm text-muted-foreground mb-6">Chọn vai trò để truy cập hệ thống demo</p>

          <div className="space-y-3">
            <button
              onClick={() => handleLogin("admin")}
              className="w-full group flex items-center gap-3 p-4 rounded-md border border-border bg-card hover:border-primary hover:bg-primary-soft transition-all text-left"
            >
              <div className="w-10 h-10 rounded-md bg-primary/10 group-hover:bg-primary group-hover:text-primary-foreground flex items-center justify-center text-primary transition-colors">
                <Shield className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground">Đăng nhập quyền Quản lý (Admin)</p>
                <p className="text-xs text-muted-foreground">Truy cập toàn bộ dashboard & báo cáo</p>
              </div>
            </button>

            <button
              onClick={() => handleLogin("staff")}
              className="w-full group flex items-center gap-3 p-4 rounded-md border border-border bg-card hover:border-primary hover:bg-primary-soft transition-all text-left"
            >
              <div className="w-10 h-10 rounded-md bg-primary/10 group-hover:bg-primary group-hover:text-primary-foreground flex items-center justify-center text-primary transition-colors">
                <UserCog className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground">Đăng nhập quyền Nhân viên (Staff)</p>
                <p className="text-xs text-muted-foreground">Quản lý lead & công việc cá nhân</p>
              </div>
            </button>
          </div>

          <p className="text-xs text-muted-foreground text-center mt-6">
            Phiên bản demo · Không cần xác thực thật
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
