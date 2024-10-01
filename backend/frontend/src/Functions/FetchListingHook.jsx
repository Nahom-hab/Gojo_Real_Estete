import { useEffect, useState } from 'react';
import useUser from '../zustand/useUser';

export default function FetchListingHook() {
    const { setAllListings, AllListings } = useUser();
    const [listings, setListings] = useState(null)

    useEffect(() => {

        const fetchListings = async () => {
            const listingsResponse = await fetch('/api/listing');
            if (!listingsResponse.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await listingsResponse.json();
            setAllListings(result);
            setListings(result)
            localStorage.setItem("listings", JSON.stringify(result));
        }
        fetchListings()

    }, [])
    if (listings) {
        return { listings }
    } else {
        return { listings: AllListings }
    }

}
