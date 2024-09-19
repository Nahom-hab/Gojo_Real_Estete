// components/LeafletMap.js
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { getCoordinatesFromAddress } from '../Functions/Geocode';

export default function LeafletMap({ listingsForMap }) {
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCoordinates = async () => {
            try {
                console.log('Fetching coordinates for addresses...');
                const addresses = listingsForMap.map(listing => listing.address); // Get addresses from the listings
                const coords = await Promise.all(addresses.map(address => getCoordinatesFromAddress(address)));
                const flattenedCoords = coords.flat();
                console.log('Fetched locations:', flattenedCoords); // Log locations to debug
                setLocations(flattenedCoords);
            } catch (error) {
                console.error('Error fetching locations:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCoordinates();
    }, [listingsForMap]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="w-full h-[50%]"> {/* Adjusted to 50% width */}
            <MapContainer center={[37.7749, -122.4194]} zoom={10} scrollWheelZoom={true} className="h-full">
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {locations.length === 0 ? (
                    <Marker position={[37.7749, -122.4194]}>
                        <Popup>No locations available.</Popup>
                    </Marker>
                ) : (
                    locations.map((location, index) => (
                        <Marker key={index} position={[location.lat, location.lon]}>
                            <Popup>
                                <div>
                                    <h3>{listingsForMap[index]?.name || location.displayName}</h3>
                                    <p style={{ color: 'green' }}>Price: {listingsForMap[index]?.discountedPrice || 'N/A'}</p>
                                    <img src={listingsForMap[index]?.imageURLs[0] || 'https://via.placeholder.com/100'} alt="Listing" style={{ width: '100px', height: 'auto' }} />
                                    <p>{listingsForMap[index]?.description || 'No description available.'}</p>
                                </div>
                            </Popup>
                        </Marker>
                    ))
                )}
            </MapContainer>
        </div>
    );
};
