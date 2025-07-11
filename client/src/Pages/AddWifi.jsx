import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddWifi = () => {
  const [wifiName, setWifiName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!wifiName.trim()) {
      setError("Please enter a WiFi name");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:3000/api/wifi-names", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: wifiName.trim() }),
      });

      if (!response.ok) {
        throw new Error("Failed to add WiFi name");
      }

      const result = await response.json();
      console.log("WiFi name added:", result);

      navigate("/");
    } catch (err) {
      setError(err.message || "Failed to add WiFi name");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen min-w-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-lg">
        <div className="bg-white rounded-lg shadow-xl p-6 sm:p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Add Annoying WiFi Name
            </h1>
            <p className="text-gray-600">
              Share a funny or annoying WiFi name you've encountered!
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="wifiName"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                WiFi Name
              </label>
              <input
                type="text"
                id="wifiName"
                value={wifiName}
                onChange={(e) => setWifiName(e.target.value)}
                placeholder="e.g., Pretty Fly for a WiFi"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 text-gray-900"
                disabled={isLoading}
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <div className="grid grid-cols-2 gap-4 mt-6">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="bg-gray-500 text-white py-3 px-6 rounded-lg hover:bg-gray-600 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Adding..." : "Add WiFi Name"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddWifi;
