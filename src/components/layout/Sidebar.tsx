import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard, Users, ShoppingCart, HardHat, Sparkles, Settings,
  Briefcase, UserCheck, CalendarCheck, CalendarDays, ChevronLeft, ChevronRight,
  LucideIcon,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface MenuItem { to: string; label: string; icon: LucideIcon }

const ADMIN_MENU: MenuItem[] = [
  { to: "/admin", label: "Bảng điều khiển", icon: LayoutDashboard },
  { to: "/admin/crm", label: "CRM", icon: Users },
  { to: "/admin/sales", label: "Bán hàng", icon: ShoppingCart },
  { to: "/admin/installation", label: "Lắp đặt & Thi công", icon: HardHat },
  { to: "/admin/ai", label: "AI Tự động hóa", icon: Sparkles },
  { to: "/admin/settings", label: "Cài đặt", icon: Settings },
];

const STAFF_MENU: MenuItem[] = [
  { to: "/staff", label: "Không gian làm việc", icon: Briefcase },
  { to: "/staff/leads", label: "Lead của tôi", icon: UserCheck },
  { to: "/staff/tasks", label: "Công việc hôm nay", icon: CalendarCheck },
  { to: "/staff/schedule", label: "Lịch trình", icon: CalendarDays },
];

export const Sidebar = () => {
  const { role } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const menu = role === "admin" ? ADMIN_MENU : STAFF_MENU;

  return (
    <aside
      className={cn(
        "bg-sidebar text-sidebar-foreground flex flex-col border-r border-sidebar-border transition-all duration-200 sticky top-14 h-[calc(100vh-3.5rem)] z-20",
        collapsed ? "w-14" : "w-60"
      )}
    >
      <div className={cn("px-3 py-4 flex items-center", collapsed ? "justify-center" : "justify-between")}>
        {!collapsed && (
          <span className="text-[11px] font-semibold uppercase tracking-wider text-sidebar-foreground/60">
            {role === "admin" ? "Quản trị" : "Cá nhân"}
          </span>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-6 h-6 rounded hover:bg-sidebar-accent flex items-center justify-center text-sidebar-foreground/70 hover:text-sidebar-foreground transition-colors"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      <nav className="flex-1 px-2 space-y-0.5 overflow-y-auto">
        {menu.map((item) => {
          const active = location.pathname === item.to;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end
              className={cn(
                "flex items-center gap-3 px-2.5 py-2 rounded-md text-sm transition-colors group relative",
                active
                  ? "bg-primary text-primary-foreground font-medium"
                  : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground"
              )}
              title={collapsed ? item.label : undefined}
            >
              <item.icon className="w-[18px] h-[18px] shrink-0" />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>

      <div className={cn("p-3 border-t border-sidebar-border text-[10px] text-sidebar-foreground/50", collapsed && "text-center")}>
        {collapsed ? "v1.0" : "SolarEV CRM v1.0"}
      </div>
    </aside>
  );
};
