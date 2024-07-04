import React, { useState } from 'react';
import { addCommunityApi } from '../../../Apis/apis';
import { toast } from 'react-toastify';

const AddCommunity = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddCommunity = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('location', location);
      formData.append('image', image);

      const response = await addCommunityApi(formData);
      const data = response.data;

      if (data.success) {
        toast.success(data.message);
        setName('');
        setLocation('');
        setImage(null);
        setPreviewImage(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error adding community:', error);
      toast.error('Internal server error');
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Add Community</h1>
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Name
        </label>
        <input
          type="text"
          id="name"
          className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm text-gray-700"
          value={name}
          onChange={handleNameChange}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
          Location
        </label>
        <input
          type="text"
          id="location"
          className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm text-gray-700"
          value={location}
          onChange={handleLocationChange}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
          Image
        </label>
        <input
          type="file"
          id="image"
          accept="image/*"
          className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm text-gray-700"
          onChange={handleImageChange}
        />
      </div>
      {previewImage && (
        <div className="mb-4">
          <p className="block text-sm font-medium text-gray-700 mb-1">Image Preview:</p>
          <img
            src={previewImage}
            alt="Preview"
            className="w-full h-auto rounded-md max-w-xs"
          />
        </div>
      )}
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md text-sm"
        onClick={handleAddCommunity}
      >
        Add Community
      </button>
    </div>
  );
};

export default AddCommunity;
