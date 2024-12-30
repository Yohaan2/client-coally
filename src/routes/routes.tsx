import { createBrowserRouter, Navigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import DefaultLayout from "../components/DefaultLayout";
import CreateTask from "../components/CreateTask";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to={'/dashboard'} replace />
  },
  {
    path: '/dashboard',
    element: (
      <DefaultLayout>
        <Dashboard />
      </DefaultLayout>
    )
  },
  {
    path: '/create-task',
    element: (
      <DefaultLayout>
        <CreateTask />
      </DefaultLayout>
    )
  }
])