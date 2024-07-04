import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getAllPlotsApi } from '../../../Apis/apis';

const ViewPlots = () => {
  const [plots, setPlots] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPlotId, setSelectedPlotId] = useState(null);

  useEffect(() => {
    getAllPlotsApi()
      .then((res) => {
        console.log(res.data);
        setPlots(res.data.plots || []);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to fetch plots");
      });
  }, []);

//   const handleDelete = (id) => {
//     deletePlotApi(id)
//       .then(() => {
//         setPlots((prevPlots) => prevPlots.filter((plot) => plot._id !== id));
//         setShowDeleteModal(false);
//         toast.success("Plot deleted successfully");
//       })
//       .catch((err) => {
//         console.log(err);
//         toast.error("Failed to delete plot");
//       });
//   };

  const handleEdit = (id) => {
    // Add edit functionality here
  };

  const filteredPlots = plots.filter((plot) =>
    plot.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">View Plots</h1>

      {/* Search or Filter */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search plot..."
          className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm text-gray-700"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Plot Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Image
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Plot Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Area
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredPlots.map((plot) => (
              <tr key={plot._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <img src={`http://localhost:5000/${plot.plotImage[0]}`} alt={plot.name} className="w-20 h-20" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{plot.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{plot.location}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{plot.area}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{plot.price}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-indigo-600 hover:text-indigo-900" onClick={() => handleEdit(plot._id)}>Edit</button>
                  <button className="text-red-600 hover:text-red-900 ml-2" onClick={() => {
                    // setSelectedPlotId(plot._id);
                    // setShowDeleteModal(true);
                  }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-75">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="text-center">
              <h3 className="text-lg font-semibold">Delete Confirmation</h3>
              <p className="text-sm text-gray-600 mt-2">Are you sure you want to delete this item?</p>
            </div>
            <div className="flex justify-center mt-4">
              <button onClick={() => setShowDeleteModal(false)} className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg mr-2 hover:bg-gray-400">Cancel</button>
              <button className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewPlots;
