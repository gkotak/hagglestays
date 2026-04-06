import { Phone, Clock, Bed, Shield, Gift, Chrome, Search, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroResort from "@/assets/hero-resort.jpg";

const supportedSites = [
  { name: "Booking.com", color: "bg-blue-600" },
  { name: "Hotels.com", color: "bg-red-600" },
  { name: "Expedia", color: "bg-yellow-500" },
  { name: "Agoda", color: "bg-purple-600" },
  { name: "Kayak", color: "bg-orange-500" },
  { name: "Google Search", color: "bg-emerald-500" },
];

const steps = [
  {
    num: "1",
    title: "Search on your favourite OTA",
    desc: "Browse hotels on Booking.com, Hotels.com, Expedia, Agoda, or Google — wherever you normally search.",
  },
  {
    num: "2",
    title: "Select up to 5 hotels",
    desc: "Click the HaggleStay icon and pick the hotels you're interested in directly from the search results.",
  },
  {
    num: "3",
    title: "We call & negotiate",
    desc: "Our AI agent phones each hotel and negotiates a better rate. You only pay if we beat the published price.",
  },
];

const Extension = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-50 py-5">
        <div className="container flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Phone className="h-5 w-5 text-primary-foreground" />
            <span className="text-lg font-bold tracking-tight text-primary-foreground">HaggleStay</span>
          </div>
          <Link to="/sign-in" className="text-sm font-medium text-primary-foreground/90 hover:text-primary-foreground transition-colors">
            Sign in
          </Link>
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
            <div className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-1.5 mb-6 backdrop-blur-sm">
              <Chrome className="h-4 w-4 text-primary-foreground" />
              <span className="text-sm font-medium text-primary-foreground">Chrome Extension</span>
            </div>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight md:text-6xl text-primary-foreground">
              We call the hotel.{" "}
              <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                You get a better price.
              </span>
            </h1>
            <p className="mt-4 text-lg text-primary-foreground/80 max-w-2xl">
              We negotiate directly with hotels, and only charge a small fee if they agree to a better price
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="h-14 px-8 text-base bg-gradient-to-r from-primary to-primary-glow hover:opacity-90 transition-opacity"
              >
                <Chrome className="mr-2 h-5 w-5" />
                Add to Chrome — It's Free
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-14 px-8 text-base border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}
              >
                See how it works
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            {/* Supported sites - inside hero */}
            <div className="mt-10">
              <p className="text-sm font-medium text-primary-foreground/60 mb-3">Works with your favourite booking sites</p>
              <div className="flex flex-wrap gap-2.5 items-center">
                {supportedSites.map((site) => (
                  <div
                    key={site.name}
                    className="flex items-center gap-2 rounded-lg border border-primary-foreground/15 bg-primary-foreground/10 backdrop-blur-sm px-3.5 py-2"
                  >
                    <div className={`h-2 w-2 rounded-full ${site.color}`} />
                    <span className="text-sm font-medium text-primary-foreground/90">{site.name}</span>
                  </div>
                ))}
                <span className="text-sm text-primary-foreground/50 ml-1">& most other travel sites</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value prop cards */}

      {/* Value prop cards */}
      <section className="bg-background pt-14 pb-12">
        <div className="container">
          <h2 className="text-xl font-bold mb-1">Hotels pay OTAs up to 25% commission</h2>
          <p className="text-sm text-muted-foreground mb-6">So there is wiggle room, especially for:</p>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: <Clock className="h-7 w-7 text-primary" />, title: "Unsold rooms for last-minute bookings" },
              { icon: <Bed className="h-7 w-7 text-primary" />, title: "Long-stays or multi-room bookings" },
              { icon: <Shield className="h-7 w-7 text-primary" />, title: "Flexible guests (late check-in, lower floor, skip the daily clean)" },
              { icon: <Gift className="h-7 w-7 text-primary" />, title: "No savings on rate? They'll offer upgrades, dining credit, or gifts instead" },
            ].map((card, i) => (
              <div key={i} className="rounded-xl border border-border bg-card p-5">
                <div className="mb-3">{card.icon}</div>
                <p className="text-sm font-medium text-foreground">{card.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="border-t border-border bg-muted/50 py-20">
        <div className="container">
          <p className="text-center text-primary font-medium mb-2">How the extension works</p>
          <h2 className="text-3xl font-bold text-center mb-4">Start your search anywhere</h2>
          <p className="text-center text-muted-foreground max-w-xl mx-auto mb-12">
            No need to use a new search engine. Keep using the OTA you love — our extension adds negotiation power on top.
          </p>
          <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-3">
            {steps.map((step) => (
              <div key={step.num} className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary font-bold text-xl">
                  {step.num}
                </div>
                <h3 className="mb-2 text-lg font-semibold">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Extension demo preview */}
      <section className="border-t border-border bg-background py-20">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">Select hotels right from the search results</h2>
                <p className="text-muted-foreground mb-6">
                  The extension adds a subtle "Haggle this" button next to each hotel in your search results.
                  Pick up to 5 hotels and we'll negotiate all of them in parallel.
                </p>
                <ul className="space-y-3">
                  {[
                    "Works on Booking.com, Hotels.com, Expedia, Agoda & Google",
                    "Select up to 5 hotels per search",
                    "One click to start negotiations",
                    "Real-time status updates in the extension popup",
                    "Only pay if we beat the OTA price",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-border bg-muted/30 p-8 flex flex-col items-center justify-center min-h-[320px]">
                <Chrome className="h-16 w-16 text-primary/30 mb-4" />
                <p className="text-sm text-muted-foreground text-center">Extension preview coming soon</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-border bg-gradient-to-b from-primary/5 to-background py-20">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to save on your next hotel?</h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            Install the free Chrome extension and start negotiating better rates on any booking site.
          </p>
          <Button
            size="lg"
            className="h-14 px-10 text-base bg-gradient-to-r from-primary to-primary-glow hover:opacity-90 transition-opacity"
          >
            <Chrome className="mr-2 h-5 w-5" />
            Add to Chrome — It's Free
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold text-foreground">HaggleStay</span>
          </div>
          <p className="text-xs text-muted-foreground">© 2026 HaggleStay. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Extension;
