export const filterListings = (listings = [], formData = {}) => {
    try {
        // Handle no filters scenario
        if (!Object.keys(formData).length) {
            console.log("No filters applied. Returning all listings.");
            return listings;
        }

        return listings.filter(listing => {
            // Check for RentOrSell
            if (formData.forSale && formData.forSale !== 'both' && listing.RentOrSell !== formData.forSale) {
                console.log(`Filtering out due to RentOrSell: ${listing.RentOrSell} !== ${formData.forSale}`);
                return false;
            }

            // Check Price Range
            if ((formData.priceRange?.min && parseFloat(listing.regularPrice) < parseFloat(formData.priceRange.min)) ||
                (formData.priceRange?.max && parseFloat(listing.regularPrice) > parseFloat(formData.priceRange.max))) {
                console.log(`Filtering out due to Price Range: ${listing.regularPrice}`);
                return false;
            }

            // Check Beds
            if (formData.beds !== 'Any' && listing.bedrooms < parseInt(formData.beds, 10)) {
                console.log(`Filtering out due to Beds: ${listing.bedrooms} < ${formData.beds}`);
                return false;
            }

            // Check Baths
            if (formData.baths !== 'Any' && listing.bathrooms < parseInt(formData.baths, 10)) {
                console.log(`Filtering out due to Baths: ${listing.bathrooms} < ${formData.baths}`);
                return false;
            }

            // Check Home Type
            const homeTypeFilters = formData.homeTypes;
            if (!homeTypeFilters["any"]) {
                const selectedHomeTypes = Object.keys(homeTypeFilters).filter(key => homeTypeFilters[key] && key !== "any");
                if (selectedHomeTypes.length > 0 && !selectedHomeTypes.includes(listing.HomeType)) {
                    console.log(`Filtering out due to HomeType: ${listing.HomeType} not in ${selectedHomeTypes.join(',')}`);
                    return false;
                }
            }

            // Check Parking Spots
            if (formData.parkingSpots !== 'Any' && listing.parking < parseInt(formData.parkingSpots, 10)) {
                console.log(`Filtering out due to Parking Spots: ${listing.parking} < ${formData.parkingSpots}`);
                return false;
            }

            // Check Basement
            if (formData.hasBasement !== undefined && listing.basement !== formData.hasBasement) {
                console.log(`Filtering out due to Basement: ${listing.basement} !== ${formData.hasBasement}`);
                return false;
            }

            // Check Square Feet Range
            if ((formData.sqftRange?.min && parseInt(listing.sqft) < parseInt(formData.sqftRange.min)) ||
                (formData.sqftRange?.max && parseInt(listing.sqft) > parseInt(formData.sqftRange.max))) {
                console.log(`Filtering out due to Square Feet Range: ${listing.sqft}`);
                return false;
            }

            // If all checks pass, include the listing
            return true;
        });
    } catch (error) {
        console.error("Error filtering listings:", error);
        return []; // Return an empty array if an error occurs
    }
};
