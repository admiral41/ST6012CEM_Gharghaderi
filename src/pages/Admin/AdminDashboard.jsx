import React, { useState , useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Overview } from './sidetabs/Overview';
import ViewCommunity from './sidetabs/ViewCommunity';
import AddHomes from './sidetabs/AddHomes';
import ViewHomes from './sidetabs/ViewHomes';
import AddCommunity from './sidetabs/addCommunity';
import Subscription from './sidetabs/Subscription';
import AddPlotss from './sidetabs/AddPlotss';
import ViewPlots from './sidetabs/ViewPlots';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    const path = location.pathname.split('/')[2];
    setActiveTab(path || 'overview');
  }, [location]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    navigate(`/admindashboard${tab === 'overview' ? '' : `/${tab}`}`);
  };

  const handleTabClick = (event, tab) => {
    event.preventDefault(); // Prevent the default behavior of anchor tag
    handleTabChange(tab);
  };
  const handleLogout = () => {
    localStorage.clear();
    navigate('/login'); // Redirect to login page after logout
    window.location.reload();
  };

  return (
    <div className="flex h-screen bg-gray-100 relative">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="py-4 px-6 border-b border-gray-200">
          <h1 className="text-lg font-semibold text-gray-800">Admin Dashboard</h1>
        </div>
        <nav className="mt-6">
        <a
            
            className={`block py-2 px-4 text-sm text-gray-700 hover:bg-gray-200 ${
              activeTab === 'overview' ? 'bg-gray-200' : ''
            }`}
            onClick={(e) => handleTabClick(e, 'overview')}
          >
            Overview
          </a>
          <a
           
            className={`block py-2 px-4 text-sm text-gray-700 hover:bg-gray-200 ${
              activeTab === 'addCommunity' ? 'bg-gray-200' : ''
            }`}
            onClick={() => handleTabChange('addCommunity')}
          >
            Add Community
          </a>
          <a
           
            className={`block py-2 px-4 text-sm text-gray-700 hover:bg-gray-200 ${
              activeTab === 'viewCommunity' ? 'bg-gray-200' : ''
            }`}
            onClick={() => handleTabChange('viewCommunity')}
          >
            View Community
          </a>
          <a
           
            className={`block py-2 px-4 text-sm text-gray-700 hover:bg-gray-200 ${
              activeTab === 'addHomes' ? 'bg-gray-200' : ''
            }`}
            onClick={() => handleTabChange('addHomes')}
          >
            Add Homes
          </a>
          <a
           
            className={`block py-2 px-4 text-sm text-gray-700 hover:bg-gray-200 ${
              activeTab === 'viewhomes' ? 'bg-gray-200' : ''
            }`}
            onClick={() => handleTabChange('viewhomes')}
          >
            View Homes
          </a>
          <a
           
           className={`block py-2 px-4 text-sm text-gray-700 hover:bg-gray-200 ${
             activeTab === 'addplots' ? 'bg-gray-200' : ''
           }`}
           onClick={() => handleTabChange('addplots')}
         >
           Add Plots
         </a>
         <a
           
           className={`block py-2 px-4 text-sm text-gray-700 hover:bg-gray-200 ${
             activeTab === 'viewplots' ? 'bg-gray-200' : ''
           }`}
           onClick={() => handleTabChange('viewplots')}
         >
           View Plots
         </a>
          <a
           
           className={`block py-2 px-4 text-sm text-gray-700 hover:bg-gray-200 ${
             activeTab === 'subscription' ? 'bg-gray-200' : ''
           }`}
           onClick={() => handleTabChange('subscription')}
         >
           Subscription
         </a>
        </nav>
        
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 flex flex-col overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Dashboard Overview</h2>
          <button
            className="py-2 px-4 text-sm text-white bg-red-500 hover:bg-red-600 rounded-lg"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          {/* Render different content based on activeTab */}
          {activeTab === 'overview' && <Overview />}
          {activeTab === 'addCommunity' && <AddCommunity />}
          {activeTab === 'viewCommunity' && <ViewCommunity />}
          {activeTab === 'addHomes' && <AddHomes />}
          {activeTab === 'viewhomes' && <ViewHomes />}
          {activeTab === 'addplots' && < AddPlotss/>}
          {activeTab === 'viewplots' && <ViewPlots />}
          {activeTab === 'subscription' && <Subscription />}


        </div>
      </div>
</div>

  );
};

export default AdminDashboard;
