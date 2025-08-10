import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
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

/* ─────────────────────────────  DESKTOP NAVBAR  ───────────────────────────── */
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
    <nav className="sticky top-0 z-50 border-b border-neutral-800 bg-neutral-900/80 backdrop-blur supports-[backdrop-filter]:bg-neutral-900/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* ─── Logo ─────────────────────────────────────────────────── */}
        <Link to="/" className="flex items-center gap-2">
          <span className="rounded-lg bg-gradient-to-r from-cyan-400 to-fuchsia-500 p-2 neon-border shadow-fuchsia-500/40">
            <Shield className="h-5 w-5 text-white" />
          </span>
          <span className="bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-xl font-extrabold text-transparent tracking-tight neon-text">
            EPLQ
          </span>
        </Link>

        {/* ─── Main Navigation (Desktop) ────────────────────────────── */}
        <div className="hidden md:flex items-center gap-8">
          {user?.admin ? <AdminLinks /> : <UserLinks />}
        </div>

        {/* ─── Right-Side Actions ──────────────────────────────────── */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <ProfileDropdown
            user={user}
            loading={loading}
            handleLogout={handleLogout}
            getInitials={getInitials}
          />
          {/* Mobile menu trigger */}
          <div className="md:hidden">
            <MobileNavbar />
          </div>
        </div>
      </div>
    </nav>
  );
};

/* ─────────────────────────────  HELPER COMPONENTS  ────────────────────────── */
const NavLink = ({
  to,
  icon: Icon,
  label,
}: {
  to: string;
  icon: any;
  label: string;
}) => (
  <Link
    to={to}
    className="flex items-center gap-2 text-neutral-300 transition hover:text-cyan-400"
  >
    <Icon className="h-4 w-4" />
    {label}
  </Link>
);

const AdminLinks = () => (
  <>
    <NavLink to="/" icon={Home} label="Home" />
    <NavLink to="/admin/upload-data" icon={Upload} label="Upload" />
    <NavLink to="/admin/managepoi" icon={MapPin} label="Manage POI" />
    {/* Dropdown for admin panel */}
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger className="flex items-center gap-1 cursor-pointer text-neutral-300 hover:text-cyan-400">
          <BarChart3 className="h-4 w-4" />
          Admin&nbsp;Panel
        </MenubarTrigger>
        <MenubarContent>
          <Link to="/admin/dashboard">
            <MenubarItem>
              <BarChart3 className="mr-2 h-4 w-4" />
              Dashboard
            </MenubarItem>
          </Link>
          <Link to="/admin/data">
            <MenubarItem>
              <Database className="mr-2 h-4 w-4" />
              User&nbsp;Data
            </MenubarItem>
          </Link>
          <Link to="/admin/logs">
            <MenubarItem>
              <History className="mr-2 h-4 w-4" />
              Query&nbsp;Logs
            </MenubarItem>
          </Link>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  </>
);

const UserLinks = () => (
  <>
    <NavLink to="/" icon={Home} label="Home" />
    <NavLink to="/searchpoi" icon={Search} label="Search POI" />
    <NavLink to="/decrypt" icon={Lock} label="Decrypt" />
    {/* User dropdown */}
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger className="flex items-center gap-1 cursor-pointer text-neutral-300 hover:text-cyan-400">
          <User className="h-4 w-4" />
          User&nbsp;Menu
        </MenubarTrigger>
        <MenubarContent>
          <Link to="/dashboard">
            <MenubarItem>
              <BarChart3 className="mr-2 h-4 w-4" />
              Dashboard
            </MenubarItem>
          </Link>
          <Link to="/history">
            <MenubarItem>
              <History className="mr-2 h-4 w-4" />
              History
            </MenubarItem>
          </Link>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  </>
);

const ThemeToggle = () => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button
        size="icon"
        variant="ghost"
        className="rounded-full text-neutral-300 hover:text-cyan-400"
      >
        <Sun className="h-4 w-4 rotate-0 scale-100 dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-4 w-4 rotate-90 scale-0 dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem>Light</DropdownMenuItem>
      <DropdownMenuItem>Dark</DropdownMenuItem>
      <DropdownMenuItem>System</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

const ProfileDropdown = ({ user, loading, handleLogout, getInitials }: any) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0">
        <Avatar className="h-10 w-10 border-2 border-neutral-800">
          <AvatarImage src={user?.profilePicture} alt={user?.fullname} />
          <AvatarFallback className="bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-white">
            {getInitials(user?.fullname)}
          </AvatarFallback>
        </Avatar>
        {user?.isVerified && (
          <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-neutral-900 bg-emerald-400" />
        )}
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" className="w-56">
      <div className="flex items-center gap-2 p-2">
        <div className="flex flex-col">
          <span className="font-medium">{user?.fullname}</span>
          <span className="truncate text-xs text-neutral-500">
            {user?.email}
          </span>
          <div className="mt-1 flex gap-1">
            {user?.admin && (
              <Badge variant="secondary" className="text-xs">
                <Shield className="mr-1 h-3 w-3" />
                Admin
              </Badge>
            )}
            {user?.isVerified ? (
              <Badge
                variant="default"
                className="text-xs bg-emerald-100 text-emerald-800"
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
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          Profile Settings
        </DropdownMenuItem>
      </Link>
      <DropdownMenuSeparator />
      <DropdownMenuItem
        disabled={loading}
        onClick={handleLogout}
        className="text-red-600 focus:text-red-600"
      >
        {loading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <LogOut className="mr-2 h-4 w-4" />
        )}
        {loading ? "Logging out…" : "Log out"}
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

/* ─────────────────────────────  MOBILE NAVBAR  ───────────────────────────── */
export const MobileNavbar = () => {
  const { user, logout, loading } = useUserStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const getInitials = (name?: string) =>
    name
      ?.split(" ")
      .map((w) => w[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "U";

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className="rounded-full text-neutral-300 hover:text-cyan-400"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-80 bg-neutral-900/90 backdrop-blur"
      >
        <SheetHeader>
          <div className="flex items-center justify-between">
            <SheetTitle className="flex items-center gap-2">
              <span className="rounded-lg bg-gradient-to-r from-cyan-400 to-fuchsia-500 p-1.5 neon-border">
                <Shield className="h-4 w-4 text-white" />
              </span>
              <span className="bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-lg font-bold text-transparent neon-text">
                EPLQ
              </span>
            </SheetTitle>
            <ThemeToggle />
          </div>

          {/* User card */}
          <div className="mt-4 flex items-center gap-3 rounded-lg bg-neutral-800/50 p-3">
            <Avatar className="h-12 w-12 border-2 border-neutral-700">
              <AvatarImage src={user?.profilePicture} alt={user?.fullname} />
              <AvatarFallback className="bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-white">
                {getInitials(user?.fullname)}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-neutral-200">
                {user?.fullname || "User"}
              </p>
              <p className="truncate text-xs text-neutral-400">{user?.email}</p>
              <div className="mt-1 flex items-center gap-1">
                {user?.admin && (
                  <Badge variant="secondary" className="text-xs">
                    <Shield className="mr-1 h-3 w-3" />
                    Admin
                  </Badge>
                )}
                {user?.isVerified ? (
                  <Badge
                    variant="default"
                    className="text-xs bg-emerald-100 text-emerald-800"
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
        </SheetHeader>

        <Separator className="my-4" />

        {/* Links */}
        <div className="flex flex-col gap-2">
          {user?.admin ? (
            <>
              <SectionTitle>ADMIN MENU</SectionTitle>
              <MobileLink to="/" label="Home" icon={Home} />
              <MobileLink
                to="/admin/dashboard"
                label="Dashboard"
                icon={BarChart3}
              />
              <MobileLink to="/admin/data" label="User Data" icon={Database} />
              <MobileLink to="/admin/logs" label="Query Logs" icon={History} />
              <MobileLink
                to="/admin/managepoi"
                label="Manage POI"
                icon={MapPin}
              />
              <MobileLink
                to="/admin/upload-data"
                label="Upload Data"
                icon={Upload}
              />
            </>
          ) : (
            <>
              <SectionTitle>NAVIGATION</SectionTitle>
              <MobileLink to="/" label="Home" icon={Home} />
              <MobileLink to="/dashboard" label="Dashboard" icon={BarChart3} />
              <MobileLink to="/searchpoi" label="Search POI" icon={Search} />
              <MobileLink to="/decrypt" label="Decrypt Data" icon={Lock} />
              <MobileLink to="/history" label="Query History" icon={History} />
            </>
          )}

          <Separator className="my-4" />
          <SectionTitle>ACCOUNT</SectionTitle>
          <MobileLink to="/profile" label="Profile Settings" icon={Settings} />
          <button
            onClick={handleLogout}
            disabled={loading}
            className="mt-2 flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-neutral-300 transition hover:bg-red-500/10 hover:text-red-400"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <LogOut className="h-4 w-4" />
            )}
            <span>{loading ? "Logging out…" : "Log out"}</span>
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

/* ─────────────────────────────  REUSABLES  ───────────────────────────── */
const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className="mb-2 px-2 text-xs font-semibold tracking-wide text-neutral-500">
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
      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-neutral-300 transition hover:bg-neutral-800/60 hover:text-cyan-400"
    >
      <Icon className="h-4 w-4" />
      <span>{label}</span>
    </Link>
  </SheetClose>
);
