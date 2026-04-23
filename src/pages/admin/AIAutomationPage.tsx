import { AppLayout } from "@/components/layout/AppLayout";
import { KpiCard } from "@/components/shared/KpiCard";
import { Sparkles, MessageSquare, Bot, Zap, Play, Pause, Settings2 } from "lucide-react";

const WORKFLOWS = [
  { name: "Auto-reply Lead Facebook", desc: "Trả lời tin nhắn mới trong 30s, thu thập SĐT", runs: 142, success: 96, active: true },
  { name: "Phân loại Lead nóng/lạnh", desc: "AI phân tích từ khóa & ý định khách hàng", runs: 340, success: 92, active: true },
  { name: "Nhắc follow-up báo giá", desc: "Gửi nhắc nhở Sales sau 48h chưa phản hồi", runs: 87, success: 100, active: true },
  { name: "Tóm tắt cuộc gọi", desc: "Chuyển đổi voice → text → tóm tắt nội dung", runs: 56, success: 89, active: false },
  { name: "Đề xuất sản phẩm cross-sell", desc: "Gợi ý pin lưu trữ cho khách đã lắp ĐMT", runs: 23, success: 78, active: true },
];

const AI_LOGS = [
  { time: "14:32", agent: "Lead Bot", action: "Đã trả lời tin nhắn từ Nguyễn Văn An (Facebook)", status: "ok" },
  { time: "14:28", agent: "Hot Lead AI", action: "Phân loại Lê Hoàng Cường: 🔥 Hot Lead - chuyển Sales Lead", status: "ok" },
  { time: "14:15", agent: "Follow-up Bot", action: "Gửi nhắc nhở Nguyễn Văn Khoa: 3 báo giá quá hạn", status: "warn" },
  { time: "13:50", agent: "Voice AI", action: "Lỗi chuyển đổi cuộc gọi #C-2401 - audio quá nhỏ", status: "error" },
  { time: "13:42", agent: "Lead Bot", action: "Thu thập SĐT thành công từ TikTok comment", status: "ok" },
];

const STATUS_DOT: Record<string, string> = {
  ok: "bg-success",
  warn: "bg-warning",
  error: "bg-destructive",
};

const AIAutomationPage = () => (
  <AppLayout requireRole="admin">
    <div className="p-6 space-y-5 max-w-[1600px] mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            AI Tự động hóa
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">Quản lý các luồng tự động hóa và AI Agent</p>
        </div>
        <button className="h-9 px-3 text-sm bg-primary text-primary-foreground rounded-md hover:bg-[hsl(var(--primary-hover))] flex items-center gap-1.5">
          <Sparkles className="w-4 h-4" /> Tạo Workflow mới
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard label="Workflow đang chạy" value="12" icon={Zap} trend={{ value: "+2", up: true }} accentColor="primary" />
        <KpiCard label="Tin nhắn AI xử lý" value="1,248" icon={MessageSquare} trend={{ value: "+34%", up: true }} accentColor="info" />
        <KpiCard label="Lead AI phân loại" value="340" icon={Bot} trend={{ value: "+12%", up: true }} accentColor="success" />
        <KpiCard label="Tỷ lệ thành công" value="93%" icon={Sparkles} trend={{ value: "+2%", up: true }} accentColor="warning" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Workflows */}
        <div className="lg:col-span-2 odoo-card overflow-hidden">
          <div className="p-5 border-b border-border">
            <h2 className="text-sm font-semibold text-foreground">Luồng tự động hóa</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Bật/tắt các workflow AI đang hoạt động</p>
          </div>
          <div className="divide-y divide-border">
            {WORKFLOWS.map((w) => (
              <div key={w.name} className="p-4 hover:bg-muted/30 transition-colors flex items-start gap-3">
                <div className={`w-9 h-9 rounded-md flex items-center justify-center shrink-0 ${
                  w.active ? "bg-primary-soft text-primary" : "bg-muted text-muted-foreground"
                }`}>
                  <Bot className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-sm font-medium text-foreground">{w.name}</span>
                    {w.active ? (
                      <span className="text-[10px] px-1.5 py-0.5 rounded font-medium bg-success/10 text-success border border-success/30">Đang chạy</span>
                    ) : (
                      <span className="text-[10px] px-1.5 py-0.5 rounded font-medium bg-muted text-muted-foreground border border-border">Tạm dừng</span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{w.desc}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                    <span>Đã chạy: <strong className="text-foreground">{w.runs}</strong> lần</span>
                    <span>Thành công: <strong className="text-success">{w.success}%</strong></span>
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button className="w-8 h-8 rounded hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-primary">
                    {w.active ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                  <button className="w-8 h-8 rounded hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-primary">
                    <Settings2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity log */}
        <div className="odoo-card p-5">
          <h2 className="text-sm font-semibold text-foreground mb-4">Hoạt động AI gần đây</h2>
          <div className="space-y-3">
            {AI_LOGS.map((l, i) => (
              <div key={i} className="flex gap-3 pb-3 border-b border-border last:border-0 last:pb-0">
                <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${STATUS_DOT[l.status]}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-xs font-mono text-muted-foreground">{l.time}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary-soft text-primary font-medium">{l.agent}</span>
                  </div>
                  <p className="text-xs text-foreground leading-relaxed">{l.action}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
);

export default AIAutomationPage;
