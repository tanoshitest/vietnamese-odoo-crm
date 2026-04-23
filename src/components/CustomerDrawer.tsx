import { Lead } from "@/types/crm";
import { SOURCE_CLASSES, SOURCE_LABELS, STATUS_LABELS } from "@/data/mockData";
import { X, Phone, MapPin, Calendar, User, DollarSign, Sparkles, Mail, MessageSquare, History, Info, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface Props {
  lead: Lead | null;
  onClose: () => void;
}

type Tab = "info" | "notes" | "ai";

export const CustomerDrawer = ({ lead, onClose }: Props) => {
  const [tab, setTab] = useState<Tab>("info");

  useEffect(() => {
    if (lead) setTab("info");
  }, [lead?.id]);

  if (!lead) return null;

  const urgencyClass = {
    high: "bg-destructive/10 text-destructive border-destructive/30",
    medium: "bg-warning/10 text-warning border-warning/30",
    low: "bg-success/10 text-success border-success/30",
  }[lead.aiAnalysis.urgency];

  const urgencyLabel = { high: "Khẩn cấp", medium: "Trung bình", low: "Bình thường" }[lead.aiAnalysis.urgency];

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-foreground/30 z-40 animate-fade-in"
        onClick={onClose}
      />

      {/* Drawer */}
      <aside className="fixed right-0 top-0 h-screen w-full sm:w-[480px] bg-card border-l border-border shadow-[var(--shadow-drawer)] z-50 flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="px-5 py-4 border-b border-border flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 min-w-0">
            <div className="w-11 h-11 rounded-md bg-primary text-primary-foreground flex items-center justify-center text-base font-semibold shrink-0">
              {lead.name.split(" ").pop()?.[0]}
            </div>
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-0.5">
                Chi Tiết Hồ Sơ Khách Hàng
              </p>
              <h2 className="text-lg font-semibold text-foreground truncate">{lead.name}</h2>
              <div className="flex items-center gap-2 mt-1">
                <span className={cn("text-[10px] px-1.5 py-0.5 rounded border font-medium", SOURCE_CLASSES[lead.source])}>
                  {SOURCE_LABELS[lead.source]}
                </span>
                <span className="text-[11px] px-1.5 py-0.5 rounded bg-primary-soft text-primary font-medium">
                  {STATUS_LABELS[lead.status]}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-md hover:bg-muted flex items-center justify-center text-muted-foreground transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick actions */}
        <div className="px-5 py-3 border-b border-border flex gap-2">
          <button className="flex-1 h-9 bg-primary hover:bg-primary-hover text-primary-foreground text-sm font-medium rounded-md flex items-center justify-center gap-1.5 transition-colors">
            <Phone className="w-4 h-4" /> Gọi
          </button>
          <button className="flex-1 h-9 border border-border hover:bg-muted text-foreground text-sm font-medium rounded-md flex items-center justify-center gap-1.5 transition-colors">
            <MessageSquare className="w-4 h-4" /> Nhắn tin
          </button>
          <button className="flex-1 h-9 border border-border hover:bg-muted text-foreground text-sm font-medium rounded-md flex items-center justify-center gap-1.5 transition-colors">
            <Mail className="w-4 h-4" /> Email
          </button>
        </div>

        {/* Tabs */}
        <div className="px-5 border-b border-border flex gap-1">
          {[
            { id: "info" as Tab, label: "Thông tin chung", icon: Info },
            { id: "notes" as Tab, label: "Ghi chú & Lịch sử", icon: History },
            { id: "ai" as Tab, label: "AI Phân Tích", icon: Sparkles },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={cn(
                "px-3 py-2.5 text-sm font-medium border-b-2 transition-colors flex items-center gap-1.5 -mb-px",
                tab === t.id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              <t.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{t.label}</span>
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="flex-1 overflow-y-auto p-5">
          {tab === "info" && (
            <div className="space-y-4">
              <InfoRow icon={Phone} label="Số điện thoại" value={lead.phone} />
              <InfoRow icon={MapPin} label="Khu vực" value={lead.area} />
              <InfoRow icon={Sparkles} label="Nhu cầu" value={lead.need} />
              <InfoRow icon={DollarSign} label="Giá trị dự kiến" value={`${lead.value.toLocaleString("vi-VN")} VNĐ`} />
              <InfoRow icon={User} label="Phụ trách" value={lead.assignedTo} />
              <InfoRow icon={Calendar} label="Ngày tạo" value={lead.createdAt} />
            </div>
          )}

          {tab === "notes" && (
            <div className="space-y-5">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Ghi chú</h3>
                <div className="space-y-2">
                  {lead.notes.length === 0 && (
                    <p className="text-sm text-muted-foreground italic">Chưa có ghi chú</p>
                  )}
                  {lead.notes.map((n, i) => (
                    <div key={i} className="p-3 rounded-md bg-muted/50 border border-border">
                      <p className="text-sm text-foreground">{n.content}</p>
                      <p className="text-[11px] text-muted-foreground mt-1.5">
                        {n.author} · {n.date}
                      </p>
                    </div>
                  ))}
                </div>
                <textarea
                  placeholder="Thêm ghi chú mới..."
                  className="w-full mt-3 p-3 text-sm border border-border rounded-md bg-card focus:outline-none focus:border-primary resize-none"
                  rows={2}
                />
              </div>

              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Lịch sử hoạt động</h3>
                <div className="space-y-3 relative">
                  <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border" />
                  {lead.history.map((h, i) => (
                    <div key={i} className="flex items-start gap-3 relative">
                      <div className="w-3.5 h-3.5 rounded-full bg-primary mt-1 ring-4 ring-card shrink-0" />
                      <div>
                        <p className="text-sm text-foreground">{h.action}</p>
                        <p className="text-[11px] text-muted-foreground">{h.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {tab === "ai" && (
            <div className="space-y-4">
              <div className={cn("p-4 rounded-md border-2", urgencyClass)}>
                <div className="flex items-center gap-2 mb-1">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-xs font-semibold uppercase tracking-wide">Mức độ ưu tiên</span>
                </div>
                <p className="text-lg font-semibold">{urgencyLabel}</p>
              </div>

              <div className="p-4 rounded-md bg-primary-soft border border-primary/20">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <h3 className="text-sm font-semibold text-foreground">Tóm tắt AI</h3>
                </div>
                <p className="text-sm text-foreground/90 leading-relaxed">{lead.aiAnalysis.summary}</p>
              </div>

              <div className="p-4 rounded-md bg-card border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare className="w-4 h-4 text-primary" />
                  <h3 className="text-sm font-semibold text-foreground">Phản hồi đề xuất</h3>
                </div>
                <p className="text-sm text-foreground/90 italic leading-relaxed mb-3">
                  "{lead.aiAnalysis.recommendedReply}"
                </p>
                <div className="flex gap-2">
                  <button className="flex-1 h-8 bg-primary hover:bg-primary-hover text-primary-foreground text-xs font-medium rounded-md transition-colors">
                    Sử dụng phản hồi
                  </button>
                  <button className="flex-1 h-8 border border-border hover:bg-muted text-foreground text-xs font-medium rounded-md transition-colors">
                    Tạo phản hồi khác
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

const InfoRow = ({ icon: Icon, label, value }: { icon: typeof Phone; label: string; value: string }) => (
  <div className="flex items-start gap-3">
    <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center shrink-0">
      <Icon className="w-4 h-4 text-muted-foreground" />
    </div>
    <div className="min-w-0 flex-1">
      <p className="text-[11px] text-muted-foreground uppercase tracking-wide font-medium">{label}</p>
      <p className="text-sm text-foreground font-medium mt-0.5 break-words">{value}</p>
    </div>
  </div>
);
