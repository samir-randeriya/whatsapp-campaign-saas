import { useState } from "react";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import AuthLayout from "@/layouts/AuthLayout";
import { AuthCard, AuthHeader, AuthInput } from "@/components/auth";
import { validateEmail, validatePassword, validateRequired } from "@/pages/auth/authValidation";

const SignupPage = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [workspace, setWorkspace] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    const fn = validateRequired(fullName, "Full name");
    const em = validateEmail(email);
    const pw = validatePassword(password);
    const ws = validateRequired(workspace, "Company / workspace name");
    if (fn) next.fullName = fn;
    if (em) next.email = em;
    if (pw) next.password = pw;
    if (ws) next.workspace = ws;
    if (confirmPassword !== password) {
      next.confirmPassword = "Passwords do not match";
    } else if (!confirmPassword) {
      next.confirmPassword = "Confirm your password";
    }
    if (Object.keys(next).length) {
      setErrors(next);
      return;
    }
    setErrors({});
    setLoading(true);
    window.setTimeout(() => setLoading(false), 1000);
  };

  const disabled = loading;

  return (
    <AuthLayout>
      <AuthCard>
        <AuthHeader
          title="Create your account"
          description="Start sending WhatsApp campaigns in minutes."
        />
        <form onSubmit={handleSubmit} className="space-y-4">
          <AuthInput
            label="Full name"
            autoComplete="name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            error={errors.fullName}
            disabled={disabled}
            placeholder="Jane Doe"
          />
          <AuthInput
            label="Email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
            disabled={disabled}
            placeholder="you@company.com"
          />
          <AuthInput
            label="Password"
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
            placeholder="Repeat password"
          />
          <AuthInput
            label="Company / workspace name"
            autoComplete="organization"
            value={workspace}
            onChange={(e) => setWorkspace(e.target.value)}
            error={errors.workspace}
            disabled={disabled}
            placeholder="Acme Inc."
          />
          <p className="text-xs leading-relaxed text-muted-foreground">
            By creating an account, you agree to our{" "}
            <Link to="/terms" className="font-medium text-primary hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="font-medium text-primary hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
          <Button type="submit" className="w-full" disabled={disabled}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating account…
              </>
            ) : (
              "Create account"
            )}
          </Button>
        </form>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-primary hover:underline">
            Log in
          </Link>
        </p>
      </AuthCard>
    </AuthLayout>
  );
};

export default SignupPage;
