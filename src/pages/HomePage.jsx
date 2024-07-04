import React, { useEffect } from "react";
import backgroundImage from "../assets/img/Backgrounds.png"; // Import your background image
import Subscriber from "./homepageComponent/Subscriber";
import Community from "./homepageComponent/Community";
import FeaturedListing from "./homepageComponent/FeaturedListing";
import FacebookMsg from "./components/FacebookMsg";
import { trackVisitApi } from "../Apis/apis";
const HomePage = () => {
  useEffect(() => {
    const trackVisitor = async () => {
      try {
        const response = await trackVisitApi();
        console.log(response);
      } catch (error) {
        console.error("Error tracking visit:", error);
      }
    }
    trackVisitor();
  }, []);
  return (
    <div style={{ backgroundColor: "#F4FAF0" }}>
      <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
        <div className="flex justify-center items-center">
          <div className="max-w-md mx-auto ">
            <div className="text-6xl font-black tracking-tighter leading-10 text-black">
              <div className="pb-6">New Homes</div>
              <div className="pb-6">
                for <span className="text-lime-500">Everyone</span>
              </div>
            </div>

            <p className="text-sm text-gray-700 ">
              Helping people getting their perfect homes in affordable prices.
            </p>
            <div className="mt-6">
              <div className="mt-6 bg-white rounded-xl p-3 absolute shadow border border-lime-500 ">
                <div className="grid grid-cols-4 md:grid-cols-4 gap-3 items-center">
                
                  <div className="flex flex-col border-r-2 px-2">
                  <select id="countries" class=" border-0 font-bold lg:text-[14px] text-[12px]">
                      <option selected> Location</option>
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>

                    </select>
                    <div className="lg:text-[12px] text-[8px]">Select Location</div>
            
                  </div>
                  <div className="flex flex-col border-r-2 px-2">
                  <select id="countries" class=" border-0 font-bold lg:text-[14px] text-[12px]">
                      <option selected> Type</option>
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>

                    </select>
                    <div className="lg:text-[12px] text-[8px]">Enter house type</div>
            
                  </div>
                  <div className="flex flex-col border-r-2 px-2">
                  <select id="countries" class=" border-0  font-bold lg:text-[14px] text-[12px] ">
                      <option selected> Price</option>
                      <option value="1000">1000</option>
                      <option value="2000">2000</option>

                    </select>
                    <div className="lg:text-[12px] text-[8px]">Enter the price you want</div>
            
                  </div>
                 
                  <div className="flex flex-col items-center">
                    <button className="text-white font-bold px-4 p-2 bg-lime-500 rounded-full  lg:text-[14px] text-[12px]">
                      Explore Now <i className="fas fa-arrow-right"></i>
                    </button>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-[150px]">
                <div className="flex flex-col items-center">
                  <div className="text-4xl font-bold mb-2 md:mb-1">12+</div>
                  <div className="text-sm md:text-xs">Years of experience</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-4xl font-bold mb-2 md:mb-1">120+</div>
                  <div className="text-sm md:text-xs">Properties Sold</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-4xl font-bold mb-2 md:mb-1">250+</div>
                  <div className="text-sm md:text-xs">Satisfied Customers</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="hidden md:block bg-cover"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            height: "100vh",
          }}
        ></div>
      </div>

      {/* Explore By Commintiy */}
      <Community />

      {/* FeaturedListing */}
      <FeaturedListing />
      <Subscriber />

      <FacebookMsg />
    </div>
  );
};

export default HomePage;
