import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Hotel } from "@/data/mockData";
import { CreditCard, Mail, Shield, ArrowRight, Star } from "lucide-react";

interface Props {
  hotels: Hotel[];
  tradeOffs: string[];
  onCommit: () => void;
}

const tradeOffLabels: Record<string, string> = {
  room_type: "Room type flexibility",
  breakfast: "Skip breakfast",
  non_refundable: "Non-refundable rate",
  checkin_checkout: "No early/late check-in/out",
  loyalty: "No loyalty points",
};

const CommitmentScreen = ({ hotels, tradeOffs, onCommit }: Props) => {
  const [agreed, setAgreed] = useState(false);
  const [email, setEmail] = useState("");
  const [targets, setTargets] = useState<Record<string, number>>(
    Object.fromEntries(hotels.map((h) => [h.id, h.estimatedNegotiatedPrice]))
  );

  return (
    <div className="container max-w-3xl py-16">
      <p className="font-mono-nav text-primary mb-2">Step 4 of 6</p>
      <h1 className="text-3xl font-bold mb-2">Set your targets & commit</h1>
      <p className="text-muted-foreground mb-8">
        If we hit your target price or better, you agree to purchase. No surprises.
      </p>

      <div className="space-y-6">
        {hotels.map((hotel) => {
          const bestOta = Math.min(...hotel.otaPrices.map((o) => o.price));
          const minTarget = Math.round(bestOta * 0.65);
          const maxTarget = bestOta - 5;

          return (
            <div key={hotel.id} className="rounded-xl border border-border bg-card p-6">
              <div className="flex items-start gap-4 mb-4">
                <img src={hotel.image} alt={hotel.name} className="h-16 w-20 rounded-lg object-cover" />
                <div>
                  <h3 className="font-semibold text-lg">{hotel.name}</h3>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    {Array.from({ length: hotel.stars }).map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-warning text-warning" />
                    ))}
                  </div>
                </div>
                <div className="ml-auto text-right">
                  <p className="text-xs text-muted-foreground">Best OTA</p>
                  <p className="text-lg font-semibold line-through text-muted-foreground">£{bestOta}</p>
                </div>
              </div>

              <div className="mb-3">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium">Your target price</label>
                  <span className="text-2xl font-bold text-primary">£{targets[hotel.id]}</span>
                </div>
                <Slider
                  min={minTarget}
                  max={maxTarget}
                  step={1}
                  value={[targets[hotel.id]]}
                  onValueChange={([v]) => setTargets((p) => ({ ...p, [hotel.id]: v }))}
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>£{minTarget}</span>
                  <span>£{maxTarget}</span>
                </div>
              </div>

              <p className="text-xs text-muted-foreground">
                Trade-offs offered: {tradeOffs.map((t) => tradeOffLabels[t] || t).join(", ")}
              </p>
              <p className="mt-2 text-sm font-medium text-foreground">
                If we secure £{targets[hotel.id]} or better, you agree to purchase.
              </p>
            </div>
          );
        })}
      </div>

      {/* Payment + Email */}
      <div className="mt-8 space-y-4">
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <CreditCard className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Payment details</h3>
          </div>
          <p className="text-xs text-muted-foreground mb-4">
            Your card will only be charged for HaggleStay's success fee. You pay the hotel directly.
          </p>
          <div className="grid gap-3 md:grid-cols-2">
            <Input placeholder="Card number" className="h-11" defaultValue="4242 4242 4242 4242" />
            <div className="flex gap-3">
              <Input placeholder="MM/YY" className="h-11" defaultValue="12/27" />
              <Input placeholder="CVC" className="h-11" defaultValue="123" />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <Mail className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Your email</h3>
          </div>
          <Input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-11"
          />
        </div>
      </div>

      {/* Transparency */}
      <div className="mt-6 rounded-xl border border-border bg-muted/50 p-5">
        <div className="flex items-start gap-3">
          <Shield className="h-5 w-5 text-primary mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-semibold mb-1">How booking completion works</p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              When we secure your deal, we give the hotel a HaggleStay email address to send your confirmation to.
              We'll forward it to you immediately, wrapped with your deal summary and our fee.
              You then complete payment directly with the hotel using the link or instructions in that email — we never touch your hotel payment.
            </p>
          </div>
        </div>
      </div>

      {/* Commitment checkbox */}
      <div className="mt-6 flex items-start gap-3">
        <Checkbox
          id="commit"
          checked={agreed}
          onCheckedChange={(v) => setAgreed(!!v)}
          className="mt-0.5"
        />
        <label htmlFor="commit" className="text-sm leading-relaxed cursor-pointer">
          I understand that if HaggleStay secures the target price or better, I am committed to completing the purchase.
        </label>
      </div>

      <Button
        size="lg"
        className="mt-8 w-full bg-gradient-to-r from-primary to-primary-glow hover:opacity-90"
        disabled={!agreed}
        onClick={onCommit}
      >
        Commit & Start Negotiating <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
};

export default CommitmentScreen;
