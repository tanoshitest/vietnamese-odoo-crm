import { useState } from "react";
import { Lead, LeadStatus } from "@/types/crm";
import { STATUS_ORDER } from "@/data/mockData";
import { DndContext, DragEndEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { KanbanColumn } from "./KanbanColumn";

interface Props {
  leads: Lead[];
  onLeadsChange: (leads: Lead[]) => void;
  onCardClick: (lead: Lead) => void;
}

export const KanbanBoard = ({ leads, onLeadsChange, onCardClick }: Props) => {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    const newStatus = over.id as LeadStatus;
    const lead = leads.find((l) => l.id === active.id);
    if (!lead || lead.status === newStatus) return;
    onLeadsChange(leads.map((l) => (l.id === active.id ? { ...l, status: newStatus } : l)));
  };

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="flex gap-3 overflow-x-auto pb-4 -mx-1 px-1">
        {STATUS_ORDER.map((status) => (
          <KanbanColumn
            key={status}
            status={status}
            leads={leads.filter((l) => l.status === status)}
            onCardClick={onCardClick}
          />
        ))}
      </div>
    </DndContext>
  );
};
