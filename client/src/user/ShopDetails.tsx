// src/pages/ShopDetails.tsx
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useShopStore } from "../store/useShopStore";
import { useOfferStore } from "../store/useOfferStore";
import { useProductStore } from "../store/useProductStore";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export default function ShopDetails() {
  const { shopId } = useParams<{ shopId: string }>();
  const { shopById, getShopById, loading: shopLoading } = useShopStore();
  const {
    shopOffers,
    getOffersByShop,
    loading: offerLoading,
  } = useOfferStore();
  const { products, filterProducts, loading: prodLoading } = useProductStore();

  useEffect(() => {
    if (shopId) {
      getShopById(shopId);
      getOffersByShop(shopId);
      filterProducts({ shop: shopId });
    }
  }, [shopId]);

  if (shopLoading || offerLoading || prodLoading || !shopById) {
    return <Progress className="w-full" />;
  }

  return (
    <div className="space-y-6 p-6">
      <h2 className="text-2xl font-bold">{shopById.name}</h2>
      {shopById.description && <p>{shopById.description}</p>}
      <Badge variant="outline">Contact: {shopById.contact}</Badge>
      <Badge variant="outline">Address: {shopById.address}</Badge>

      <div className="space-y-2">
        <h3 className="text-xl font-semibold">Current Offers</h3>
        {shopOffers.map((o) => (
          <Card key={o._id}>
            <CardContent className="space-y-1">
              <p className="font-medium">{o.title}</p>
              <p>Discount: {o.discountPercentage}%</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-semibold">Products</h3>
        <div className="grid grid-cols-2 gap-4">
          {products.map((p) => (
            <Card key={p._id}>
              <CardContent>
                <p className="font-semibold">{p.name}</p>
                <p>${p.price}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
