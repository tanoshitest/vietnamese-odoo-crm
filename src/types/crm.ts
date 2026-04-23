export type UserRole = "admin" | "staff" | null;

export type LeadStatus = "new" | "consulting" | "quoted" | "installing" | "completed";

export type LeadSource = "facebook" | "tiktok" | "website" | "zalo" | "referral";

export interface Lead {
  id: string;
  name: string;
  phone: string;
  need: string;
  area: string;
  source: LeadSource;
  status: LeadStatus;
  value: number;
  assignedTo: string;
  createdAt: string;
  notes: { date: string; content: string; author: string }[];
  history: { date: string; action: string }[];
  aiAnalysis: {
    urgency: "high" | "medium" | "low";
    summary: string;
    recommendedReply: string;
  };
}
