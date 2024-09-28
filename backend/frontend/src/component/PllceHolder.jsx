import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt } from 'react-icons/fa';

export default function PLaceScrollCard() {
    const navigate = useNavigate();
    return (
        <div
            className="bg-slate-200 dark:bg-gray-900 border flex-none w-[279px] p-2 border-gray-200 dark:border-gray-500 rounded-lg shadow-lg  cursor-pointer "
            role="button"
            tabIndex={0}
        >
            <div className="overflow-hidden h-40 rounded-t-lg"> {/* Adjust height */}

                <div className="w-full dark:bg-gray-800 bg-slate-100 h-full transition-transform duration-500 transform hover:scale-110">

                </div>

            </div>
            <div className="p-4"> {/* Adjust padding */}
                <div className="font-semibold text-black h-6 w-20 dark:bg-gray-800 bg-slate-100 rounded-xl  text-lg mb-1"></div> {/* Adjust font size */}

                <div className="text-gray-700 h-10 w-full rounded-lg dark:bg-gray-800 bg-slate-100 text-xs mb-3">
                </div>
                <div className="flex gap-2 text-xs text-gray-600">
                    <div className="text-green-600 h-10 w-20 dark:bg-gray-800 bg-slate-100 rounded-xl font-bold text-base"></div> {/* Adjust font size */}
                    {/* Adjust font size */}
                    <div className=' h-10 w-20 dark:bg-gray-800 bg-slate-100 rounded-xl '></div>
                    <div className=' h-10 w-20 dark:bg-gray-800 bg-slate-100 rounded-xl '></div>
                </div>
            </div>
        </div>
    );
}
