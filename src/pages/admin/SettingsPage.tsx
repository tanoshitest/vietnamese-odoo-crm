import { AppLayout } from "@/components/layout/AppLayout";
import { useState } from "react";
import {
  Building2, Users, Shield, Bell, Plug, CreditCard, Palette, Database,
  ChevronRight, Mail, Phone, MapPin,
} from "lucide-react";

const SECTIONS = [
  { id: "company", icon: Building2, label: "Thông tin công ty" },
  { id: "users", icon: Users, label: "Người dùng & Phân quyền" },
  { id: "security", icon: Shield, label: "Bảo mật" },
  { id: "notifications", icon: Bell, label: "Thông báo" },
  { id: "integrations", icon: Plug, label: "Kết nối tích hợp" },
  { id: "billing", icon: CreditCard, label: "Thanh toán" },
  { id: "appearance", icon: Palette, label: "Giao diện" },
  { id: "data", icon: Database, label: "Dữ liệu & Sao lưu" },
];

const USERS = [
  { name: "Lê Quản Lý", email: "manager@solarev.vn", role: "Admin", status: "Hoạt động" },
  { name: "Trần Minh Tú", email: "tu.tran@solarev.vn", role: "Sales", status: "Hoạt động" },
  { name: "Phạm Thu Hà", email: "ha.pham@solarev.vn", role: "Sales", status: "Hoạt động" },
  { name: "Nguyễn Văn Khoa", email: "khoa.nv@solarev.vn", role: "Sales Lead", status: "Hoạt động" },
  { name: "Đội KT-01", email: "kt01@solarev.vn", role: "Kỹ thuật", status: "Hoạt động" },
];

const INTEGRATIONS = [
  { name: "Facebook Messenger", desc: "Nhận lead từ Fanpage", connected: true },
  { name: "Zalo OA", desc: "Tin nhắn & broadcast", connected: true },
  { name: "TikTok Lead Ads", desc: "Đồng bộ lead form", connected: true },
  { name: "Google Calendar", desc: "Đồng bộ lịch khảo sát", connected: false },
  { name: "VNPay", desc: "Thanh toán online", connected: false },
];

const SettingsPage = () => {
  const [active, setActive] = useState("company");

  return (
    <AppLayout requireRole="admin">
      <div className="p-6 max-w-[1600px] mx-auto">
        <div className="mb-5">
          <h1 className="text-xl font-semibold text-foreground">Cài đặt</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Quản lý cấu hình hệ thống</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Sidebar */}
          <nav className="odoo-card p-2 h-fit">
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                onClick={() => setActive(s.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-colors ${
                  active === s.id
                    ? "bg-primary-soft text-primary font-medium"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                <s.icon className="w-4 h-4 shrink-0" />
                <span className="flex-1 text-left">{s.label}</span>
                <ChevronRight className="w-3.5 h-3.5 opacity-50" />
              </button>
            ))}
          </nav>

          {/* Content */}
          <div className="lg:col-span-3 space-y-4">
            {active === "company" && (
              <div className="odoo-card p-6">
                <h2 className="text-base font-semibold text-foreground mb-1">Thông tin công ty</h2>
                <p className="text-xs text-muted-foreground mb-5">Cập nhật thông tin doanh nghiệp hiển thị trên báo giá & hợp đồng</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field label="Tên công ty" value="Công ty TNHH SolarEV Việt Nam" />
                  <Field label="Mã số thuế" value="0312345678" />
                  <Field label="Email liên hệ" value="info@solarev.vn" icon={Mail} />
                  <Field label="Hotline" value="1900 6868" icon={Phone} />
                  <div className="md:col-span-2">
                    <Field label="Địa chỉ" value="123 Nguyễn Văn Linh, Quận 7, TP. Hồ Chí Minh" icon={MapPin} />
                  </div>
                </div>
                <div className="mt-5 pt-5 border-t border-border flex justify-end gap-2">
                  <button className="h-9 px-4 text-sm border border-border rounded-md hover:bg-muted">Hủy</button>
                  <button className="h-9 px-4 text-sm bg-primary text-primary-foreground rounded-md hover:bg-[hsl(var(--primary-hover))]">Lưu thay đổi</button>
                </div>
              </div>
            )}

            {active === "users" && (
              <div className="odoo-card overflow-hidden">
                <div className="p-5 border-b border-border flex items-center justify-between">
                  <div>
                    <h2 className="text-base font-semibold text-foreground">Người dùng & Phân quyền</h2>
                    <p className="text-xs text-muted-foreground mt-0.5">{USERS.length} người dùng đang hoạt động</p>
                  </div>
                  <button className="h-9 px-3 text-sm bg-primary text-primary-foreground rounded-md">+ Thêm người dùng</button>
                </div>
                <table className="w-full text-sm">
                  <thead className="bg-muted/50 border-b border-border">
                    <tr>
                      <th className="text-left px-5 py-2.5 font-medium text-muted-foreground text-xs uppercase">Tên</th>
                      <th className="text-left px-5 py-2.5 font-medium text-muted-foreground text-xs uppercase">Email</th>
                      <th className="text-left px-5 py-2.5 font-medium text-muted-foreground text-xs uppercase">Vai trò</th>
                      <th className="text-left px-5 py-2.5 font-medium text-muted-foreground text-xs uppercase">Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody>
                    {USERS.map((u) => (
                      <tr key={u.email} className="border-b border-border last:border-0 hover:bg-muted/30">
                        <td className="px-5 py-3 font-medium text-foreground">{u.name}</td>
                        <td className="px-5 py-3 text-muted-foreground">{u.email}</td>
                        <td className="px-5 py-3">
                          <span className="text-[10px] px-1.5 py-0.5 rounded font-medium bg-primary-soft text-primary border border-primary/30">{u.role}</span>
                        </td>
                        <td className="px-5 py-3">
                          <span className="text-[10px] px-1.5 py-0.5 rounded font-medium bg-success/10 text-success border border-success/30">{u.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {active === "integrations" && (
              <div className="odoo-card p-6">
                <h2 className="text-base font-semibold text-foreground mb-1">Kết nối tích hợp</h2>
                <p className="text-xs text-muted-foreground mb-5">Quản lý các kênh & dịch vụ bên thứ ba</p>
                <div className="space-y-2">
                  {INTEGRATIONS.map((i) => (
                    <div key={i.name} className="flex items-center justify-between p-3 border border-border rounded-md hover:bg-muted/30 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-md bg-primary-soft text-primary flex items-center justify-center">
                          <Plug className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-foreground">{i.name}</div>
                          <div className="text-xs text-muted-foreground">{i.desc}</div>
                        </div>
                      </div>
                      <button className={`h-8 px-3 text-xs rounded-md font-medium ${
                        i.connected
                          ? "bg-success/10 text-success border border-success/30"
                          : "bg-primary text-primary-foreground hover:bg-[hsl(var(--primary-hover))]"
                      }`}>
                        {i.connected ? "✓ Đã kết nối" : "Kết nối"}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {active === "notifications" && (
              <div className="odoo-card p-6">
                <h2 className="text-base font-semibold text-foreground mb-1">Thông báo</h2>
                <p className="text-xs text-muted-foreground mb-5">Tùy chỉnh kênh nhận thông báo</p>
                <div className="space-y-3">
                  {[
                    { label: "Lead mới được tạo", on: true },
                    { label: "Cuộc gọi nhỡ", on: true },
                    { label: "Báo giá quá hạn follow-up", on: true },
                    { label: "Hợp đồng mới ký", on: true },
                    { label: "Báo cáo doanh thu hàng tuần", on: false },
                    { label: "Cảnh báo AI Agent lỗi", on: true },
                  ].map((n) => (
                    <div key={n.label} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                      <span className="text-sm text-foreground">{n.label}</span>
                      <button className={`w-10 h-5 rounded-full relative transition-colors ${n.on ? "bg-primary" : "bg-muted"}`}>
                        <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all shadow-sm ${n.on ? "left-5" : "left-0.5"}`} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {!["company", "users", "integrations", "notifications"].includes(active) && (
              <div className="odoo-card p-12 text-center">
                <div className="w-12 h-12 rounded-md bg-primary-soft text-primary flex items-center justify-center mx-auto mb-3">
                  {(() => {
                    const S = SECTIONS.find((s) => s.id === active)!;
                    return <S.icon className="w-5 h-5" />;
                  })()}
                </div>
                <h3 className="text-sm font-semibold text-foreground mb-1">{SECTIONS.find((s) => s.id === active)?.label}</h3>
                <p className="text-xs text-muted-foreground">Phần cài đặt này đang được hoàn thiện.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

const Field = ({ label, value, icon: Icon }: { label: string; value: string; icon?: React.ComponentType<{ className?: string }> }) => (
  <div>
    <label className="text-xs font-medium text-muted-foreground mb-1 block">{label}</label>
    <div className="relative">
      {Icon && <Icon className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />}
      <input
        defaultValue={value}
        className={`w-full h-9 ${Icon ? "pl-8" : "pl-3"} pr-3 text-sm border border-border rounded-md bg-card focus:outline-none focus:border-primary text-foreground`}
      />
    </div>
  </div>
);

export default SettingsPage;
