import { AppLayout } from "@/components/layout/AppLayout";
import { KpiCard } from "@/components/shared/KpiCard";
import { HardHat, CheckCircle2, Clock, Wrench, MapPin, Calendar, User } from "lucide-react";

const PROJECTS = [
  { id: "DA-1024", customer: "Bùi Quang Huy", item: "ĐMT 6kW", area: "Long An", team: "Đội KT-01", progress: 60, deadline: "28/04/2025", status: "Đang thi công" },
  { id: "DA-1025", customer: "Lý Thị Kim", item: "Sạc EV 7kW", area: "Q.9, TP.HCM", team: "Đội KT-02", progress: 30, deadline: "25/04/2025", status: "Đang thi công" },
  { id: "DA-1026", customer: "Đặng Thu Hằng", item: "Trạm sạc 4 trụ", area: "Q.1, TP.HCM", team: "Đội KT-01", progress: 10, deadline: "15/05/2025", status: "Khảo sát" },
  { id: "DA-1027", customer: "Hoàng Văn Long", item: "ĐMT 12kW", area: "Vũng Tàu", team: "Đội KT-01", progress: 100, deadline: "20/04/2025", status: "Hoàn thành" },
  { id: "DA-1028", customer: "Mai Thị Nhung", item: "ĐMT 4kW", area: "Bình Thạnh", team: "Đội KT-02", progress: 100, deadline: "18/04/2025", status: "Hoàn thành" },
];

const STATUS_COLORS: Record<string, string> = {
  "Khảo sát": "bg-info/10 text-info border-info/30",
  "Đang thi công": "bg-warning/10 text-warning border-warning/30",
  "Hoàn thành": "bg-success/10 text-success border-success/30",
};

const SCHEDULE = [
  { time: "08:00", team: "Đội KT-01", task: "Lắp inverter - Bùi Quang Huy", area: "Long An" },
  { time: "10:30", team: "Đội KT-02", task: "Khảo sát - Phạm Thị Dung", area: "Q.2, TP.HCM" },
  { time: "13:00", team: "Đội KT-01", task: "Đấu nối lưới - Lê Hoàng Cường", area: "Bình Dương" },
  { time: "15:30", team: "Đội KT-02", task: "Bảo trì định kỳ - KH cũ", area: "Thủ Đức" },
];

const InstallationPage = () => (
  <AppLayout requireRole="admin">
    <div className="p-6 space-y-5 max-w-[1600px] mx-auto">
      <div>
        <h1 className="text-xl font-semibold text-foreground">Lắp đặt & Thi công</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Quản lý tiến độ dự án và lịch thi công</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard label="Dự án đang thi công" value="18" icon={HardHat} trend={{ value: "+3", up: true }} accentColor="info" />
        <KpiCard label="Hoàn thành tháng" value="22" icon={CheckCircle2} trend={{ value: "+8", up: true }} accentColor="success" />
        <KpiCard label="Trễ tiến độ" value="2" icon={Clock} trend={{ value: "-1", up: false }} accentColor="destructive" />
        <KpiCard label="Bảo trì định kỳ" value="11" icon={Wrench} trend={{ value: "+2", up: true }} accentColor="warning" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Project list */}
        <div className="lg:col-span-2 odoo-card overflow-hidden">
          <div className="p-5 border-b border-border">
            <h2 className="text-sm font-semibold text-foreground">Danh sách dự án</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Theo dõi tiến độ thi công thực tế</p>
          </div>
          <div className="divide-y divide-border">
            {PROJECTS.map((p) => (
              <div key={p.id} className="p-4 hover:bg-muted/30 transition-colors cursor-pointer">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono text-primary font-medium">{p.id}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium border ${STATUS_COLORS[p.status]}`}>{p.status}</span>
                    </div>
                    <div className="text-sm font-medium text-foreground">{p.customer} - {p.item}</div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{p.area}</span>
                      <span className="flex items-center gap-1"><User className="w-3 h-3" />{p.team}</span>
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />Hạn: {p.deadline}</span>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-foreground shrink-0">{p.progress}%</span>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      p.progress === 100 ? "bg-success" : p.progress > 50 ? "bg-warning" : "bg-info"
                    }`}
                    style={{ width: `${p.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Schedule today */}
        <div className="odoo-card p-5">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-4 h-4 text-primary" />
            <h2 className="text-sm font-semibold text-foreground">Lịch thi công hôm nay</h2>
          </div>
          <div className="space-y-3">
            {SCHEDULE.map((s, i) => (
              <div key={i} className="flex gap-3">
                <div className="text-xs font-mono font-semibold text-primary w-12 shrink-0 pt-0.5">{s.time}</div>
                <div className="flex-1 min-w-0 pb-3 border-b border-border last:border-0">
                  <div className="text-sm font-medium text-foreground">{s.task}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{s.team} · {s.area}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
);

export default InstallationPage;
