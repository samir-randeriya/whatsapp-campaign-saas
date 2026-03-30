import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Megaphone,
  Users,
  FileText,
  Settings,
  MessageSquare,
} from "lucide-react";
import type { ReactNode } from "react";

const navItems = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/",
    isActive: (pathname: string) => pathname === "/",
  },
  {
    label: "Campaigns",
    icon: Megaphone,
    href: "/campaigns",
    isActive: (pathname: string) =>
      pathname === "/campaigns" || pathname.startsWith("/campaign/"),
  },
  {
    label: "Contacts",
    icon: Users,
    href: "/contacts",
    isActive: (pathname: string) =>
      pathname === "/contacts" || pathname.startsWith("/contacts/"),
  },
  {
    label: "Templates",
    icon: FileText,
    href: "/templates",
    isActive: (pathname: string) => pathname.startsWith("/templates"),
  },
  {
    label: "Messages",
    icon: MessageSquare,
    href: "/messages",
    isActive: (pathname: string) =>
      pathname === "/messages" || pathname.startsWith("/messages/"),
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
    isActive: (pathname: string) =>
      pathname === "/settings" || pathname.startsWith("/settings/"),
  },
] as const;

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const location = useLocation();

  return (
    <div className="flex min-h-screen">
      <aside className="hidden w-64 flex-shrink-0 border-r border-sidebar-border bg-sidebar lg:block">
        <div className="flex h-16 items-center gap-2.5 px-6">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary">
            <MessageSquare className="h-4 w-4 text-sidebar-primary-foreground" />
          </div>
          <span className="font-display text-lg font-bold text-sidebar-foreground">
            WA Campaign
          </span>
        </div>
        <nav className="mt-4 space-y-1 px-3">
          {navItems.map((item) => {
            const active =
              "isActive" in item ? item.isActive(location.pathname) : false;
            const className = cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
              active
                ? "bg-sidebar-accent text-sidebar-primary"
                : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
            );

            return (
              <Link key={item.label} to={item.href} className={className}>
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      <main className="flex-1 overflow-auto">
        <div className="border-b border-border bg-card px-6 py-3 lg:hidden">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary">
              <MessageSquare className="h-3.5 w-3.5 text-primary-foreground" />
            </div>
            <span className="font-display text-sm font-bold">WA Campaign</span>
          </div>
        </div>
        <div className="p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;
