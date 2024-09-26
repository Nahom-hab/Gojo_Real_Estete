import { create } from 'zustand'

const useUser = create((set) => ({
    user: JSON.parse(localStorage.getItem("user")),
    setUser: (user) => set({ user }),
    AllListings: JSON.parse(localStorage.getItem("listings")),
    setAllListings: (listings) => set({ listings }),
    isEng: JSON.parse(localStorage.getItem("isEng")),
    setIsEng: (isEng) => set({ isEng })
}))

export default useUser
