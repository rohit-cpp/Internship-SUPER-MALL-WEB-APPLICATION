// src/features/product/ManageProducts.tsx
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useProductStore } from "@/store/useProductStore";
import { useShopStore } from "@/store/useShopStore";
import { useCategoryStore } from "@/store/useCategoryStore";

// Local types
interface Product {
  _id: string;
  name: string;
  description?: string;
  price: number;
  features?: string[];
  shop: string | { _id: string; name: string };
  category: string | { _id: string; name: string };
  image?: string;
}

interface Shop {
  _id: string;
  name: string;
}

interface Category {
  _id: string;
  name: string;
}

interface ProductFormData {
  name: string;
  description: string;
  price: number;
  features: string[];
  shop: string;
  category: string;
  image: string;
}

export default function ManageProducts() {
  const {
    products,
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    loading,
  } = useProductStore();

  const { shops, getShops } = useShopStore();
  const { categories, getCategories } = useCategoryStore();

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [form, setForm] = useState<ProductFormData>({
    name: "",
    description: "",
    price: 0,
    features: [],
    shop: "",
    category: "",
    image: "",
  });
  const [featuresInput, setFeaturesInput] = useState("");

  useEffect(() => {
    getProducts();
    getShops();
    getCategories();
  }, [getProducts, getShops, getCategories]);

  const safeProducts = Array.isArray(products) ? products : [];
  const safeShops = Array.isArray(shops) ? shops : [];
  const safeCategories = Array.isArray(categories) ? categories : [];

  const resetForm = () => {
    setForm({
      name: "",
      description: "",
      price: 0,
      features: [],
      shop: "",
      category: "",
      image: "",
    });
    setFeaturesInput("");
    setSelectedProduct(null);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((f) => ({
      ...f,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  const handleSelectChange = (name: keyof ProductFormData, value: string) => {
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleFeaturesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFeaturesInput(value);
    const arr = value
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    setForm((f) => ({ ...f, features: arr }));
  };

  const openEdit = (product: Product) => {
    setSelectedProduct(product);
    setForm({
      name: product.name,
      description: product.description || "",
      price: product.price,
      features: product.features || [],
      shop: typeof product.shop === "string" ? product.shop : product.shop._id,
      category:
        typeof product.category === "string"
          ? product.category
          : product.category._id,
      image: product.image || "",
    });
    setFeaturesInput((product.features || []).join(", "));
    setIsEditOpen(true);
  };

  const handleCreate = async () => {
    await createProduct(form);
    setIsCreateOpen(false);
    resetForm();
  };

  const handleUpdate = async () => {
    if (selectedProduct?._id) {
      await updateProduct(selectedProduct._id, form);
      setIsEditOpen(false);
      resetForm();
    }
  };

  const handleDelete = async (id: string) => {
    await deleteProduct(id);
  };

  const getShopName = (
    shopRef: string | { _id: string; name?: string } | null | undefined
  ) => {
    if (!shopRef) return "No shop";
    if (typeof shopRef === "string") {
      const shop = safeShops.find((s) => s._id === shopRef);
      return shop?.name || "Unknown shop";
    }
    return shopRef.name || "Unknown shop";
  };

  const getCategoryName = (
    catRef: string | { _id: string; name?: string } | null | undefined
  ) => {
    if (!catRef) return "No category";
    if (typeof catRef === "string") {
      const cat = safeCategories.find((c) => c._id === catRef);
      return cat?.name || "Unknown category";
    }
    return catRef.name || "Unknown category";
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Manage Products</h2>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>Create Product</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create Product</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    value={form.price}
                    onChange={handleChange}
                    min={0}
                    step={0.01}
                  />
                </div>
                <div>
                  <Label htmlFor="image">Image URL</Label>
                  <Input
                    id="image"
                    name="image"
                    value={form.image}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="features">Features (comma separated)</Label>
                <Input
                  id="features"
                  value={featuresInput}
                  onChange={handleFeaturesChange}
                />
                {form.features.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {form.features.map((f, i) => (
                      <Badge key={i} variant="secondary">
                        {f}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="shop">Shop</Label>
                  <Select
                    value={form.shop}
                    onValueChange={(v) => handleSelectChange("shop", v)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select shop" />
                    </SelectTrigger>
                    <SelectContent>
                      {safeShops.map((s) => (
                        <SelectItem key={s._id} value={s._id}>
                          {s.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={form.category}
                    onValueChange={(v) => handleSelectChange("category", v)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {safeCategories.map((c) => (
                        <SelectItem key={c._id} value={c._id}>
                          {c.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsCreateOpen(false);
                    resetForm();
                  }}
                >
                  Cancel
                </Button>
                <Button onClick={handleCreate} disabled={loading}>
                  {loading ? "Creating..." : "Create"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Shop</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Features</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {safeProducts.length ? (
                safeProducts.map((p) => (
                  <TableRow key={p._id}>
                    <TableCell>
                      {p.image ? (
                        <img
                          src={
                            p.image.startsWith("http")
                              ? p.image
                              : `data:image/jpeg;base64,${p.image}`
                          }
                          alt={p.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gray-200 rounded" />
                      )}
                    </TableCell>
                    <TableCell className="font-medium">{p.name}</TableCell>
                    <TableCell>₹{p.price.toFixed(2)}</TableCell>
                    <TableCell>{getShopName(p.shop)}</TableCell>
                    <TableCell>{getCategoryName(p.category)}</TableCell>
                    <TableCell>
                      {p.features?.length ? (
                        <div className="flex flex-wrap gap-1">
                          {p.features.slice(0, 2).map((f, i) => (
                            <Badge
                              key={i}
                              variant="outline"
                              className="text-xs"
                            >
                              {f}
                            </Badge>
                          ))}
                          {p.features.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{p.features.length - 2} more
                            </Badge>
                          )}
                        </div>
                      ) : (
                        <span className="text-muted-foreground">
                          No features
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openEdit(p)}
                      >
                        Edit
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button size="sm" variant="destructive">
                            Delete
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Delete "{p.name}"?
                            </AlertDialogTitle>
                          </AlertDialogHeader>
                          <div className="flex justify-end space-x-2 pt-4">
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(p._id)}
                            >
                              Delete
                            </AlertDialogAction>
                          </div>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    No products found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="edit-name">Name</Label>
              <Input
                id="edit-name"
                name="name"
                value={form.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-price">Price</Label>
                <Input
                  id="edit-price"
                  name="price"
                  type="number"
                  value={form.price}
                  onChange={handleChange}
                  min={0}
                  step={0.01}
                />
              </div>
              <div>
                <Label htmlFor="edit-image">Image URL</Label>
                <Input
                  id="edit-image"
                  name="image"
                  value={form.image}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="edit-features">Features (comma separated)</Label>
              <Input
                id="edit-features"
                value={featuresInput}
                onChange={handleFeaturesChange}
              />
              {form.features.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {form.features.map((f, i) => (
                    <Badge key={i} variant="secondary">
                      {f}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-shop">Shop</Label>
                <Select
                  value={form.shop}
                  onValueChange={(v) => handleSelectChange("shop", v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select shop" />
                  </SelectTrigger>
                  <SelectContent>
                    {safeShops.map((s) => (
                      <SelectItem key={s._id} value={s._id}>
                        {s.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-category">Category</Label>
                <Select
                  value={form.category}
                  onValueChange={(v) => handleSelectChange("category", v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {safeCategories.map((c) => (
                      <SelectItem key={c._id} value={c._id}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end space-x-2 pt-4">
              <Button
                variant="outline"
                onClick={() => {
                  setIsEditOpen(false);
                  resetForm();
                }}
              >
                Cancel
              </Button>
              <Button onClick={handleUpdate} disabled={loading}>
                {loading ? "Updating..." : "Update"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
