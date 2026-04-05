import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Phone, Mail, ArrowLeft, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({ title: "Please enter your email", variant: "destructive" });
      return;
    }
    setSent(true);
    toast({ title: "Reset link sent", description: "Check your inbox for instructions." });
  };

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
        <div className="w-full max-w-sm space-y-6">
          {!sent ? (
            <>
              <div className="text-center">
                <h1 className="text-2xl font-bold tracking-tight">Reset your password</h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Enter your email and we'll send you a reset link
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-11 pl-10"
                  />
                </div>

                <Button type="submit" className="w-full h-11 bg-gradient-to-r from-primary to-primary-glow hover:opacity-90">
                  Send reset link <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </>
          ) : (
            <div className="text-center space-y-4">
              <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold tracking-tight">Check your email</h1>
              <p className="text-sm text-muted-foreground">
                We've sent a password reset link to <strong className="text-foreground">{email}</strong>
              </p>
              <Button variant="outline" className="mt-4" onClick={() => setSent(false)}>
                Try a different email
              </Button>
            </div>
          )}

          <p className="text-center text-sm text-muted-foreground">
            <Link to="/sign-in" className="text-primary font-medium hover:underline inline-flex items-center gap-1">
              <ArrowLeft className="h-3 w-3" /> Back to sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
