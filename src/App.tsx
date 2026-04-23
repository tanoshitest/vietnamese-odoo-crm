import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/context/AuthContext";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import StaffDashboard from "./pages/StaffDashboard";
import Placeholder from "./pages/Placeholder";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/crm" element={<Placeholder title="CRM" role="admin" />} />
            <Route path="/admin/sales" element={<Placeholder title="Bán hàng" role="admin" />} />
            <Route path="/admin/installation" element={<Placeholder title="Lắp đặt & Thi công" role="admin" />} />
            <Route path="/admin/ai" element={<Placeholder title="AI Tự động hóa" role="admin" />} />
            <Route path="/admin/settings" element={<Placeholder title="Cài đặt" role="admin" />} />
            <Route path="/staff" element={<StaffDashboard />} />
            <Route path="/staff/leads" element={<Placeholder title="Lead của tôi" role="staff" />} />
            <Route path="/staff/tasks" element={<Placeholder title="Công việc hôm nay" role="staff" />} />
            <Route path="/staff/schedule" element={<Placeholder title="Lịch trình" role="staff" />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
