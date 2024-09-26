import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import useUser from '../../zustand/useUser'; // Adjust the import based on your state management

const ConfirmationPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { formData } = location.state || {};
    const { isEng } = useUser(); // Get the isEng state

    if (!formData) {
        return <div className="text-center">{isEng ? "No data available." : "መረጃ የለም."}</div>;
    }

    const [latitude, setLatitude] = useState(parseFloat(formData.latitude) || 37.7749); // Default latitude
    const [longitude, setLongitude] = useState(parseFloat(formData.longitude) || -122.4194); // Default longitude
    const [isChanging, setIsChanging] = useState(false);

    const handleConfirm = () => {
        const confirmedData = { ...formData, latitude, longitude };
        navigate('/listingInputs', { state: { confirmedData } });
    };

    const handleChangeLocation = () => {
        setIsChanging(true);
    };

    const handleSaveLocation = () => {
        const updatedData = { ...formData, latitude, longitude };
        console.log('Updated Data:', updatedData);
        setIsChanging(false);
    };

    const handleCancelChange = () => {
        setIsChanging(false);
    };

    const MapClickHandler = () => {
        useMapEvents({
            click(e) {
                setLatitude(e.latlng.lat);
                setLongitude(e.latlng.lng);
            },
        });
        return null;
    };

    return (
        <div className="p-7 pt-2">
            <h2 className='lg:text-4xl text-3xl font-bold pb-1 border pt-5 border-x-0 border-b-0 border-t-slate-400'>
                {isEng ? "Listing For Sell or Rent" : "የምርት ወይም የእንቅስቃሴ ዝርዝር"}
            </h2>
            <div className='text-xl border border-b-slate-400 border-x-0 pb-5 border-t-0'>
                {formData.streetAddress} | {formData.city}
            </div>
            <h2 className="mt-5 mb-2 text-gray-500">
                {isEng ? "Is this an accurate location of your home?" : "ይህ የቤትዎ ዕውነተኛ ቦታ ነው?"}
            </h2>
            <div className="h-80 w-full">
                <MapContainer center={[latitude, longitude]} zoom={10} scrollWheelZoom={true} className="h-full">
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={[latitude, longitude]}>
                        <Popup>
                            <div>
                                {formData.streetAddress} | {formData.city}
                            </div>
                        </Popup>
                    </Marker>
                    {isChanging && <MapClickHandler />}
                </MapContainer>
            </div>
            <div className='flex gap-3 w-full lg:w-[50%]'>
                {!isChanging ? (
                    <>
                        <button
                            onClick={handleConfirm}
                            className="mt-4 w-full bg-blue-600 text-md md:text-xl hover:bg-blue-700 text-white py-2 rounded-md transition duration-300"
                        >
                            {isEng ? "Yes, It is the correct Location" : "እንደዚህ ነው ይህ ይህ ቦታ ነው"}
                        </button>
                        <button
                            onClick={handleChangeLocation}
                            className="mt-4 w-full text-md md:text-xl border border-blue-500 text hover:bg-slate-200 text-blue-600 py-2 rounded-md transition duration-300"
                        >
                            {isEng ? "No, Let me change it" : "አይደለም, እኔ እንደዚህ አለመዋቅር እችል"}
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            onClick={handleSaveLocation}
                            className="mt-4 w-full bg-green-600 text-md md:text-xl hover:bg-green-700 text-white py-2 rounded-md transition duration-300"
                        >
                            {isEng ? "Save and Continue" : "ይቀበሉ ይቀጥሉ"}
                        </button>
                        <button
                            onClick={handleCancelChange}
                            className="mt-4 w-full text-md md:text-xl border border-red-500 text hover:bg-slate-200 text-red-600 py-2 rounded-md transition duration-300"
                        >
                            {isEng ? "Cancel" : "ተርፍ"}
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default ConfirmationPage;