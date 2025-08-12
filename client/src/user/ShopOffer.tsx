// src/features/shop/ShopOffers.tsx
import React, { useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useOfferStore } from "@/store/useOfferStore";
import { Loader2, Tag, Calendar, Percent } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function ShopOffers({ shopId }: { shopId: string }) {
  const { shopOffers, getOffersByShop, loading } = useOfferStore();

  useEffect(() => {
    if (shopId) {
      getOffersByShop(shopId);
    }
  }, [shopId]);

  if (loading) {
    return (
      <div className="flex justify-center py-6">
        <Loader2 className="w-6 h-6 animate-spin text-cyan-400" />
      </div>
    );
  }

  if (!shopOffers.length) {
    return <p className="text-center text-slate-500">No offers available.</p>;
  }

  const now = Date.now();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {shopOffers.map((o) => {
        const start = new Date(o.startDate).getTime();
        const end = new Date(o.endDate).getTime();
        let status: "Upcoming" | "Active" | "Expired" = "Active";
        if (now < start) status = "Upcoming";
        else if (now > end) status = "Expired";

        return (
          <Card
            key={o._id}
            className={cn(
              "relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl",
              "bg-slate-900/60 border border-slate-800/50 rounded-xl shadow-lg shadow-cyan-500/5 hover:shadow-cyan-500/20"
            )}
          >
            {/* Status Badge */}
            <div className="absolute top-4 right-4 z-10">
              <Badge
                className={cn(
                  "px-3 py-1 text-sm font-semibold shadow-md border-0",
                  status === "Active"
                    ? "bg-green-500 text-white"
                    : status === "Upcoming"
                    ? "bg-blue-500 text-white"
                    : "bg-red-500 text-white"
                )}
              >
                {status}
              </Badge>
            </div>

            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg font-bold text-white">
                <Tag className="h-5 w-5 text-cyan-400" />
                {o.title}
              </CardTitle>
            </CardHeader>

            <CardContent>
              <p className="text-slate-300">
                {o.description || "No description"}
              </p>

              <div className="flex items-center gap-2 mt-3 text-sm text-slate-400">
                <Calendar className="h-4 w-4 text-cyan-400" />
                {new Date(o.startDate).toLocaleDateString()} –{" "}
                {new Date(o.endDate).toLocaleDateString()}
              </div>

              <div className="mt-4 flex items-center gap-2">
                <Percent className="h-5 w-5 text-green-400" />
                <span className="text-2xl font-extrabold text-green-400">
                  {o.discountPercentage}% OFF
                </span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
