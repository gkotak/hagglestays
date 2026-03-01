import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockHotels, Hotel } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { Star, Check, ArrowRight, TrendingDown } from "lucide-react";

interface Props {
  onSelect: (hotels: Hotel[]) => void;
}

const ResultsScreen = ({ onSelect }: Props) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggle = (id: string) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) return prev.filter((s) => s !== id);
      if (prev.length >= 3) return prev;
      return [...prev, id];
    });
  };

  const selectedHotels = mockHotels.filter((h) => selectedIds.includes(h.id));

  return (
    <div className="container max-w-4xl py-16">
      <p className="font-mono-nav text-primary mb-2">Step 3 of 6</p>
      <h1 className="text-3xl font-bold mb-1">Hotels with negotiation potential</h1>
      <p className="text-muted-foreground mb-8">
        Select up to 3 hotels. We'll negotiate all of them in parallel.
      </p>

      <div className="space-y-4">
        {mockHotels.map((hotel) => {
          const bestOta = Math.min(...hotel.otaPrices.map((o) => o.price));
          const saving = bestOta - hotel.estimatedNegotiatedPrice;
          const active = selectedIds.includes(hotel.id);

          return (
            <button
              key={hotel.id}
              onClick={() => toggle(hotel.id)}
              className={cn(
                "w-full text-left rounded-xl border-2 bg-card p-4 transition-all hover:shadow-md",
                active ? "border-primary shadow-md" : "border-border"
              )}
            >
              <div className="flex gap-4">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="h-28 w-36 rounded-lg object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-lg">{hotel.name}</h3>
                        <Badge
                          variant={hotel.negotiationPotential === "High" ? "default" : "secondary"}
                          className={hotel.negotiationPotential === "High" ? "bg-primary/10 text-primary border-0" : ""}
                        >
                          {hotel.negotiationPotential} potential
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        {Array.from({ length: hotel.stars }).map((_, i) => (
                          <Star key={i} className="h-3.5 w-3.5 fill-warning text-warning" />
                        ))}
                        <span className="ml-2">{hotel.neighbourhood} · {hotel.distance}</span>
                      </div>
                    </div>
                    <div
                      className={cn(
                        "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                        active ? "border-primary bg-primary text-primary-foreground" : "border-border"
                      )}
                    >
                      {active && <Check className="h-4 w-4" />}
                    </div>
                  </div>

                  {/* OTA prices */}
                  <div className="mt-3 flex flex-wrap gap-3 text-xs text-muted-foreground">
                    {hotel.otaPrices.map((o) => (
                      <span key={o.ota} className="flex items-center gap-1">
                        <span className="font-medium">{o.ota}:</span> £{o.price}
                      </span>
                    ))}
                  </div>

                  {/* Estimated price */}
                  <div className="mt-3 flex items-center gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">We think we can get</p>
                      <p className="text-xl font-bold text-primary">~£{hotel.estimatedNegotiatedPrice}</p>
                    </div>
                    <div className="flex items-center gap-1 rounded-full bg-success/10 px-3 py-1 text-sm font-medium text-success">
                      <TrendingDown className="h-3.5 w-3.5" /> Save ~£{saving}
                    </div>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Sticky footer */}
      {selectedIds.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 border-t border-border bg-card/95 backdrop-blur p-4 shadow-lg z-40">
          <div className="container max-w-4xl flex items-center justify-between">
            <p className="text-sm font-medium">
              {selectedIds.length} hotel{selectedIds.length > 1 ? "s" : ""} selected
            </p>
            <Button
              className="bg-gradient-to-r from-primary to-primary-glow hover:opacity-90"
              onClick={() => onSelect(selectedHotels)}
            >
              Negotiate These Hotels <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultsScreen;
