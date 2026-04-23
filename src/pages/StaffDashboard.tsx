import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { KpiCard } from "@/components/shared/KpiCard";
import { KanbanBoard } from "@/components/kanban/KanbanBoard";
import { CustomerDrawer } from "@/components/CustomerDrawer";
import { MOCK_LEADS } from "@/data/mockData";
import { Lead } from "@/types/crm";
import { UserCheck, Clock, AlarmClock, Plus } from "lucide-react";

const StaffDashboard = () => {
  const [leads, setLeads] = useState<Lead[]>(MOCK_LEADS);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const myLeadsCount = leads.filter((l) => l.status !== "completed").length;
  const dueTodayCount = leads.filter((l) => l.status === "consulting" || l.status === "quoted").length;
  const followUpCount = leads.filter((l) => l.status === "quoted").length;

  return (
    <AppLayout requireRole="staff">
      <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Không gian làm việc</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Chào buổi sáng, Trần Minh Tú 👋</p>
        </div>

        {/* KPI */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <KpiCard label="Lead đang phụ trách" value={String(myLeadsCount)} icon={UserCheck} accentColor="primary" />
          <KpiCard label="Task đến hạn hôm nay" value={String(dueTodayCount)} icon={Clock} accentColor="warning" />
          <KpiCard label="Chờ Follow-up" value={String(followUpCount)} icon={AlarmClock} accentColor="info" />
        </div>

        {/* Kanban */}
        <div className="odoo-card p-4">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <div>
              <h2 className="text-sm font-semibold text-foreground">Pipeline Lead</h2>
              <p className="text-xs text-muted-foreground mt-0.5">Kéo thả thẻ giữa các cột để cập nhật trạng thái</p>
            </div>
            <div className="flex gap-2">
              <button className="h-8 px-3 text-xs font-medium border border-border rounded-md hover:bg-muted transition-colors">
                Bộ lọc
              </button>
              <button className="h-8 px-3 text-xs font-medium border border-border rounded-md hover:bg-muted transition-colors">
                Sắp xếp
              </button>
            </div>
          </div>
          <KanbanBoard leads={leads} onLeadsChange={setLeads} onCardClick={setSelectedLead} />
        </div>
      </div>

      {/* Floating Create button */}
      <button className="fixed bottom-6 right-6 z-30 h-12 px-5 bg-primary hover:bg-primary-hover text-primary-foreground rounded-full shadow-lg hover:shadow-xl flex items-center gap-2 font-medium text-sm transition-all hover:scale-105">
        <Plus className="w-5 h-5" strokeWidth={2.5} />
        Tạo Lead Mới
      </button>

      <CustomerDrawer lead={selectedLead} onClose={() => setSelectedLead(null)} />
    </AppLayout>
  );
};

export default StaffDashboard;
