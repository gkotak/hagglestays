import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Phone,
  Search,
  Chrome,
  Clock,
  Bed,
  CalendarDays,
  Building2,
  ArrowRight,
  CheckCircle,
  PhoneCall,
  Mail,
  Sparkles,
} from "lucide-react";
import heroResort from "@/assets/hero-resort.jpg";

const dealTypes = [
  {
    icon: Clock,
    title: "Last-minute stays",
    desc: "Booking within the next 7 days. Empty rooms are perishable. Hotels know it.",
  },
  {
    icon: Bed,
    title: "Multi-room bookings",
    desc: "Travelling with two rooms or more? Your volume is leverage.",
  },
  {
    icon: CalendarDays,
    title: "Long stays",
    desc: "10 nights or longer. Hotels would rather lock in a guest than gamble on availability.",
  },
  {
    icon: Building2,
    title: "Boutique hotels",
    desc: "Smaller, independent properties run by people with the authority to make a deal. No call centres. No rate cards. Just a conversation.",
  },
];

const howItWorks = [
  {
    num: "1",
    icon: Search,
    title: "Search or browse as normal",
    desc: "Use our site to search last-minute, multi-room, long-stay, or boutique hotels — or activate our Chrome extension while you're already on Booking.com or Expedia.",
  },
  {
    num: "2",
    icon: CheckCircle,
    title: "Pick up to five hotels you like",
    desc: "We show you published rates across every travel booking site. Select the ones you're interested in and tell us what you're flexible on — room type, breakfast, non-refundable rates.",
  },
  {
    num: "3",
    icon: PhoneCall,
    title: "We call. You wait.",
    desc: "Our AI agent calls each hotel directly, references the best available rate online, and negotiates something better on your behalf. Calls typically take 10–15 minutes.",
  },
  {
    num: "4",
    icon: Mail,
    title: "We send you the deal",
    desc: "If we secure a better rate, we forward you the hotel's booking confirmation with everything you need to complete the reservation directly with the property. No middlemen. No markups on the room itself.",
  },
  {
    num: "5",
    icon: Sparkles,
    title: "You only pay us if we win",
    desc: "Great Deal takes a small percentage of whatever we save you. If we don't beat the published price, you owe us nothing.",
  },
];

const faqs = [
  {
    q: "How much do you charge?",
    a: "Right now, Great Deal is completely free. Over time, we'll introduce a success-only fee — 25% of whatever we save you compared to the lowest price on any travel booking site. You'll always come out ahead, and if we don't beat the published price, you pay nothing.",
  },
  {
    q: "Do hotels actually negotiate?",
    a: "Independent and boutique hotels regularly do — especially for last-minute stays, longer bookings, and multi-room requests. They'd rather fill a room at a small discount than leave it empty at full price. We've built our product around exactly those moments.",
  },
  {
    q: "What if you can't get a better price?",
    a: "You owe us nothing. We only take a fee when we save you money, and you'll always come out ahead of the best published price even after our cut.",
  },
  {
    q: "How do you complete the booking?",
    a: "When we secure a deal, the hotel sends a booking confirmation directly to you with payment instructions. You pay the hotel directly — we never handle your room payment.",
  },
  {
    q: "What kinds of hotels do you negotiate with?",
    a: "Independent and boutique hotels where a real person answers the phone and has the authority to make a deal. We don't chase chain hotel call centres — their reservations agents can't move on price.",
  },
];

const downloadExtension = () => {
  fetch("/hagglestay-extension.zip")
    .then((r) => {
      if (!r.ok) throw new Error("Download failed");
      return r.blob();
    })
    .then((blob) => {
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "greatdeal-extension.zip";
      a.click();
      URL.revokeObjectURL(a.href);
    })
    .catch((e) => alert(e.message));
};

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-50 py-5">
        <div className="container flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Phone className="h-5 w-5 text-primary-foreground" />
            <span className="text-lg font-bold tracking-tight text-primary-foreground">
              Great Deal
            </span>
          </div>
          <div className="flex items-center gap-6">
            <Link
              to="/extension"
              className="hidden sm:inline text-sm font-medium text-primary-foreground/90 hover:text-primary-foreground transition-colors"
            >
              Chrome extension
            </Link>
            <Link
              to="/sign-in"
              className="text-sm font-medium text-primary-foreground/90 hover:text-primary-foreground transition-colors"
            >
              Sign in
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section
        className="relative flex flex-col justify-end pb-28 pt-32 md:pt-44 md:pb-36"
        style={{
          backgroundImage: `url(${heroResort})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/60 via-foreground/40 to-foreground/70" />
        <div className="relative z-10 container">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight md:text-6xl text-primary-foreground">
              We call the hotel.{" "}
              <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                You get a rate that's not listed anywhere.
              </span>
            </h1>
            <p className="mt-6 text-lg text-primary-foreground/85 max-w-2xl">
              Hotels pay travel booking sites like Booking.com and Expedia a 20% cut on every
              reservation. So they're willing to negotiate — they just won't advertise it. Great
              Deal's AI agent calls independent hotels directly and gets you a better deal.{" "}
              <span className="font-semibold text-primary-foreground">You only pay us if we win.</span>
            </p>

            <p className="mt-8 text-sm font-medium text-primary-foreground/70">
              Two ways to use Great Deal:
            </p>
            <div className="mt-3 flex flex-col sm:flex-row gap-3">
              <Button
                asChild
                size="lg"
                className="h-14 px-8 text-base bg-gradient-to-r from-primary to-primary-glow hover:opacity-90 transition-opacity"
              >
                <Link to="/search">
                  <Search className="mr-2 h-5 w-5" />
                  Search our site
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-14 px-8 text-base border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                onClick={downloadExtension}
              >
                <Chrome className="mr-2 h-5 w-5" />
                Add to Chrome — works on Booking.com & Expedia
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Built for the bookings where it matters most */}
      <section className="bg-background py-20">
        <div className="container">
          <div className="max-w-2xl mb-12">
            <p className="text-sm font-medium text-primary mb-3">Where we win</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Built for the bookings where it matters most
            </h2>
            <p className="text-muted-foreground text-lg">
              Negotiation works best when hotels are motivated to deal. That's why Great Deal
              focuses on four situations where you're most likely to win.
            </p>
          </div>
          <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {dealTypes.map((d) => (
              <div
                key={d.title}
                className="rounded-2xl border border-border bg-card p-6 hover:border-primary/40 transition-colors"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                  <d.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{d.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-border bg-muted/40 py-20">
        <div className="container">
          <div className="max-w-2xl mb-12">
            <p className="text-sm font-medium text-primary mb-3">How it works</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              From search to confirmation in five steps
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
            {howItWorks.map((step) => (
              <div key={step.num} className="relative">
                <div className="rounded-2xl border border-border bg-card p-6 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">
                      {step.num}
                    </div>
                    <step.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why it works */}
      <section className="bg-background py-20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <p className="text-sm font-medium text-primary mb-3">Why it works</p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
                The 20% gap travel sites don't talk about
              </h2>
            </div>
            <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
              <p>
                Hotels set the same price across Booking.com, Expedia, and every other travel site
                because they have to. But that price includes the platform's commission — typically{" "}
                <span className="text-foreground font-semibold">15 to 25 percent</span>. Call the
                hotel directly, and suddenly there's room to move.
              </p>
              <p>
                Most people don't make that call.{" "}
                <span className="text-foreground font-semibold">Great Deal does it for you</span> —
                automatically, intelligently, and only for hotels where we think we can actually
                win.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Chrome extension */}
      <section className="border-t border-border bg-gradient-to-br from-primary/5 via-background to-background py-20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1.5 mb-5">
                <Chrome className="h-4 w-4 text-primary" />
                <span className="text-xs font-medium text-primary">Chrome extension</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-5">
                Already browsing Booking.com or Expedia?
              </h2>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                Add Great Deal to Chrome and we'll appear right alongside your search results.
                Select a shortlist of hotels you like and let us call on your behalf — without ever
                leaving the page you're on.
              </p>
              <p className="text-sm text-muted-foreground mb-8">
                Works on{" "}
                <span className="text-foreground font-medium">
                  Booking.com, Expedia, Hotels.com
                </span>{" "}
                and more.
              </p>
              <Button
                size="lg"
                className="h-14 px-8 text-base bg-gradient-to-r from-primary to-primary-glow hover:opacity-90 transition-opacity"
                onClick={downloadExtension}
              >
                <Chrome className="mr-2 h-5 w-5" />
                Add to Chrome — it's free
              </Button>
            </div>
            <div className="rounded-3xl border border-border bg-card p-8 shadow-lg">
              <div className="space-y-3">
                {["Booking.com", "Expedia", "Hotels.com"].map((site, i) => (
                  <div
                    key={site}
                    className="flex items-center justify-between rounded-xl border border-border bg-background p-4 hover:border-primary/40 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                        <Building2 className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {["Casa del Mar", "The Drake Hotel", "Boutique Riad"][i]}
                        </p>
                        <p className="text-xs text-muted-foreground">via {site}</p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      className="h-9 bg-gradient-to-r from-primary to-primary-glow hover:opacity-90 text-xs"
                    >
                      <Phone className="mr-1.5 h-3 w-3" />
                      Haggle this
                    </Button>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground text-center mt-6">
                The "Haggle this" button appears on every hotel result.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-border bg-muted/40 py-20">
        <div className="container">
          <div className="max-w-2xl mb-12">
            <p className="text-sm font-medium text-primary mb-3">FAQ</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">What people ask us</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl">
            {faqs.map((f) => (
              <div key={f.q} className="rounded-2xl border border-border bg-card p-6">
                <h3 className="font-semibold text-foreground mb-3">{f.q}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-background py-20">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Start saving on your next stay
          </h2>
          <p className="text-muted-foreground mb-10 max-w-xl mx-auto">
            Great Deal is free to try. We only earn when you save.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button asChild variant="outline" className="h-12 px-5">
              <Link to="/search?type=last-minute">
                <Clock className="mr-2 h-4 w-4" />
                Search last-minute hotels
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-12 px-5">
              <Link to="/search?type=multi-room">
                <Bed className="mr-2 h-4 w-4" />
                Search multi-room stays
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-12 px-5">
              <Link to="/search?type=long-stay">
                <CalendarDays className="mr-2 h-4 w-4" />
                Search long stays
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-12 px-5">
              <Link to="/search?type=boutique">
                <Building2 className="mr-2 h-4 w-4" />
                Browse boutique hotels
              </Link>
            </Button>
            <Button
              className="h-12 px-5 bg-gradient-to-r from-primary to-primary-glow hover:opacity-90 transition-opacity"
              onClick={downloadExtension}
            >
              <Chrome className="mr-2 h-4 w-4" />
              Add to Chrome
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold text-foreground">Great Deal</span>
          </div>
          <p className="text-xs text-muted-foreground">
            © 2026 Great Deal. Free to try. We only earn when you save.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
