import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  MapPin,
  Search,
  Lock,
  Globe,
  ArrowRight,
  Star,
} from "lucide-react";

/* 
  ⚡ OPTIONAL: Add these utilities to your global CSS (e.g., globals.css) for stronger neon effects
  .neon-text       { text-shadow: 0 0 8px currentColor, 0 0 16px currentColor; }
  .neon-border     { box-shadow: 0 0 12px var(--tw-shadow-color); }
  .neon-gradient   { background: linear-gradient(135deg,#00e6ff 0%,#ff00ff 100%); }
*/

const HeroSection = () => {
  const [currentLocation, setCurrentLocation] = useState("Detecting location…");
  const [isLocationDetected, setIsLocationDetected] = useState(false);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        () => {
          setCurrentLocation("Location detected");
          setIsLocationDetected(true);
        },
        () => {
          setCurrentLocation("Location access denied");
        }
      );
    } else {
      setCurrentLocation("Geolocation not supported");
    }
  }, []);

  const features = [
    { icon: <Shield className="h-5 w-5" />, text: "Privacy-First Encryption" },
    { icon: <MapPin className="h-5 w-5" />, text: "Precise Spatial Queries" },
    { icon: <Lock className="h-5 w-5" />, text: "Secure Data Vault" },
    { icon: <Globe className="h-5 w-5" />, text: "Worldwide Availability" },
  ];

  return (
    <section className="relative overflow-hidden isolate">
      {/* Glow blobs */}
      <div className="absolute -z-10 inset-0 bg-neutral-900" />
      <div className="absolute -z-10 blur-3xl">
        <span className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-fuchsia-600/30 animate-pulse" />
        <span className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-cyan-500/30 animate-pulse delay-2000" />
      </div>

      <div className="container mx-auto px-6 py-20 lg:py-28 text-center">
        {/* Badge */}
        <Badge
          variant="outline"
          className="mx-auto mb-6 flex items-center gap-2 border-fuchsia-500 text-fuchsia-400 neon-border shadow-fuchsia-500/50"
        >
          <Star className="h-4 w-4" />
          Enterprise-Grade Privacy
        </Badge>

        {/* Headline */}
        <h1 className="mx-auto max-w-5xl text-4xl md:text-6xl font-extrabold leading-tight tracking-tight text-white">
          Discover Nearby
          <span className="block bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-purple-500 bg-clip-text text-transparent neon-text">
            Points&nbsp;of&nbsp;Interest
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg md:text-xl text-neutral-300">
          Lightning-fast location search with zero-knowledge encryption. Your
          data stays yours—always.
        </p>

        {/* Location indicator */}
        <div className="mt-4 flex items-center justify-center gap-2 text-sm text-neutral-400">
          <MapPin className="h-4 w-4" />
          <span>{currentLocation}</span>
          {isLocationDetected && (
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
          )}
        </div>

        {/* CTA buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            size="lg"
            className="relative inline-flex items-center gap-2 px-8 py-3 text-lg font-semibold text-white neon-gradient rounded-lg shadow-cyan-500/40 neon-border hover:shadow-fuchsia-500/60"
          >
            <Search className="h-5 w-5" />
            Start Exploring
            <ArrowRight className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-transparent bg-transparent px-8 py-3 text-lg text-fuchsia-400 hover:border-fuchsia-500 neon-border"
          >
            Learn More
          </Button>
        </div>

        {/* Feature grid */}
        <div className="mt-16 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {features.map(({ icon, text }, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-3 rounded-lg border border-fuchsia-500/10 bg-neutral-800/60 p-4 transition-all hover:bg-neutral-800 neon-border shadow-fuchsia-500/10"
            >
              <span className="rounded-full bg-neutral-700 p-3 text-cyan-400 neon-border shadow-cyan-500/30">
                {icon}
              </span>
              <span className="text-sm font-medium text-neutral-200 text-center">
                {text}
              </span>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-10 border-t border-neutral-700 pt-10">
          {[
            {
              value: "99.99%",
              label: "Data Confidentiality",
              color: "text-cyan-400",
            },
            {
              value: "≤1 s",
              label: "Median Response",
              color: "text-fuchsia-400",
            },
            {
              value: "256-bit",
              label: "End-to-End AES",
              color: "text-purple-400",
            },
          ].map(({ value, label, color }, i) => (
            <div key={i} className="text-center">
              <div
                className={`text-3xl font-extrabold tracking-wide ${color} neon-text`}
              >
                {value}
              </div>
              <div className="mt-1 text-sm text-neutral-400">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
