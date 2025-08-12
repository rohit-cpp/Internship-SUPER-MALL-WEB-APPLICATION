// src/App.tsx
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import ForgotPassword from "./auth/ForgotPassword";
import ResetPassword from "./auth/ResetPassword";
import VerifyEmail from "./auth/VerifyEmail";

import MainLayout from "./Layout/MainLayout";
import Profile from "./components/Profile";

import { useUserStore } from "./store/useUserStore";
import { useEffect } from "react";
import Loading from "./components/ui/Loading";

/* ==== Admin pages - adjust these import paths to match your project structure ==== */
// import CreateShop from "./admin/CreateShop";
import ManageShops from "./admin/ManageShop";
import ManageOffers from "./admin/ManageOffer";
import ManageCategories from "./admin/ManageCategories";
import ManageFloors from "./admin/ManageFloors";
import AdminLayout from "./admin/AdminLayout";

import Home from "./components/HeroSection";

import ShopList from "./user/ShopList";
import ShopDetail from "./user/ShopDetail";
import ManageProducts from "./admin/ManageProducts";
import AllProducts from "./user/AllProducts";
import CompareProducts from "./user/CompareProducts";

/* ================================================================================ */

type HeroProps = {
  crumbs: string[];
  title: string;
  showBackButton?: boolean;
};

const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useUserStore();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  // if (!user?.isVerified) {
  //   return <Navigate to="/verify-email" replace />;
  // }
  return <>{children}</>;
};

const AuthenticatedUser = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user } = useUserStore();
  if (isAuthenticated && user?.isVerified) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isAuthenticated } = useUserStore();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  if (!user?.admin) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      // <ProtectedRoutes>
      <MainLayout />
      // </ProtectedRoutes>
    ),
    children: [
      {
        path: "/profile",
        element: <Profile />,
      },
      //User routes with protected route
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/shop-list",
        element: <ShopList />,
      },
      {
        path: "/shops/:id",
        element: <ShopDetail />,
      },
      {
        path: "/products",
        element: <AllProducts />,
      },
      {
        path: "/compare",
        element: <CompareProducts />,
      },

      // Admin routes with AdminLayout
      {
        path: "/admin",
        element: (
          // <AdminRoute>
          <AdminLayout />
          // {/* </AdminRoute> */}
        ),
        children: [
          { path: "create-shop", element: <ManageShops /> },
          { path: "manage-shops", element: <ManageShops /> },
          { path: "manage-products", element: <ManageProducts /> },
          { path: "manage-offers", element: <ManageOffers /> },
          { path: "manage-categories", element: <ManageCategories /> },
          { path: "manage-floors", element: <ManageFloors /> },
          { path: "", element: <Navigate to="create-shop" replace /> },
        ],
      },

      // =================================================
    ],
  },
  {
    path: "/login",
    element: (
      <AuthenticatedUser>
        <Login />
      </AuthenticatedUser>
    ),
  },
  {
    path: "/signup",
    element: (
      <AuthenticatedUser>
        <Signup />
      </AuthenticatedUser>
    ),
  },

  {
    path: "/forgot-password",
    element: (
      <AuthenticatedUser>
        <ForgotPassword />
      </AuthenticatedUser>
    ),
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/verify-email",
    element: <VerifyEmail />,
  },
]);

function App() {
  const { checkAuthentication, isCheckingAuth } = useUserStore();

  useEffect(() => {
    // check authentication once when app loads
    checkAuthentication();
  }, [checkAuthentication]);

  if (isCheckingAuth) return <Loading />;

  return (
    <main>
      <RouterProvider router={appRouter} />
    </main>
  );
}

export default App;
