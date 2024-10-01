import { create } from 'zustand'

const useUser = create((set) => ({
    user: JSON.parse(localStorage.getItem("user")),
    setUser: (user) => set({ user }),
    AllListings: JSON.parse(localStorage.getItem("listings")),
    setAllListings: (listings) => set({ listings }),
    isEng: JSON.parse(localStorage.getItem("isEng")),
    setIsEng: (isEng) => set({ isEng }),
    Favorite: [],
    setFavorite: (Favorite) => set({ Favorite }),
    fetchAdminStatus: async () => {
        try {
            const response = await fetch('/api/auth/check-user-status', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    // Add any necessary authentication headers like tokens if required
                },
            });

            if (response.ok) {
                const data = await response.json();
                // Assuming `data` contains { id, email, username } for the admin
                set({ user: { _id: data.id, email: data.email, username: data.username, avatar: data.avatar } });
            } else {
                throw new Error('Failed to verify user status');
            }
        } catch (error) {
            console.error('Error fetching user status:', error);
            set({ admin: null }); // Set admin to null in case of error
        }
    },

}))

export default useUser
