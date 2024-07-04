import React, { useState } from 'react';
import { FiUsers, FiHome} from 'react-icons/fi';
import { AiFillBank } from "react-icons/ai";
import { RiLandscapeLine } from "react-icons/ri";

const DashboardOverview = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const data = [
    { SN: 1, HouseImg: 'house1.jpg', PropertyType: 'Apartment', ScheduleTime: '10:00 AM', Status: 'Scheduled' },
    { SN: 2, HouseImg: 'house2.jpg', PropertyType: 'Villa', ScheduleTime: '12:00 PM', Status: 'Pending' },
    { SN: 3, HouseImg: 'house3.jpg', PropertyType: 'Cottage', ScheduleTime: '02:00 PM', Status: 'Completed' },
    { SN: 4, HouseImg: 'house4.jpg', PropertyType: 'Studio', ScheduleTime: '04:00 PM', Status: 'Scheduled' },
    { SN: 5, HouseImg: 'house5.jpg', PropertyType: 'Bungalow', ScheduleTime: '06:00 PM', Status: 'Pending' },
    { SN: 6, HouseImg: 'house6.jpg', PropertyType: 'Duplex', ScheduleTime: '08:00 PM', Status: 'Completed' },
    // Add more dummy data as needed
  ];

  const filteredData = data.filter(item =>
    item.PropertyType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.Status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-full overflow-hidden">
      <div className="flex flex-wrap justify-around gap-6 mb-8 w-full">
        {/* Total Scheduled House */}
        <div className="bg-red-600 rounded-lg p-6 w-64 text-white shadow-lg flex items-center justify-between transform hover:scale-105 transition-transform duration-300 ease-in-out">
          <div>
            <FiUsers className="text-4xl" />
          </div>
          <div>
            <p className="text-lg font-semibold">Total Scheduled House</p>
            <h1 className="text-3xl font-bold">1</h1>
          </div>
        </div>

        {/* Total Schedule Plots */}
        <div className="bg-yellow-600 rounded-lg p-6 w-64 text-white shadow-lg flex items-center justify-between transform hover:scale-105 transition-transform duration-300 ease-in-out">
          <div>
            <RiLandscapeLine className="text-4xl" />
          </div>
          <div>
            <p className="text-lg font-semibold">Total Schedule Plots</p>
            <h1 className="text-3xl font-bold">1</h1>
          </div>
        </div>
        {/* Accepted Visitss */}

        <div className="bg-green-500 rounded-lg p-6 w-64 text-white shadow-lg flex items-center justify-between transform hover:scale-105 transition-transform duration-300 ease-in-out">
          <div>
            <AiFillBank className="text-4xl" />
          </div>
          <div>
            <p className="text-lg font-semibold">Total Accepted Visits</p>
            <h1 className="text-3xl font-bold">1</h1>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-4 w-full">
        <input
          type="text"
          placeholder="Search by Property Type or Status..."
          className="p-2 w-full border border-gray-300 rounded-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto w-full">
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
          <thead>
            <tr>
              <th className="py-3 px-4 bg-gray-100 border-b border-gray-200 text-left text-sm font-semibold text-gray-600">SN</th>
              <th className="py-3 px-4 bg-gray-100 border-b border-gray-200 text-left text-sm font-semibold text-gray-600">HouseImg</th>
              <th className="py-3 px-4 bg-gray-100 border-b border-gray-200 text-left text-sm font-semibold text-gray-600">Property Type</th>
              <th className="py-3 px-4 bg-gray-100 border-b border-gray-200 text-left text-sm font-semibold text-gray-600">Schedule Time</th>
              <th className="py-3 px-4 bg-gray-100 border-b border-gray-200 text-left text-sm font-semibold text-gray-600">Status</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((row, index) => (
              <tr key={index}>
                <td className="py-3 px-4 border-b border-gray-200">{row.SN}</td>
                <td className="py-3 px-4 border-b border-gray-200">
                  <img src={row.HouseImg} alt="House" className="w-16 h-16 object-cover rounded-md" />
                </td>
                <td className="py-3 px-4 border-b border-gray-200">{row.PropertyType}</td>
                <td className="py-3 px-4 border-b border-gray-200">{row.ScheduleTime}</td>
                <td className="py-3 px-4 border-b border-gray-200">{row.Status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4 w-full">
        <button
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DashboardOverview;
