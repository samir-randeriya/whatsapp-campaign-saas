import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";

interface PageBackLinkProps {
  to: string;
  children: ReactNode;
}

export function PageBackLink({ to, children }: PageBackLinkProps) {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate(to)}
      className="mb-6 flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
    >
      <ArrowLeft className="h-4 w-4" /> {children}
    </button>
  );
}
