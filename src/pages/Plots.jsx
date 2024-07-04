import React from "react";
import { FaMapMarkerAlt, FaRulerCombined, FaMoneyBillWave } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Import useHistory for redirection
import everest from "../assets/img/EverestHeight.jpg";
import lubok from "../assets/img/lubok.jpg";
import banner from "../assets/img/banner.jpg";
import { toast } from "react-toastify";

const Plots = () => {
  const history = useNavigate(); // Initialize useHistory for redirection

  const plots = [
    {
      id: 1,
      name: "Chabahil",
      productImage: everest,
      location: "Kathmandu, Nepal",
      area: "2.5 ropani",
      price: "Rs. 50,00,000",
    },
    {
      id: 2,
      name: "Gokarna",
      productImage: lubok,
      location: "Pokhara, Nepal",
      area: "3.0 ropani",
      price: "Rs. 60,00,000",
    },
  ];

  const handleScheduleVisit = () => {
    const isLoggedIn = localStorage.getItem("token"); // Check if user is logged in
    const isAdmin = localStorage.getItem("isAdmin") === "true"; // Check if user is admin
  
    if (!isLoggedIn) {
      // If not logged in, show toast message and redirect to login page
      toast.error("Please login to schedule a visit.");
      history("/login"); // Redirect to login page
    } else if (isAdmin) {
      // If user is admin, show toast message
      toast.error("Admins cannot schedule a visit.");
    } else {
      // If user is logged in and not admin, proceed with scheduling visit
      // Add your logic here for scheduling a visit
      console.log("Scheduling visit...");
    }
  };
  

  return (
    <div style={{ backgroundColor: "#F4FAF0" }}>
      <div
        className="relative overflow-hidden bg-cover bg-no-repeat p-12 text-center"
        style={{
          backgroundImage: `url(${banner})`,
          height: "300px",
        }}
      >
        <div
          className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
        >
          <div className="flex h-full items-center justify-center">
            <div className="text-white max-w-lg mx-auto">
              <h2 className="mb-4 text-4xl lg:text-5xl font-semibold">
                <span className="border-b-2 border-dashed border-orange-500">
                  Our Plots
                </span>
              </h2>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto py-8">
          <div className="text-center text-lg text-gray-700 mb-4 overflow-hidden">
            <marquee className="marquee" behavior="scroll" direction="left">
              We offer prime plots for sale. Contact us at +977 9843347967 or email us at gharghaderi@gmail.com for more information.
            </marquee>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
            {plots.map((plot) => (
              <div key={plot.id} className="bg-white shadow-md rounded-lg overflow-hidden">
                <img
                  src={plot.productImage}
                  alt={plot.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">{plot.name}</h2>
                  <p className="text-gray-600 flex items-center mb-2">
                    <FaMapMarkerAlt className="mr-2 text-blue-500" />
                    <strong>Location: </strong>&nbsp;  {plot.location}
                  </p>
                  <div className="flex justify-between items-center text-gray-600 mb-2">
                    <p className="flex items-center">
                      <FaRulerCombined className="mr-2 text-blue-500" />
                      <strong>Area:</strong>&nbsp; {plot.area}
                    </p>
                    <p className="flex items-center">
                      <FaMoneyBillWave className="mr-2 text-blue-500" />
                      <strong>Price:</strong>&nbsp; {plot.price}
                    </p>
                  </div>

                  <div className="mt-4 flex justify-between">
                    <button
                      style={{ backgroundColor: "#081E26" }}
                      className="text-white font-bold py-2 px-4 rounded w-full mr-2"
                    >
                      View Plot
                    </button>
                    <button
                      style={{ backgroundColor: "#081E26" }}
                      onClick={handleScheduleVisit} // Call handleScheduleVisit function on button click
                      className="text-white font-bold py-2 px-4 rounded w-full ml-2"
                    >
                      Schedule a Visit
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Plots;
