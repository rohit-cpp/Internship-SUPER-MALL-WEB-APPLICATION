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

const HeroSection = () => {
  const [currentLocation, setCurrentLocation] = useState(
    "Detecting location..."
  );
  const [isLocationDetected, setIsLocationDetected] = useState(false);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // You would typically reverse geocode this
          setCurrentLocation("Location detected");
          setIsLocationDetected(true);
        },
        () => {
          setCurrentLocation("Location access denied");
          setIsLocationDetected(false);
        }
      );
    } else {
      setCurrentLocation("Geolocation not supported");
    }
  }, []);

  const features = [
    {
      icon: <Shield className="h-5 w-5" />,
      text: "Privacy-Preserving Encryption",
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      text: "Accurate Spatial Queries",
    },
    {
      icon: <Lock className="h-5 w-5" />,
      text: "Secure Data Handling",
    },
    {
      icon: <Globe className="h-5 w-5" />,
      text: "Global Coverage",
    },
  ];

  return (
    <section className="relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 -z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-blue-100/20 to-transparent -z-10" />

      <div className="container mx-auto px-6 py-16 lg:py-24">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Badge */}
          <Badge variant="outline" className="px-4 py-2 text-sm">
            <Star className="mr-2 h-4 w-4 text-yellow-500" />
            Advanced Location Privacy Protection
          </Badge>

          {/* Main Headline */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Discover Nearby
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
                Points of Interest
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Search for locations and points of interest around you with
              industry-leading privacy protection and encrypted data handling.
            </p>
          </div>

          {/* Location Status */}
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{currentLocation}</span>
            {isLocationDetected && (
              <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="px-8 py-3 text-lg">
              <Search className="mr-2 h-5 w-5" />
              Start Exploring
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-3 text-lg">
              Learn More
            </Button>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-2 p-4 rounded-lg bg-white/50 backdrop-blur-sm border border-white/20 hover:bg-white/70 transition-all"
              >
                <div className="p-2 rounded-full bg-blue-100 text-blue-600">
                  {feature.icon}
                </div>
                <span className="text-sm font-medium text-center">
                  {feature.text}
                </span>
              </div>
            ))}
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">99.9%</div>
              <div className="text-sm text-muted-foreground">
                Privacy Protected
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">1s</div>
              <div className="text-sm text-muted-foreground">
                Query Response
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">256-bit</div>
              <div className="text-sm text-muted-foreground">Encryption</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
