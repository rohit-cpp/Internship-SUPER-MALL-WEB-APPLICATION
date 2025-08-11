import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useShopStore } from "../store/useShopStore";

export default function CreateShop() {
  const { createShop, loading } = useShopStore();
  const [form, setForm] = useState({
    name: "",
    owner: "",
    category: "",
    floor: "",
    description: "",
    address: "",
    contact: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await createShop(form);
    setForm({
      name: "",
      owner: "",
      category: "",
      floor: "",
      description: "",
      address: "",
      contact: "",
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold mb-4">Create Shop</h2>
      <div className="grid gap-4 max-w-md">
        {Object.keys(form).map((key) => (
          <Input
            key={key}
            name={key}
            placeholder={key}
            value={form[key as keyof typeof form]}
            onChange={handleChange}
          />
        ))}
        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? "Creating..." : "Create Shop"}
        </Button>
      </div>
    </div>
  );
}
