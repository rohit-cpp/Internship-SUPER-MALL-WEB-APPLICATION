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
import HeroSection from "./components/HeroSection";
import MainLayout from "./Layout/MainLayout";
import Profile from "./user/Profile";

import { useUserStore } from "./store/useUserStore";
import { useEffect } from "react";
import Loading from "./components/ui/Loading";

const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user } = useUserStore();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  // if (!user?.isVerified) {
  //   return <Navigate to="/verify-email" replace />;
  // }
  return children;
};

const AuthenticatedUser = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user } = useUserStore();
  if (isAuthenticated && user?.isVerified) {
    return <Navigate to="/" replace />;
  }
  return children;
};

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isAuthenticated } = useUserStore();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  if (!user?.admin) {
    return <Navigate to="/" replace />;
  }
  return children;
};
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoutes>
        <MainLayout />
      </ProtectedRoutes>
    ),
    children: [
      {
        path: "/",
        element: <HeroSection />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },

      //admin services starts here
      // {
      //   path: "/admin/dashboard",
      //   element: (
      //     <AdminRoute>
      //       <AdminDashboard />
      //     </AdminRoute>
      //   ),
      // },
      // {
      //   path: "/admin/data",
      //   element: (
      //     <AdminRoute>
      //       <AdminData />
      //     </AdminRoute>
      //   ),
      // },
      // {
      //   path: "/admin/logs",
      //   element: (
      //     <AdminRoute>
      //       <AdminLogs />
      //     </AdminRoute>
      //   ),
      // },
      // {
      //   path: "/admin/managepoi",
      //   element: (
      //     <AdminRoute>
      //       <ManagePOI />
      //     </AdminRoute>
      //   ),
      // },
      // {
      //   path: "/admin/upload-data",
      //   element: (
      //     <AdminRoute>
      //       <UploadData />
      //     </AdminRoute>
      //   ),
      // },
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
    // checking auth every time when page isloaded
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
