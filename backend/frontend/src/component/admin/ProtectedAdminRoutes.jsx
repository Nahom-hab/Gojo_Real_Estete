import React, { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import useAdmin from "../../zustand/useAdmin";

export default function ProtectedAdminRoute() {
    const { admin, fetchAdminStatus } = useAdmin();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAdminStatus = async () => {
            setLoading(true);
            try {
                await fetchAdminStatus(); // Assume you have an async call to verify admin status
            } catch (error) {
                console.error("Failed to fetch admin status:", error);
            }
            setLoading(false);
        };

        checkAdminStatus();
    }, []);

    // Show loading spinner while fetching admin status
    if (loading) {
        return <div>Loading...</div>;
    }

    // If not an admin, redirect to a login or forbidden page
    return admin ? <Outlet /> : <Navigate to="/admin/login/secret" />;
}
