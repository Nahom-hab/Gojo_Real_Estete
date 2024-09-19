import axios from 'axios';

export const getCoordinatesFromAddress = async (address) => {
    if (!address || typeof address !== 'string' || address.trim() === '') {
        console.warn('Invalid address provided:', address);
        return null;
    }

    try {
        const formattedAddress = encodeURIComponent(address.trim());
        const { data } = await axios.get(`https://nominatim.openstreetmap.org/search?q=${formattedAddress}&format=json`);

        if (data && Array.isArray(data) && data.length > 0) {
            const { lat, lon, display_name: displayName } = data[0];
            if (lat && lon) {
                return {
                    lat: parseFloat(lat),
                    lon: parseFloat(lon),
                    displayName
                };
            } else {
                console.warn('Invalid data received for address:', address);
                return null;
            }
        } else {
            console.warn('No results found for address:', address);
            return null;
        }
    } catch (error) {
        console.error('Error fetching coordinates:', error.message);
        return null;
    }
};
