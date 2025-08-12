// src/features/offer/ManageOffers.tsx
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
import { useOfferStore } from "@/store/useOfferStore";
import { useShopStore } from "@/store/useShopStore";

// Local types
interface Offer {
  _id: string;
  title: string;
  description?: string;
  discountPercentage: number;
  startDate: string;
  endDate: string;
  shop: string | { _id: string; name?: string } | null;
}

interface Shop {
  _id: string;
  name: string;
}

interface OfferFormData {
  title: string;
  description: string;
  discountPercentage: number;
  startDate: string;
  endDate: string;
  shop: string;
}

export default function ManageOffers() {
  const { offers, getOffers, createOffer, updateOffer, deleteOffer, loading } =
    useOfferStore();
  const { shops, getShops } = useShopStore();

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState<
    (OfferFormData & { _id?: string }) | null
  >(null);
  const [form, setForm] = useState<OfferFormData>({
    title: "",
    description: "",
    discountPercentage: 0,
    startDate: "",
    endDate: "",
    shop: "",
  });

  useEffect(() => {
    getOffers();
    getShops();
  }, [getOffers, getShops]);

  const safeOffers = Array.isArray(offers) ? offers : [];
  const safeShops = Array.isArray(shops) ? shops : [];

  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      discountPercentage: 0,
      startDate: "",
      endDate: "",
      shop: "",
    });
    setSelectedOffer(null);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((f) => ({
      ...f,
      [name]: name === "discountPercentage" ? Number(value) : value,
    }));
  };

  const handleSelectChange = (name: keyof OfferFormData, value: string) => {
    setForm((f) => ({ ...f, [name]: value }));
  };

  const openEdit = (offer: Offer) => {
    const shopId =
      typeof offer.shop === "string" ? offer.shop : offer.shop?._id || "";
    setSelectedOffer({ ...offer, _id: offer._id });
    setForm({
      title: offer.title,
      description: offer.description || "",
      discountPercentage: offer.discountPercentage,
      startDate: offer.startDate.slice(0, 10),
      endDate: offer.endDate.slice(0, 10),
      shop: shopId,
    });
    setIsEditOpen(true);
  };

  const handleCreate = async () => {
    await createOffer(form);
    setIsCreateOpen(false);
    resetForm();
  };

  const handleUpdate = async () => {
    if (selectedOffer?._id) {
      await updateOffer(selectedOffer._id, form);
      setIsEditOpen(false);
      resetForm();
    }
  };

  const handleDelete = async (id: string) => {
    await deleteOffer(id);
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

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Manage Offers</h2>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>Create Offer</Button>
          </DialogTrigger>
          <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create Offer</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={form.title}
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
                  <Label htmlFor="discountPercentage">Discount %</Label>
                  <Input
                    id="discountPercentage"
                    name="discountPercentage"
                    type="number"
                    min={0}
                    max={100}
                    value={form.discountPercentage}
                    onChange={handleChange}
                  />
                </div>
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
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    name="startDate"
                    type="date"
                    value={form.startDate}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    name="endDate"
                    type="date"
                    value={form.endDate}
                    onChange={handleChange}
                  />
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
        <div className="p-6 text-center">Loading offers...</div>
      ) : (
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Shop</TableHead>
                <TableHead>Discount</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {safeOffers.length ? (
                safeOffers.map((offer) => (
                  <TableRow key={offer._id}>
                    <TableCell className="font-medium">{offer.title}</TableCell>
                    <TableCell className="truncate max-w-xs">
                      {offer.description || "—"}
                    </TableCell>
                    <TableCell>{getShopName(offer.shop)}</TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {offer.discountPercentage}% off
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div>{offer.startDate.slice(0, 10)}</div>
                      <div className="text-muted-foreground">
                        to {offer.endDate.slice(0, 10)}
                      </div>
                    </TableCell>
                    <TableCell className="space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openEdit(offer)}
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
                              Delete "{offer.title}"?
                            </AlertDialogTitle>
                          </AlertDialogHeader>
                          <div className="flex justify-end space-x-2 pt-4">
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(offer._id)}
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
                  <TableCell
                    colSpan={6}
                    className="text-center py-8 text-muted-foreground"
                  >
                    No offers found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Offer</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="edit-title">Title</Label>
              <Input
                id="edit-title"
                name="title"
                value={form.title}
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
                <Label htmlFor="edit-discountPercentage">Discount %</Label>
                <Input
                  id="edit-discountPercentage"
                  name="discountPercentage"
                  type="number"
                  min={0}
                  max={100}
                  value={form.discountPercentage}
                  onChange={handleChange}
                />
              </div>
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
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-startDate">Start Date</Label>
                <Input
                  id="edit-startDate"
                  name="startDate"
                  type="date"
                  value={form.startDate}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="edit-endDate">End Date</Label>
                <Input
                  id="edit-endDate"
                  name="endDate"
                  type="date"
                  value={form.endDate}
                  onChange={handleChange}
                />
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
