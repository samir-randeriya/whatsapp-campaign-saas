import { useState } from "react";
import { Link } from "react-router-dom";
import { Loader2, CheckCircle2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import AuthLayout from "@/layouts/AuthLayout";
import { AuthCard, AuthHeader, AuthInput } from "@/components/auth";
import { validateEmail } from "@/pages/auth/authValidation";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const em = validateEmail(email);
    if (em) {
      setError(em);
      return;
    }
    setError("");
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 900);
  };

  const disabled = loading || sent;

  return (
    <AuthLayout>
      <AuthCard>
        <AuthHeader
          title="Forgot password?"
          description="We’ll email you a link to reset your password."
        />
        {sent ? (
          <div className="space-y-4">
            <div className="flex flex-col items-center gap-3 rounded-lg border border-success/30 bg-success/10 px-4 py-6 text-center">
              <CheckCircle2 className="h-10 w-10 text-success" />
              <div>
                <p className="font-medium text-foreground">Check your inbox</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  If an account exists for <span className="font-medium text-foreground">{email}</span>
                  , we sent reset instructions.
                </p>
              </div>
            </div>
            <Button variant="outline" className="w-full" asChild>
              <Link to="/login">Back to login</Link>
            </Button>
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit} className="space-y-4">
              <AuthInput
                label="Email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={error}
                disabled={disabled}
                placeholder="you@company.com"
              />
              <Button type="submit" className="w-full" disabled={disabled}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending…
                  </>
                ) : (
                  "Send reset link"
                )}
              </Button>
            </form>
            <Button variant="ghost" className="mt-4 w-full gap-2 text-muted-foreground" asChild>
              <Link to="/login">
                <ArrowLeft className="h-4 w-4" />
                Back to login
              </Link>
            </Button>
          </>
        )}
      </AuthCard>
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
