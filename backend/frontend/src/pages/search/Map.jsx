import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import shoppingCartIcon from '../../assets/images/travel2.png'; // Make sure to use the correct path to your icon

export default function LeafletMap({ listingsForMap }) {
    // Create a custom icon
    const customIcon = L.icon({
        iconUrl: shoppingCartIcon, // Path to your custom icon
        iconSize: [30, 30], // Adjust the size as needed
        iconAnchor: [15, 30], // Center the icon
    });

    return (
        <div className="w-full h-full">
            <MapContainer center={[9.06, 38.75]} zoom={13} scrollWheelZoom={true} className="h-full">
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {listingsForMap.map((listing) => {
                    return (
                        <Marker
                            key={listing._id}
                            position={[listing.lat, listing.lon]}
                            icon={customIcon} // Use the custom icon here
                        >
                            <Popup>
                                <div className="max-w-xs p-3 bg-gray-100 rounded-lg shadow-lg">
                                    <div className='flex items-center  justify-between'>
                                        <div>
                                            <div className='text-green-500 font-bold text-lg'>
                                                {listing.discountedPrice} birr
                                            </div>
                                        </div>
                                        <div className='font-bold'>
                                            {listing.address}
                                        </div>
                                    </div>
                                    <div className='flex items-center gap-3'>
                                        <img
                                            src={listing.imageURLs[0]}
                                            alt="Listing"
                                            className="w-[120px] object-cover h-24 mt-2 rounded-md"
                                        />
                                        <div>
                                            <div className="text-[15px] font-semibold text-gray-800">{listing.name}</div>
                                            <div className="text-gray-600 text-[10px] mt-2">{listing.description}</div>
                                        </div>
                                    </div>
                                </div>
                            </Popup>
                        </Marker>
                    );
                })}
            </MapContainer>
        </div>
    );
}
