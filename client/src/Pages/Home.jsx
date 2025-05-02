import { useState, useEffect } from "react";
import WiFiList from "../components/WifiList.jsx";

function Home() {
  const [wifiNames, setWifiNames] = useState([]);
  const [newWifiName, setNewWifiName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWifiNames();
  }, []);

  const fetchWifiNames = async () => {
    try {
      console.log("Fetching Wifi Names");
      setIsLoading(true);
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL || "http://localhost:3000"
        }/api/wifi-names`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch wifi names");
      }
      const data = await response.json();
      setWifiNames(data);
      setError(null);
    } catch (err) {
      setError("Failed to load wifi names. Using sample data instead.");
      setWifiNames([
        { _id: "1", name: "It Hurts When IP" },
        { _id: "2", name: "Pretty Fly for a Wi-Fi" },
        { _id: "3", name: "Wi believe I can Fi" },
        { _id: "4", name: "Bill Wi the Science Fi" },
        { _id: "5", name: "The LAN Before Time" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newWifiName.trim()) return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/wifi-names`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: newWifiName }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add wifi name");
      }

      const data = await response.json();
      setWifiNames([...wifiNames, data]);
      setNewWifiName("");
    } catch (err) {
      alert("Failed to add wifi name. Please try again.");
    }
  };

  return (
    <div className="h-screen w-screen overflow-auto bg-gradient-to-b from-blue-100 to-purple-100 py-10 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-xl overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 py-12 px-6 text-center">
            <h1 className="text-4xl font-extrabold text-white mb-2">
              Most Annoying Wi-Fi Names
            </h1>
            <p className="text-blue-100 text-xl">
              Find and share the most creative (and annoying) Wi-Fi network
              names! 📶
            </p>
          </div>

          <div className="p-6 bg-white">
            <p className="text-gray-700 mb-4">
              Ever seen hilarious Wi-Fi names like "It Hurts When IP" or "Pretty
              Fly for a Wi-Fi"? This project lets you track and share them!
            </p>

            <div className="flex justify-center space-x-4 mt-6">
              {/* Feature icons section - kept as is */}
              {/* ... */}
            </div>
          </div>
        </div>
        {/*....................................................................................*/}
        {/* Add New Wi-Fi Name Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Add a New Wi-Fi Name
          </h2>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4"
          >
            <input
              type="text"
              value={newWifiName}
              onChange={(e) => setNewWifiName(e.target.value)}
              placeholder="Enter a funny Wi-Fi name"
              className="text-black flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition duration-200"
            >
              Add Name
            </button>
          </form>
        </div>
        {/*.....................................................................................*/}
        {/* Wi-Fi Names List Section - now using WiFiList component */}
        <WiFiList wifiNames={wifiNames} isLoading={isLoading} error={error} />
        {/*......................................................................................*/}
        {/* Footer */}
        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>© 2025 Most Annoying Wi-Fi Names Project. All rights reserved.</p>
          <p className="mt-2">Created with 💙 by Harshit</p>
        </footer>
      </div>
    </div>
  );
}

export default Home;
