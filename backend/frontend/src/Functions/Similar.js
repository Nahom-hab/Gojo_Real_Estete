export default function findSimilarListings(targetListing, listings) {

    return listings.filter((listing) => {
        return (
            targetListing.HomeType === listing.HomeType && // Same home type
            targetListing.RentOrSell === listing.RentOrSell
        );
    });
}