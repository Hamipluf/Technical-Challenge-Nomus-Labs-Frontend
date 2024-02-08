import React from "react";
import { Link, useNavigate } from "react-router-dom";

const NavBar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="mx-auto my-3 lg:max-w-7xl w-full px-5 sm:px-10 md:px-12 lg:px-5">
        <nav className="w-full flex justify-between gap-6 relative">
          <div className="min-w-max inline-flex relative">
            <Link to="/" className="relative flex items-center gap-3">
              <img
                className="w-10 h-10"
                src="https://media.licdn.com/dms/image/C4E0BAQEWXlVSavMv_g/company-logo_200_200/0/1638278115694?e=1715212800&v=beta&t=ilai4K9qJY9aPK4-0ERC_coUN7z2Krm3oPyWKp9PJ_U"
                alt="Logo Nomus Labs"
              />
              <div className="inline-flex text-lg font-semibold text-white">
                Nomus Labs
              </div>
            </Link>
          </div>

          <div
            aria-hidden="true"
            className="fixed hidden inset-0 lg:!hidden bg-gray-800/60 bg-opacity-50 backdrop-filter backdrop-blur-xl"
          ></div>
          <div
            data-navbar
            className="flex invisible opacity-0  translate-y-10 overflow-hidden lg:visible lg:opacity-100  lg:-translate-y-0 lg:scale-y-100 duration-300 ease-linear flex-col gap-y-6 gap-x-4 lg:flex-row w-full lg:justify-between lg:items-center absolute lg:relative top-full lg:top-0 bg-white lg:!bg-transparent border-x border-x-gray-100 lg:border-x-0"
          >
            <ul className="border-t border-gray-100  lg:border-t-0 px-6 lg:px-0 pt-6 lg:pt-0 flex flex-col lg:flex-row gap-y-4 gap-x-3 text-lg text-gray-700 w-full lg:justify-around lg:items-center">
              <li>
                <Link
                  to="/"
                  className="duration-300 font-medium ease-linear hover:text-white py-3"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="duration-300 font-medium ease-linear hover:text-white py-3"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="duration-300 font-medium ease-linear hover:text-white py-3"
                >
                  About us
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="duration-300 font-medium ease-linear hover:text-white py-3"
                >
                  Features
                </Link>
              </li>
            </ul>
            <button
              onClick={() => navigate("/login")}
              className="btn btn-outline btn-secondary btn-wide z-10"
            >
              Login
            </button>
          </div>

          <div className="flex items-center gap-x-3">
            <div className="dropdown dropdown-end ">
              <div
                tabIndex={0}
                role="button"
                className="btn m-1 lg:hidden lg:invisible "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-menu-2"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M4 6l16 0" />
                  <path d="M4 12l16 0" />
                  <path d="M4 18l16 0" />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-80 mt-5 z-10"
              >
                <li>
                  <Link
                    to="/"
                    className="duration-300 font-medium ease-linear hover:text-white py-3"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="duration-300 font-medium ease-linear hover:text-white py-3"
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="duration-300 font-medium ease-linear hover:text-white py-3"
                  >
                    About us
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="duration-300 font-medium ease-linear hover:text-white py-3"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    to="/login"
                    className="flex justify-center p-2 bg-primary font-bold m-4 text-white"
                  >
                    Login
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default NavBar;
