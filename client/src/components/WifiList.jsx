import React from 'react';
import PropTypes from 'prop-types';//Check for the correct prop types
import WiFiName from './WiFiName';

const WiFiList = ({ wifiNames, isLoading, error }) => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 py-4 px-6">
                <h2 className="text-xl font-bold text-white">
                    Annoying Wi-Fi Names
                </h2>
            </div>

            <div className="p-6">
                {isLoading ? (
                    <div className="flex justify-center py-10">
                        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500">Loading.......</div>
                    </div>
                ) : error ? (
                    <div className="text-center py-4">
                        <p className="text-amber-600 mb-2">{error}</p>
                        <p className="text-gray-500 italic">
                            Showing sample data instead
                        </p>
                    </div>
                ) : wifiNames.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">
                        No Wi-Fi names found. Be the first to add one!
                    </p>
                ) : (
                    <ul className="divide-y divide-gray-200">
                        {wifiNames.map((wifi) => (
                            <WiFiName key={wifi._id} {...wifi} />
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

WiFiList.propTypes = {
    wifiNames: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    error: PropTypes.string
};

export default WiFiList;