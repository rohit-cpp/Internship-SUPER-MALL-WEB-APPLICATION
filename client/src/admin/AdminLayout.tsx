// src/Layout/AdminLayout.tsx
import React, { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Store,
  Home,
  Tags,
  Layers,
  Building2,
  Menu as MenuIcon,
  X as CloseIcon,
  Key,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const menuItems = [
  { name: "Manage Shops", path: "/admin/manage-shops", icon: Home },
  { name: "Manage Products", path: "/admin/manage-products", icon: Key },
  { name: "Manage Offers", path: "/admin/manage-offers", icon: Tags },
  { name: "Manage Categories", path: "/admin/manage-categories", icon: Layers },
  { name: "Manage Floors", path: "/admin/manage-floors", icon: Building2 },
];

export default function AdminLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Mobile: Sheet */}
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
              className="p-1 rounded hover:bg-gray-700"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
            >
              <CloseIcon className="w-5 h-5" />
            </button>
          </div>
          <nav className="space-y-2">
            {menuItems.map(({ name, path, icon: Icon }) => (
              <NavLink
                key={path}
                to={path}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 p-2 rounded hover:bg-gray-700 transition",
                    isActive && "bg-gray-700"
                  )
                }
              >
                <Icon className="w-5 h-5" />
                {name}
              </NavLink>
            ))}
          </nav>
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:flex-col w-64 bg-gray-900 text-white p-4">
        <h1 className="text-xl font-bold mb-6">Admin Dashboard</h1>
        <nav className="space-y-2 flex-1">
          {menuItems.map(({ name, path, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 p-2 rounded hover:bg-gray-700 transition",
                  isActive && "bg-gray-700"
                )
              }
            >
              <Icon className="w-5 h-5" />
              {name}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-gray-100 p-4 md:p-6">
        <Outlet />
      </main>
    </div>
  );
}
