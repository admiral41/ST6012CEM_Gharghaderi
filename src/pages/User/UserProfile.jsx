import React, { useState } from 'react';

const UserProfile = () => {
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);

  const openEditProfileModal = () => {
    setShowEditProfileModal(true);
  };

  const closeEditProfileModal = () => {
    setShowEditProfileModal(false);
  };

  const openChangePasswordModal = () => {
    setShowChangePasswordModal(true);
  };

  const closeChangePasswordModal = () => {
    setShowChangePasswordModal(false);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-4 border-b">
          <h2 className="text-2xl font-semibold">User Profile</h2>
        </div>
        <div className="p-4">
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
              Name
            </label>
            <p className="text-gray-900">user.name</p>
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <p className="text-gray-900">user.email</p>
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
              Phone
            </label>
            <p className="text-gray-900">user.phone</p>
          </div>
          <div className="flex justify-between items-center">
            <button
              onClick={openEditProfileModal}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Edit Profile
            </button>
            <button
              onClick={openChangePasswordModal}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Change Password
            </button>
          </div>
        </div>
      </div>

       {/* Edit Profile Modal */}
       {showEditProfileModal && (
        <div className="fixed z-10 inset-0 flex items-center justify-center overflow-y-auto bg-gray-500 bg-opacity-75">
          <div className="bg-white rounded-lg overflow-hidden shadow-xl max-w-md w-full p-4">
            <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>
            {/* Add your edit profile form fields here */}
            <button
              onClick={closeEditProfileModal}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {showChangePasswordModal && (
        <div className="fixed z-10 inset-0 flex items-center justify-center overflow-y-auto bg-gray-500 bg-opacity-75">
          <div className="bg-white rounded-lg overflow-hidden shadow-xl max-w-md w-full p-4">
            <h2 className="text-2xl font-semibold mb-4">Change Password</h2>
            {/* Add your change password form fields here */}
            <button
              onClick={closeChangePasswordModal}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
            >
              Change Password
            </button>
          </div>
        </div>
      )}
    </div>
  
  );
};

export default UserProfile;
