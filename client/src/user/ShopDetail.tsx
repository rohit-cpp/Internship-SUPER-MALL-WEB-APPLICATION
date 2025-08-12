// src/pages/ShopDetail.tsx
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useShopStore } from "@/store/useShopStore";
import ShopProducts from "./ShopProducts";
import ShopOffers from "./ShopOffer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { MapPin, Phone, User, Layers } from "lucide-react";

export default function ShopDetail() {
  const { id } = useParams<{ id: string }>();
  const { shopById, getShopById, loading } = useShopStore();

  useEffect(() => {
    if (id) {
      console.log("📡 Fetching shop details for:", id);
      getShopById(id);
    }
  }, [id]);

  if (loading || !shopById) {
    return (
      <div className="p-6">
        <Skeleton className="h-64 w-full rounded-lg mb-4" />
        <Skeleton className="h-6 w-1/3 mb-2" />
        <Skeleton className="h-4 w-2/3 mb-1" />
        <Skeleton className="h-4 w-1/2 mb-1" />
      </div>
    );
  }

  const { name, image, description, address, contact, owner, category, floor } =
    shopById;
  const ownerName = typeof owner === "object" ? owner.fullname : owner;
  const categoryName = typeof category === "object" ? category.name : category;
  const floorNumber = typeof floor === "object" ? floor.floorNumber : floor;

  return (
    <div className="bg-slate-950 min-h-screen py-12 px-6">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Shop Info */}
        <Card className="overflow-hidden border border-slate-800/50 bg-slate-900/60 backdrop-blur-sm rounded-xl shadow-lg shadow-cyan-500/5 hover:shadow-cyan-500/20 transition-all duration-300">
          {image && (
            <div className="overflow-hidden relative">
              <img
                src={image}
                alt={name}
                className="h-72 w-full object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent"></div>
            </div>
          )}
          <CardHeader>
            <CardTitle className="text-3xl font-extrabold bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
              {name}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-slate-300">
            <p className="flex items-center gap-2">
              <User className="h-5 w-5 text-cyan-400" />
              <span className="font-semibold">Owner:</span> {ownerName}
            </p>
            <p className="flex items-center gap-2">
              <Layers className="h-5 w-5 text-cyan-400" />
              <span className="font-semibold">Category:</span> {categoryName}
            </p>
            <p className="flex items-center gap-2">
              <Layers className="h-5 w-5 text-cyan-400" />
              <span className="font-semibold">Floor:</span> {floorNumber}
            </p>
            <p className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-cyan-400" />
              <span className="font-semibold">Address:</span> {address}
            </p>
            <p className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-cyan-400" />
              <span className="font-semibold">Contact:</span> {contact}
            </p>
            <Separator className="my-4 bg-slate-800" />
            <p className="text-slate-400 leading-relaxed">{description}</p>
          </CardContent>
        </Card>

        {/* Products */}
        <section>
          <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
            🛍 Products
          </h2>
          <ShopProducts shopId={shopById._id} />
        </section>

        {/* Offers */}
        <section>
          <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
            🎁 Offers
          </h2>
          <ShopOffers shopId={shopById._id} />
        </section>
      </div>
    </div>
  );
}
