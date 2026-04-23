import { AppLayout } from "@/components/layout/AppLayout";
import { KpiCard } from "@/components/shared/KpiCard";
import { DollarSign, FileText, TrendingUp, Target, Plus, Eye } from "lucide-react";

const QUOTES = [
  { id: "BG-2401", customer: "Nguyễn Văn An", product: "Hệ ĐMT 5kW + Inverter Huawei", value: 85000000, status: "Chờ duyệt", date: "22/04/2025" },
  { id: "BG-2402", customer: "Lê Hoàng Cường", product: "ĐMT 10kW + Pin LFP 10kWh", value: 220000000, status: "Đã gửi", date: "21/04/2025" },
  { id: "BG-2403", customer: "Võ Minh Đức", product: "ĐMT 8kW Hybrid", value: 145000000, status: "Đàm phán", date: "18/04/2025" },
  { id: "BG-2404", customer: "Đặng Thu Hằng", product: "Trạm sạc EV 4 trụ 22kW", value: 320000000, status: "Đã ký", date: "17/04/2025" },
  { id: "BG-2405", customer: "Phạm Thị Dung", product: "Trụ sạc EV 22kW gia đình", value: 45000000, status: "Đã gửi", date: "20/04/2025" },
];

const STATUS_COLORS: Record<string, string> = {
  "Chờ duyệt": "bg-warning/10 text-warning border-warning/30",
  "Đã gửi": "bg-info/10 text-info border-info/30",
  "Đàm phán": "bg-primary/10 text-primary border-primary/30",
  "Đã ký": "bg-success/10 text-success border-success/30",
};

const SalesPage = () => (
  <AppLayout requireRole="admin">
    <div className="p-6 space-y-5 max-w-[1600px] mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Bán hàng</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Quản lý báo giá, hợp đồng và doanh thu</p>
        </div>
        <button className="h-9 px-3 text-sm bg-primary text-primary-foreground rounded-md hover:bg-[hsl(var(--primary-hover))] flex items-center gap-1.5">
          <Plus className="w-4 h-4" /> Tạo báo giá
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard label="Doanh thu tháng" value="2.4 tỷ" icon={DollarSign} trend={{ value: "+18%", up: true }} accentColor="success" />
        <KpiCard label="Báo giá đang xử lý" value="24" icon={FileText} trend={{ value: "+5", up: true }} accentColor="info" />
        <KpiCard label="Tỷ lệ chốt deal" value="34%" icon={TrendingUp} trend={{ value: "+4%", up: true }} accentColor="primary" />
        <KpiCard label="Mục tiêu quý" value="68%" icon={Target} trend={{ value: "+12%", up: true }} accentColor="destructive" />
      </div>

      {/* Pipeline funnel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 odoo-card p-5">
          <h2 className="text-sm font-semibold text-foreground mb-4">Phễu doanh số tháng 04/2025</h2>
          <div className="space-y-2">
            {[
              { label: "Lead tiềm năng", count: 340, value: "5.1 tỷ", pct: 100, color: "hsl(var(--info))" },
              { label: "Đã liên hệ", count: 198, value: "3.2 tỷ", pct: 75, color: "hsl(var(--source-tiktok))" },
              { label: "Báo giá", count: 87, value: "2.4 tỷ", pct: 50, color: "hsl(var(--warning))" },
              { label: "Đàm phán", count: 42, value: "1.5 tỷ", pct: 30, color: "hsl(var(--primary))" },
              { label: "Đã ký HĐ", count: 18, value: "850tr", pct: 15, color: "hsl(var(--success))" },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground w-28">{s.label}</span>
                <div className="flex-1 h-8 bg-muted/40 rounded-md overflow-hidden">
                  <div
                    className="h-full rounded-md flex items-center justify-between px-3 transition-all duration-700"
                    style={{ width: `${s.pct}%`, backgroundColor: s.color }}
                  >
                    <span className="text-xs text-white font-semibold">{s.count} deal</span>
                    <span className="text-xs text-white/90">{s.value}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="odoo-card p-5">
          <h2 className="text-sm font-semibold text-foreground mb-4">Top sản phẩm bán chạy</h2>
          <div className="space-y-3">
            {[
              { name: "Hệ ĐMT 5kW", units: 28, revenue: "2.38 tỷ" },
              { name: "Hệ ĐMT 10kW", units: 12, revenue: "2.64 tỷ" },
              { name: "Trụ sạc EV 22kW", units: 18, revenue: "810tr" },
              { name: "Pin lưu trữ 10kWh", units: 9, revenue: "720tr" },
            ].map((p, i) => (
              <div key={p.name} className="flex items-center gap-3">
                <div className="w-7 h-7 rounded bg-primary-soft text-primary flex items-center justify-center text-xs font-bold">{i + 1}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-foreground truncate">{p.name}</div>
                  <div className="text-xs text-muted-foreground">{p.units} đơn · {p.revenue}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quotes table */}
      <div className="odoo-card overflow-hidden">
        <div className="p-5 border-b border-border flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-foreground">Báo giá gần đây</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Theo dõi tiến độ chốt đơn</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="text-left px-5 py-2.5 font-medium text-muted-foreground text-xs uppercase tracking-wide">Mã BG</th>
                <th className="text-left px-5 py-2.5 font-medium text-muted-foreground text-xs uppercase tracking-wide">Khách hàng</th>
                <th className="text-left px-5 py-2.5 font-medium text-muted-foreground text-xs uppercase tracking-wide">Sản phẩm</th>
                <th className="text-right px-5 py-2.5 font-medium text-muted-foreground text-xs uppercase tracking-wide">Giá trị</th>
                <th className="text-left px-5 py-2.5 font-medium text-muted-foreground text-xs uppercase tracking-wide">Trạng thái</th>
                <th className="text-left px-5 py-2.5 font-medium text-muted-foreground text-xs uppercase tracking-wide">Ngày tạo</th>
                <th className="px-5 py-2.5"></th>
              </tr>
            </thead>
            <tbody>
              {QUOTES.map((q) => (
                <tr key={q.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="px-5 py-3 font-mono text-xs text-primary font-medium">{q.id}</td>
                  <td className="px-5 py-3 font-medium text-foreground">{q.customer}</td>
                  <td className="px-5 py-3 text-muted-foreground">{q.product}</td>
                  <td className="px-5 py-3 text-right font-medium text-foreground">{(q.value / 1000000).toFixed(0)}tr</td>
                  <td className="px-5 py-3">
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium border ${STATUS_COLORS[q.status]}`}>{q.status}</span>
                  </td>
                  <td className="px-5 py-3 text-muted-foreground text-xs">{q.date}</td>
                  <td className="px-5 py-3 text-right">
                    <button className="text-muted-foreground hover:text-primary"><Eye className="w-4 h-4" /></button>
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

export default SalesPage;
