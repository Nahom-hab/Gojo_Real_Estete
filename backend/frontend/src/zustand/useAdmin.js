import { create } from 'zustand';

// Create Zustand store
const useAdmin = create((set) => ({
    admin: null, // Admin state (null by default, will hold id, email, and username)

    // Fetch Admin Status function
    fetchAdminStatus: async () => {
        try {
            const response = await fetch('/api/admin/check-admin-status', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    // Add any necessary authentication headers like tokens if required
                },
            });

            if (response.ok) {
                const data = await response.json();
                // Assuming `data` contains { id, email, username } for the admin
                set({ admin: { id: data.id, email: data.email, username: data.username } });
            } else {
                throw new Error('Failed to verify admin status');
            }
        } catch (error) {
            console.error('Error fetching admin status:', error);
            set({ admin: null }); // Set admin to null in case of error
        }
    },

    // Set Admin manually function (adminData can hold id, email, username)
    setAdmin: (adminData) => set({ admin: adminData }),
}));

export default useAdmin;
