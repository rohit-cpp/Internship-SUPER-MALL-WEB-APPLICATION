// src/components/Sidebar.tsx
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Home,
  Tags,
  Layers,
  Building2,
  Menu as MenuIcon,
  X as CloseIcon,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const menuItems = [
  { name: "Manage Shops", path: "/manage-shops", icon: Home },
  { name: "Manage Offers", path: "/manage-offers", icon: Tags },
  { name: "Manage Categories", path: "/manage-categories", icon: Layers },
  { name: "Manage Floors", path: "/manage-floors", icon: Building2 },
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      {/* Mobile toggle */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <button
            className="md:hidden fixed top-4 left-4 z-50 p-2 rounded bg-gray-900 text-white"
            aria-label="Open menu"
          >
            <MenuIcon className="w-6 h-6" />
          </button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 bg-gray-900 text-white p-4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl font-bold">Admin Dashboard</h1>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="p-1 rounded hover:bg-gray-700"
            >
              <CloseIcon className="w-5 h-5" />
            </button>
          </div>
          <nav className="space-y-2">
            {menuItems.map(({ name, path, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-3 p-2 rounded hover:bg-gray-700 transition",
                  location.pathname === path && "bg-gray-700"
                )}
              >
                <Icon className="w-5 h-5" />
                {name}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>

      {/* Desktop sidebar */}
      <aside className="hidden md:flex md:flex-col w-64 bg-gray-900 text-white h-screen p-4">
        <h1 className="text-xl font-bold mb-6">Admin Dashboard</h1>
        <nav className="space-y-2 flex-1">
          {menuItems.map(({ name, path, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              className={cn(
                "flex items-center gap-3 p-2 rounded hover:bg-gray-700 transition",
                location.pathname === path && "bg-gray-700"
              )}
            >
              <Icon className="w-5 h-5" />
              {name}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}
