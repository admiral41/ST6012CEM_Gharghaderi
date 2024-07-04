import React, { useState } from 'react'
import { addPlotApi } from '../../../Apis/apis';

const AddPlotss = () => {
    const [formData, setFormData] = useState({
        name: '',
        location: '',
        area: '',
        price: '',
        plotImage: null,
      });
    
      const handleChange = (e) => {
        const { id, value, files } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [id]: files ? files[0] : value,
        }));
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('name', formData.name);
        data.append('location', formData.location);
        data.append('area', formData.area);
        data.append('price', formData.price);
        data.append('plotImage', formData.plotImage);
    
        try {
          const response = await addPlotApi(data);
          console.log('Plot added successfully:', response.data);
          // Reset form
          setFormData({
            name: '',
            location: '',
            area: '',
            price: '',
            plotImage: null,
          });
        } catch (error) {
          console.error('Error adding plot:', error);
        }
      };
    
      return (
        <div>
          <h1 className="text-2xl font-bold mb-4">Add Plots</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm text-gray-700"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                id="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm text-gray-700"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="area" className="block text-sm font-medium text-gray-700 mb-1">
                Area in SqFt / ropani
              </label>
              <input
                type="text"
                id="area"
                value={formData.area}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm text-gray-700"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                Price
              </label>
              <input
                type="text"
                id="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm text-gray-700"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="plotImage" className="block text-sm font-medium text-gray-700 mb-1">
                Plot Image
              </label>
              <input
                type="file"
                id="plotImage"
                accept="image/*"
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm text-gray-700"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md text-sm"
            >
              Add Plot
            </button>
          </form>
        </div>
      );
    };
export default AddPlotss