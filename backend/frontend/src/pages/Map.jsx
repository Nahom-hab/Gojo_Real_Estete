import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';



export default function LeafletMap({ listingsForMap }) {
    return (
        <div className="w-full h-full">
            <MapContainer center={[37.7749, -122.4194]} zoom={5} scrollWheelZoom={true} className="h-full">
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {listingsForMap.map((listing) => (
                    <Marker key={listing.lat} position={[listing.lat, listing.lon]}>
                        <Popup>
                            <div className="max-w-xs p-3 bg-white rounded-lg shadow-lg">
                                <div className='flex items-center justify-between'>
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
                                    <img src={listing.imageURLs[0]} alt="Listing" className="w-24 h-auto mx-auto mt-2 rounded-md" />
                                    <div>
                                        <div className="text-lg font-semibold text-gray-800">{listing.name}</div>
                                        <div className="text-gray-600 text-[10px] mt-2">{listing.description}</div>

                                    </div>
                                </div>

                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}
