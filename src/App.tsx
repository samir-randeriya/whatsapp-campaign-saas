import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Dashboard from "@/pages/Dashboard";
import CampaignList from "@/pages/CampaignList";
import CreateCampaign from "@/pages/CreateCampaign";
import TemplateList from "@/pages/TemplateList";
import CreateTemplate from "@/pages/CreateTemplate";
import Contacts from "@/pages/Contacts";
import Messages from "@/pages/Messages";
import Settings from "@/pages/Settings";
import NotFound from "@/pages/NotFound";
import LoginPage from "@/pages/auth/login";
import SignupPage from "@/pages/auth/signup";
import ForgotPasswordPage from "@/pages/auth/forgot-password";
import ResetPasswordPage from "@/pages/auth/reset-password";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/campaigns" element={<CampaignList />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/campaign/create" element={<CreateCampaign />} />
          <Route path="/templates" element={<TemplateList />} />
          <Route path="/templates/create" element={<CreateTemplate />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
