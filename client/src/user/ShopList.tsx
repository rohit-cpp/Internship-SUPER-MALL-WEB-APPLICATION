// src/pages/ShopList.tsx
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useShopStore } from "../store/useShopStore";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export default function ShopList() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { shops, getShops, loading } = useShopStore();
  const navigate = useNavigate();

  useEffect(() => {
    getShops();
  }, []);

  if (loading) {
    return <Progress className="w-full" />;
  }

  return (
    <div className="space-y-4 p-6">
      {shops
        .filter((s) => s.category === categoryId)
        .map((shop) => (
          <Card key={shop._id}>
            <CardContent className="space-y-2">
              <h3 className="text-lg font-semibold">{shop.name}</h3>
              <p className="text-sm text-muted-foreground">{shop.address}</p>
            </CardContent>
            <CardFooter>
              <Button onClick={() => navigate(`/shops/${shop._id}`)}>
                View Details
              </Button>
            </CardFooter>
          </Card>
        ))}
    </div>
  );
}
