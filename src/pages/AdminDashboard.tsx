import { Users, HardHat, PhoneMissed, DollarSign, AlertTriangle } from "lucide-react";
import { KpiCard } from "@/components/shared/KpiCard";
import { LEAD_SOURCE_STATS, URGENT_AI_TICKETS, STAFF_WORKLOAD } from "@/data/mockData";
import { AppLayout } from "@/components/layout/AppLayout";

const AdminDashboard = () => {
  const maxCount = Math.max(...LEAD_SOURCE_STATS.map((s) => s.count));

  return (
    <AppLayout requireRole="admin">
      <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Bảng điều khiển</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Tổng quan hoạt động kinh doanh tháng 04/2025</p>
        </div>

        {/* KPI Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard label="Tổng Lead tháng này" value="340" icon={Users} trend={{ value: "+12%", up: true }} accentColor="primary" />
          <KpiCard label="Dự án đang thi công" value="18" icon={HardHat} trend={{ value: "+3", up: true }} accentColor="info" />
          <KpiCard label="Cuộc gọi nhỡ" value="7" icon={PhoneMissed} trend={{ value: "-2", up: false }} accentColor="destructive" />
          <KpiCard label="Doanh thu dự kiến" value="2.4 tỷ" icon={DollarSign} trend={{ value: "+18%", up: true }} accentColor="success" />
        </div>

        {/* Middle: Bar chart + AI tickets */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 odoo-card p-5">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-sm font-semibold text-foreground">Phân tích Nguồn Lead</h2>
                <p className="text-xs text-muted-foreground mt-0.5">Tổng 340 lead trong tháng</p>
              </div>
              <select className="text-xs h-8 px-2 border border-border rounded-md bg-card focus:outline-none focus:border-primary">
                <option>Tháng này</option>
                <option>Quý này</option>
                <option>Năm nay</option>
              </select>
            </div>

            <div className="space-y-3">
              {LEAD_SOURCE_STATS.map((s) => (
                <div key={s.source}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm text-foreground font-medium">{s.source}</span>
                    <span className="text-xs text-muted-foreground">
                      {s.count} lead · {s.percent}%
                    </span>
                  </div>
                  <div className="h-7 bg-muted/60 rounded-md overflow-hidden">
                    <div
                      className="h-full rounded-md transition-all duration-700 flex items-center justify-end px-2"
                      style={{ width: `${(s.count / maxCount) * 100}%`, backgroundColor: s.color }}
                    >
                      <span className="text-[10px] text-white font-semibold">{s.count}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="odoo-card p-5">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-4 h-4 text-destructive" />
              <h2 className="text-sm font-semibold text-foreground">Ticket AI Cần Xử Lý Gấp</h2>
            </div>
            <div className="space-y-2">
              {URGENT_AI_TICKETS.map((t) => (
                <div key={t.id} className="p-3 rounded-md border border-border hover:border-primary hover:bg-primary-soft/40 cursor-pointer transition-all">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-mono text-muted-foreground">{t.id}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                      t.urgency === "high" ? "bg-destructive/10 text-destructive" : "bg-warning/10 text-warning"
                    }`}>
                      {t.urgency === "high" ? "Khẩn" : "Cao"}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-foreground">{t.customer}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{t.issue}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Staff Workload Table */}
        <div className="odoo-card overflow-hidden">
          <div className="p-5 border-b border-border">
            <h2 className="text-sm font-semibold text-foreground">Khối lượng công việc nhân sự</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Phân bổ lead và dự án theo từng nhân viên</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 border-b border-border">
                <tr>
                  <th className="text-left px-5 py-2.5 font-medium text-muted-foreground text-xs uppercase tracking-wide">Nhân viên</th>
                  <th className="text-left px-5 py-2.5 font-medium text-muted-foreground text-xs uppercase tracking-wide">Vai trò</th>
                  <th className="text-right px-5 py-2.5 font-medium text-muted-foreground text-xs uppercase tracking-wide">Lead phụ trách</th>
                  <th className="text-right px-5 py-2.5 font-medium text-muted-foreground text-xs uppercase tracking-wide">Đã chốt</th>
                  <th className="text-left px-5 py-2.5 font-medium text-muted-foreground text-xs uppercase tracking-wide w-64">Tỷ lệ hoàn thành</th>
                </tr>
              </thead>
              <tbody>
                {STAFF_WORKLOAD.map((s) => (
                  <tr key={s.name} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-semibold">
                          {s.name.split(" ").pop()?.[0]}
                        </div>
                        <span className="font-medium text-foreground">{s.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-muted-foreground">{s.role}</td>
                    <td className="px-5 py-3 text-right font-medium text-foreground">{s.leads}</td>
                    <td className="px-5 py-3 text-right font-medium text-foreground">{s.deals}</td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full transition-all duration-500"
                            style={{ width: `${s.completion}%` }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground w-10 text-right">{s.completion}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default AdminDashboard;
