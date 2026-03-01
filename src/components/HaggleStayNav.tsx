import { Phone } from "lucide-react";

interface Props {
  currentStep: number;
}

const steps = ["Search", "Flexibility", "Results", "Commit", "Negotiating", "Confirmed"];

const HaggleStayNav = ({ currentStep }: Props) => (
  <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
    <div className="container flex h-16 items-center justify-between">
      <div className="flex items-center gap-2">
        <Phone className="h-5 w-5 text-primary" />
        <span className="text-lg font-bold tracking-tight">HaggleStay</span>
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
    </div>
  </header>
);

export default HaggleStayNav;
