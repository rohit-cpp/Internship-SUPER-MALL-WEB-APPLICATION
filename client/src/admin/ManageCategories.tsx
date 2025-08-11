// src/features/category/ManageCategories.tsx
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { useCategoryStore } from "@/store/useCategoryStore";

export default function ManageCategories() {
  // Zustand store
  const {
    categories,
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    loading,
  } = useCategoryStore();

  // Local state
  const [newName, setNewName] = useState("");
  const [editing, setEditing] = useState<{ _id: string; name: string } | null>(
    null
  );
  const [editName, setEditName] = useState("");

  // Load categories on mount
  useEffect(() => {
    getCategories();
  }, [getCategories]);

  // Handlers
  const handleAdd = async () => {
    if (!newName.trim()) return;
    await createCategory({ name: newName.trim() });
    setNewName("");
  };

  const startEdit = (cat: { _id: string; name: string }) => {
    setEditing(cat);
    setEditName(cat.name);
  };

  const handleUpdate = async () => {
    if (editing && editName.trim()) {
      await updateCategory(editing._id, { name: editName.trim() });
      setEditing(null);
      setEditName("");
    }
  };

  const handleDelete = async (_id: string) => {
    await deleteCategory(_id);
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-semibold">Manage Categories</h2>

      {/* Add New Category */}
      <div className="flex gap-2">
        <Input
          placeholder="New category name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <Button onClick={handleAdd} disabled={loading}>
          {loading ? "Adding…" : "Add"}
        </Button>
      </div>

      {/* Categories Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((cat) => (
            <TableRow key={cat._id}>
              <TableCell>{cat.name}</TableCell>
              <TableCell className="text-right space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => startEdit(cat)}
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
                      <AlertDialogTitle>Delete "{cat.name}"?</AlertDialogTitle>
                    </AlertDialogHeader>
                    <div className="flex justify-end gap-2 pt-4">
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(cat._id)}>
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

      {/* Edit Dialog */}
      <Dialog open={!!editing} onOpenChange={() => setEditing(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              placeholder="Category name"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setEditing(null);
                  setEditName("");
                }}
              >
                Cancel
              </Button>
              <Button onClick={handleUpdate} disabled={loading}>
                {loading ? "Updating…" : "Update"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
