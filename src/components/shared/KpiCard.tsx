import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface KpiCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  trend?: { value: string; up: boolean };
  accentColor?: string;
}

export const KpiCard = ({ label, value, icon: Icon, trend, accentColor = "primary" }: KpiCardProps) => {
  const accentMap: Record<string, string> = {
    primary: "bg-primary/10 text-primary",
    success: "bg-success/10 text-success",
    warning: "bg-warning/10 text-warning",
    destructive: "bg-destructive/10 text-destructive",
    info: "bg-info/10 text-info",
  };

  return (
    <div className="kpi-card">
      <div className="flex items-start justify-between mb-3">
        <div className={cn("w-10 h-10 rounded-md flex items-center justify-center", accentMap[accentColor])}>
          <Icon className="w-5 h-5" />
        </div>
        {trend && (
          <div className={cn("flex items-center gap-1 text-xs font-medium", trend.up ? "text-success" : "text-destructive")}>
            {trend.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {trend.value}
          </div>
        )}
      </div>
      <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">{label}</p>
      <p className="text-2xl font-semibold text-foreground mt-1">{value}</p>
    </div>
  );
};
