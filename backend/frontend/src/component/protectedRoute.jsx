import React, { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import useUser from "../zustand/useUser";

export default function ProtectedRoute() {
  const { user, fetchUserStatus } = useUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserStatus = async () => {
      setLoading(true);
      try {
        await fetchUserStatus(); // Assume you have an async call to verify admin status
      } catch (error) {
        console.error("Failed to fetch admin status:", error);
      }
      setLoading(false);
    };

    checkUserStatus();
  }, []);

  // Show loading spinner while fetching admin status
  if (loading) {
    return <div>Loading...</div>;
  }

  // If not an admin, redirect to a login or forbidden page
  return user ? <Outlet /> : <Navigate to="/login" />;
}
