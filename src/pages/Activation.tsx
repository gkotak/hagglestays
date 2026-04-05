import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Phone, Mail, ArrowRight } from "lucide-react";

const Activation = () => {
  const location = useLocation();
  const email = (location.state as { email?: string })?.email || "your email";

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center">
          <Link to="/" className="flex items-center gap-2">
            <Phone className="h-5 w-5 text-primary" />
            <span className="text-lg font-bold tracking-tight">HaggleStay</span>
          </Link>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm space-y-6 text-center">
          <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
            <Mail className="h-8 w-8 text-primary" />
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-tight">Verify your email</h1>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
              We've sent a verification link to{" "}
              <strong className="text-foreground">{email}</strong>.
              <br />
              Click the link in the email to activate your account.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-muted/50 p-4 text-left">
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Didn't receive it?</strong> Check your spam folder
              or wait a few minutes. The activation link expires in 24 hours.
            </p>
          </div>

          <div className="space-y-3">
            <Button variant="outline" className="w-full h-11" disabled>
              Resend verification email
            </Button>
            <Link to="/sign-in">
              <Button variant="ghost" className="w-full h-11 text-primary">
                Back to sign in <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activation;
