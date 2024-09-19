export const sortListings = (listings, sortType) => {
    switch (sortType) {
        case 'PriceHighToLow':
            return [...listings].sort((a, b) => parseFloat(b.discountedPrice.replace(/[^0-9.-]+/g, '')) - parseFloat(a.discountedPrice.replace(/[^0-9.-]+/g, '')));
        case 'PriceLowToHigh':
            return [...listings].sort((a, b) => parseFloat(a.discountedPrice.replace(/[^0-9.-]+/g, '')) - parseFloat(b.discountedPrice.replace(/[^0-9.-]+/g, '')));
        case 'Newest':
            return [...listings].sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));  // Assuming `dateAdded` field exists
        case 'BedRooms':
            return [...listings].sort((a, b) => b.bedrooms - a.bedrooms);
        case 'Bathrooms':
            return [...listings].sort((a, b) => b.bathrooms - a.bathrooms);
        case 'SquareFeet':
            return [...listings].sort((a, b) => b.squareFeet - a.squareFeet);
        default:
            return listings;
    }
};
