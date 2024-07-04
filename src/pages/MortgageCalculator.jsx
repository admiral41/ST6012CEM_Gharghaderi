import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import {
  FaMoneyBillAlt,
  FaPercent,
  FaCalendarAlt,
  FaHome,
  FaBuilding,
  FaShieldAlt,
  FaHandHoldingUsd,
} from "react-icons/fa";

const MortgageCalculator = ({ housePrice }) => {
  const [formData, setFormData] = useState({
    totalAmount: housePrice,
    downPayment: 3.5,
    interestRate: 5.99,
    loanTerms: 30,
    propertyTax: 5900,
    homeInsurance: 3000,
  });

  const [calculatedData, setCalculatedData] = useState({
    monthlyPayment: 0,
    loanAmount: 0,
    PMIAmount: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const currentValue = formData[name];
    const newValue = value.replace(/[^0-9.]+/g, "");
    if (newValue !== currentValue) {
      setFormData({
        ...formData,
        [name]: newValue,
      });
    }
  };
  useEffect(() => {
    const calculateMonthlyPayment = () => {
      const principal =
        formData.totalAmount -
        (formData.totalAmount * formData.downPayment) / 100;
      const monthlyInterestRate = formData.interestRate / 100 / 12;
      const months = formData.loanTerms * 12;
      const numerator = principal * monthlyInterestRate;
      const denominator = 1 - Math.pow(1 + monthlyInterestRate, -months);
      return numerator / denominator;
    };

    const monthlyPayment = calculateMonthlyPayment();
    const loanAmount =
      formData.totalAmount -
      (formData.totalAmount * formData.downPayment) / 100;
    const propertyTaxAmount = (formData.propertyTax / 12).toFixed(2);
    const homeInsuranceAmount = (formData.homeInsurance / 12).toFixed(2);
    const PMIAmount = (formData.totalAmount * formData.PMI) / 100;

    setCalculatedData({
      monthlyPayment,
      loanAmount,
      propertyTaxAmount,
      homeInsuranceAmount,
      PMIAmount,
    });
  }, [formData]);

  const doughnutData = {
    labels: ["Principal & Interest", "Property Tax", "Home Insurance", "PMI"],
    datasets: [
      {
        data: [
          calculatedData.monthlyPayment,
          calculatedData.propertyTaxAmount,
          calculatedData.homeInsuranceAmount,
          calculatedData.PMIAmount,
        ],
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
      },
    ],
  };

  return (
    <div className="mx-auto  p-8 max-w-7xl px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold mb-4">Mortgage Calculator</h1>
      <div className="container grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex justify-center">
          <div
            style={{ width: "100%", maxWidth: "400px" }}
            className="flex flex-col"
          >
            <Doughnut
              data={doughnutData}
              options={{
                plugins: {
                  legend: { display: false },
                  tooltip: {
                    callbacks: {
                      label: (context) => `$${context.formattedValue}`,
                    },
                  },
                  doughnutLabel: {
                    labels: [{}],
                  },
                },
                cutout: "80%",
              }}
            />
            {/* absolute lg:pt-[13%] lg:pl-[12%] pt-[35%] pl-[34%] md:pl-[17%] md:pt-[19%] */}
            <div className=" mt-2 flex gap-2 justify-center">
              <p className="font-bold text-lg">
                $
                {(
                  calculatedData.monthlyPayment +
                  parseFloat(calculatedData.propertyTaxAmount) +
                  parseFloat(calculatedData.homeInsuranceAmount)
                ).toFixed(2)}
              </p>
              <p className="ml-1 text-lg">Monthly</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <table className="table-auto border-collapse">
            <tbody className="divide-y divide-gray-300">
              <tr>
                <td className="py-2 flex items-center ">
                  <div className="h-5 w-5 rounded-full border-2 border-indigo-600 mx-2"></div>
                  Down Payment
                </td>
                <td className="px-4 py-2">
                  ${(formData.totalAmount * (formData.downPayment / 100)).toFixed(2)}
                </td>
              </tr>
              <tr>
                <td className=" py-2 flex items-center">
                  <div className="h-5 w-5 rounded-full border-2 border-indigo-600 mx-2"></div>
                  Loan Amount
                </td>
                <td className="px-4 py-2">${calculatedData.loanAmount}</td>
              </tr>
              <tr>
                <td className=" py-2 flex items-center">
                  <div className="h-5 w-5 rounded-full border-2 border-indigo-600 mx-2"></div>
                  Monthly Mortgage
                </td>
                <td className="px-4 py-2">
                  ${calculatedData.monthlyPayment.toFixed(2)}
                </td>
              </tr>
              <tr>
                <td className=" py-2 flex items-center">
                  <div className="h-5 w-5 rounded-full border-2 border-indigo-600 mx-2"></div>
                  Property Tax
                </td>
                <td className="px-4 py-2">
                  ${calculatedData.propertyTaxAmount}
                </td>
              </tr>
              <tr>
                <td className=" py-2 flex items-center">
                  <div className="h-5 w-5 rounded-full border-2 border-indigo-600 mx-2"></div>
                  Home Insurance
                </td>
                <td className="px-4 py-2">
                  ${calculatedData.homeInsuranceAmount}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <br />
      <div className="mt-6 container">
        <form className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="flex flex-col col-span-3 sm:col-span-1">
            <label
              htmlFor="totalAmount"
              className="block text-sm font-medium text-gray-700"
            >
              <FaMoneyBillAlt className="inline-block mb-1 mr-2" />
              Total Amount ($):
            </label>
            <div className="relative mt-2 rounded-md shadow-sm">
              <input
                type="text"
                name="totalAmount"
                id="totalAmount"
                onChange={handleChange}
                value={formData.totalAmount.replace(",", "")}
                className="form-control block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="0.00"
              />
            </div>
          </div>

          {/* Down Payment */}
          <div className="flex flex-col col-span-3 sm:col-span-1">
            <label
              htmlFor="downPayment"
              className="block text-sm font-medium text-gray-700"
            >
              <FaHandHoldingUsd className="inline-block mb-1 mr-2" />
              Down Payment (%):
            </label>
            <div className="relative mt-2 rounded-md shadow-sm">
              <input
                type="text"
                name="downPayment"
                id="downPayment"
                onChange={handleChange}
                value={formData.downPayment}
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="0.00"
              />
            </div>
          </div>
          {/* Interest Rate */}
          <div className="flex flex-col col-span-3 sm:col-span-1">
            <label
              htmlFor="interestRate"
              className="block text-sm font-medium text-gray-700"
            >
              <FaPercent className="inline-block mb-1 mr-2" />
              Interest Rate (%):
            </label>
            <div className="relative mt-2 rounded-md shadow-sm">
              <input
                type="text"
                name="interestRate"
                id="interestRate"
                onChange={handleChange}
                value={formData.interestRate}
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="0.00"
              />
            </div>
          </div>

          {/* Loan Terms */}
          <div className="flex flex-col col-span-3 sm:col-span-1">
            <label
              htmlFor="loanTerms"
              className="block text-sm font-medium text-gray-700"
            >
              <FaCalendarAlt className="inline-block mb-1 mr-2" />
              Loan Terms (years):
            </label>
            <div className="relative mt-2 rounded-md shadow-sm">
              <input
                type="text"
                name="loanTerms"
                id="loanTerms"
                onChange={handleChange}
                value={formData.loanTerms}
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="0.00"
              />
            </div>
          </div>

          {/* Property Tax */}
          <div className="flex flex-col col-span-3 sm:col-span-1">
            <label
              htmlFor="propertyTax"
              className="block text-sm font-medium text-gray-700"
            >
              <FaBuilding className="inline-block mb-1 mr-2" />
              Property Tax ($):
            </label>
            <div className="relative mt-2 rounded-md shadow-sm">
              <input
                type="text"
                name="propertyTax"
                id="propertyTax"
                onChange={handleChange}
                value={formData.propertyTax}
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="0.00"
              />
            </div>
          </div>

          {/* Home Insurance */}
          <div className="flex flex-col col-span-3 sm:col-span-1">
            <label
              htmlFor="homeInsurance"
              className="block text-sm font-medium text-gray-700"
            >
              <FaHome className="inline-block mb-1 mr-2" />
              Home Insurance ($):
            </label>
            <div className="relative mt-2 rounded-md shadow-sm">
              <input
                type="text"
                name="homeInsurance"
                id="homeInsurance"
                onChange={handleChange}
                value={formData.homeInsurance}
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="0.00"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MortgageCalculator;
