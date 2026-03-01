import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Search, Phone, Zap, Shield, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import heroResort from "@/assets/hero-resort.jpg";

interface Props {
  onSearch: () => void;
}

const SearchScreen = ({ onSearch }: Props) => {
  const [mode, setMode] = useState<"lastminute" | "standard">("lastminute");
  const [destination, setDestination] = useState("London");
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [guests, setGuests] = useState("2 Guests, 1 Room");

  return (
    <div className="min-h-screen">
      {/* Branded top bar for search page */}
      <header className="absolute top-0 left-0 right-0 z-50 py-5">
        <div className="container flex items-center gap-2">
          <Phone className="h-5 w-5 text-primary-foreground" />
          <span className="text-lg font-bold tracking-tight text-primary-foreground">HaggleStay</span>
        </div>
      </header>

      {/* Hero with background image */}
      <section
        className="relative flex items-center justify-center py-28 md:py-40"
        style={{
          backgroundImage: `url(${heroResort})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/60 via-foreground/40 to-foreground/70" />
        <div className="relative z-10 container">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono-nav mb-4 text-primary-foreground/80">AI-Powered Hotel Negotiation</p>
            <h1 className="text-5xl font-extrabold leading-[1.08] tracking-tight md:text-7xl text-primary-foreground">
              We call the hotel.{" "}
              <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                You get a better price.
              </span>
            </h1>
            <p className="mt-6 text-lg text-primary-foreground/80 max-w-xl mx-auto">
              Hotels pay OTAs up to 20% commission. We negotiate directly so you pocket the savings — and only charge if we win.
            </p>
          </div>

        {/* Search Card */}
        <div className="mx-auto mt-12 max-w-2xl rounded-2xl border border-border bg-card p-6 shadow-lg">
          {/* Mode Toggle */}
          <div className="mb-6 flex rounded-lg bg-muted p-1">
            <button
              onClick={() => setMode("lastminute")}
              className={cn(
                "flex-1 rounded-md py-2.5 text-sm font-medium transition-all",
                mode === "lastminute"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Zap className="inline h-4 w-4 mr-1 -mt-0.5" /> Last-Minute Mode
            </button>
            <button
              onClick={() => setMode("standard")}
              className={cn(
                "flex-1 rounded-md py-2.5 text-sm font-medium transition-all",
                mode === "standard"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Standard Mode
            </button>
          </div>
          {mode === "lastminute" && (
            <p className="mb-4 rounded-md bg-secondary px-3 py-2 text-xs text-primary font-medium">
              ⚡ Highest success rate — unsold rooms within 72 hours are highly negotiable.
            </p>
          )}

          <div className="grid gap-3 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Destination</label>
              <Input
                placeholder="City or neighbourhood"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="h-12"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Check-in</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className={cn("w-full h-12 justify-start font-normal", !checkIn && "text-muted-foreground")}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {checkIn ? format(checkIn, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" selected={checkIn} onSelect={setCheckIn} className="p-3 pointer-events-auto" />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Check-out</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className={cn("w-full h-12 justify-start font-normal", !checkOut && "text-muted-foreground")}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {checkOut ? format(checkOut, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" selected={checkOut} onSelect={setCheckOut} className="p-3 pointer-events-auto" />
                </PopoverContent>
              </Popover>
            </div>
            <div className="md:col-span-2">
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Guests & Rooms</label>
              <Input value={guests} onChange={(e) => setGuests(e.target.value)} className="h-12" />
            </div>
          </div>

          <Button
            size="lg"
            className="mt-6 w-full h-13 text-base bg-gradient-to-r from-primary to-primary-glow hover:opacity-90 transition-opacity"
            onClick={onSearch}
          >
            <Search className="mr-2 h-5 w-5" /> Find Deals We Can Negotiate
          </Button>
        </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-border bg-muted/50 py-20">
        <div className="container">
          <p className="font-mono-nav text-center text-primary mb-2">How it works</p>
          <h2 className="text-3xl font-bold text-center mb-12">Three steps to a better rate</h2>
          <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-3">
            {[
              { icon: <Search className="h-6 w-6" />, title: "We find the opportunity", desc: "We identify hotels where there's room to beat the best published OTA price." },
              { icon: <Shield className="h-6 w-6" />, title: "You commit if we hit target", desc: "Set your target price — you only buy if we match or beat it. No risk." },
              { icon: <Phone className="h-6 w-6" />, title: "We call & negotiate", desc: "Our AI agent phones the hotel directly and negotiates your rate. You only pay if we win." },
            ].map((step, i) => (
              <div key={i} className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  {step.icon}
                </div>
                <h3 className="mb-2 text-lg font-semibold">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SearchScreen;
