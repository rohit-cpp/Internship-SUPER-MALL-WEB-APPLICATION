// src/pages/CompareProducts.tsx
import React, { useState, useEffect, useMemo } from "react";
import { useProductStore } from "@/store/useProductStore";
import { useCategoryStore } from "@/store/useCategoryStore";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, CheckSquare, Square } from "lucide-react";

export default function CompareProducts() {
  const { products, getProducts, loading } = useProductStore();
  const { categories, getCategories } = useCategoryStore();

  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  useEffect(() => {
    getProducts();
    getCategories();
  }, [getProducts, getCategories]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const categoryId =
        typeof p.category === "object" && p.category !== null
          ? p.category._id
          : p.category;
      if (selectedCategory && categoryId !== selectedCategory) return false;
      if (
        searchTerm &&
        !p.name?.toLowerCase().includes(searchTerm.toLowerCase())
      )
        return false;
      return true;
    });
  }, [products, selectedCategory, searchTerm]);

  const toggleProductSelection = (id: string) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const selectedProductDetails = useMemo(() => {
    return products.filter((p) => selectedProducts.includes(p._id));
  }, [products, selectedProducts]);

  return (
    <div className="min-h-screen bg-slate-950 py-12 px-6 space-y-8">
      <h1 className="text-center text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-500 bg-clip-text text-transparent drop-shadow">
        Compare Products
      </h1>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
        <Select
          value={selectedCategory || "all"}
          onValueChange={(v) => setSelectedCategory(v === "all" ? "" : v)}
        >
          <SelectTrigger className="bg-slate-900 border-slate-800 text-slate-200">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent className="bg-slate-900 text-slate-200 border-slate-800">
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((c) => (
              <SelectItem key={c._id} value={c._id}>
                {c.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Input
          placeholder="Search products…"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-slate-900 border-slate-800 text-slate-200 placeholder:text-slate-500"
        />
      </div>

      {/* Product List */}
      {loading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="animate-spin h-6 w-6 text-cyan-400" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {filteredProducts.map((p) => {
            const isSelected = selectedProducts.includes(p._id);
            return (
              <Card
                key={p._id}
                onClick={() => toggleProductSelection(p._id)}
                className={`cursor-pointer overflow-hidden border backdrop-blur-sm rounded-xl shadow-lg transition-all duration-300 ${
                  isSelected
                    ? "border-cyan-400 shadow-cyan-500/20"
                    : "border-slate-800 shadow-cyan-500/5 hover:shadow-cyan-500/10"
                } bg-slate-900/60`}
              >
                {p.image && (
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-40 object-cover"
                  />
                )}
                <CardHeader>
                  <CardTitle className="flex justify-between items-center text-white">
                    {p.name}
                    {isSelected ? (
                      <CheckSquare className="text-cyan-400" />
                    ) : (
                      <Square className="text-slate-500" />
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-400 line-clamp-2">
                    {p.description || "No description"}
                  </p>
                  <p className="text-green-400 font-bold mt-2">₹{p.price}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Comparison Table */}
      {selectedProductDetails.length >= 2 ? (
        <div className="mt-8 overflow-x-auto bg-slate-900/60 border border-slate-800 rounded-xl p-4 shadow-lg shadow-cyan-500/5 max-w-7xl mx-auto">
          <h2 className="text-xl font-semibold mb-4 bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
            Comparison Table
          </h2>
          <table className="min-w-full text-sm text-slate-300 border border-slate-800">
            <thead>
              <tr className="bg-slate-800/50">
                <th className="border border-slate-800 px-4 py-2 text-left">
                  Feature
                </th>
                {selectedProductDetails.map((p) => (
                  <th
                    key={p._id}
                    className="border border-slate-800 px-4 py-2 text-left"
                  >
                    {p.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-slate-800/30">
                <td className="border border-slate-800 px-4 py-2 font-semibold">
                  Price
                </td>
                {selectedProductDetails.map((p) => (
                  <td key={p._id} className="border border-slate-800 px-4 py-2">
                    ₹{p.price}
                  </td>
                ))}
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="border border-slate-800 px-4 py-2 font-semibold">
                  Description
                </td>
                {selectedProductDetails.map((p) => (
                  <td key={p._id} className="border border-slate-800 px-4 py-2">
                    {p.description || "No description"}
                  </td>
                ))}
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="border border-slate-800 px-4 py-2 font-semibold">
                  Features
                </td>
                {selectedProductDetails.map((p) => (
                  <td key={p._id} className="border border-slate-800 px-4 py-2">
                    {p.features?.length ? (
                      <div className="flex flex-wrap gap-1">
                        {p.features.map((f, i) => (
                          <Badge
                            key={i}
                            variant="outline"
                            className="border-cyan-400 text-cyan-300"
                          >
                            {f}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      "No features"
                    )}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-slate-500 italic">
          Select at least two products to compare.
        </p>
      )}
    </div>
  );
}
