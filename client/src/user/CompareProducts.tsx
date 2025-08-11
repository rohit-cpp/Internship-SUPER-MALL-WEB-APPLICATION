// src/pages/CompareProducts.tsx
import { useEffect, useState } from "react";
import { useProductStore } from "../store/useProductStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";

export default function CompareProducts() {
  const { products, getProducts, compareProducts, compareList, loading } =
    useProductStore();

  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  useEffect(() => {
    getProducts();
  }, []);

  if (loading) {
    return <Progress className="w-full" />;
  }

  const toggle = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-6 p-6">
      {/* Product Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Select Products to Compare</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          {products.map((p) => (
            <div
              key={p._id}
              className="flex items-center space-x-2 p-2 border rounded"
            >
              <Checkbox
                checked={selectedIds.includes(p._id)}
                onCheckedChange={() => toggle(p._id)}
              />
              <span className="font-medium">{p.name}</span>
            </div>
          ))}
        </CardContent>
        <div className="p-4 flex justify-end">
          <Button
            disabled={selectedIds.length < 2}
            onClick={() => compareProducts(selectedIds)}
          >
            Compare {selectedIds.length} Products
          </Button>
        </div>
      </Card>

      {/* Comparison Table */}
      {compareList.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Comparison Results</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Feature</TableHead>
                  {compareList.map((p) => (
                    <TableHead key={p._id}>{p.name}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* Price Row */}
                <TableRow>
                  <TableCell className="font-semibold">Price</TableCell>
                  {compareList.map((p) => (
                    <TableCell key={p._id}>${p.price}</TableCell>
                  ))}
                </TableRow>
                {/* Dynamic Features Rows */}
                {Array.from(
                  new Set(compareList.flatMap((p) => p.features || []))
                ).map((feat) => (
                  <TableRow key={feat}>
                    <TableCell className="font-semibold">{feat}</TableCell>
                    {compareList.map((p) => (
                      <TableCell key={p._id}>
                        {p.features?.includes(feat) ? "✓" : "—"}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
