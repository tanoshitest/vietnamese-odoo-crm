import { Search, Bell, ChevronDown, LogOut, Zap } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const TopNavbar = () => {
  const { userName, role, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="h-14 bg-card border-b border-border flex items-center px-4 gap-4 sticky top-0 z-30">
      <div className="flex items-center gap-2 mr-2">
        <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
          <Zap className="w-4 h-4 text-primary-foreground" strokeWidth={2.5} />
        </div>
        <span className="font-semibold text-foreground hidden sm:inline">SolarEV CRM</span>
      </div>

      <div className="flex-1 max-w-xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Tìm kiếm..."
            className="w-full h-9 pl-9 pr-3 bg-muted/60 border border-transparent hover:border-border focus:border-primary focus:bg-card focus:outline-none rounded-md text-sm transition-all"
          />
        </div>
      </div>

      <button className="relative w-9 h-9 rounded-md hover:bg-muted flex items-center justify-center transition-colors">
        <Bell className="w-5 h-5 text-muted-foreground" />
        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full ring-2 ring-card animate-pulse-dot" />
      </button>

      <div className="relative">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex items-center gap-2 h-9 px-2 rounded-md hover:bg-muted transition-colors"
        >
          <div className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-semibold">
            {userName.split(" ").pop()?.[0]}
          </div>
          <div className="hidden md:block text-left">
            <p className="text-xs font-medium text-foreground leading-tight">{userName}</p>
            <p className="text-[10px] text-muted-foreground leading-tight">
              {role === "admin" ? "Quản lý" : "Nhân viên"}
            </p>
          </div>
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </button>

        {menuOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
            <div className="absolute right-0 top-11 w-48 bg-popover border border-border rounded-md shadow-[var(--shadow-card-hover)] z-50 animate-fade-in">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-muted rounded-md transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Đăng xuất
              </button>
            </div>
          </>
        )}
      </div>
    </header>
  );
};
