import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { ChevronLeft, ChevronRight, Phone, MapPin, FileText, Calendar as CalIcon } from "lucide-react";

interface Event {
  day: number; // 0-6 Mon-Sun
  start: number; // hour
  duration: number;
  title: string;
  customer: string;
  type: "call" | "visit" | "quote" | "install";
  area?: string;
}

const EVENTS: Event[] = [
  { day: 0, start: 9, duration: 1, title: "Gọi tư vấn", customer: "Nguyễn Văn An", type: "call" },
  { day: 0, start: 14, duration: 2, title: "Khảo sát hiện trường", customer: "Lê Hoàng Cường", type: "visit", area: "Bình Dương" },
  { day: 1, start: 10, duration: 1, title: "Gửi báo giá v2", customer: "Trần Thị Bình", type: "quote" },
  { day: 1, start: 15, duration: 1, title: "Follow-up", customer: "Võ Minh Đức", type: "call" },
  { day: 2, start: 8, duration: 4, title: "Lắp đặt ĐMT 6kW", customer: "Bùi Quang Huy", type: "install", area: "Long An" },
  { day: 2, start: 16, duration: 1, title: "Gọi xác nhận", customer: "Phạm Thị Dung", type: "call" },
  { day: 3, start: 9, duration: 2, title: "Khảo sát trụ sạc", customer: "Đặng Thu Hằng", type: "visit", area: "Q.1" },
  { day: 3, start: 14, duration: 1, title: "Họp team Sales", customer: "Nội bộ", type: "call" },
  { day: 4, start: 10, duration: 3, title: "Lắp trụ sạc EV", customer: "Lý Thị Kim", type: "install", area: "Q.9" },
  { day: 5, start: 9, duration: 1, title: "Demo sản phẩm", customer: "Khách mới", type: "visit" },
];

const TYPE_COLOR: Record<Event["type"], string> = {
  call: "bg-info/15 border-l-info text-info-foreground",
  visit: "bg-warning/15 border-l-warning",
  quote: "bg-primary/15 border-l-primary",
  install: "bg-success/15 border-l-success",
};

const TYPE_ICON: Record<Event["type"], typeof Phone> = {
  call: Phone, visit: MapPin, quote: FileText, install: CalIcon,
};

const TYPE_LABEL: Record<Event["type"], string> = {
  call: "Gọi điện", visit: "Khảo sát", quote: "Báo giá", install: "Lắp đặt",
};

const DAYS = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "CN"];
const DATES = ["21", "22", "23", "24", "25", "26", "27"];
const HOURS = Array.from({ length: 11 }, (_, i) => i + 7); // 7h - 17h

const SchedulePage = () => {
  const [view, setView] = useState<"week" | "list">("week");

  return (
    <AppLayout requireRole="staff">
      <div className="p-6 space-y-5 max-w-[1600px] mx-auto">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-xl font-semibold text-foreground">Lịch trình</h1>
            <p className="text-sm text-muted-foreground mt-0.5">Tuần 21/04 - 27/04/2025</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center border border-border rounded-md overflow-hidden">
              <button className="w-8 h-8 flex items-center justify-center hover:bg-muted text-muted-foreground"><ChevronLeft className="w-4 h-4" /></button>
              <button className="h-8 px-3 text-xs font-medium border-l border-r border-border hover:bg-muted">Hôm nay</button>
              <button className="w-8 h-8 flex items-center justify-center hover:bg-muted text-muted-foreground"><ChevronRight className="w-4 h-4" /></button>
            </div>
            <div className="flex items-center border border-border rounded-md overflow-hidden">
              {(["week", "list"] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  className={`h-8 px-3 text-xs font-medium ${view === v ? "bg-primary text-primary-foreground" : "bg-card hover:bg-muted text-foreground"}`}
                >
                  {v === "week" ? "Tuần" : "Danh sách"}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 flex-wrap text-xs text-muted-foreground">
          {(Object.keys(TYPE_LABEL) as Event["type"][]).map((t) => (
            <span key={t} className="flex items-center gap-1.5">
              <span className={`w-3 h-3 rounded ${TYPE_COLOR[t].split(" ")[0]} border-l-2 ${TYPE_COLOR[t].split(" ")[1]}`} />
              {TYPE_LABEL[t]}
            </span>
          ))}
        </div>

        {view === "week" ? (
          <div className="odoo-card overflow-hidden">
            <div className="overflow-x-auto">
              <div className="min-w-[800px]">
                {/* Header */}
                <div className="grid grid-cols-[60px_repeat(7,1fr)] border-b border-border bg-muted/30">
                  <div className="p-2"></div>
                  {DAYS.map((d, i) => (
                    <div key={d} className={`p-2 text-center border-l border-border ${i === 2 ? "bg-primary-soft" : ""}`}>
                      <div className="text-[10px] font-medium text-muted-foreground uppercase">{d}</div>
                      <div className={`text-sm font-semibold mt-0.5 ${i === 2 ? "text-primary" : "text-foreground"}`}>{DATES[i]}</div>
                    </div>
                  ))}
                </div>

                {/* Grid */}
                <div className="relative grid grid-cols-[60px_repeat(7,1fr)]">
                  {/* Hour rows */}
                  {HOURS.map((h) => (
                    <div key={h} className="contents">
                      <div className="p-1.5 text-[10px] font-mono text-muted-foreground border-b border-border text-right pr-2">
                        {String(h).padStart(2, "0")}:00
                      </div>
                      {DAYS.map((_, di) => (
                        <div key={di} className={`h-12 border-l border-b border-border ${di === 2 ? "bg-primary-soft/30" : ""}`} />
                      ))}
                    </div>
                  ))}

                  {/* Events overlay */}
                  {EVENTS.map((e, i) => {
                    const Icon = TYPE_ICON[e.type];
                    const top = (e.start - 7) * 48 + 32; // header offset already in grid; we use absolute relative to grid start
                    return (
                      <div
                        key={i}
                        className={`absolute rounded border-l-2 p-1.5 text-[11px] cursor-pointer hover:shadow-md transition-shadow overflow-hidden ${TYPE_COLOR[e.type]}`}
                        style={{
                          top: `${(e.start - 7) * 48}px`,
                          height: `${e.duration * 48 - 2}px`,
                          left: `calc(60px + ${e.day} * ((100% - 60px) / 7) + 2px)`,
                          width: `calc((100% - 60px) / 7 - 4px)`,
                        }}
                      >
                        <div className="flex items-center gap-1 font-semibold text-foreground">
                          <Icon className="w-3 h-3" />
                          <span className="truncate">{e.title}</span>
                        </div>
                        <div className="text-[10px] text-muted-foreground truncate mt-0.5">{e.customer}</div>
                        {e.area && <div className="text-[10px] text-muted-foreground truncate">📍 {e.area}</div>}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="odoo-card overflow-hidden divide-y divide-border">
            {EVENTS.map((e, i) => {
              const Icon = TYPE_ICON[e.type];
              return (
                <div key={i} className="p-4 hover:bg-muted/30 transition-colors flex items-center gap-3">
                  <div className="text-center w-14 shrink-0">
                    <div className="text-[10px] font-medium text-muted-foreground uppercase">{DAYS[e.day]}</div>
                    <div className="text-base font-semibold text-foreground">{DATES[e.day]}</div>
                  </div>
                  <div className="text-xs font-mono text-primary font-semibold w-20 shrink-0">
                    {String(e.start).padStart(2, "0")}:00 - {String(e.start + e.duration).padStart(2, "0")}:00
                  </div>
                  <div className={`w-8 h-8 rounded-md flex items-center justify-center shrink-0 ${TYPE_COLOR[e.type]}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-foreground">{e.title}</div>
                    <div className="text-xs text-muted-foreground">{e.customer}{e.area ? ` · ${e.area}` : ""}</div>
                  </div>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium border ${TYPE_COLOR[e.type]}`}>{TYPE_LABEL[e.type]}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default SchedulePage;
