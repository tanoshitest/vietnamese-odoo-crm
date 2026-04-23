import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { KpiCard } from "@/components/shared/KpiCard";
import { CheckCircle2, Circle, Clock, AlertCircle, Phone, FileText, MapPin, Calendar } from "lucide-react";

interface Task {
  id: string;
  title: string;
  customer: string;
  type: "call" | "quote" | "visit" | "followup";
  time: string;
  priority: "high" | "medium" | "low";
  done: boolean;
}

const INITIAL_TASKS: Task[] = [
  { id: "T1", title: "Gọi tư vấn báo giá ĐMT 5kW", customer: "Nguyễn Văn An", type: "call", time: "09:00", priority: "high", done: false },
  { id: "T2", title: "Gửi báo giá chi tiết qua Zalo", customer: "Trần Thị Bình", type: "quote", time: "10:30", priority: "high", done: false },
  { id: "T3", title: "Khảo sát thực tế lắp đặt", customer: "Lê Hoàng Cường", type: "visit", time: "14:00", priority: "high", done: false },
  { id: "T4", title: "Follow-up báo giá đã gửi 4 ngày", customer: "Võ Minh Đức", type: "followup", time: "15:30", priority: "medium", done: false },
  { id: "T5", title: "Xác nhận lịch lắp với khách", customer: "Phạm Thị Dung", type: "call", time: "16:00", priority: "medium", done: true },
  { id: "T6", title: "Cập nhật ghi chú CRM", customer: "Đặng Thu Hằng", type: "followup", time: "17:00", priority: "low", done: true },
];

const TYPE_META: Record<Task["type"], { label: string; icon: typeof Phone; color: string }> = {
  call: { label: "Gọi điện", icon: Phone, color: "bg-info/10 text-info border-info/30" },
  quote: { label: "Báo giá", icon: FileText, color: "bg-primary/10 text-primary border-primary/30" },
  visit: { label: "Khảo sát", icon: MapPin, color: "bg-warning/10 text-warning border-warning/30" },
  followup: { label: "Follow-up", icon: Calendar, color: "bg-source-tiktok/10 text-source-tiktok border-source-tiktok/30" },
};

const PRIORITY_DOT: Record<Task["priority"], string> = {
  high: "bg-destructive",
  medium: "bg-warning",
  low: "bg-muted-foreground",
};

const TasksPage = () => {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);

  const toggle = (id: string) => setTasks((t) => t.map((x) => (x.id === id ? { ...x, done: !x.done } : x)));

  const total = tasks.length;
  const done = tasks.filter((t) => t.done).length;
  const overdue = tasks.filter((t) => !t.done && parseInt(t.time) < 12).length;
  const pct = Math.round((done / total) * 100);

  return (
    <AppLayout requireRole="staff">
      <div className="p-6 space-y-5 max-w-[1600px] mx-auto">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Công việc hôm nay</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Thứ Tư, 23/04/2025</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <KpiCard label="Tổng task" value={String(total)} icon={Circle} accentColor="info" />
          <KpiCard label="Đã hoàn thành" value={String(done)} icon={CheckCircle2} accentColor="success" />
          <KpiCard label="Quá hạn" value={String(overdue)} icon={AlertCircle} accentColor="destructive" />
          <KpiCard label="Tỷ lệ" value={`${pct}%`} icon={Clock} accentColor="primary" />
        </div>

        {/* Progress bar */}
        <div className="odoo-card p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Tiến độ ngày</span>
            <span className="text-xs text-muted-foreground">{done}/{total} task</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
          </div>
        </div>

        {/* Task list grouped */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Pending */}
          <div className="odoo-card overflow-hidden">
            <div className="p-4 border-b border-border bg-muted/30">
              <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Circle className="w-4 h-4 text-warning" />
                Cần làm ({tasks.filter((t) => !t.done).length})
              </h2>
            </div>
            <div className="divide-y divide-border">
              {tasks.filter((t) => !t.done).map((t) => {
                const meta = TYPE_META[t.type];
                return (
                  <div key={t.id} className="p-3 hover:bg-muted/30 transition-colors flex items-start gap-3">
                    <button
                      onClick={() => toggle(t.id)}
                      className="w-5 h-5 mt-0.5 rounded-full border-2 border-border hover:border-primary flex items-center justify-center shrink-0 transition-colors"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`w-1.5 h-1.5 rounded-full ${PRIORITY_DOT[t.priority]}`} />
                        <span className="text-xs font-mono font-semibold text-primary">{t.time}</span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium border ${meta.color} flex items-center gap-1`}>
                          <meta.icon className="w-2.5 h-2.5" />
                          {meta.label}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-foreground">{t.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">Khách: {t.customer}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Done */}
          <div className="odoo-card overflow-hidden">
            <div className="p-4 border-b border-border bg-muted/30">
              <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-success" />
                Đã hoàn thành ({tasks.filter((t) => t.done).length})
              </h2>
            </div>
            <div className="divide-y divide-border">
              {tasks.filter((t) => t.done).map((t) => {
                const meta = TYPE_META[t.type];
                return (
                  <div key={t.id} className="p-3 hover:bg-muted/30 transition-colors flex items-start gap-3 opacity-60">
                    <button
                      onClick={() => toggle(t.id)}
                      className="w-5 h-5 mt-0.5 rounded-full bg-success border-2 border-success flex items-center justify-center shrink-0"
                    >
                      <CheckCircle2 className="w-3 h-3 text-white" strokeWidth={3} />
                    </button>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono text-muted-foreground">{t.time}</span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium border ${meta.color}`}>{meta.label}</span>
                      </div>
                      <p className="text-sm font-medium text-foreground line-through">{t.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">Khách: {t.customer}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default TasksPage;
