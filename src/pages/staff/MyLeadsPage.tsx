import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { CustomerDrawer } from "@/components/CustomerDrawer";
import { MOCK_LEADS, SOURCE_LABELS, SOURCE_CLASSES, STATUS_LABELS } from "@/data/mockData";
import { Lead } from "@/types/crm";
import { Search, Phone, MapPin, MessageSquare, Calendar, Flame } from "lucide-react";

const MyLeadsPage = () => {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [filter, setFilter] = useState<"all" | "hot" | "today">("all");

  // Mock: leads của Trần Minh Tú
  const myLeads = MOCK_LEADS.filter((l) => l.assignedTo === "Trần Minh Tú" || l.assignedTo === "Phạm Thu Hà");

  const filtered = myLeads.filter((l) => {
    if (filter === "hot") return l.aiAnalysis.urgency === "high";
    if (filter === "today") return l.status === "new" || l.status === "consulting";
    return true;
  });

  const statusBadge: Record<string, string> = {
    new: "bg-info/10 text-info border-info/30",
    consulting: "bg-warning/10 text-warning border-warning/30",
    quoted: "bg-primary/10 text-primary border-primary/30",
    installing: "bg-source-tiktok/10 text-source-tiktok border-source-tiktok/30",
    completed: "bg-success/10 text-success border-success/30",
  };

  return (
    <AppLayout requireRole="staff">
      <div className="p-6 space-y-5 max-w-[1600px] mx-auto">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Lead của tôi</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Bạn đang phụ trách {myLeads.length} lead</p>
        </div>

        {/* Filter tabs */}
        <div className="flex items-center gap-2 flex-wrap">
          {[
            { id: "all", label: `Tất cả (${myLeads.length})` },
            { id: "hot", label: `🔥 Lead nóng (${myLeads.filter((l) => l.aiAnalysis.urgency === "high").length})` },
            { id: "today", label: `Cần xử lý hôm nay (${myLeads.filter((l) => l.status === "new" || l.status === "consulting").length})` },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setFilter(t.id as typeof filter)}
              className={`h-8 px-3 text-xs font-medium rounded-md border transition-colors ${
                filter === t.id
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card text-foreground border-border hover:bg-muted"
              }`}
            >
              {t.label}
            </button>
          ))}
          <div className="relative ml-auto min-w-[200px]">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              placeholder="Tìm lead..."
              className="w-full h-8 pl-8 pr-3 text-xs border border-border rounded-md bg-card focus:outline-none focus:border-primary"
            />
          </div>
        </div>

        {/* Lead cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          {filtered.map((l) => (
            <div
              key={l.id}
              onClick={() => setSelectedLead(l)}
              className="odoo-card p-4 cursor-pointer hover:border-primary transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-9 h-9 rounded-full bg-primary-soft text-primary flex items-center justify-center text-sm font-semibold shrink-0">
                    {l.name.split(" ").pop()?.[0]}
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-foreground truncate">{l.name}</div>
                    <div className="text-xs text-muted-foreground font-mono">{l.id}</div>
                  </div>
                </div>
                {l.aiAnalysis.urgency === "high" && (
                  <span className="flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded font-semibold bg-destructive/10 text-destructive border border-destructive/30 shrink-0">
                    <Flame className="w-3 h-3" /> Nóng
                  </span>
                )}
              </div>

              <p className="text-sm text-foreground font-medium mb-2 line-clamp-1">{l.need}</p>

              <div className="space-y-1 text-xs text-muted-foreground mb-3">
                <div className="flex items-center gap-1.5"><Phone className="w-3 h-3" />{l.phone}</div>
                <div className="flex items-center gap-1.5"><MapPin className="w-3 h-3" />{l.area}</div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-border">
                <div className="flex items-center gap-1.5">
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium border ${SOURCE_CLASSES[l.source]}`}>
                    {SOURCE_LABELS[l.source]}
                  </span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium border ${statusBadge[l.status]}`}>
                    {STATUS_LABELS[l.status]}
                  </span>
                </div>
                <span className="text-xs font-semibold text-primary">{(l.value / 1000000).toFixed(0)}tr</span>
              </div>

              <div className="flex gap-1 mt-3">
                <button onClick={(e) => e.stopPropagation()} className="flex-1 h-7 text-[11px] border border-border rounded hover:bg-muted flex items-center justify-center gap-1 text-foreground">
                  <Phone className="w-3 h-3" /> Gọi
                </button>
                <button onClick={(e) => e.stopPropagation()} className="flex-1 h-7 text-[11px] border border-border rounded hover:bg-muted flex items-center justify-center gap-1 text-foreground">
                  <MessageSquare className="w-3 h-3" /> Nhắn
                </button>
                <button onClick={(e) => e.stopPropagation()} className="flex-1 h-7 text-[11px] border border-border rounded hover:bg-muted flex items-center justify-center gap-1 text-foreground">
                  <Calendar className="w-3 h-3" /> Hẹn
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <CustomerDrawer lead={selectedLead} onClose={() => setSelectedLead(null)} />
    </AppLayout>
  );
};

export default MyLeadsPage;
