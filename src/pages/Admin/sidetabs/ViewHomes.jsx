import React, { useState, useEffect } from "react";
import { deleteHouseApi, getAllCommunitiesApi, getAllHousesApi } from "../../../Apis/apis"; // Import your API functions
import { toast } from "react-toastify";

const ViewHomes = () => {
  const [homes, setHomes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedHouseId, setSelectedHouseId] = useState(null);
  const [communities, setCommunities] = useState([]); // State to hold communities data

  useEffect(() => {
    getAllHousesApi()
      .then((res) => {
        console.log(res.data);
        setHomes(res.data.houses || []);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to fetch houses");
      });
    // Fetch all communities
    getAllCommunitiesApi()
      .then((res) => {
        console.log(res.data);
        setCommunities(res.data.communities || []);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to fetch communities");
      });
  }, []);

  // Function to get community name by ID
  const getCommunityName = (id) => {
    const community = communities.find((c) => c._id === id);
    return community ? community.name : "Unknown Community";
  };

  const handleDelete = (id) => {
    if (!id) {
      toast.error("Invalid house ID");
      return;
    }
  
    deleteHouseApi(id)
      .then(() => {
        setHomes(homes.filter((home) => home.id !== id));
        toast.success("House deleted successfully");
        setShowDeleteModal(false); // Close the modal after successful deletion
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to delete house");
      });
  };
  
  
  const handleEdit = (id) => {
    // Add edit functionality here
  };

  const filteredHomes = homes.filter(
    (home) =>
      home.houseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      home.communityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      home.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">View Homes</h1>

      {/* Search or Filter */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search homes..."
          className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm text-gray-700"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Home Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Image
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                House Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Community Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Location
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredHomes.map((home) => (
              <tr key={home.id}>
                {/* Table Data */}

                <td className="px-6 py-4 whitespace-nowrap">
                  {home.images && home.images.length > 0 ? (
                    <img
                      src={`http://localhost:5000/${home.images[0]}`}
                      alt={home.houseName}
                      className="w-20 h-20"
                    />
                  ) : (
                    <span>No Image Available</span>
                  )}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {home.houseName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {" "}
                  {getCommunityName(home.community)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {home.location}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    className="text-indigo-600 hover:text-indigo-900"
                    onClick={() => handleEdit(home.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-600 hover:text-red-900 ml-2"
                    onClick={() => {
                      setSelectedHouseId(home._id);
                      setShowDeleteModal(true);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-75">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="text-center">
              <h3 className="text-lg font-semibold">Delete Confirmation</h3>
              <p className="text-sm text-gray-600 mt-2">Are you sure you want to delete this item?</p>
            </div>
            <div className="flex justify-center mt-4">
              <button onClick={() => setShowDeleteModal(false)} className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg mr-2  hover:bg-gray-400">Cancel</button>
              <button onClick={() => handleDelete(selectedHouseId)} className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewHomes;
