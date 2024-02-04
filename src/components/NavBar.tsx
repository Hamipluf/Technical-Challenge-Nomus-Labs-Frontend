import React from "react";

const NavBar = () => {
  return (
    <>
      <div className="mx-auto my-3 lg:max-w-7xl w-full px-5 sm:px-10 md:px-12 lg:px-5">
        <nav className="w-full flex justify-between gap-6 relative">
          <div className="min-w-max inline-flex relative">
            <a href="/" className="relative flex items-center gap-3">
              <img
                className="w-10 h-10"
                src="https://media.licdn.com/dms/image/C4E0BAQEWXlVSavMv_g/company-logo_200_200/0/1638278115694?e=1715212800&v=beta&t=ilai4K9qJY9aPK4-0ERC_coUN7z2Krm3oPyWKp9PJ_U"
                alt="Logo Nomus Labs"
              />
              <div className="inline-flex text-lg font-semibold text-gray-900 text-white">
                Nomus Labs
              </div>
            </a>
          </div>

          <div
            data-nav-overlay
            aria-hidden="true"
            className="fixed hidden inset-0 lg:!hidden bg-gray-800/60 bg-opacity-50 backdrop-filter backdrop-blur-xl"
          ></div>
          <div
            data-navbar
            className="flex invisible opacity-0  translate-y-10 overflow-hidden lg:visible lg:opacity-100  lg:-translate-y-0 lg:scale-y-100 duration-300 ease-linear flex-col gap-y-6 gap-x-4 lg:flex-row w-full lg:justify-between lg:items-center absolute lg:relative top-full lg:top-0 bg-white lg:!bg-transparent border-x border-x-gray-100 lg:border-x-0"
          >
            <ul className="border-t border-gray-100  lg:border-t-0 px-6 lg:px-0 pt-6 lg:pt-0 flex flex-col lg:flex-row gap-y-4 gap-x-3 text-lg text-gray-700 w-full lg:justify-around lg:items-center">
              <li>
                <a
                  href="#"
                  className="duration-300 font-medium ease-linear hover:text-white py-3"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="duration-300 font-medium ease-linear hover:text-white py-3"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="duration-300 font-medium ease-linear hover:text-white py-3"
                >
                  About us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="duration-300 font-medium ease-linear hover:text-white py-3"
                >
                  Features
                </a>
              </li>
            </ul>
          </div>

          <div className="min-w-max flex items-center gap-x-3">
            <button
              data-toggle-navbar
              data-is-open="false"
              className="lg:hidden lg:invisible outline-none w-7 h-auto flex flex-col relative"
            >
              <span
                id="line-1"
                className="w-6 h-0.5 rounded-full bg-gray-700 transition-all duration-300 ease-linear"
              ></span>
              <span
                id="line-2"
                className="w-6 origin-center  mt-1 h-0.5 rounded-ful bg-gray-700 transition-all duration-300 ease-linear"
              ></span>
              <span
                id="line-3"
                className="w-6 mt-1 h-0.5 rounded-ful bg-gray-700 transition-all duration-300 ease-linear"
              ></span>
              <span className="sr-only">togglenav</span>
            </button>
          </div>
        </nav>
      </div>
    </>
  );
};

export default NavBar;
