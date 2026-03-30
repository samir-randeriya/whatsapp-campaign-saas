import type { ReactNode } from "react";
import { MessageSquare, BarChart3, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

interface AuthLayoutProps {
  children: ReactNode;
  className?: string;
}

const AuthLayout = ({ children, className }: AuthLayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col bg-background lg:flex-row">
      <aside
        className={cn(
          "relative hidden flex-col justify-between overflow-hidden border-border bg-muted/40 p-10 lg:flex lg:w-[42%] xl:w-[45%] xl:p-14",
          "border-b lg:border-b-0 lg:border-r"
        )}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--primary)/0.08),transparent_50%)]" />
        <div className="relative z-[1] space-y-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-sm">
              <MessageSquare className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-display text-xl font-bold tracking-tight">WA Campaign</span>
          </div>
          <div className="space-y-4">
            <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-foreground xl:text-4xl">
              WhatsApp campaigns,
              <br />
              <span className="text-primary">simplified.</span>
            </h2>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              Launch templates, track delivery, and grow engagement — all in one workspace built for
              modern teams.
            </p>
          </div>
          <ul className="space-y-4 text-sm text-muted-foreground">
            <li className="flex items-start gap-3">
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-card shadow-sm">
                <BarChart3 className="h-4 w-4 text-primary" />
              </span>
              <span>
                <span className="font-medium text-foreground">Analytics</span> that match how you
                run campaigns.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-card shadow-sm">
                <Shield className="h-4 w-4 text-primary" />
              </span>
              <span>
                <span className="font-medium text-foreground">Enterprise-ready</span> security and
                workspace controls.
              </span>
            </li>
          </ul>
        </div>
        <p className="relative z-[1] text-xs text-muted-foreground">
          © {new Date().getFullYear()} WA Campaign. All rights reserved.
        </p>
      </aside>

      <main
        className={cn(
          "flex flex-1 flex-col items-center justify-center px-4 py-10 sm:px-6 lg:px-10",
          className
        )}
      >
        {children}
      </main>
    </div>
  );
};

export default AuthLayout;
