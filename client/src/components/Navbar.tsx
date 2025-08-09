import { Link, useNavigate } from "react-router-dom";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "./ui/menubar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";

import { Badge } from "./ui/badge";
import {
  Loader2,
  Menu,
  Moon,
  Sun,
  User,
  Settings,
  LogOut,
  Shield,
  Search,
  History,
  BarChart3,
  Database,
  Upload,
  MapPin,
  Lock,
  Home,
} from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useUserStore } from "@/store/useUserStore";

export const Navbar = () => {
  const { user, loading, logout } = useUserStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const getInitials = (name: string) => {
    return (
      name
        ?.split(" ")
        .map((word) => word.charAt(0))
        .join("")
        .toUpperCase()
        .slice(0, 2) || "U"
    );
  };

  return (
    <nav className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              EPLQ
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {user?.admin ? (
              // Admin Navigation
              <>
                <div className="flex items-center space-x-6">
                  <Link
                    to="/"
                    className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    <Home className="h-4 w-4" />
                    <span>Home</span>
                  </Link>
                  <Link
                    to="/admin/upload-data"
                    className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    <Upload className="h-4 w-4" />
                    <span>Upload</span>
                  </Link>
                  <Link
                    to="/admin/managepoi"
                    className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    <MapPin className="h-4 w-4" />
                    <span>Manage POI</span>
                  </Link>
                </div>

                <Menubar>
                  <MenubarMenu>
                    <MenubarTrigger className="flex items-center gap-2 cursor-pointer">
                      <BarChart3 className="h-4 w-4" />
                      Admin Panel
                    </MenubarTrigger>
                    <MenubarContent>
                      <Link to="/admin/dashboard">
                        <MenubarItem className="flex items-center gap-2">
                          <BarChart3 className="h-4 w-4" />
                          Dashboard
                        </MenubarItem>
                      </Link>
                      <Link to="/admin/data">
                        <MenubarItem className="flex items-center gap-2">
                          <Database className="h-4 w-4" />
                          User Data
                        </MenubarItem>
                      </Link>
                      <Link to="/admin/logs">
                        <MenubarItem className="flex items-center gap-2">
                          <History className="h-4 w-4" />
                          Query Logs
                        </MenubarItem>
                      </Link>
                    </MenubarContent>
                  </MenubarMenu>
                </Menubar>
              </>
            ) : (
              // User Navigation
              <>
                <div className="flex items-center space-x-6">
                  <Link
                    to="/"
                    className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    <Home className="h-4 w-4" />
                    <span>Home</span>
                  </Link>
                  <Link
                    to="/searchpoi"
                    className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    <Search className="h-4 w-4" />
                    <span>Search POI</span>
                  </Link>
                  <Link
                    to="/decrypt"
                    className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    <Lock className="h-4 w-4" />
                    <span>Decrypt</span>
                  </Link>
                </div>

                <Menubar>
                  <MenubarMenu>
                    <MenubarTrigger className="flex items-center gap-2 cursor-pointer">
                      <User className="h-4 w-4" />
                      User Menu
                    </MenubarTrigger>
                    <MenubarContent>
                      <Link to="/dashboard">
                        <MenubarItem className="flex items-center gap-2">
                          <BarChart3 className="h-4 w-4" />
                          Dashboard
                        </MenubarItem>
                      </Link>
                      <Link to="/history">
                        <MenubarItem className="flex items-center gap-2">
                          <History className="h-4 w-4" />
                          Query History
                        </MenubarItem>
                      </Link>
                    </MenubarContent>
                  </MenubarMenu>
                </Menubar>
              </>
            )}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Light</DropdownMenuItem>
                <DropdownMenuItem>Dark</DropdownMenuItem>
                <DropdownMenuItem>System</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-10 w-10 rounded-full p-0"
                >
                  <Avatar className="h-10 w-10 border-2 border-gray-200">
                    <AvatarImage
                      src={user?.profilePicture}
                      alt={user?.fullname || "User"}
                    />
                    <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                      {getInitials(user?.fullname || "User")}
                    </AvatarFallback>
                  </Avatar>
                  {user?.isVerified && (
                    <div className="absolute -bottom-0.5 -right-0.5">
                      <div className="h-3 w-3 bg-green-500 border-2 border-white rounded-full"></div>
                    </div>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    {user?.fullname && (
                      <p className="font-medium">{user.fullname}</p>
                    )}
                    {user?.email && (
                      <p className="w-[200px] truncate text-sm text-muted-foreground">
                        {user.email}
                      </p>
                    )}
                    <div className="flex items-center gap-2 mt-1">
                      {user?.admin && (
                        <Badge variant="secondary" className="text-xs">
                          <Shield className="h-3 w-3 mr-1" />
                          Admin
                        </Badge>
                      )}
                      {user?.isVerified ? (
                        <Badge
                          variant="default"
                          className="text-xs bg-green-100 text-green-800"
                        >
                          Verified
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-xs">
                          Unverified
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <Link to="/profile">
                  <DropdownMenuItem className="flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    Profile Settings
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  disabled={loading}
                  className="flex items-center gap-2 text-red-600 focus:text-red-600"
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <LogOut className="h-4 w-4" />
                  )}
                  {loading ? "Logging out..." : "Log out"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu */}
            <div className="md:hidden">
              <MobileNavbar />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

import { Separator } from "@/components/ui/separator";
export const MobileNavbar = () => {
  const { user, logout, loading } = useUserStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const getInitials = (name: string) => {
    return (
      name
        ?.split(" ")
        .map((word) => word.charAt(0))
        .join("")
        .toUpperCase()
        .slice(0, 2) || "U"
    );
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="ghost" className="rounded-full">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-80">
        <SheetHeader className="space-y-4">
          <div className="flex items-center justify-between">
            <SheetTitle className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
                <Shield className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                EPLQ
              </span>
            </SheetTitle>

            {/* Theme Toggle */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full h-8 w-8"
                >
                  <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Light</DropdownMenuItem>
                <DropdownMenuItem>Dark</DropdownMenuItem>
                <DropdownMenuItem>System</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* User Profile Section */}
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <Avatar className="h-12 w-12 border-2 border-gray-200">
              <AvatarImage
                src={user?.profilePicture}
                alt={user?.fullname || "User"}
              />
              <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                {getInitials(user?.fullname || "User")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">
                {user?.fullname || "User"}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {user?.email}
              </p>
              <div className="flex items-center gap-1 mt-1">
                {user?.admin && (
                  <Badge variant="secondary" className="text-xs px-1 py-0">
                    <Shield className="h-2 w-2 mr-1" />
                    Admin
                  </Badge>
                )}
                {user?.isVerified ? (
                  <Badge
                    variant="default"
                    className="text-xs px-1 py-0 bg-green-100 text-green-800"
                  >
                    Verified
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-xs px-1 py-0">
                    Unverified
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </SheetHeader>

        <Separator className="my-4" />

        {/* Navigation Links */}
        <div className="flex flex-col space-y-2">
          {user?.admin ? (
            // Admin Navigation
            <>
              <h3 className="text-sm font-semibold text-muted-foreground px-2 mb-2">
                ADMIN MENU
              </h3>
              <SheetClose asChild>
                <Link
                  to="/"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Home className="h-4 w-4" />
                  <span>Home</span>
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link
                  to="/admin/dashboard"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <BarChart3 className="h-4 w-4" />
                  <span>Dashboard</span>
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link
                  to="/admin/data"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Database className="h-4 w-4" />
                  <span>User Data</span>
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link
                  to="/admin/logs"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <History className="h-4 w-4" />
                  <span>Query Logs</span>
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link
                  to="/admin/managepoi"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <MapPin className="h-4 w-4" />
                  <span>Manage POI</span>
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link
                  to="/admin/upload-data"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Upload className="h-4 w-4" />
                  <span>Upload Data</span>
                </Link>
              </SheetClose>
            </>
          ) : (
            // User Navigation
            <>
              <h3 className="text-sm font-semibold text-muted-foreground px-2 mb-2">
                NAVIGATION
              </h3>
              <SheetClose asChild>
                <Link
                  to="/"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Home className="h-4 w-4" />
                  <span>Home</span>
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link
                  to="/dashboard"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <BarChart3 className="h-4 w-4" />
                  <span>Dashboard</span>
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link
                  to="/searchpoi"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Search className="h-4 w-4" />
                  <span>Search POI</span>
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link
                  to="/decrypt"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Lock className="h-4 w-4" />
                  <span>Decrypt Data</span>
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link
                  to="/history"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <History className="h-4 w-4" />
                  <span>Query History</span>
                </Link>
              </SheetClose>
            </>
          )}

          <Separator className="my-4" />

          {/* Profile & Settings */}
          <h3 className="text-sm font-semibold text-muted-foreground px-2 mb-2">
            ACCOUNT
          </h3>
          <SheetClose asChild>
            <Link
              to="/profile"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Settings className="h-4 w-4" />
              <span>Profile Settings</span>
            </Link>
          </SheetClose>

          {/* Logout */}
          <button
            onClick={handleLogout}
            disabled={loading}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors text-left w-full mt-4"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <LogOut className="h-4 w-4" />
            )}
            <span>{loading ? "Logging out..." : "Log out"}</span>
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
