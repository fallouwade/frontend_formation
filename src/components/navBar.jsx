import React from 'react';
import { Link } from 'react-router-dom';
import serveau from '/public/serveu.jpg'
export default function NavBar(props) {
  return (
    <div>
      <nav className=" border-gray-200 dark:bg-gray-900 sm:px-10 px-0 bg-slate-100">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to="/" className="flex items-center space-x-1 rtl:space-x-reverse">
            <img src={serveau} className="h-10" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">GËSTU</span>
          </Link>
          <div className="flex">
            <div className="relative md:flex hidden">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
                <span className="sr-only">Search icon</span>
              </div>
              <input
                type="text"
                id="search-navbar"
                className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search..."
                onChange={props.onChange}
              />
            </div>
          </div>
          <div id="navbar-search">
            <button>
              <ul>
                <li>
                  <Link
                    to="/ajout"
                    className="block rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 font-bold"
                    aria-current="page"
                  >
                    Ajouter une formation
                  </Link>
                </li>
              </ul>
            </button>
          </div>
        </div>
      </nav>
      <div className="mx-3 mt-10 md:hidden flex relative w-60">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
          <span className="sr-only">Search icon</span>
        </div>
        <input
          type="text"
          id="search-navbar"
          className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Que souhaitez vous apprendre ?"
          onChange={props.onChange}
        />
      </div>
    </div>
  );
}
