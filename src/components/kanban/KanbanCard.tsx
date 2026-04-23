import { Lead } from "@/types/crm";
import { SOURCE_CLASSES, SOURCE_LABELS } from "@/data/mockData";
import { MapPin, Phone } from "lucide-react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";

interface Props {
  lead: Lead;
  onClick: () => void;
}

export const KanbanCard = ({ lead, onClick }: Props) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: lead.id,
    data: { lead },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.4 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "bg-card border border-border rounded-md p-3 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] hover:border-primary/40 cursor-grab active:cursor-grabbing transition-all group",
        isDragging && "ring-2 ring-primary"
      )}
    >
      {/* Drag handle area */}
      <div {...listeners} {...attributes} className="space-y-2">
        <div className="flex items-start justify-between gap-2">
          <p className="font-semibold text-sm text-foreground leading-tight">{lead.name}</p>
          <span
            className={cn(
              "text-[10px] px-1.5 py-0.5 rounded border font-medium shrink-0",
              SOURCE_CLASSES[lead.source]
            )}
          >
            {SOURCE_LABELS[lead.source]}
          </span>
        </div>
        <p className="text-xs text-foreground/80 font-medium line-clamp-1">{lead.need}</p>
        <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
          <MapPin className="w-3 h-3" />
          <span className="truncate">{lead.area}</span>
        </div>
        <div className="flex items-center justify-between pt-1.5 border-t border-border/60">
          <span className="text-[11px] text-muted-foreground flex items-center gap-1">
            <Phone className="w-3 h-3" />
            {lead.phone}
          </span>
          <span className="text-[11px] font-semibold text-primary">
            {(lead.value / 1000000).toFixed(0)}tr
          </span>
        </div>
      </div>

      {/* Click overlay button - prevents drag conflict */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        className="mt-2 w-full text-[11px] text-primary hover:bg-primary-soft rounded px-2 py-1 font-medium transition-colors opacity-0 group-hover:opacity-100"
      >
        Xem chi tiết →
      </button>
    </div>
  );
};
