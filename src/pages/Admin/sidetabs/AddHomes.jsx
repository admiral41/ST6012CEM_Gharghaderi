import React, { useEffect, useState } from "react";
import {
  FaHome,
  FaBuilding,
  FaMapMarkerAlt,
  FaInfoCircle,
  FaDollarSign,
  FaBed,
  FaBath,
  FaCar,
  FaRulerCombined,
  FaCalendarAlt,
  FaClipboardList,
  FaAddressCard,
  FaCity,
  FaBolt,
  FaFilePdf,
  FaImage,
  FaTrash,
} from "react-icons/fa";
import { addHouseApi, getAllCommunitiesApi } from "../../../Apis/apis";
import { toast } from 'react-toastify'; // Import the toast module

const AddHomes = () => {
  const [propertyDocument, setPropertyDocument] = useState(null);
  const [houseImages, setHouseImages] = useState([]);
  const [houseName, setHouseName] = useState("");
  const [community, setCommunity] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [propertySize, setPropertySize] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [garages, setGarages] = useState("");
  const [garageSize, setGarageSize] = useState("");
  const [yearBuilt, setYearBuilt] = useState("");
  const [propertyStatus, setPropertyStatus] = useState("");
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [city, setCity] = useState("");
  const [energyClass, setEnergyClass] = useState("");
  const [communities, setCommunities] = useState([]);
  const [selectedCommunity, setSelectedCommunity] = useState("");
  useEffect(() => {
    getAllCommunitiesApi()
      .then((res) => {
        setCommunities(res.data.communities);
      })
      .catch((error) => {
        console.error("Error fetching communities:", error);
      });
  }, []);

  const handlePropertyDocumentChange = (event) => {
    setPropertyDocument(event.target.files[0]);
  };

  const handleHouseImagesChange = (event) => {
    setHouseImages([...houseImages, ...event.target.files]);
  };

  const handleRemoveHouseImage = (index) => {
    const updatedImages = [...houseImages];
    updatedImages.splice(index, 1);
    setHouseImages(updatedImages);
  };


  const handleAddHome = () => {
    // Validation checks
    if (
      !houseName ||
      !selectedCommunity ||
      !location ||
      !description ||
      !price ||
      !propertyType ||
      !propertySize ||
      !bedrooms ||
      !bathrooms ||
      !garages ||
      !garageSize ||
      !yearBuilt ||
      !propertyStatus ||
      !address ||
      !zipCode ||
      !city ||
      !energyClass ||
      !propertyDocument ||
      houseImages.length === 0
    ) {
      toast.error('All fields are required.');
      return;
    }
  
    const formData = new FormData();
    formData.append('houseName', houseName);
    formData.append('community', selectedCommunity);
    formData.append('location', location);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('propertyType', propertyType);
    formData.append('propertySize', propertySize);
    formData.append('bedrooms', bedrooms);
    formData.append('bathrooms', bathrooms);
    formData.append('garages', garages);
    formData.append('garageSize', garageSize);
    formData.append('yearBuilt', yearBuilt);
    formData.append('propertyStatus', propertyStatus);
    formData.append('address', address);
    formData.append('zipCode', zipCode);
    formData.append('city', city);
    formData.append('energyClass', energyClass);
    formData.append('propertyDocument', propertyDocument);
    houseImages.forEach((image) => {
      formData.append('images', image);
    });
  
    try {
      addHouseApi(formData)
        .then((res) => {
          console.log(res);
          toast.success('House added successfully');
          // Reset form fields or perform any other action on success
        })
        .catch((error) => {
          console.error('Error adding house:', error);
          toast.error('Failed to add house. Please try again.');
        });
    } catch (error) {
      console.error('Error adding house:', error);
      toast.error('An error occurred. Please try again later.');
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Add Community</h1>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center space-x-2">
          <FaHome className="w-5 h-5" />
          <input
            type="text"
            placeholder="House Name"
            className="border border-gray-300 px-3 py-2 rounded-md w-full"
            value={houseName}
            onChange={(e) => setHouseName(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-2">
          <FaBuilding className="w-5 h-5" />
          <select
            value={selectedCommunity}
            onChange={(e) => setSelectedCommunity(e.target.value)}
            className="border border-gray-300 px-3 py-2 rounded-md w-full"
          >
            <option value="">Select Community</option>
            {communities.map((community) => (
              <option key={community._id} value={community._id}>
                {community.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center space-x-2">
          <FaMapMarkerAlt className="w-5 h-5" />
          <input
            type="text"
            placeholder="Location"
            className="border border-gray-300 px-3 py-2 rounded-md w-full"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-2">
          <FaInfoCircle className="w-5 h-5" />
          <textarea
            placeholder="Description"
            className="border border-gray-300 px-3 py-2 rounded-md w-full resize-none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-2">
          <FaDollarSign className="w-5 h-5" />
          <input
            type="text"
            placeholder="Price"
            className="border border-gray-300 px-3 py-2 rounded-md w-full"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-2">
          <FaClipboardList className="w-5 h-5" />
          <select
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            className="border border-gray-300 px-3 py-2 rounded-md w-full"
          >
            <option value="">Select Type</option>
            <option value="Type 1">Type 1</option>
            <option value="Type 2">Type 2</option>
          </select>
        </div>
        <div className="flex items-center space-x-2">
          <FaRulerCombined className="w-5 h-5" />
          <input
            type="text"
            placeholder="Property Size"
            className="border border-gray-300 px-3 py-2 rounded-md w-full"
            value={propertySize}
            onChange={(e) => setPropertySize(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-2">
          <FaBed className="w-5 h-5" />
          <input
            type="text"
            placeholder="Bedrooms"
            className="border border-gray-300 px-3 py-2 rounded-md w-full"
            value={bedrooms}
            onChange={(e) => setBedrooms(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-2">
          <FaBath className="w-5 h-5" />
          <input
            type="text"
            placeholder="Bathrooms"
            className="border border-gray-300 px-3 py-2 rounded-md w-full"
            value={bathrooms}
            onChange={(e) => setBathrooms(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-2">
          <FaCar className="w-5 h-5" />
          <input
            type="text"
            placeholder="Garages"
            className="border border-gray-300 px-3 py-2 rounded-md w-full"
            value={garages}
            onChange={(e) => setGarages(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-2">
          <FaCar className="w-5 h-5" />
          <input
            type="text"
            placeholder="Garage Size"
            className="border border-gray-300 px-3 py-2 rounded-md w-full"
            value={garageSize}
            onChange={(e) => setGarageSize(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-2">
          <FaCalendarAlt className="w-5 h-5" />
          <input
            type="text"
            placeholder="Year Built"
            className="border border-gray-300 px-3 py-2 rounded-md w-full"
            value={yearBuilt}
            onChange={(e) => setYearBuilt(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-2">
          <FaAddressCard className="w-5 h-5" />
          <select
  value={propertyStatus}
  onChange={(e) => setPropertyStatus(e.target.value)}
  className="border border-gray-300 px-3 py-2 rounded-md w-full"
>
  <option value="">Select Status</option>
  <option value="For Sale">For Sale</option>
  <option value="Sold">Sold</option>
  <option value="Booked">Booked</option>
</select>
        </div>
        <div className="flex items-center space-x-2">
          <FaAddressCard className="w-5 h-5" />
          <input
            type="text"
            placeholder="Address"
            className="border border-gray-300 px-3 py-2 rounded-md w-full"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-2">
          <FaAddressCard className="w-5 h-5" />
          <input
            type="text"
            placeholder="Zip Code"
            className="border border-gray-300 px-3 py-2 rounded-md w-full"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-2">
          <FaCity className="w-5 h-5" />
          <input
            type="text"
            placeholder="City"
            className="border border-gray-300 px-3 py-2 rounded-md w-full"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-2">
          <FaBolt className="w-5 h-5" />
          <input
            type="text"
            placeholder="Energy Class"
            className="border border-gray-300 px-3 py-2 rounded-md w-full"
            value={energyClass}
            onChange={(e) => setEnergyClass(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-2">
          <FaFilePdf className="w-5 h-5" />
          <input
            type="file"
            accept=".pdf"
            onChange={handlePropertyDocumentChange}
            className="border border-gray-300 px-3 py-2 rounded-md w-full"
          />
        </div>
        <div className="flex items-center space-x-2">
          <FaImage className="w-5 h-5" />
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleHouseImagesChange}
            className="border border-gray-300 px-3 py-2 rounded-md w-full"
          />
        </div>
        {houseImages.length > 0 && (
          <div className="grid grid-cols-3 gap-2">
            {houseImages.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={URL.createObjectURL(image)}
                  alt={`House Image ${index + 1}`}
                  className="w-full h-24 object-cover rounded-md"
                />
                <button
                  onClick={() => handleRemoveHouseImage(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                >
                  <FaTrash className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <button
        onClick={handleAddHome}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mt-4"
      >
        Add Home
      </button>
    </div>
  );
};

export default AddHomes;
