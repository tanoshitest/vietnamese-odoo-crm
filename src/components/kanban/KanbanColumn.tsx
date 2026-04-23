import { Lead, LeadStatus } from "@/types/crm";
import { STATUS_LABELS } from "@/data/mockData";
import { useDroppable } from "@dnd-kit/core";
import { KanbanCard } from "./KanbanCard";
import { cn } from "@/lib/utils";

interface Props {
  status: LeadStatus;
  leads: Lead[];
  onCardClick: (lead: Lead) => void;
}

const COLUMN_ACCENT: Record<LeadStatus, string> = {
  new: "border-t-info",
  consulting: "border-t-warning",
  quoted: "border-t-primary",
  installing: "border-t-source-tiktok",
  completed: "border-t-success",
};

export const KanbanColumn = ({ status, leads, onCardClick }: Props) => {
  const { setNodeRef, isOver } = useDroppable({ id: status });
  const totalValue = leads.reduce((sum, l) => sum + l.value, 0);

  return (
    <div className="w-72 shrink-0 flex flex-col">
      <div className={cn("bg-card border border-border border-t-2 rounded-t-md px-3 py-2.5", COLUMN_ACCENT[status])}>
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-semibold text-foreground uppercase tracking-wide">{STATUS_LABELS[status]}</h3>
          <span className="text-[10px] font-semibold text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
            {leads.length}
          </span>
        </div>
        <p className="text-[11px] text-muted-foreground mt-0.5">
          {(totalValue / 1000000).toFixed(0)}tr VNĐ
        </p>
      </div>
      <div
        ref={setNodeRef}
        className={cn(
          "flex-1 bg-muted/40 border-x border-b border-border rounded-b-md p-2 space-y-2 min-h-[400px] transition-colors",
          isOver && "bg-primary-soft ring-2 ring-primary ring-inset"
        )}
      >
        {leads.map((lead) => (
          <KanbanCard key={lead.id} lead={lead} onClick={() => onCardClick(lead)} />
        ))}
        {leads.length === 0 && (
          <div className="text-center py-8 text-xs text-muted-foreground">Kéo thả lead vào đây</div>
        )}
      </div>
    </div>
  );
};
