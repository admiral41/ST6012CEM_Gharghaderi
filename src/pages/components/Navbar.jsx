import { Fragment, useEffect, useState } from "react";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Logo from "../../assets/logo/gharghaderi.png";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [activeLink, setActiveLink] = useState("Home");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check if the user is logged in from localStorage
    const userLoggedIn = localStorage.getItem("token");
    if (userLoggedIn) {
      setIsLoggedIn(true);
      // Check if the user is an admin
      const userData = JSON.parse(localStorage.getItem("user"));
      if (userData && userData.isAdmin) {
        setIsAdmin(true);
      }
    } else {
      setIsLoggedIn(false);
      setIsAdmin(false);
    }
  }, []);

  return (
    <Disclosure as="nav" className="bg-white sticky top-0 z-50 shadow-lg">
      {({ open, close }) => (
        <Fragment>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 py-2">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
                <Disclosure.Button
                  className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  onClick={() => (open ? close() : null)}
                >
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-between sm:items-stretch sm:justify-between">
                <div className="flex flex-shrink-0 items-center h-[50px]">
                  <Link to="/">
                    <img
                      className="h-[50px] lg:h-[70px]"
                      src={Logo}
                      alt="suvedi Company"
                    />
                  </Link>
                </div>
                <div className="hidden md:flex md:space-x-10 list-none flex items-center">
                  <Link
                    to="/"
                    className={`text-base font-normal ${
                      activeLink === "Home" ? "text-green-500" : "text-gray-500"
                    } list-none hover:text-gray-900`}
                    onClick={() => {
                      setActiveLink("Home");
                      close();
                    }} // Set active link on click and close menu
                  >
                    Home
                  </Link>
                  <Link
                    to="/plots"
                    className={`text-base font-normal ${
                      activeLink === "About"
                        ? "text-green-500"
                        : "text-gray-500"
                    } list-none hover:text-gray-900`}
                    onClick={() => {
                      setActiveLink("About");
                      close();
                    }} // Set active link on click and close menu
                  >
                    Plots
                  </Link>
                  <Link
                    to="/contact"
                    className={`text-base font-normal ${
                      activeLink === "Finance"
                        ? "text-green-500"
                        : "text-gray-500"
                    } list-none hover:text-gray-900`}
                    onClick={() => {
                      setActiveLink("Finance");
                      close();
                    }}
                  >
                    Contact
                  </Link>
                  {isLoggedIn ? (
                    <Link
                      to={isAdmin ? "/admindashboard" : "/dashboard"}
                      className={`inline-flex items-center px-4 py-2 text-base text-white border border-transparent rounded-full cursor-pointer font-base hover:bg-gray-50 ${
                        activeLink === "Dashboard"
                          ? "bg-green-500 hover:bg-green-600"
                          : "bg-gray-500 hover:bg-gray-600"
                      }`}
                      onClick={() => {
                        setActiveLink("Dashboard");
                        close();
                      }} // Set active link on click and close menu
                      style={{ backgroundColor: isAdmin ? "#72B944" : "#72B944" }} // Use admin color or user color
                    >
                      {isAdmin ? "Dashboard" : "Dashboard"}
                    </Link>
                  ) : (
                    <Fragment>
                      <Link
                        to="/login"
                        className={`text-base font-normal ${
                          activeLink === "Gallery"
                            ? "text-green-500"
                            : "text-gray-500"
                        } list-none hover:text-gray-900`}
                        onClick={() => {
                          setActiveLink("Gallery");
                          close();
                        }} // Set active link on click and close menu
                      >
                        Login
                      </Link>
                      <div className="inline-flex rounded-full shadow ml-4">
                        <Link
                          to="/register"
                          style={{ backgroundColor: "#72B944" }}
                          className="inline-flex items-center px-4 py-2 text-base text-white border border-transparent rounded-full cursor-pointer font-base hover:bg-gray-50"
                          onClick={close} // Close menu when Contact is clicked
                        >
                          Register
                        </Link>
                      </div>
                    </Fragment>
                  )}
                </div>
              </div>
            </div>
          </div>
          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2 ">
              <Link
                to="/"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                onClick={close} // Close menu when Home is clicked
              >
                Home
              </Link>
              <Link
                to="/plots"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                onClick={close} // Close menu when Plots is clicked
              >
                Plots
              </Link>
              <Link
                to="/contact"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                onClick={close} // Close menu when Contact is clicked
              >
                Contact
              </Link>
              {isLoggedIn ? (
                <Link
                  to={isAdmin ? "/admindashboard" : "/dashboard"}
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  onClick={close} // Close menu when YourDashboard is clicked
                  style={{ backgroundColor: isAdmin ? "#72B944" : "#5A67D8" }} // Use admin color or user color
                >
                  {isAdmin ? "Dashboard" : "Dashboard"}
                </Link>
              ) : (
                <Fragment>
                  <Link
                    to="/login"
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                    onClick={close} // Close menu when Login is clicked
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                    onClick={close} // Close menu when Register is clicked
                  >
                    Register
                  </Link>
                </Fragment>
              )}
            </div>
          </Disclosure.Panel>
        </Fragment>
      )}
    </Disclosure>
  );
}
