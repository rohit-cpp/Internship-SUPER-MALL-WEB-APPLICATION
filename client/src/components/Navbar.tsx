// src/components/Navbar.tsx
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useUserStore } from "@/store/useUserStore";
import {
  Loader2,
  Menu,
  Moon,
  Sun,
  Settings,
  LogOut,
  Shield,
  Home,
  LucideShoppingBag,
  LucideTags,
  LucideLayers,
  LucidePlusSquare,
  LucideList,
  LucideStore,
  LucideBuilding2,
  LucidePackageSearch,
  LucideGitCompare,
} from "lucide-react";

/* ===================== MAIN NAVBAR ===================== */
export const Navbar = () => {
  const { user, loading, logout } = useUserStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const getInitials = (name?: string) =>
    name
      ?.split(" ")
      .map((w) => w[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "U";

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800/50 bg-slate-950/90 backdrop-blur-xl supports-[backdrop-filter]:bg-slate-950/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          to="/"
          className="group flex items-center gap-3 transition-all duration-300 hover:scale-105"
        >
          <div className="relative">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400 to-violet-500 opacity-75 blur-sm group-hover:opacity-100 group-hover:blur-md transition-all duration-300"></div>
            <div className="relative rounded-xl bg-gradient-to-r from-cyan-400 to-violet-500 p-2.5 shadow-lg shadow-cyan-500/25">
              <LucideShoppingBag className="h-5 w-5 text-white" />
            </div>
          </div>
          <div className="relative">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-500 bg-clip-text text-xl font-bold text-transparent drop-shadow-sm">
              Super Mall
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-500 bg-clip-text text-xl font-bold text-transparent opacity-0 blur-sm group-hover:opacity-50 transition-opacity duration-300">
              Super Mall
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          <DesktopLinks user={user} />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <ProfileDropdown
            user={user}
            loading={loading}
            handleLogout={handleLogout}
            getInitials={getInitials}
          />
          {/* Mobile Menu */}
          <div className="md:hidden">
            <MobileNavbar
              user={user}
              loading={loading}
              handleLogout={handleLogout}
              getInitials={getInitials}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

/* ===================== DESKTOP NAV LINKS ===================== */
const DesktopLinks = ({ user }: { user: any }) => {
  const linkClasses =
    "group relative flex items-center gap-2 px-3 py-2 rounded-lg text-slate-300 hover:text-white transition-all duration-300 hover:bg-slate-800/50 hover:shadow-lg hover:shadow-cyan-500/10";

  const AdminMenu = (
    <>
      <Link className={linkClasses} to="/">
        <Home className="h-4 w-4 group-hover:text-cyan-400 transition-colors" />
        <span className="font-medium">Home</span>
      </Link>
      <Link className={linkClasses} to="/admin/create-shop">
        <LucidePlusSquare className="h-4 w-4 group-hover:text-cyan-400 transition-colors" />
        <span className="font-medium">Create Shop</span>
      </Link>
      <Link className={linkClasses} to="/admin/manage-shops">
        <LucideStore className="h-4 w-4 group-hover:text-cyan-400 transition-colors" />
        <span className="font-medium">Manage Shops</span>
      </Link>
      <Link className={linkClasses} to="/admin/manage-products">
        <LucideShoppingBag className="h-4 w-4 group-hover:text-cyan-400 transition-colors" />
        <span className="font-medium">Products</span>
      </Link>
      <Link className={linkClasses} to="/admin/manage-offers">
        <LucideTags className="h-4 w-4 group-hover:text-cyan-400 transition-colors" />
        <span className="font-medium">Offers</span>
      </Link>
      <Link className={linkClasses} to="/admin/manage-categories">
        <LucideLayers className="h-4 w-4 group-hover:text-cyan-400 transition-colors" />
        <span className="font-medium">Categories</span>
      </Link>
      <Link className={linkClasses} to="/admin/manage-floors">
        <LucideBuilding2 className="h-4 w-4 group-hover:text-cyan-400 transition-colors" />
        <span className="font-medium">Floors</span>
      </Link>
    </>
  );

  const UserMenu = (
    <>
      <Link className={linkClasses} to="/">
        <Home className="h-4 w-4 group-hover:text-cyan-400 transition-colors" />
        <span className="font-medium">Home</span>
      </Link>
      <Link className={linkClasses} to="/shop-list">
        <LucideList className="h-4 w-4 group-hover:text-cyan-400 transition-colors" />
        <span className="font-medium">Shop List</span>
      </Link>
      <Link className={linkClasses} to="/products">
        <LucidePackageSearch className="h-4 w-4 group-hover:text-cyan-400 transition-colors" />
        <span className="font-medium">All Products</span>
      </Link>
      <Link className={linkClasses} to="/compare">
        <LucideGitCompare className="h-4 w-4 group-hover:text-cyan-400 transition-colors" />
        <span className="font-medium">Compare</span>
      </Link>
    </>
  );

  return user?.admin ? AdminMenu : UserMenu;
};

/* ===================== PROFILE DROPDOWN ===================== */
const ProfileDropdown = ({ user, loading, handleLogout, getInitials }: any) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button
        variant="ghost"
        className="relative h-10 w-10 rounded-full p-0 hover:bg-slate-800/50 transition-all duration-300"
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 opacity-0 hover:opacity-20 transition-opacity duration-300"></div>
        <Avatar className="h-10 w-10 border-2 border-slate-700 hover:border-cyan-400/50 transition-colors duration-300">
          <AvatarImage src={user?.profilePicture} alt={user?.fullname} />
          <AvatarFallback className="bg-gradient-to-r from-cyan-400 to-violet-500 text-white font-semibold">
            {getInitials(user?.fullname)}
          </AvatarFallback>
        </Avatar>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent
      align="end"
      className="w-64 bg-slate-900/95 backdrop-blur-xl border-slate-700/50"
    >
      <div className="flex items-center gap-3 p-3">
        <Avatar className="h-12 w-12 border-2 border-slate-700">
          <AvatarImage src={user?.profilePicture} alt={user?.fullname} />
          <AvatarFallback className="bg-gradient-to-r from-cyan-400 to-violet-500 text-white font-semibold">
            {getInitials(user?.fullname)}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-white truncate">{user?.fullname}</p>
          <p className="text-sm text-slate-400 truncate">{user?.email}</p>
          <div className="mt-2 flex gap-1">
            {user?.admin && (
              <Badge className="text-xs bg-gradient-to-r from-violet-500 to-purple-600 text-white border-0 shadow-lg shadow-violet-500/25">
                <Shield className="mr-1 h-3 w-3" /> Admin
              </Badge>
            )}
            {user?.isVerified ? (
              <Badge className="text-xs bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-0 shadow-lg shadow-emerald-500/25">
                Verified
              </Badge>
            ) : (
              <Badge
                variant="outline"
                className="text-xs border-slate-600 text-slate-400"
              >
                Unverified
              </Badge>
            )}
          </div>
        </div>
      </div>
      <DropdownMenuSeparator className="bg-slate-700/50" />
      <DropdownMenuItem
        asChild
        className="hover:bg-slate-800/50 focus:bg-slate-800/50"
      >
        <Link
          to="/profile"
          className="flex items-center text-slate-300 hover:text-white"
        >
          <Settings className="mr-3 h-4 w-4" /> Profile Settings
        </Link>
      </DropdownMenuItem>
      <DropdownMenuSeparator className="bg-slate-700/50" />
      <DropdownMenuItem
        disabled={loading}
        onClick={handleLogout}
        className="text-red-400 hover:text-red-300 hover:bg-red-500/10 focus:bg-red-500/10"
      >
        {loading ? (
          <Loader2 className="mr-3 h-4 w-4 animate-spin" />
        ) : (
          <LogOut className="mr-3 h-4 w-4" />
        )}
        {loading ? "Logging out…" : "Log out"}
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

/* ===================== THEME TOGGLE ===================== */
const ThemeToggle = () => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button
        size="icon"
        variant="ghost"
        className="relative rounded-full text-slate-400 hover:text-cyan-400 hover:bg-slate-800/50 transition-all duration-300"
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 opacity-0 hover:opacity-10 transition-opacity duration-300"></div>
        <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent
      align="end"
      className="bg-slate-900/95 backdrop-blur-xl border-slate-700/50"
    >
      <DropdownMenuItem className="hover:bg-slate-800/50 focus:bg-slate-800/50 text-slate-300 hover:text-white">
        Light
      </DropdownMenuItem>
      <DropdownMenuItem className="hover:bg-slate-800/50 focus:bg-slate-800/50 text-slate-300 hover:text-white">
        Dark
      </DropdownMenuItem>
      <DropdownMenuItem className="hover:bg-slate-800/50 focus:bg-slate-800/50 text-slate-300 hover:text-white">
        System
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

/* ===================== MOBILE NAVBAR ===================== */
export const MobileNavbar = ({
  user,
  loading,
  handleLogout,
  getInitials,
}: any) => (
  <Sheet>
    <SheetTrigger asChild>
      <Button
        size="icon"
        variant="ghost"
        className="relative rounded-full text-slate-400 hover:text-cyan-400 hover:bg-slate-800/50 transition-all duration-300"
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 opacity-0 hover:opacity-10 transition-opacity duration-300"></div>
        <Menu className="h-5 w-5" />
      </Button>
    </SheetTrigger>
    <SheetContent
      side="right"
      className="w-80 bg-slate-950/95 backdrop-blur-xl border-slate-800/50"
    >
      <SheetHeader>
        <div className="flex justify-between items-center">
          <SheetTitle className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-400 to-violet-500 opacity-75 blur-sm"></div>
              <div className="relative rounded-lg bg-gradient-to-r from-cyan-400 to-violet-500 p-1.5 shadow-lg shadow-cyan-500/25">
                <Shield className="h-4 w-4 text-white" />
              </div>
            </div>
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-500 bg-clip-text text-lg font-bold text-transparent">
              Super Mall
            </span>
          </SheetTitle>
          <ThemeToggle />
        </div>

        {/* User Card */}
        <div className="mt-6 rounded-xl bg-slate-900/50 border border-slate-800/50 p-4 shadow-lg shadow-cyan-500/5">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 opacity-20 blur-sm"></div>
              <Avatar className="relative h-12 w-12 border-2 border-slate-700">
                <AvatarImage src={user?.profilePicture} alt={user?.fullname} />
                <AvatarFallback className="bg-gradient-to-r from-cyan-400 to-violet-500 text-white font-semibold">
                  {getInitials(user?.fullname)}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-semibold text-white">
                {user?.fullname || "User"}
              </p>
              <p className="truncate text-sm text-slate-400">{user?.email}</p>
              <div className="mt-2 flex gap-1">
                {user?.admin && (
                  <Badge className="text-xs bg-gradient-to-r from-violet-500 to-purple-600 text-white border-0 shadow-lg shadow-violet-500/25">
                    <Shield className="mr-1 h-3 w-3" /> Admin
                  </Badge>
                )}
                {user?.isVerified ? (
                  <Badge className="text-xs bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-0 shadow-lg shadow-emerald-500/25">
                    Verified
                  </Badge>
                ) : (
                  <Badge
                    variant="outline"
                    className="text-xs border-slate-600 text-slate-400"
                  >
                    Unverified
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>
      </SheetHeader>

      <Separator className="my-6 bg-slate-800/50" />

      <div className="flex flex-col gap-1">
        {user?.admin ? (
          <>
            <SectionTitle>ADMIN MENU</SectionTitle>
            <MobileLink to="/" label="Home" icon={Home} />
            <MobileLink
              to="/admin/create-shop"
              label="Create Shop"
              icon={LucidePlusSquare}
            />
            <MobileLink
              to="/admin/manage-shops"
              label="Manage Shops"
              icon={LucideStore}
            />
            <MobileLink
              to="/admin/manage-products"
              label="Manage Products"
              icon={LucideShoppingBag}
            />
            <MobileLink
              to="/admin/manage-offers"
              label="Manage Offers"
              icon={LucideTags}
            />
            <MobileLink
              to="/admin/manage-categories"
              label="Manage Categories"
              icon={LucideLayers}
            />
            <MobileLink
              to="/admin/manage-floors"
              label="Manage Floors"
              icon={LucideBuilding2}
            />
          </>
        ) : (
          <>
            <SectionTitle>NAVIGATION</SectionTitle>
            <MobileLink to="/" label="Home" icon={Home} />
            <MobileLink to="/shop-list" label="Shop List" icon={LucideList} />
            <MobileLink
              to="/products"
              label="All Products"
              icon={LucidePackageSearch}
            />
            <MobileLink
              to="/compare"
              label="Compare Products"
              icon={LucideGitCompare}
            />
          </>
        )}

        <Separator className="my-6 bg-slate-800/50" />
        <SectionTitle>ACCOUNT</SectionTitle>
        <MobileLink to="/profile" label="Profile Settings" icon={Settings} />

        <button
          onClick={handleLogout}
          disabled={loading}
          className="group mt-3 flex items-center gap-3 rounded-lg px-3 py-3 text-slate-300 hover:bg-red-500/10 hover:text-red-400 transition-all duration-300"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <LogOut className="h-4 w-4 group-hover:text-red-400 transition-colors" />
          )}
          <span className="font-medium">
            {loading ? "Logging out…" : "Log out"}
          </span>
        </button>
      </div>
    </SheetContent>
  </Sheet>
);

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className="px-3 py-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
    {children}
  </h3>
);

const MobileLink = ({
  to,
  icon: Icon,
  label,
}: {
  to: string;
  icon: any;
  label: string;
}) => (
  <SheetClose asChild>
    <Link
      to={to}
      className="group flex items-center gap-3 rounded-lg px-3 py-3 text-slate-300 hover:bg-slate-800/50 hover:text-white transition-all duration-300"
    >
      <Icon className="h-4 w-4 group-hover:text-cyan-400 transition-colors" />
      <span className="font-medium">{label}</span>
    </Link>
  </SheetClose>
);
