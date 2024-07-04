import React, { useEffect, useState } from "react";
import communityImage from "../assets/img/Background.png";
import bedIcon from "../assets/img/bed.png"; // Import bed and shower icons
import showerIcon from "../assets/img/shower.png";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getCommunityByIdApi, getHousesByCommunityApi } from "../Apis/apis";
import AOS from 'aos';

const CommunityDetail = () => {
  const { id } = useParams();
  const [community, setCommunity] = useState(null);

  const [houses, setHouses] = useState([]);

  useEffect(() => {
    
      AOS.init({
        duration: 1000, // Animation duration in milliseconds
        offset: 150, // Offset (in px) from the top of the screen
        easing: 'ease-in-out', // Easing type for the animation
      });
    if (id) {
      getCommunityByIdApi(id)
        .then((res) => {
          console.log(res.data); // Assuming your API response has the community data
          setCommunity(res.data.community); // Set the community data

          // Fetch houses by community ID
          getHousesByCommunityApi(id)
            .then((housesRes) => {
              console.log(housesRes.data); // Assuming your API response has the houses data
              setHouses(housesRes.data.houses || []); // Set the fetched houses
            })
            .catch((err) => {
              console.log(err);
              // Handle error fetching houses by community ID
            });
        })
        .catch((err) => {
          console.log(err);
          // Handle error fetching community by ID
        });
    }
  }, [id]);

  return (
  
      <div style={{ backgroundColor: "#F4FAF0" }}>
        <div
          className="relative overflow-hidden bg-cover bg-no-repeat p-12 text-center"
          style={{
            backgroundImage: `url(${communityImage})`,
            height: "300px",
          }}
        >
          <div
            className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
          >
            <div className="flex h-full items-center justify-center">
              <div className="text-white ">
                <h2 className="mb-4 text-4xl lg:text-5xl font-semibold">
                  {community ? community.name : "Loading..."}
                </h2>
              

              
                <div className="mt-6 bg-white rounded-xl p-3  shadow border border-lime-500 w-full w-[50vw]">
                <div className="grid grid-cols-4 md:grid-cols-4 gap-3 items-center ">
                
                  <div className="flex flex-col border-r-2 px-2">
                  <select id="countries" class=" border-0 font-bold lg:text-[14px] text-[12px] text-black">
                      <option selected> Location</option>
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>

                    </select>
                    <div className="lg:text-[12px] text-[8px] text-black">Select Location</div>
            
                  </div>
                  <div className="flex flex-col border-r-2 px-2">
                  <select id="countries" class=" border-0 font-bold lg:text-[14px] text-[12px] text-black ">
                      <option selected> Type</option>
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>

                    </select>
                    <div className="lg:text-[12px] text-[8px] text-black">Enter house type</div>
            
                  </div>
                  <div className="flex flex-col border-r-2 px-2">
                  <select id="countries" class=" border-0  font-bold lg:text-[14px] text-[12px] text-black">
                      <option selected> Price</option>
                      <option value="1000">1000</option>
                      <option value="2000">2000</option>

                    </select>
                    <div className="lg:text-[12px] text-[8px] text-black">Enter the price you want</div>
            
                  </div>
                 
                  <div className="flex flex-col items-center">
                    <button className="text-white font-bold px-4 p-2 bg-lime-500 rounded-full  lg:text-[14px] text-[12px]">
                      Explore Now <i className="fas fa-arrow-right"></i>
                    </button>
                  </div>
                </div>
              </div>
              

                {/* <button
                  type="button"
                  className="rounded-lg border-2 border-neutral-50 px-7 pb-[8px] pt-[10px] text-sm md:text-base font-medium uppercase leading-normal text-neutral-50 transition duration-150 ease-in-out hover:border-neutral-100 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-neutral-100 focus:border-neutral-100 focus:text-neutral-100 focus:outline-none focus:ring-0 active:border-neutral-200 active:text-neutral-200 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                  data-twe-ripple-init
                  data-twe-ripple-color="light"
                >
                  Call to action
                </button> */}
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto py-10">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-2">
            Featured Listing
          </h2>
          <p className="text-lg text-center text-gray-600" data-aos="fade-up">
            The ones you want to see in person!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            {/* Featured House 1 */}

            {houses.map((house, index) => (
              <Link to={`/house/${house._id}`} key={house._id} data-aos="fade-up">
              <div
                className={`relative overflow-hidden rounded-lg shadow-lg ${
                  index % 2 === 0 ? "bg-green-400" : "bg-gray-600"
                }`}
              >
                <div className="absolute top-0 right-0 mt-2 mr-2">
                  <span
                    className={`inline-block px-2 py-1 rounded-lg text-white text-xs ${
                      house.status === "For Sale"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  >
                    {house.propertyStatus}
                  </span>
                </div>
  
                <img
                  src={`http://localhost:5000/${house.images[0]}`}
                  alt={`Featured House ${index + 1}`}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="bg-black bg-opacity-50 p-4 text-center">
                  <p className="text-white font-bold text-lg mb-2">
                    {house.address}
                  </p>
                  <p className="text-gray-300 text-lg mb-2">${house.price}</p>
                  <p className="text-white text-sm mb-4">
                    {house.propertyType}
                  </p>
                  <div className="flex items-center justify-center mb-4">
                    <img
                      src={bedIcon}
                      alt="Bed Icon"
                      className="w-6 h-6 mr-2"
                    />
                    <p className="text-white text-sm mr-6">
                      {house.bedrooms} Bed
                    </p>
                    <img
                      src={showerIcon}
                      alt="Shower Icon"
                      className="w-6 h-6 mr-2"
                    />
                    <p className="text-white text-sm">
                      {house.bathrooms} Bath
                    </p>
                  </div>
                </div>
              </div>
            </Link>
            ))}

            {/* Featured House 2
            <div className="relative overflow-hidden rounded-lg shadow-lg bg-gray-600">
              <img
                src={houseImage2}
                alt="Featured House 2"
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="bg-black bg-opacity-50 p-4 text-center">
                <p className="text-white font-bold text-lg mb-2">
                  7804 95th St.
                </p>
                <p className="text-gray-300 text-lg mb-2">$500,000</p>
                <p className="text-white text-sm mb-4">Type 1</p>
                <div className="flex items-center justify-center mb-4">
                  <img src={bedIcon} alt="Bed Icon" className="w-6 h-6 mr-2" />
                  <p className="text-white text-sm mr-6">2 Bed</p>
                  <img
                    src={showerIcon}
                    alt="Shower Icon"
                    className="w-6 h-6 mr-2"
                  />
                  <p className="text-white text-sm">3 Bath</p>
                </div>
              </div>
            </div>

            {/* Featured House 3 */}
            {/* <div className="relative overflow-hidden rounded-lg shadow-lg bg-green-400">
              <img
                src={houseImage3}
                alt="Featured House 3"
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="bg-black bg-opacity-50 p-4 text-center">
                <p className="text-white font-bold text-lg mb-2">
                  7804 95th St.
                </p>
                <p className="text-gray-300 text-lg mb-2">$500,000</p>
                <p className="text-white text-sm mb-4">Type 1</p>
                <div className="flex items-center justify-center mb-4">
                  <img src={bedIcon} alt="Bed Icon" className="w-6 h-6 mr-2" />
                  <p className="text-white text-sm mr-6">3 Bed</p>
                  <img
                    src={showerIcon}
                    alt="Shower Icon"
                    className="w-6 h-6 mr-2"
                  />
                  <p className="text-white text-sm">4 Bath</p>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
  
  );
};

export default CommunityDetail;
