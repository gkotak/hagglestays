import { useState } from "react";
import { Button } from "@/components/ui/button";
import { tradeOffOptions } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { ArrowRight, Check } from "lucide-react";

interface Props {
  onContinue: (selected: string[]) => void;
}

const FlexibilityScreen = ({ onContinue }: Props) => {
  const [selected, setSelected] = useState<string[]>(["room_type", "breakfast"]);

  const toggle = (id: string) =>
    setSelected((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]));

  return (
    <div className="container max-w-2xl py-16">
      <p className="font-mono-nav text-primary mb-2">Step 2 of 6</p>
      <h1 className="text-3xl font-bold mb-2">What are you flexible on?</h1>
      <p className="text-muted-foreground mb-8">
        To negotiate the best deal for you, tell us what trade-offs you're open to.
      </p>

      <div className="space-y-3">
        {tradeOffOptions.map((opt) => {
          const active = selected.includes(opt.id);
          return (
            <button
              key={opt.id}
              onClick={() => toggle(opt.id)}
              className={cn(
                "w-full text-left rounded-xl border-2 p-5 transition-all",
                active
                  ? "border-primary bg-secondary shadow-sm"
                  : "border-border bg-card hover:border-primary/30"
              )}
            >
              <div className="flex items-start gap-4">
                <span className="text-2xl">{opt.icon}</span>
                <div className="flex-1">
                  <p className="font-semibold">{opt.label}</p>
                  <p className="text-sm text-muted-foreground mt-0.5">{opt.description}</p>
                </div>
                <div
                  className={cn(
                    "mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                    active ? "border-primary bg-primary text-primary-foreground" : "border-border"
                  )}
                >
                  {active && <Check className="h-3.5 w-3.5" />}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <p className="mt-6 text-xs text-muted-foreground">
        These trade-offs will be presented to the hotel during negotiation. You will only ever be charged for a configuration you've explicitly approved.
      </p>

      <Button
        size="lg"
        className="mt-8 w-full bg-gradient-to-r from-primary to-primary-glow hover:opacity-90"
        onClick={() => onContinue(selected)}
      >
        Show Me Hotels <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
};

export default FlexibilityScreen;
