// src/pages/ShopProducts.tsx
import { useEffect, useState } from "react";
import { useProductStore } from "@/store/useProductStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ShopProducts({ shopId }: { shopId: string }) {
  const { products, filterProducts, loading } = useProductStore();
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  useEffect(() => {
    if (shopId) {
      filterProducts({ shop: shopId });
    }
  }, [shopId, filterProducts]);

  if (loading) {
    return (
      <div className="flex justify-center py-6">
        <Loader2 className="h-6 w-6 animate-spin text-cyan-400" />
      </div>
    );
  }

  if (!products.length) {
    return (
      <p className="text-slate-500 italic text-center py-4">
        ⚠ No products found for this shop.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {products.map((product) => (
        <Card
          key={product._id}
          className="relative overflow-hidden border border-slate-800/50 bg-slate-900/60 rounded-xl shadow-lg shadow-cyan-500/5 hover:shadow-cyan-500/20 transition-all duration-300"
        >
          {/* View Details Button + Dialog */}
          <Dialog>
            <DialogTrigger asChild>
              <Button
                size="sm"
                variant="secondary"
                className="absolute top-3 right-3 z-10 bg-gradient-to-r from-cyan-500 to-violet-500 text-white shadow hover:opacity-90"
                onClick={() => setSelectedProduct(product)}
              >
                View Details
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto bg-slate-900 border border-slate-700">
              {selectedProduct && (
                <>
                  <DialogHeader>
                    <DialogTitle className="text-cyan-400">
                      {selectedProduct.name}
                    </DialogTitle>
                    <DialogDescription className="text-slate-300">
                      {selectedProduct.description ||
                        "No description available"}
                    </DialogDescription>
                  </DialogHeader>
                  {selectedProduct.image && (
                    <img
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      className="w-full h-60 object-cover rounded-md my-4"
                    />
                  )}
                  <div className="space-y-3">
                    <p className="text-lg font-bold text-green-400">
                      ₹{selectedProduct.price}
                    </p>
                    {selectedProduct.features?.length > 0 && (
                      <div>
                        <p className="font-semibold mb-1 text-slate-200">
                          Features:
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {selectedProduct.features.map(
                            (f: string, i: number) => (
                              <Badge
                                key={i}
                                variant="outline"
                                className="border-cyan-400 text-cyan-300"
                              >
                                {f}
                              </Badge>
                            )
                          )}
                        </div>
                      </div>
                    )}
                    {selectedProduct.category && (
                      <p className="text-slate-300">
                        <strong>Category:</strong>{" "}
                        {typeof selectedProduct.category === "object"
                          ? selectedProduct.category.name
                          : selectedProduct.category}
                      </p>
                    )}
                    {selectedProduct.shop && (
                      <p className="text-slate-300">
                        <strong>Shop:</strong>{" "}
                        {typeof selectedProduct.shop === "object"
                          ? selectedProduct.shop.name
                          : selectedProduct.shop}
                      </p>
                    )}
                  </div>
                </>
              )}
            </DialogContent>
          </Dialog>

          {/* Product Image */}
          {product.image && (
            <div className="overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          )}

          {/* Product Info */}
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold text-white">
              {product.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-400 text-sm line-clamp-2">
              {product.description || "No description provided"}
            </p>
            <p className="text-green-400 font-bold mt-3 text-lg">
              ₹{product.price}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
