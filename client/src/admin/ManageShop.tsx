// src/features/shop/ManageShops.tsx
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Plus, Edit, Trash2, Eye, Search, RefreshCw } from "lucide-react";

import { useShopStore } from "@/store/useShopStore";
import { useCategoryStore } from "@/store/useCategoryStore";
import { useFloorStore } from "@/store/useFloorStore";
import { useUserStore } from "@/store/useUserStore";

interface ShopFormData {
  name: string;
  owner: string;
  category: string;
  floor: string;
  description: string;
  address: string;
  contact: string;
  image?: string;
}

export default function ManageShops() {
  const {
    shops,
    loading,
    getShops,
    getShopById,
    createShop,
    updateShop,
    deleteShop,
  } = useShopStore();
  const { categories, getCategories } = useCategoryStore();
  const { floors, getFloors } = useFloorStore();
  const { allUsers, getAllUsers } = useUserStore();

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedShop, setSelectedShop] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterFloor, setFilterFloor] = useState("all");
  const [formData, setFormData] = useState<ShopFormData>({
    name: "",
    owner: "",
    category: "",
    floor: "",
    description: "",
    address: "",
    contact: "",
    image: "",
  });

  useEffect(() => {
    getShops();
    getCategories();
    getFloors();
    getAllUsers();
  }, [getShops, getCategories, getFloors, getAllUsers]);

  const resetForm = () =>
    setFormData({
      name: "",
      owner: "",
      category: "",
      floor: "",
      description: "",
      address: "",
      contact: "",
      image: "",
    });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) =>
    setFormData((prev) => ({ ...prev, [name]: value }));

  const getCategoryName = (id: string) =>
    categories.find((c) => c._id === id)?.name ?? id;
  const getFloorNumber = (id: string) =>
    floors.find((f) => f._id === id)?.floorNumber.toString() ?? id;
  const getOwnerName = (id: string) =>
    allUsers.find((u) => u._id === id)?.fullname ?? id;

  const handleCreateShop = async () => {
    await createShop(formData);
    setIsCreateOpen(false);
    resetForm();
  };

  const openEditModal = (shop: any) => {
    // Normalize owner, category, floor fields to IDs
    const ownerId =
      typeof shop.owner === "object" ? shop.owner._id : shop.owner;
    const categoryId =
      typeof shop.category === "object" ? shop.category._id : shop.category;
    const floorId =
      typeof shop.floor === "object" ? shop.floor._id : shop.floor;

    setSelectedShop(shop);
    setFormData({
      name: shop.name,
      owner: ownerId,
      category: categoryId,
      floor: floorId,
      description: shop.description || "",
      address: shop.address,
      contact: shop.contact,
      image: shop.image || "",
    });
    setIsEditOpen(true);
  };

  const handleEditShop = async () => {
    if (!selectedShop) return;
    await updateShop(selectedShop._id, formData);
    setIsEditOpen(false);
    resetForm();
    setSelectedShop(null);
  };

  const handleDeleteShop = async (id: string) => {
    await deleteShop(id);
  };

  const handleViewShop = (shop: any) => {
    // Avoid rendering full objects
    const ownerId =
      typeof shop.owner === "object" ? shop.owner?._id : shop.owner;
    const categoryId =
      typeof shop.category === "object" ? shop.category?._id : shop.category;
    const floorId =
      typeof shop.floor === "object" ? shop.floor?._id : shop.floor;

    setSelectedShop({
      ...shop,
      owner: ownerId,
      category: categoryId,
      floor: floorId,
    });
    setIsViewOpen(true);
  };

  const filteredShops = shops.filter((shop) => {
    const name = shop.name as string;
    const addr = shop.address as string;
    const matchesSearch =
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      addr.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat =
      filterCategory === "all" ||
      (typeof shop.category === "string"
        ? shop.category === filterCategory
        : typeof shop.category === "object" &&
          shop.category !== null &&
          "_id" in shop.category
        ? (shop.category as { _id: string })._id === filterCategory
        : false);
    const matchesFloor =
      filterFloor === "all" ||
      (typeof shop.floor === "string"
        ? shop.floor === filterFloor
        : typeof shop.floor === "object" &&
          shop.floor !== null &&
          "._id" in shop.floor
        ? (shop.floor as { _id: string })._id === filterFloor
        : false);
    return matchesSearch && matchesCat && matchesFloor;
  });

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Shop Management</h1>
          <p className="text-muted-foreground">
            Create, view, update, and delete shops.
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => getShops()}
            disabled={loading}
          >
            <RefreshCw className="h-4 w-4 mr-1" /> Refresh
          </Button>
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-1" /> Create Shop
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Shop</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Shop name"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="contact">Contact</Label>
                    <Input
                      id="contact"
                      name="contact"
                      placeholder="Contact no."
                      value={formData.contact}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="owner">Owner</Label>
                    <Select
                      value={formData.owner}
                      onValueChange={(v) => handleSelectChange("owner", v)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select owner" />
                      </SelectTrigger>
                      <SelectContent>
                        {allUsers.map((u) => (
                          <SelectItem key={u._id} value={u._id}>
                            {u.fullname}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(v) => handleSelectChange("category", v)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((c) => (
                          <SelectItem key={c._id} value={c._id}>
                            {c.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="floor">Floor</Label>
                    <Select
                      value={formData.floor}
                      onValueChange={(v) => handleSelectChange("floor", v)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select floor" />
                      </SelectTrigger>
                      <SelectContent>
                        {floors.map((f) => (
                          <SelectItem key={f._id} value={f._id}>
                            Floor {f.floorNumber}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="image">Image URL</Label>
                  <Input
                    id="image"
                    name="image"
                    placeholder="Optional image URL"
                    value={formData.image}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsCreateOpen(false);
                      resetForm();
                    }}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleCreateShop} disabled={loading}>
                    {loading ? "Creating..." : "Create"}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters & Search</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                className="pl-8"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((c) => (
                  <SelectItem key={c._id} value={c._id}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterFloor} onValueChange={setFilterFloor}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Filter floor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Floors</SelectItem>
                {floors.map((f) => (
                  <SelectItem key={f._id} value={f._id}>
                    Floor {f.floorNumber}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Shops Table */}
      <Card>
        <CardHeader>
          <CardTitle>Shops ({filteredShops.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading && shops.length === 0 ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto" />
              <p className="mt-2 text-muted-foreground">Loading...</p>
            </div>
          ) : filteredShops.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No shops found</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Floor</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredShops.map((shop: any) => {
                  const ownerId =
                    shop.owner &&
                    typeof shop.owner === "object" &&
                    "_id" in shop.owner
                      ? shop.owner._id
                      : shop.owner;
                  const categoryId =
                    shop.category &&
                    typeof shop.category === "object" &&
                    "_id" in shop.category
                      ? shop.category._id
                      : shop.category;
                  const floorId =
                    shop.floor &&
                    typeof shop.floor === "object" &&
                    "_id" in shop.floor
                      ? shop.floor._id
                      : shop.floor;

                  return (
                    <TableRow key={shop._id}>
                      <TableCell className="font-medium">{shop.name}</TableCell>
                      <TableCell>{getOwnerName(ownerId)}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">
                          {getCategoryName(categoryId)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          Floor {getFloorNumber(floorId)}
                        </Badge>
                      </TableCell>
                      <TableCell>{shop.contact}</TableCell>
                      <TableCell className="max-w-[200px] truncate">
                        {shop.address}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewShop(shop)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openEditModal(shop)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Delete “{shop.name}”?
                                </AlertDialogTitle>
                              </AlertDialogHeader>
                              <p className="text-sm text-muted-foreground">
                                This action cannot be undone.
                              </p>
                              <div className="flex justify-end gap-2 pt-4">
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDeleteShop(shop._id)}
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                  Delete
                                </AlertDialogAction>
                              </div>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Shop</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {/* Reuse form fields as in create */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-name">Name</Label>
                <Input
                  id="edit-name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="edit-contact">Contact</Label>
                <Input
                  id="edit-contact"
                  name="contact"
                  value={formData.contact}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="edit-owner">Owner</Label>
                <Select
                  value={formData.owner}
                  onValueChange={(v) => handleSelectChange("owner", v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select owner" />
                  </SelectTrigger>
                  <SelectContent>
                    {allUsers.map((u) => (
                      <SelectItem key={u.fullname} value={u.fullname}>
                        {u.fullname}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(v) => handleSelectChange("category", v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((c) => (
                      <SelectItem key={c._id} value={c._id}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-floor">Floor</Label>
                <Select
                  value={formData.floor}
                  onValueChange={(v) => handleSelectChange("floor", v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select floor" />
                  </SelectTrigger>
                  <SelectContent>
                    {floors.map((f) => (
                      <SelectItem key={f._id} value={f._id}>
                        Floor {f.floorNumber}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="edit-address">Address</Label>
              <Input
                id="edit-address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="edit-image">Image URL</Label>
              <Input
                id="edit-image"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button
                variant="outline"
                onClick={() => {
                  setIsEditOpen(false);
                  resetForm();
                  setSelectedShop(null);
                }}
              >
                Cancel
              </Button>
              <Button onClick={handleEditShop} disabled={loading}>
                {loading ? "Updating..." : "Update"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Shop Details</DialogTitle>
          </DialogHeader>
          {selectedShop && (
            <div className="space-y-4">
              {selectedShop.image && (
                <div className="w-full h-48 bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={selectedShop.image}
                    alt={selectedShop.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="font-semibold">Name</Label>
                  <p>{selectedShop.name}</p>
                </div>
                <div>
                  <Label className="font-semibold">Owner</Label>
                  <p>{getOwnerName(selectedShop.owner)}</p>
                </div>
                <div>
                  <Label className="font-semibold">Category</Label>
                  <Badge variant="secondary">
                    {getCategoryName(selectedShop.category)}
                  </Badge>
                </div>
                <div>
                  <Label className="font-semibold">Floor</Label>
                  <Badge variant="outline">
                    Floor {getFloorNumber(selectedShop.floor)}
                  </Badge>
                </div>
                <div>
                  <Label className="font-semibold">Contact</Label>
                  <p>{selectedShop.contact}</p>
                </div>
                <div className="col-span-2">
                  <Label className="font-semibold">Address</Label>
                  <p>{selectedShop.address}</p>
                </div>
                {selectedShop.description && (
                  <div className="col-span-2">
                    <Label className="font-semibold">Description</Label>
                    <p className="text-sm text-muted-foreground">
                      {selectedShop.description}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
