// src/pages/ShopList.tsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useShopStore } from "@/store/useShopStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { MapPin } from "lucide-react";

export default function ShopList() {
  const { shops, getShops, loading } = useShopStore();
  const navigate = useNavigate();

  useEffect(() => {
    getShops();
  }, [getShops]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-6 max-w-7xl mx-auto">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton
            key={i}
            className="h-64 w-full rounded-xl bg-slate-800/60"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 py-12 px-6">
      <h1 className="text-center text-3xl font-bold mb-12 bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-500 bg-clip-text text-transparent drop-shadow">
        Explore Our Shops
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {shops.map((shop) => (
          <Card
            key={shop._id}
            onClick={() => navigate(`/shops/${shop._id}`)}
            className="group cursor-pointer overflow-hidden border border-slate-800/50 bg-slate-900/60 backdrop-blur-sm rounded-xl shadow-lg shadow-cyan-500/5 hover:shadow-cyan-500/20 hover:border-cyan-400/30 transition-all duration-300"
          >
            {/* Image */}
            {shop.image && (
              <div className="overflow-hidden relative">
                <img
                  src={shop.image}
                  alt={shop.name}
                  className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            )}

            {/* Title */}
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent group-hover:drop-shadow-md transition-all">
                {shop.name}
              </CardTitle>
            </CardHeader>

            {/* Address */}
            <CardContent className="flex items-center gap-2 text-slate-400 group-hover:text-slate-200 transition-colors">
              <MapPin className="h-4 w-4 text-cyan-400" />
              <span className="text-sm truncate">{shop.address}</span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
