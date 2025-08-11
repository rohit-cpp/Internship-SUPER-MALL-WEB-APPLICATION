// src/pages/FloorWiseShops.tsx
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFloorStore } from "../store/useFloorStore";
import { useShopStore } from "../store/useShopStore";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export default function FloorWiseShops() {
  const { floorNumber } = useParams<{ floorNumber: string }>();
  const { floors, getFloors, loading: floorLoading } = useFloorStore();
  const { shops, getShops, loading: shopLoading } = useShopStore();
  const navigate = useNavigate();

  useEffect(() => {
    getFloors();
    getShops();
  }, []);

  if (floorLoading || shopLoading) {
    return <Progress className="w-full" />;
  }

  const floor = floors.find((f) => f.floorNumber.toString() === floorNumber);
  if (!floor) {
    return <p className="p-6 text-center text-red-500">Floor not found</p>;
  }

  return (
    <div className="space-y-4 p-6">
      {shops
        .filter((s) => s.floor === floor._id)
        .map((shop) => (
          <Card key={shop._id}>
            <CardContent>
              <h3 className="text-lg font-semibold">{shop.name}</h3>
            </CardContent>
            <CardFooter>
              <Button
                variant="outline"
                onClick={() => navigate(`/shops/${shop._id}`)}
              >
                View Shop
              </Button>
            </CardFooter>
          </Card>
        ))}
    </div>
  );
}
