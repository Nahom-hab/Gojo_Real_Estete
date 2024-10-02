import Fuse from 'fuse.js';

export const filterListings = (listings = [], formData = {}) => {
    try {
        // Handle no filters scenario
        if (!Object.keys(formData).length) {
            return listings;
        }

        // Prepare fuzzy search options for 'address' and 'name'
        let fuse = null;
        if (formData.searchQuery) {
            const fuseOptions = {
                keys: ['address', 'name'],
                threshold: 0.4, // Adjust this value to control the fuzziness (0 = exact match, 1 = very fuzzy)
                includeScore: true // Optional: Includes search score if you need to sort results by relevance
            };
            fuse = new Fuse(listings, fuseOptions);
        }

        // Apply filters
        return listings.filter(listing => {
            // Check for RentOrSell
            if (!listing.activated) {
                return false
            }

            if (formData.forSale && formData.forSale !== 'both' && listing.RentOrSell !== formData.forSale) {
                return false;
            }

            // Check Price Range
            if ((formData.priceRange?.min && parseFloat(listing.regularPrice) < parseFloat(formData.priceRange.min)) ||
                (formData.priceRange?.max && parseFloat(listing.regularPrice) > parseFloat(formData.priceRange.max))) {
                return false;
            }

            // Check Beds
            if (formData.beds !== 'Any' && listing.bedrooms < parseInt(formData.beds, 10)) {
                return false;
            }

            // Check Baths
            if (formData.baths !== 'Any' && listing.bathrooms < parseInt(formData.baths, 10)) {
                return false;
            }

            // Check Home Type
            const homeTypeFilters = formData.homeTypes;
            if (!homeTypeFilters["any"]) {
                const selectedHomeTypes = Object.keys(homeTypeFilters).filter(key => homeTypeFilters[key] && key !== "any");
                if (selectedHomeTypes.length > 0 && !selectedHomeTypes.includes(listing.HomeType)) {
                    (`Filtering out due to HomeType: ${listing.HomeType} not in ${selectedHomeTypes.join(',')}`);
                    return false;
                }
            }

            // Check Parking Spots
            if (formData.parkingSpots !== 'Any' && listing.parking < parseInt(formData.parkingSpots, 10)) {
                return false;
            }

            // Check Basement
            if (formData.hasBasement !== undefined && listing.basement !== formData.hasBasement) {
                (`Filtering out due to Basement: ${listing.basement} !== ${formData.hasBasement}`);
                return false;
            }

            // Check Square Feet Range
            if ((formData.sqftRange?.min && parseInt(listing.sqft) < parseInt(formData.sqftRange.min)) ||
                (formData.sqftRange?.max && parseInt(listing.sqft) > parseInt(formData.sqftRange.max))) {
                return false;
            }

            // Fuzzy Search with Fuse.js (for 'address' and 'name')
            if (formData.searchQuery && fuse) {
                const results = fuse.search(formData.searchQuery);
                const matchedListings = results.map(result => result.item); // Extract matched listings
                const isMatched = matchedListings.some(matched => matched === listing);

                if (!isMatched) {
                    return false;
                }
            }

            // If all checks pass, include the listing
            return true;
        });
    } catch (error) {
        console.error("Error filtering listings:", error);
        return []; // Return an empty array if an error occurs
    }
};
