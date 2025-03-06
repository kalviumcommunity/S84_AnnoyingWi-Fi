import { useState, useEffect } from "react";
// import wifiIcon from "./assets/wifi-icon.svg";

function App() {
  const [wifiNames, setWifiNames] = useState([]);
  const [newWifiName, setNewWifiName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWifiNames();
  }, []);

  const fetchWifiNames = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/wifi-names`
        // `http://localhost:3000/api/wifi-names`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch wifi names");
      }
      const data = await response.json();
      setWifiNames(data);
      setError(null);
    } catch (err) {
      setError("Failed to load wifi names. Using sample data instead.");
      // Sample data in case the API is not available
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
        `${import.meta.env.VITE_API_URL}/wifi-names`,
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
              <div className="flex flex-col items-center">
                <div className="bg-blue-100 p-3 rounded-full mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-blue-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                    />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-700">
                  Find Names
                </span>
              </div>

              <div className="flex flex-col items-center">
                <div className="bg-purple-100 p-3 rounded-full mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-purple-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-700">
                  Add New
                </span>
              </div>

              <div className="flex flex-col items-center">
                <div className="bg-pink-100 p-3 rounded-full mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-pink-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-700">
                  Have Fun
                </span>
              </div>
            </div>
          </div>
        </div>

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
              className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-black font-medium py-2 px-6 rounded-md transition duration-200"
            >
              Add Name
            </button>
          </form>
        </div>

        {/* Wi-Fi Names List Section */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 py-4 px-6">
            <h2 className="text-xl font-bold text-white">
              Annoying Wi-Fi Names
            </h2>
          </div>

          <div className="p-6">
            {isLoading ? (
              <div className="flex justify-center py-10">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
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
                  <li key={wifi._id} className="py-4 flex items-center">
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
                    <span className="text-gray-800 font-medium">
                      {wifi.name}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>© 2025 Most Annoying Wi-Fi Names Project. All rights reserved.</p>
          <p className="mt-2">Created with 💙 by Harshit</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
