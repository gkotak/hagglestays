import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CalendarIcon, Search, Phone, Clock, Bed, CalendarDays, Gift } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import heroResort from "@/assets/hero-resort.jpg";

interface Props {
  onSearch: () => void;
}

type DealType = "last-minute" | "multi-room" | "long-stay";

const dealTabs: {
  value: DealType;
  label: string;
  shortLabel: string;
  icon: typeof Clock;
  tagline: string;
}[] = [
  {
    value: "last-minute",
    label: "Last-minute",
    shortLabel: "Last-minute",
    icon: Clock,
    tagline: "Travelling in the next 7 days — hotels would rather discount than have an empty room.",
  },
  {
    value: "multi-room",
    label: "Multi-room",
    shortLabel: "Multi-room",
    icon: Bed,
    tagline: "Booking 2 or more rooms — bigger booking, bigger leverage.",
  },
  {
    value: "long-stay",
    label: "Long-stay",
    shortLabel: "Long-stay",
    icon: CalendarDays,
    tagline: "Staying 10 nights or more — long bookings unlock the best rates.",
  },
];

const SearchScreen = ({ onSearch }: Props) => {
  const { user } = useAuth();
  const [dealType, setDealType] = useState<DealType>("last-minute");
  const [destination, setDestination] = useState("London");
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [guests, setGuests] = useState("2 Guests, 1 Room");
  const [rooms, setRooms] = useState("2 Rooms, 4 Guests");

  const activeTab = dealTabs.find((t) => t.value === dealType)!;

  // Per-tab calendar constraints
  const today = new Date();
  const sevenDaysOut = new Date();
  sevenDaysOut.setDate(today.getDate() + 7);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-50 py-5">
        <div className="container flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Phone className="h-5 w-5 text-primary-foreground" />
            <span className="text-lg font-bold tracking-tight text-primary-foreground">Great Deal</span>
          </div>
          {!user && (
            <Link to="/sign-in" className="text-sm font-medium text-primary-foreground/90 hover:text-primary-foreground transition-colors">
              Sign in
            </Link>
          )}
        </div>
      </header>

      {/* Hero */}
      <section
        className="relative flex flex-col justify-end pb-32 pt-32 md:pt-40 md:pb-40"
        style={{
          backgroundImage: `url(${heroResort})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/70 via-foreground/50 to-foreground/80" />
        <div className="relative z-10 container">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight md:text-6xl text-primary-foreground">
              We call the hotel.{" "}
              <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                You get a better price.
              </span>
            </h1>
            <p className="mt-4 text-lg text-primary-foreground/80 max-w-2xl">
              We negotiate directly with hotels, and only charge a small fee if they agree to a better price
            </p>
          </div>
        </div>
      </section>

      {/* Search bar with deal-type tabs straddling hero/content border */}
      <div className="relative z-20 container -mt-16">
        <Tabs value={dealType} onValueChange={(v) => setDealType(v as DealType)}>
          {/* Tab triggers — sit on top of the card, prominent */}
          <TabsList className="h-auto bg-transparent p-0 gap-1 rounded-none w-full justify-start flex-wrap">
            {dealTabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className={cn(
                    "rounded-t-xl rounded-b-none border border-b-0 border-border/40 px-4 sm:px-6 py-3 gap-2",
                    "data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-none",
                    "data-[state=inactive]:bg-foreground/30 data-[state=inactive]:text-primary-foreground data-[state=inactive]:backdrop-blur-sm data-[state=inactive]:border-primary-foreground/10",
                    "text-sm sm:text-base font-semibold transition-all"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {/* Card */}
          <div className="rounded-xl rounded-tl-none border border-border bg-card p-4 sm:p-5 shadow-xl">
            <p className="text-sm text-muted-foreground mb-4 flex items-start gap-2">
              <activeTab.icon className="h-4 w-4 text-primary mt-0.5 shrink-0" />
              <span>{activeTab.tagline}</span>
            </p>

            {/* Last-minute search */}
            <TabsContent value="last-minute" className="mt-0">
              <div className="flex flex-col md:flex-row gap-2 items-stretch">
                <div className="flex-1 min-w-0">
                  <Input
                    placeholder="Where are you going?"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="h-12 border-0 bg-muted/50 focus-visible:ring-1"
                  />
                </div>
                <div className="flex gap-2 flex-1">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className={cn("flex-1 h-12 justify-start font-normal bg-muted/50 border-0", !checkIn && "text-muted-foreground")}>
                        <CalendarIcon className="mr-2 h-4 w-4 shrink-0" />
                        <span className="truncate">{checkIn ? format(checkIn, "MMM d") : "Check-in (within 7 days)"}</span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={checkIn}
                        onSelect={setCheckIn}
                        className="p-3 pointer-events-auto"
                        disabled={{ before: today, after: sevenDaysOut }}
                      />
                    </PopoverContent>
                  </Popover>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className={cn("flex-1 h-12 justify-start font-normal bg-muted/50 border-0", !checkOut && "text-muted-foreground")}>
                        <CalendarIcon className="mr-2 h-4 w-4 shrink-0" />
                        <span className="truncate">{checkOut ? format(checkOut, "MMM d") : "Check-out"}</span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={checkOut} onSelect={setCheckOut} className="p-3 pointer-events-auto" disabled={{ before: checkIn || today }} />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="flex-1 min-w-0">
                  <Input value={guests} onChange={(e) => setGuests(e.target.value)} className="h-12 border-0 bg-muted/50 focus-visible:ring-1" />
                </div>
                <Button
                  size="lg"
                  className="h-12 px-8 text-base bg-gradient-to-r from-primary to-primary-glow hover:opacity-90 transition-opacity shrink-0"
                  onClick={onSearch}
                >
                  <Search className="mr-2 h-5 w-5" /> Search
                </Button>
              </div>
            </TabsContent>

            {/* Multi-room search */}
            <TabsContent value="multi-room" className="mt-0">
              <div className="flex flex-col md:flex-row gap-2 items-stretch">
                <div className="flex-1 min-w-0">
                  <Input
                    placeholder="Where are you going?"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="h-12 border-0 bg-muted/50 focus-visible:ring-1"
                  />
                </div>
                <div className="flex gap-2 flex-1">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className={cn("flex-1 h-12 justify-start font-normal bg-muted/50 border-0", !checkIn && "text-muted-foreground")}>
                        <CalendarIcon className="mr-2 h-4 w-4 shrink-0" />
                        <span className="truncate">{checkIn ? format(checkIn, "MMM d") : "Check-in"}</span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={checkIn} onSelect={setCheckIn} className="p-3 pointer-events-auto" disabled={{ before: today }} />
                    </PopoverContent>
                  </Popover>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className={cn("flex-1 h-12 justify-start font-normal bg-muted/50 border-0", !checkOut && "text-muted-foreground")}>
                        <CalendarIcon className="mr-2 h-4 w-4 shrink-0" />
                        <span className="truncate">{checkOut ? format(checkOut, "MMM d") : "Check-out"}</span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={checkOut} onSelect={setCheckOut} className="p-3 pointer-events-auto" disabled={{ before: checkIn || today }} />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="flex-1 min-w-0">
                  <Input
                    value={rooms}
                    onChange={(e) => setRooms(e.target.value)}
                    placeholder="Rooms (2+)"
                    className="h-12 border-0 bg-muted/50 focus-visible:ring-1"
                  />
                </div>
                <Button
                  size="lg"
                  className="h-12 px-8 text-base bg-gradient-to-r from-primary to-primary-glow hover:opacity-90 transition-opacity shrink-0"
                  onClick={onSearch}
                >
                  <Search className="mr-2 h-5 w-5" /> Search
                </Button>
              </div>
            </TabsContent>

            {/* Long-stay search */}
            <TabsContent value="long-stay" className="mt-0">
              <div className="flex flex-col md:flex-row gap-2 items-stretch">
                <div className="flex-1 min-w-0">
                  <Input
                    placeholder="Where are you going?"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="h-12 border-0 bg-muted/50 focus-visible:ring-1"
                  />
                </div>
                <div className="flex gap-2 flex-1">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className={cn("flex-1 h-12 justify-start font-normal bg-muted/50 border-0", !checkIn && "text-muted-foreground")}>
                        <CalendarIcon className="mr-2 h-4 w-4 shrink-0" />
                        <span className="truncate">{checkIn ? format(checkIn, "MMM d") : "Check-in"}</span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={checkIn} onSelect={setCheckIn} className="p-3 pointer-events-auto" disabled={{ before: today }} />
                    </PopoverContent>
                  </Popover>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className={cn("flex-1 h-12 justify-start font-normal bg-muted/50 border-0", !checkOut && "text-muted-foreground")}>
                        <CalendarIcon className="mr-2 h-4 w-4 shrink-0" />
                        <span className="truncate">{checkOut ? format(checkOut, "MMM d") : "Check-out (10+ nights)"}</span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={checkOut}
                        onSelect={setCheckOut}
                        className="p-3 pointer-events-auto"
                        disabled={{
                          before: checkIn
                            ? new Date(checkIn.getTime() + 10 * 24 * 60 * 60 * 1000)
                            : new Date(today.getTime() + 10 * 24 * 60 * 60 * 1000),
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="flex-1 min-w-0">
                  <Input value={guests} onChange={(e) => setGuests(e.target.value)} className="h-12 border-0 bg-muted/50 focus-visible:ring-1" />
                </div>
                <Button
                  size="lg"
                  className="h-12 px-8 text-base bg-gradient-to-r from-primary to-primary-glow hover:opacity-90 transition-opacity shrink-0"
                  onClick={onSearch}
                >
                  <Search className="mr-2 h-5 w-5" /> Search
                </Button>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>

      {/* Value prop cards */}
      <section className="bg-background pt-16 pb-12">
        <div className="container">
          <h2 className="text-xl font-bold mb-1">Hotels pay OTAs up to 25% commission</h2>
          <p className="text-sm text-muted-foreground mb-6">So there is wiggle room — we focus on the three booking types where hotels have the most to gain:</p>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
            {[
              {
                icon: <Clock className="h-7 w-7 text-primary" />,
                title: "Last-minute bookings",
                desc: "Travelling in the next 7 days — empty rooms tonight earn the hotel nothing.",
              },
              {
                icon: <Bed className="h-7 w-7 text-primary" />,
                title: "Multi-room bookings",
                desc: "Booking 2 or more rooms — larger bookings give us real leverage.",
              },
              {
                icon: <CalendarDays className="h-7 w-7 text-primary" />,
                title: "Long-stay bookings",
                desc: "Staying 10 nights or more — long stays are the most negotiable rate of all.",
              },
            ].map((card, i) => (
              <div key={i} className="rounded-xl border border-border bg-card p-5">
                <div className="mb-3">{card.icon}</div>
                <p className="text-base font-semibold text-foreground mb-1">{card.title}</p>
                <p className="text-sm text-muted-foreground">{card.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-xl border border-dashed border-border bg-muted/40 p-4 flex items-start gap-3">
            <Gift className="h-5 w-5 text-primary mt-0.5 shrink-0" />
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">No room-rate savings?</span>{" "}
              Hotels often throw in upgrades, dining credit, or late check-out instead.
            </p>
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
              { icon: <CalendarDays className="h-6 w-6" />, title: "You commit if we hit target", desc: "Set your target price — you only buy if we match or beat it. No risk." },
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
