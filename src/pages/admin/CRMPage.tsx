import { AppLayout } from "@/components/layout/AppLayout";
import { MOCK_LEADS, SOURCE_LABELS, SOURCE_CLASSES, STATUS_LABELS } from "@/data/mockData";
import { Search, Filter, Download, Plus, Phone, MapPin } from "lucide-react";

const CRMPage = () => {
  const statusBadge: Record<string, string> = {
    new: "bg-info/10 text-info border-info/30",
    consulting: "bg-warning/10 text-warning border-warning/30",
    quoted: "bg-primary/10 text-primary border-primary/30",
    installing: "bg-source-tiktok/10 text-source-tiktok border-source-tiktok/30",
    completed: "bg-success/10 text-success border-success/30",
  };

  return (
    <AppLayout requireRole="admin">
      <div className="p-6 space-y-5 max-w-[1600px] mx-auto">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-xl font-semibold text-foreground">CRM - Quản lý Khách hàng</h1>
            <p className="text-sm text-muted-foreground mt-0.5">Tổng cộng {MOCK_LEADS.length} lead trong hệ thống</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="h-9 px-3 text-sm border border-border rounded-md bg-card hover:bg-muted flex items-center gap-1.5 text-foreground">
              <Download className="w-4 h-4" /> Xuất Excel
            </button>
            <button className="h-9 px-3 text-sm bg-primary text-primary-foreground rounded-md hover:bg-[hsl(var(--primary-hover))] flex items-center gap-1.5">
              <Plus className="w-4 h-4" /> Tạo Lead Mới
            </button>
          </div>
        </div>

        {/* Filter bar */}
        <div className="odoo-card p-3 flex items-center gap-3 flex-wrap">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              placeholder="Tìm theo tên, SĐT, khu vực..."
              className="w-full h-9 pl-8 pr-3 text-sm border border-border rounded-md bg-card focus:outline-none focus:border-primary"
            />
          </div>
          <select className="h-9 px-2 text-sm border border-border rounded-md bg-card">
            <option>Tất cả trạng thái</option>
            {Object.values(STATUS_LABELS).map((s) => <option key={s}>{s}</option>)}
          </select>
          <select className="h-9 px-2 text-sm border border-border rounded-md bg-card">
            <option>Tất cả nguồn</option>
            {Object.values(SOURCE_LABELS).map((s) => <option key={s}>{s}</option>)}
          </select>
          <button className="h-9 px-3 text-sm border border-border rounded-md bg-card hover:bg-muted flex items-center gap-1.5 text-foreground">
            <Filter className="w-4 h-4" /> Bộ lọc nâng cao
          </button>
        </div>

        {/* Table */}
        <div className="odoo-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 border-b border-border">
                <tr>
                  <th className="text-left px-4 py-2.5 font-medium text-muted-foreground text-xs uppercase tracking-wide">Khách hàng</th>
                  <th className="text-left px-4 py-2.5 font-medium text-muted-foreground text-xs uppercase tracking-wide">Liên hệ</th>
                  <th className="text-left px-4 py-2.5 font-medium text-muted-foreground text-xs uppercase tracking-wide">Nhu cầu</th>
                  <th className="text-left px-4 py-2.5 font-medium text-muted-foreground text-xs uppercase tracking-wide">Nguồn</th>
                  <th className="text-left px-4 py-2.5 font-medium text-muted-foreground text-xs uppercase tracking-wide">Trạng thái</th>
                  <th className="text-right px-4 py-2.5 font-medium text-muted-foreground text-xs uppercase tracking-wide">Giá trị</th>
                  <th className="text-left px-4 py-2.5 font-medium text-muted-foreground text-xs uppercase tracking-wide">Phụ trách</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_LEADS.map((l) => (
                  <tr key={l.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors cursor-pointer">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-primary-soft text-primary flex items-center justify-center text-xs font-semibold">
                          {l.name.split(" ").pop()?.[0]}
                        </div>
                        <div>
                          <div className="font-medium text-foreground">{l.name}</div>
                          <div className="text-xs text-muted-foreground font-mono">{l.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      <div className="flex items-center gap-1 text-xs"><Phone className="w-3 h-3" />{l.phone}</div>
                      <div className="flex items-center gap-1 text-xs mt-0.5"><MapPin className="w-3 h-3" />{l.area}</div>
                    </td>
                    <td className="px-4 py-3 text-foreground">{l.need}</td>
                    <td className="px-4 py-3">
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium border ${SOURCE_CLASSES[l.source]}`}>
                        {SOURCE_LABELS[l.source]}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium border ${statusBadge[l.status]}`}>
                        {STATUS_LABELS[l.status]}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right font-medium text-foreground">{(l.value / 1000000).toFixed(0)}tr</td>
                    <td className="px-4 py-3 text-muted-foreground">{l.assignedTo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-2.5 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
            <span>Hiển thị 1-{MOCK_LEADS.length} của {MOCK_LEADS.length} lead</span>
            <div className="flex items-center gap-1">
              <button className="px-2 py-1 border border-border rounded hover:bg-muted">‹</button>
              <button className="px-2 py-1 border border-border rounded bg-primary text-primary-foreground">1</button>
              <button className="px-2 py-1 border border-border rounded hover:bg-muted">›</button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default CRMPage;
