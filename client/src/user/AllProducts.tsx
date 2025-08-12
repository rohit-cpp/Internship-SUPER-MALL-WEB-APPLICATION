// src/pages/AllProducts.tsx
import React, { useEffect, useState, useMemo } from "react";
import { useProductStore } from "@/store/useProductStore";
import { useShopStore } from "@/store/useShopStore";
import { useCategoryStore } from "@/store/useCategoryStore";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function AllProducts() {
  const { products, getProducts, loading } = useProductStore();
  const { shops, getShops } = useShopStore();
  const { categories, getCategories } = useCategoryStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedShop, setSelectedShop] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [dialogProduct, setDialogProduct] = useState<any>(null);

  useEffect(() => {
    getProducts();
    getShops();
    getCategories();
  }, [getProducts, getShops, getCategories]);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const shopId =
        typeof p.shop === "object" && p.shop !== null ? p.shop._id : p.shop;
      const categoryId =
        typeof p.category === "object" && p.category !== null
          ? p.category._id
          : p.category;

      if (
        searchTerm &&
        !p.name?.toLowerCase().includes(searchTerm.toLowerCase())
      )
        return false;
      if (selectedShop && shopId !== selectedShop) return false;
      if (selectedCategory && categoryId !== selectedCategory) return false;

      const price = p.price ?? 0;
      if (minPrice && price < Number(minPrice)) return false;
      if (maxPrice && price > Number(maxPrice)) return false;

      return true;
    });
  }, [
    products,
    searchTerm,
    selectedShop,
    selectedCategory,
    minPrice,
    maxPrice,
  ]);

  return (
    <div className="min-h-screen bg-slate-950 py-12 px-6 space-y-8">
      <h1 className="text-center text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-500 bg-clip-text text-transparent drop-shadow">
        Browse All Products
      </h1>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
        <Input
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-slate-900 border-slate-800 text-slate-200 placeholder:text-slate-500"
        />
        {/* Shop Filter */}
        <Select
          value={selectedShop || "all"}
          onValueChange={(v) => setSelectedShop(v === "all" ? "" : v)}
        >
          <SelectTrigger className="bg-slate-900 border-slate-800 text-slate-200">
            <SelectValue placeholder="Filter by shop" />
          </SelectTrigger>
          <SelectContent className="bg-slate-900 text-slate-200 border-slate-800">
            <SelectItem value="all">All Shops</SelectItem>
            {shops.map((s) => (
              <SelectItem key={s._id} value={s._id}>
                {s.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {/* Category Filter */}
        <Select
          value={selectedCategory || "all"}
          onValueChange={(v) => setSelectedCategory(v === "all" ? "" : v)}
        >
          <SelectTrigger className="bg-slate-900 border-slate-800 text-slate-200">
            <SelectValue placeholder="Filter by category" />
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
      </div>

      {/* Price Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
        <Input
          placeholder="Min price"
          type="number"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="bg-slate-900 border-slate-800 text-slate-200 placeholder:text-slate-500"
        />
        <Input
          placeholder="Max price"
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="bg-slate-900 border-slate-800 text-slate-200 placeholder:text-slate-500"
        />
        <Button
          variant="outline"
          onClick={() => {
            setSearchTerm("");
            setSelectedShop("");
            setSelectedCategory("");
            setMinPrice("");
            setMaxPrice("");
          }}
          className="border-slate-700 text-slate-200 hover:border-cyan-400 hover:text-cyan-400"
        >
          Clear Filters
        </Button>
      </div>

      {/* Product Grid */}
      {loading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="animate-spin h-6 w-6 text-cyan-400" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {filtered.length ? (
            filtered.map((p) => (
              <Card
                key={p._id}
                className="relative overflow-hidden border border-slate-800/50 bg-slate-900/60 backdrop-blur-sm rounded-xl shadow-lg shadow-cyan-500/5 hover:shadow-cyan-500/20 transition-all duration-300"
              >
                {/* Product Image */}
                {p.image && (
                  <div className="overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}

                {/* Dialog for details */}
                <Dialog
                  open={dialogProduct === p._id}
                  onOpenChange={(open) => !open && setDialogProduct(null)}
                >
                  <DialogTrigger asChild>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="absolute top-2 right-2 bg-gradient-to-r from-cyan-500 to-violet-500 text-white shadow hover:opacity-90"
                      onClick={() => setDialogProduct(p._id)}
                    >
                      View
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md bg-slate-900 border border-slate-700">
                    <DialogHeader>
                      <DialogTitle className="text-cyan-400">
                        {p.name}
                      </DialogTitle>
                      <DialogDescription className="text-slate-200">
                        {p.description || "No description"}
                      </DialogDescription>
                    </DialogHeader>
                    {p.image && (
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-full h-48 object-cover rounded"
                      />
                    )}
                    <div className="mt-4 space-y-2">
                      <p className="text-lg font-bold text-green-400">
                        ₹{p.price}
                      </p>
                      {p.features?.length > 0 && (
                        <div>
                          <span className="font-semibold text-slate-200">
                            Features:
                          </span>
                          <div className="flex flex-wrap gap-1 mt-1">
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
                        </div>
                      )}
                    </div>
                    <div className="mt-4 flex justify-end">
                      <Button
                        variant="secondary"
                        className="bg-gradient-to-r from-cyan-500 to-violet-500 text-white hover:opacity-90"
                        onClick={() => setDialogProduct(null)}
                      >
                        Close
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>

                {/* Product Info */}
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-white">
                    {p.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-2 text-slate-400">
                    {p.description || "No description"}
                  </p>
                  <p className="mt-2 font-bold text-green-400">₹{p.price}</p>
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="text-center text-slate-500 py-8 italic">
              No products match your filters.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
