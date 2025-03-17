import React from 'react';
import PropTypes from 'prop-types';
const WiFiName = ({ name }) => {
    return (
        <li className="py-4 flex items-center">
            <div className="bg-blue-100 p-2 rounded-full mr-4">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"
                    />
                </svg>
            </div>
            <span className="text-gray-800 font-medium">{name}</span>
        </li>
    );
};

WiFiName.propTypes = {
    name: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired
};

export default WiFiName;