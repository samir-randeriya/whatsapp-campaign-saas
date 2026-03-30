import { useState } from "react";
import { Link } from "react-router-dom";
import { Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import AuthLayout from "@/layouts/AuthLayout";
import { AuthCard, AuthHeader, AuthInput } from "@/components/auth";
import { validatePassword } from "@/pages/auth/authValidation";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    const pw = validatePassword(password);
    if (pw) next.password = pw;
    if (!confirmPassword) next.confirmPassword = "Confirm your password";
    else if (confirmPassword !== password) next.confirmPassword = "Passwords do not match";
    if (Object.keys(next).length) {
      setErrors(next);
      return;
    }
    setErrors({});
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      setDone(true);
    }, 900);
  };

  const disabled = loading || done;

  return (
    <AuthLayout>
      <AuthCard>
        <AuthHeader
          title="Reset password"
          description="Choose a strong password you haven’t used before."
        />
        {done ? (
          <div className="space-y-6">
            <div className="flex flex-col items-center gap-3 rounded-lg border border-success/30 bg-success/10 px-4 py-8 text-center">
              <CheckCircle2 className="h-12 w-12 text-success" />
              <div>
                <p className="font-display text-lg font-semibold text-foreground">
                  Password updated
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  You can now sign in with your new password.
                </p>
              </div>
            </div>
            <Button className="w-full" asChild>
              <Link to="/login">Continue to login</Link>
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <AuthInput
              label="New password"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
              disabled={disabled}
              placeholder="At least 8 characters"
            />
            <AuthInput
              label="Confirm password"
              type="password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={errors.confirmPassword}
              disabled={disabled}
              placeholder="Repeat new password"
            />
            <Button type="submit" className="w-full" disabled={disabled}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating…
                </>
              ) : (
                "Reset password"
              )}
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              <Link to="/login" className="font-medium text-primary hover:underline">
                Back to login
              </Link>
            </p>
          </form>
        )}
      </AuthCard>
    </AuthLayout>
  );
};

export default ResetPasswordPage;
