// src/pages/FilteredProducts.tsx
import { useEffect, useState } from "react";
import { useProductStore } from "../store/useProductStore";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export default function FilteredProducts() {
  const {
    products,
    getProducts,
    filterProducts,
    compareProducts,
    compareList,
    loading,
  } = useProductStore();

  const [shop, setShop] = useState("");
  const [category, setCategory] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  useEffect(() => {
    getProducts();
  }, []);

  if (loading) {
    return <Progress className="w-full" />;
  }

  const shops = Array.from(new Set(products.map((p) => p.shop)));
  const categories = Array.from(new Set(products.map((p) => p.category)));

  return (
    <div className="space-y-6 p-6">
      {/* Filters */}
      <Card>
        <CardContent className="grid grid-cols-3 gap-4">
          <Select onValueChange={setShop} defaultValue="">
            <SelectTrigger>
              <SelectValue placeholder="Shop" />
            </SelectTrigger>
            <SelectContent>
              {shops.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={setCategory} defaultValue="">
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={() => filterProducts({ shop, category })}>
            Apply Filters
          </Button>
        </CardContent>
      </Card>

      {/* Comparison Selection */}
      <Card>
        <CardContent className="space-y-2">
          <p className="font-medium">Select Products to Compare</p>
          <div className="grid grid-cols-2 gap-2">
            {products.map((p) => (
              <label key={p._id} className="flex items-center space-x-2">
                <Checkbox
                  checked={selectedIds.includes(p._id)}
                  onCheckedChange={(checked) => {
                    if (checked) setSelectedIds([...selectedIds, p._id]);
                    else
                      setSelectedIds(selectedIds.filter((id) => id !== p._id));
                  }}
                />
                <span>
                  {p.name} (${p.price})
                </span>
              </label>
            ))}
          </div>
          <Button
            disabled={selectedIds.length < 2}
            onClick={() => compareProducts(selectedIds)}
          >
            Compare
          </Button>
        </CardContent>
      </Card>

      {/* Comparison Results */}
      {compareList.length > 0 && (
        <Card>
          <CardContent>
            <div className="grid grid-cols-{{compareList.length}} gap-4">
              {compareList.map((p) => (
                <Card key={p._id}>
                  <CardContent className="space-y-1">
                    <h5 className="font-semibold">{p.name}</h5>
                    <p>${p.price}</p>
                    {p.features?.map((f, i) => (
                      <p key={i} className="text-sm">
                        • {f}
                      </p>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
