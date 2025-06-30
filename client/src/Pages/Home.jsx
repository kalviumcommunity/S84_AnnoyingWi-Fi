import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import WiFiList from "../components/WifiList.jsx"; // importing the WiFiList component

function Home() {
  const [wifiNames, setWifiNames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchWifiNames();
  }, []);
// Fetch WiFi names from the API
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
    } catch (error) {
      setError("Failed to load wifi names. Using sample data instead.");
// Sample data if the API fails
      setWifiNames([
        { _id: "1", name: "It Hurts When IP" },
        { _id: "2", name: "Pretty Fly for a Wi-Fi" },
        { _id: "3", name: "Wi believe I can Fi" },
        { _id: "4", name: "Bill Wi the Science Fi" },
        { _id: "5", name: "The LAN Before Time" },
      ]);
      console.error("Error fetching WiFi names:", error);
    } finally {
      setIsLoading(false);
    }
  };

// Delete WiFi name
  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/wifi-names/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) throw new Error("Failed to delete WiFi name");
      // Refresh list after delete
      fetchWifiNames();
    } catch (err) {
      alert(err.message || "Failed to delete WiFi name");
    }
  };

  // Edit WiFi name with respective ID
  const handleEdit = (id) => {
    navigate(`/edit-wifi/${id}`);
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
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg shadow-md p-6 mb-8 border border-blue-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-blue-800">
              Wi-Fi Names Collection
            </h2>
            <Link
              to="/add-wifi"
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium py-2 px-6 rounded-md transition duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Add New WiFi Name
            </Link>
          </div>
          <p className="text-blue-700">
            Click "Add New WiFi Name" to contribute to our collection of funny
            and annoying WiFi names!
          </p>
        </div>
        {/*.....................................................................................*/}
        {/* Wi-Fi Names List Section - now using WiFiList component */}
        <WiFiList
          wifiNames={wifiNames}
          isLoading={isLoading}
          error={error}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
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
