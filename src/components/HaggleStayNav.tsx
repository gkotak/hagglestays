import { Phone, LogIn, LogOut, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

interface Props {
  currentStep: number;
}

const steps = ["Search", "Flexibility", "Results", "Commit", "Negotiating", "Confirmed"];

const HaggleStayNav = ({ currentStep }: Props) => {
  const { user, signOut } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Phone className="h-5 w-5 text-primary" />
          <span className="text-lg font-bold tracking-tight">Great Deal</span>
        </div>
        <nav className="hidden items-center gap-1 md:flex">
          {steps.map((s, i) => (
            <span
              key={s}
              className={`font-mono-nav px-3 py-1 rounded-full text-xs transition-colors ${
                i === currentStep
                  ? "bg-primary text-primary-foreground"
                  : i < currentStep
                  ? "text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              {s}
            </span>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          {user ? (
            <>
              <span className="text-sm text-muted-foreground hidden sm:inline">{user.email}</span>
              <button onClick={signOut} className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                Sign out
              </button>
            </>
          ) : (
            <Link to="/sign-in" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Sign in
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default HaggleStayNav;
