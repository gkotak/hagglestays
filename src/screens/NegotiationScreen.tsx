import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Hotel, NegotiationStatus } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { Phone, Loader2, CheckCircle2, XCircle, Clock, Star, TrendingDown, MessageSquare } from "lucide-react";

interface Props {
  hotels: Hotel[];
  onChooseDeal: (hotel: Hotel, negotiatedPrice: number, fee: number) => void;
}

interface HotelNeg {
  hotel: Hotel;
  status: NegotiationStatus;
  negotiatedPrice?: number;
  fee?: number;
}

const statusConfig: Record<NegotiationStatus, { label: string; color: string; icon: React.ReactNode }> = {
  queued: { label: "Queued", color: "text-muted-foreground", icon: <Clock className="h-4 w-4" /> },
  calling: { label: "Calling…", color: "text-warning", icon: <Phone className="h-4 w-4" /> },
  negotiating: { label: "Negotiating…", color: "text-primary", icon: <MessageSquare className="h-4 w-4" /> },
  awaiting_confirmation: { label: "Awaiting Confirmation", color: "text-warning", icon: <Loader2 className="h-4 w-4 animate-spin" /> },
  deal_ready: { label: "Deal Ready!", color: "text-success", icon: <CheckCircle2 className="h-4 w-4" /> },
  no_deal: { label: "No Deal", color: "text-muted-foreground", icon: <XCircle className="h-4 w-4" /> },
};

const statusSequence: NegotiationStatus[] = ["queued", "calling", "negotiating", "awaiting_confirmation"];

const NegotiationScreen = ({ hotels, onChooseDeal }: Props) => {
  const [negotiations, setNegotiations] = useState<HotelNeg[]>(
    hotels.map((h) => ({ hotel: h, status: "queued" }))
  );

  const advanceStatus = useCallback(() => {
    setNegotiations((prev) => {
      const next = [...prev];
      let changed = false;
      for (let i = 0; i < next.length; i++) {
        const n = next[i];
        if (n.status === "deal_ready" || n.status === "no_deal") continue;
        const idx = statusSequence.indexOf(n.status);
        if (idx < statusSequence.length - 1) {
          next[i] = { ...n, status: statusSequence[idx + 1] };
          changed = true;
          continue;
        }
        // Terminal: last hotel always gets no_deal, rest get deals
        const bestOta = Math.min(...n.hotel.otaPrices.map((o) => o.price));
        const isLastHotel = i === next.length - 1;
        if (isLastHotel) {
          next[i] = { ...n, status: "no_deal" };
        } else {
          const negotiatedPrice = n.hotel.estimatedNegotiatedPrice + Math.round((Math.random() - 0.5) * 10);
          const saving = bestOta - negotiatedPrice;
          const fee = Math.max(5, Math.round(saving * 0.35));
          next[i] = { ...n, status: "deal_ready", negotiatedPrice, fee };
        }
        changed = true;
      }
      return changed ? next : prev;
    });
  }, []);

  useEffect(() => {
    const allDone = negotiations.every((n) => n.status === "deal_ready" || n.status === "no_deal");
    if (allDone) return;
    const interval = setInterval(advanceStatus, 2000);
    return () => clearInterval(interval);
  }, [negotiations, advanceStatus]);

  const allDone = negotiations.every((n) => n.status === "deal_ready" || n.status === "no_deal");
  const deals = negotiations.filter((n) => n.status === "deal_ready");

  return (
    <div className="container max-w-3xl py-16">
      <p className="font-mono-nav text-primary mb-2">Step 5 of 6</p>
      <h1 className="text-3xl font-bold mb-2">Negotiation in progress</h1>
      <p className="text-muted-foreground mb-2">
        Calls typically take 5–15 minutes. Confirmation emails usually arrive within a few minutes of the call ending.
      </p>

      {allDone && deals.length > 1 && (
        <div className="mt-4 mb-6 rounded-xl bg-success/10 border border-success/20 p-4 text-center">
          <p className="text-sm font-semibold text-success">
            🎉 You have {deals.length} deals ready — pick the one you want!
          </p>
        </div>
      )}
      {allDone && deals.length === 0 && (
        <div className="mt-4 mb-6 rounded-xl bg-muted border border-border p-4 text-center">
          <p className="text-sm font-medium text-muted-foreground">
            No deals this time — no charge. <button className="text-primary underline ml-1">Search again</button>
          </p>
        </div>
      )}

      <div className="mt-6 space-y-4">
        {negotiations.map(({ hotel, status, negotiatedPrice, fee }) => {
          const bestOta = Math.min(...hotel.otaPrices.map((o) => o.price));
          const cfg = statusConfig[status];

          return (
            <div
              key={hotel.id}
              className={cn(
                "rounded-xl border-2 bg-card p-5 transition-all",
                status === "deal_ready" ? "border-success" : status === "no_deal" ? "border-border opacity-60" : "border-border"
              )}
            >
              <div className="flex items-start gap-4">
                <img src={hotel.image} alt={hotel.name} className="h-16 w-20 rounded-lg object-cover shrink-0" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{hotel.name}</h3>
                    <Badge variant="outline" className={cn("gap-1", cfg.color)}>
                      {status === "calling" && (
                        <span className="relative flex h-2.5 w-2.5 mr-1">
                          <span className="animate-pulse-ring absolute inline-flex h-full w-full rounded-full bg-warning opacity-75" />
                          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-warning" />
                        </span>
                      )}
                      {cfg.icon}
                      {cfg.label}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                    {Array.from({ length: hotel.stars }).map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-warning text-warning" />
                    ))}
                    <span className="ml-1">Best OTA: £{bestOta}</span>
                  </div>

                  {status === "deal_ready" && negotiatedPrice && fee && (
                    <div className="mt-3 flex items-center gap-6">
                      <div>
                        <p className="text-xs text-muted-foreground">Negotiated</p>
                        <p className="text-2xl font-bold text-primary">£{negotiatedPrice}</p>
                      </div>
                      <div className="flex items-center gap-1 text-sm font-medium text-success">
                        <TrendingDown className="h-4 w-4" /> Save £{bestOta - negotiatedPrice}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Fee: £{fee}
                      </div>
                    </div>
                  )}

                  {status === "deal_ready" && negotiatedPrice && fee && (
                    <Button
                      size="sm"
                      className="mt-3 bg-gradient-to-r from-primary to-primary-glow hover:opacity-90"
                      onClick={() => onChooseDeal(hotel, negotiatedPrice, fee)}
                    >
                      {deals.length === 1 ? "Confirm This Deal" : "Choose This Deal"}
                    </Button>
                  )}

                  {status === "no_deal" && (
                    <p className="mt-2 text-sm text-muted-foreground">Could not beat the OTA price — no charge.</p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NegotiationScreen;
