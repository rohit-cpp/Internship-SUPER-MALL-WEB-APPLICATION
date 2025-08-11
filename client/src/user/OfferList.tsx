// src/pages/OfferList.tsx
import { useEffect, useState } from "react";
import { useOfferStore } from "../store/useOfferStore";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

export default function OfferList() {
  const { offers, getOffers, getOffersByShop, loading } = useOfferStore();
  const [shopId, setShopId] = useState("");

  useEffect(() => {
    getOffers();
  }, []);

  useEffect(() => {
    if (shopId) getOffersByShop(shopId);
  }, [shopId]);

  if (loading) {
    return <Progress className="w-full" />;
  }

  const display = shopId ? offers.filter((o) => o.shop === shopId) : offers;

  return (
    <div className="space-y-4 p-6">
      <Select onValueChange={setShopId} defaultValue="">
        <SelectTrigger>
          <SelectValue placeholder="Filter by Shop" />
        </SelectTrigger>
        <SelectContent>
          {offers.map((o) => (
            <SelectItem key={o._id} value={o.shop}>
              {o.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {display.map((offer) => (
        <Card key={offer._id}>
          <CardContent className="space-y-1">
            <h4 className="text-lg font-semibold">{offer.title}</h4>
            <p className="text-sm">Discount: {offer.discountPercentage}%</p>
            <p className="text-xs text-muted-foreground">
              {new Date(offer.startDate).toLocaleDateString()} –{" "}
              {new Date(offer.endDate).toLocaleDateString()}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
