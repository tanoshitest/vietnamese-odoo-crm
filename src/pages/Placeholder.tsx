import { AppLayout } from "@/components/layout/AppLayout";
import { Construction } from "lucide-react";

const Placeholder = ({ title, role }: { title: string; role: "admin" | "staff" }) => (
  <AppLayout requireRole={role}>
    <div className="p-6 max-w-[1600px] mx-auto">
      <h1 className="text-xl font-semibold text-foreground mb-6">{title}</h1>
      <div className="odoo-card p-12 text-center">
        <div className="w-14 h-14 rounded-md bg-primary-soft text-primary flex items-center justify-center mx-auto mb-4">
          <Construction className="w-7 h-7" />
        </div>
        <h2 className="text-base font-semibold text-foreground mb-1">Đang phát triển</h2>
        <p className="text-sm text-muted-foreground">Tính năng "{title}" sẽ sớm có mặt trong phiên bản tiếp theo.</p>
      </div>
    </div>
  </AppLayout>
);

export default Placeholder;
