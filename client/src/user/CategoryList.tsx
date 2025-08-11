// src/pages/CategoryList.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCategoryStore } from "../store/useCategoryStore";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export default function CategoryList() {
  const { categories, getCategories, loading } = useCategoryStore();
  const navigate = useNavigate();

  useEffect(() => {
    getCategories();
  }, []);

  if (loading) {
    return <Progress className="w-full" />;
  }

  return (
    <div className="space-y-4 p-6">
      {categories.map((cat) => (
        <Card key={cat._id} className="hover:bg-gray-50">
          <CardHeader>
            <CardTitle>{cat.name}</CardTitle>
            {cat.description && (
              <CardDescription>{cat.description}</CardDescription>
            )}
          </CardHeader>
          <CardFooter>
            <Button
              variant="secondary"
              onClick={() => navigate(`/categories/${cat._id}/shops`)}
            >
              View Shops
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
