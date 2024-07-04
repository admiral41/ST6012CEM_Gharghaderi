import React, { useState, useEffect } from 'react';
import { FiUsers, FiHome, FiUsers as FiVisitors } from 'react-icons/fi';
import { getAllCommunitiesApi, getAllHousesApi, getAllVisitorsApi } from '../../../Apis/apis';
import axios from 'axios';

export const Overview = () => {
  const [totalCommunities, setTotalCommunities] = useState(0);
  const [totalHouses, setTotalHouses] = useState(0);
  const [totalVisitors, setTotalVisitors] = useState(0);
  const [visitorData, setVisitorData] = useState([]);
  const [visitorCountsByCountry, setVisitorCountsByCountry] = useState({});

  useEffect(() => {
    fetchTotalCommunities();
    fetchTotalHouses();
    fetchVisitorData();
  }, []);

  const fetchTotalCommunities = async () => {
    try {
      const response = await getAllCommunitiesApi();
      const communities = response.data.communities;
      setTotalCommunities(communities.length);
    } catch (error) {
      console.error('Error fetching total communities:', error);
    }
  };

  const fetchTotalHouses = async () => {
    try {
      const response = await getAllHousesApi();
      const houses = response.data.houses;
      setTotalHouses(houses.length);
    } catch (error) {
      console.error('Error fetching total houses:', error);
    }
  };

  const fetchVisitorData = async () => {
    try {
      const response = await getAllVisitorsApi();
      const visitors = response.data;
      // Update total visitors count
      setTotalVisitors(visitors.length); // This line may need adjustment based on your API response structure
      setVisitorData(visitors);

      // Calculate visitor counts by country
      const countsByCountry = {};
      visitors.forEach(visitor => {
        const { country } = visitor;
        countsByCountry[country] = (countsByCountry[country] || 0) + 1;
      });
      setVisitorCountsByCountry(countsByCountry);
    } catch (error) {
      console.error('Error fetching total visitors:', error);
    }
  };

  return (
    <div className="flex flex-wrap justify-around gap-6">
      {/* Total Community Added */}
      <div className="bg-red-500 rounded-lg p-6 w-64 text-white shadow-md flex items-center justify-between">
        <div>
          <FiUsers className="text-4xl" />
        </div>
        <div>
          <p className="text-lg font-semibold">Total Community Added</p>
          <h1 className="text-3xl font-bold">{totalCommunities}</h1>
        </div>
      </div>

      {/* Total Houses Added */}
      <div className="bg-yellow-500 rounded-lg p-6 w-64 text-white shadow-md flex items-center justify-between">
        <div>
          <FiHome className="text-4xl" />
        </div>
        <div>
          <p className="text-lg font-semibold">Total Houses Added</p>
          <h1 className="text-3xl font-bold">{totalHouses}</h1>
        </div>
      </div>

      {/* Number of Total Visitors */}
      <div className="bg-green-500 rounded-lg p-6 w-64 text-white shadow-md flex items-center justify-between">
        <div>
          <FiVisitors className="text-4xl" />
        </div>
        <div>
          <p className="text-lg font-semibold">Number of Total Visitors</p>
          <h1 className="text-3xl font-bold">{totalVisitors}</h1>
        </div>
      </div>

      {/* Visitor Data */}
      <div className="bg-blue-500 rounded-lg p-6 w-full text-white shadow-md">
        <p className="text-lg font-semibold text-black mb-4">Visitor Data</p>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border-collapse">
            <thead>
              <tr className="bg-gray-200 text-black uppercase text-sm">
                <th className="py-3 px-4">Country</th>
                <th className="py-3 px-4">Visitor Count</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(visitorCountsByCountry).map(([country, count]) => (
                <tr key={country} className="text-sm text-black">
                  <td className="py-3 px-4">{country}</td>
                  <td className="py-3 px-4">{count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
