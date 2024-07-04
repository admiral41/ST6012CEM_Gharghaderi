import React from "react";

const HouseEnergyClass = ({ energyLevel }) => {
  const marginLeftValue = (level) => {
    switch (level) {
      case "A":
        return "12%";
      case "B":
        return "23%";
      case "C":
        return "34%";
      case "D":
        return "46%";
      case "E":
        return "56%";
      case "F":
        return "67%";
      case "G":
        return "79%";
      case "H":
        return "90%";
      default:
        return "0";
    }
  };

  const renderGrayDiv = () => {
    return (
      <div>
        <div
          style={{ marginLeft: `${marginLeftValue(energyLevel)}` }}
          className="p-2 bg-gray-300 w-fit"
        >
          Energy class {energyLevel}
        </div>
        <div
          style={{ marginLeft: `${marginLeftValue(energyLevel)}` }}
          className="w-0 h-0 
            border-t-[0px] border-t-transparent
            border-l-[25px] border-l-gray-300
            border-b-[20px] border-b-transparent"
        ></div>
      </div>
    );
  };

  return (
    <div className="flex-1 p-8">
      <h2 className="text-xl font-semibold mb-4">House Energy Class</h2>
      <div className="mb-2">{renderGrayDiv()}</div>
      <div className="w-full h-8 flex items-center md:w-auto, md:flex-grow-0, md:flex-shrink-0">
        <div
          style={{ backgroundColor: "#33A256" }}
          className="flex-1 text-white font-semibold text-center rounded-l-lg py-2"
        >
          A+
        </div>
        <div
          style={{ backgroundColor: "#78B652" }}
          className="flex-1 text-white font-semibold text-center py-2"
        >
          A
        </div>
        <div
          style={{ backgroundColor: "#C2D445" }}
          className="flex-1 text-white font-semibold text-center py-2"
        >
          B
        </div>
        <div
          style={{ backgroundColor: "#FEF02C" }}
          className="flex-1 text-white font-semibold text-center py-2"
        >
          C
        </div>
        <div
          style={{ backgroundColor: "#ECB631" }}
          className="flex-1 text-white font-semibold text-center py-2"
        >
          D
        </div>
        <div
          style={{ backgroundColor: "#D66F2C" }}
          className="flex-1 text-white font-semibold text-center py-2"
        >
          E
        </div>
        <div
          style={{ backgroundColor: "#CD222A" }}
          className="flex-1 text-white font-semibold text-center py-2"
        >
          F
        </div>
        <div
          style={{ backgroundColor: "#CD222A" }}
          className="flex-1 text-white font-semibold text-center py-2"
        >
          G
        </div>
        <div
          style={{ backgroundColor: "#CD222A" }}
          className="flex-1 text-white font-semibold text-center rounded-r-lg py-2"
        >
          H
        </div>
      </div>
    </div>
  );
};

export default HouseEnergyClass;
