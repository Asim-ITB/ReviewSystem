import {
  Navigate,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Error404 from "../components/Error404";
import Login from "../pages/login/Login";
import Protected from "../components/Protected";
import AdminLayout from "../pages/Admin/components/AdminLayout";
import Dashboard from "../pages/Admin/dashboard/Dashboard";
import Home from "../pages/AppComponents/home/Home";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="*" element={<Error404 />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
      <Route
        path="/admin"
        element={
          <Protected>
            <AdminLayout />
          </Protected>
        }
      >
        <Route path="*" element={<Error404 />} />
        <Route index element={<Navigate to="dashboard" />} />
        <Route path="dashboard" element={<Dashboard />} />
      </Route>
    </Route>
  )
);
