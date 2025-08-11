// src/features/floor/ManageFloors.tsx
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
import { useFloorStore } from "@/store/useFloorStore";

export default function ManageFloors() {
  const { floors, getFloors, createFloor, updateFloor, deleteFloor, loading } =
    useFloorStore();

  const [newFloor, setNewFloor] = useState("");
  const [editing, setEditing] = useState<{
    _id: string;
    floorNumber: number;
  } | null>(null);
  const [editFloor, setEditFloor] = useState("");

  useEffect(() => {
    getFloors();
  }, [getFloors]);

  const handleAdd = async () => {
    if (!newFloor.trim()) return;
    await createFloor({ floorNumber: Number(newFloor.trim()) });
    setNewFloor("");
  };

  const startEdit = (f: { _id: string; floorNumber: number }) => {
    setEditing(f);
    setEditFloor(f.floorNumber.toString());
  };

  const handleUpdate = async () => {
    if (editing && editFloor.trim()) {
      await updateFloor(editing._id, { floorNumber: Number(editFloor.trim()) });
      setEditing(null);
      setEditFloor("");
    }
  };

  const handleDelete = async (_id: string) => {
    await deleteFloor(_id);
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-semibold">Manage Floors</h2>

      {/* Add New Floor */}
      <div className="flex gap-2">
        <Input
          placeholder="Floor number"
          value={newFloor}
          onChange={(e) => setNewFloor(e.target.value)}
        />
        <Button onClick={handleAdd} disabled={loading}>
          {loading ? "Adding…" : "Add"}
        </Button>
      </div>

      {/* Floors Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Floor Number</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {floors.map((f) => (
            <TableRow key={f._id}>
              <TableCell>Floor {f.floorNumber}</TableCell>
              <TableCell className="text-right space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => startEdit(f)}
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
                        Delete floor {f.floorNumber}?
                      </AlertDialogTitle>
                    </AlertDialogHeader>
                    <div className="flex justify-end gap-2 pt-4">
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(f._id)}>
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
            <DialogTitle>Edit Floor</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              placeholder="Floor number"
              value={editFloor}
              onChange={(e) => setEditFloor(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setEditing(null);
                  setEditFloor("");
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
