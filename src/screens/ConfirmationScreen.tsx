import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Hotel } from "@/data/mockData";
import { CheckCircle2, Mail, ExternalLink, Star, Phone } from "lucide-react";

interface Props {
  hotel: Hotel;
  negotiatedPrice: number;
  fee: number;
  onRestart: () => void;
}

const ConfirmationScreen = ({ hotel, negotiatedPrice, fee, onRestart }: Props) => {
  const [showEmail, setShowEmail] = useState(false);
  const bestOta = Math.min(...hotel.otaPrices.map((o) => o.price));
  const grossSaving = bestOta - negotiatedPrice;
  const netSaving = grossSaving - fee;

  return (
    <div className="container max-w-2xl py-16">
      <div className="text-center mb-10">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
          <CheckCircle2 className="h-8 w-8 text-success" />
        </div>
        <p className="font-mono-nav text-primary mb-2">Booking Confirmed</p>
        <h1 className="text-3xl font-bold">Your deal is secured!</h1>
        <p className="text-muted-foreground mt-2">
          We've sent the booking details to your inbox. Complete your payment directly with the hotel.
        </p>
      </div>

      {/* Deal summary */}
      <div className="rounded-2xl border border-border bg-card p-6 mb-6">
        <div className="flex items-start gap-4 mb-6">
          <img src={hotel.image} alt={hotel.name} className="h-20 w-28 rounded-xl object-cover" />
          <div>
            <h2 className="text-xl font-bold">{hotel.name}</h2>
            <div className="flex items-center gap-1 mt-1">
              {Array.from({ length: hotel.stars }).map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-warning text-warning" />
              ))}
              <span className="text-sm text-muted-foreground ml-2">{hotel.neighbourhood}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="rounded-xl bg-muted p-4">
            <p className="text-xs text-muted-foreground">Negotiated rate</p>
            <p className="text-3xl font-bold text-primary">£{negotiatedPrice}</p>
          </div>
          <div className="rounded-xl bg-muted p-4">
            <p className="text-xs text-muted-foreground">Best OTA price</p>
            <p className="text-3xl font-bold line-through text-muted-foreground">£{bestOta}</p>
          </div>
        </div>

        <div className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between py-2 border-b border-border">
            <span className="text-muted-foreground">Gross saving</span>
            <span className="font-semibold text-success">£{grossSaving}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-border">
            <span className="text-muted-foreground">Great Deal fee</span>
            <span className="font-semibold">£{fee}</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="font-semibold">Your net saving</span>
            <span className="text-lg font-bold text-success">£{netSaving}</span>
          </div>
        </div>
      </div>

      <Button
        variant="outline"
        className="w-full gap-2"
        onClick={() => setShowEmail(true)}
      >
        <Mail className="h-4 w-4" /> Preview Confirmation Email
      </Button>

      {/* Email preview modal inline */}
      {showEmail && (
        <div className="mt-6 rounded-2xl border border-border bg-card overflow-hidden">
          <div className="bg-muted px-6 py-3 border-b border-border">
            <p className="text-xs text-muted-foreground font-mono-nav">Email Preview</p>
            <p className="text-sm font-semibold mt-1">
              Subject: Your Great Deal booking is confirmed — {hotel.name}
            </p>
          </div>
          <div className="p-6 text-sm space-y-4 leading-relaxed">
            <p>Great news — we secured your rate. Here's what we got you:</p>
            <div className="rounded-lg bg-muted p-4 space-y-1 text-sm">
              <p><strong>Hotel:</strong> {hotel.name}</p>
              <p><strong>Dates:</strong> 3 Mar → 5 Mar 2026</p>
              <p><strong>Negotiated rate:</strong> £{negotiatedPrice} (vs £{bestOta} on {hotel.otaPrices[0].ota})</p>
              <p><strong>You saved:</strong> £{grossSaving}</p>
              <p><strong>HaggleStay fee</strong> (charged to your card on file): £{fee}</p>
              <p className="text-success font-semibold">You're still £{netSaving} ahead of the best OTA price.</p>
            </div>
            <p>
              To complete your booking, use the hotel's confirmation below. It contains payment instructions
              or a booking link direct from the hotel. Complete it promptly — your rate is held but not guaranteed indefinitely.
            </p>

            <div className="border-t-2 border-dashed border-border my-4" />

            <div className="rounded-lg border border-border p-4 space-y-2 text-sm bg-muted/50">
              <p className="font-mono-nav text-xs text-muted-foreground mb-2">Hotel's Original Confirmation</p>
              <p><strong>Booking Ref:</strong> HSK-{Math.random().toString(36).substring(2, 8).toUpperCase()}</p>
              <p><strong>Room:</strong> Superior Double Room</p>
              <p><strong>Rate:</strong> £{negotiatedPrice} total (non-refundable)</p>
              <p><strong>Check-in:</strong> 3 Mar 2026, from 15:00</p>
              <p><strong>Check-out:</strong> 5 Mar 2026, by 11:00</p>
              <p><strong>Cancellation:</strong> Non-refundable — no cancellation allowed</p>
              <p className="flex items-center gap-2">
                <strong>Hotel contact:</strong> +44 20 7890 1234
              </p>
              <Button variant="outline" size="sm" className="mt-2 gap-1">
                <ExternalLink className="h-3.5 w-3.5" /> Complete Payment on Hotel Website
              </Button>
            </div>

            <p className="text-xs text-muted-foreground">
              Questions? Reply to this email or contact us at support@hagglestay.com
            </p>
          </div>
        </div>
      )}

      <div className="mt-8 text-center">
        <Button variant="ghost" className="text-primary" onClick={onRestart}>
          Search for another deal
        </Button>
      </div>
    </div>
  );
};

export default ConfirmationScreen;
