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
import { Label } from "@/components/ui/label";
import { useOfferStore } from "@/store/useOfferStore";

interface OfferFormData {
  title: string;
  description: string;
  discountPercentage: number;
  startDate: string;
  endDate: string;
  shop: string;
}

export default function ManageOffers() {
  const {
    offers,
    getOffers,
    getOffersByShop,
    createOffer,
    updateOffer,
    deleteOffer,
    loading,
  } = useOfferStore();

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
  }, [getOffers]);

  const resetForm = () =>
    setForm({
      title: "",
      description: "",
      discountPercentage: 0,
      startDate: "",
      endDate: "",
      shop: "",
    });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((f) => ({
      ...f,
      [name]: name === "discountPercentage" ? Number(value) : value,
    }));
  };

  const openEdit = (offer: any) => {
    setSelectedOffer(offer);
    setForm({
      title: offer.title,
      description: offer.description || "",
      discountPercentage: offer.discountPercentage,
      startDate: offer.startDate.slice(0, 10),
      endDate: offer.endDate.slice(0, 10),
      shop: offer.shop,
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
      setSelectedOffer(null);
    }
  };

  const handleDelete = async (id: string) => {
    await deleteOffer(id);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Manage Offers</h2>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>Create Offer</Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
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
                    value={form.discountPercentage}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label htmlFor="shop">Shop ID</Label>
                  <Input
                    id="shop"
                    name="shop"
                    value={form.shop}
                    onChange={handleChange}
                  />
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
        <p>Loading...</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Discount</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {offers.map((offer) => (
              <TableRow key={offer._id}>
                <TableCell>{offer.title}</TableCell>
                <TableCell>{offer.discountPercentage}%</TableCell>
                <TableCell>
                  {offer.startDate.slice(0, 10)} to {offer.endDate.slice(0, 10)}
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
            ))}
          </TableBody>
        </Table>
      )}

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-md">
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
                  value={form.discountPercentage}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="edit-shop">Shop ID</Label>
                <Input
                  id="edit-shop"
                  name="shop"
                  value={form.shop}
                  onChange={handleChange}
                />
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
                  setSelectedOffer(null);
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
