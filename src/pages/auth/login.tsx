import { useState } from "react";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import AuthLayout from "@/layouts/AuthLayout";
import { AuthCard, AuthHeader, AuthInput } from "@/components/auth";
import { validateEmail } from "@/pages/auth/authValidation";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; form?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    const em = validateEmail(email);
    if (em) next.email = em;
    if (!password.trim()) next.password = "Password is required";
    if (Object.keys(next).length) {
      setErrors(next);
      return;
    }
    setErrors({});
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      if (email.toLowerCase() === "error@example.com") {
        setErrors({ form: "Invalid email or password. Please try again." });
      }
    }, 900);
  };

  const disabled = loading;

  return (
    <AuthLayout>
      <AuthCard>
        <AuthHeader
          title="Sign in"
          description="Enter your credentials to access your workspace."
        />
        {errors.form ? (
          <div
            className="mb-4 rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-center text-sm text-destructive"
            role="alert"
          >
            {errors.form}
          </div>
        ) : null}
        <form onSubmit={handleSubmit} className="space-y-4">
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
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
            disabled={disabled}
            placeholder="••••••••"
          />
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={remember}
                onCheckedChange={(v) => setRemember(v === true)}
                disabled={disabled}
              />
              <Label
                htmlFor="remember"
                className="text-sm font-normal text-muted-foreground cursor-pointer"
              >
                Remember me
              </Label>
            </div>
            <Link
              to="/forgot-password"
              className="text-sm font-medium text-primary hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <Button type="submit" className="w-full" disabled={disabled}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in…
              </>
            ) : (
              "Log in"
            )}
          </Button>
        </form>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="font-medium text-primary hover:underline">
            Sign up
          </Link>
        </p>
      </AuthCard>
    </AuthLayout>
  );
};

export default LoginPage;
