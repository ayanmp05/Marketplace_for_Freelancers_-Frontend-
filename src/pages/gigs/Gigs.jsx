import React, { useEffect, useRef, useState } from "react";
import GigCard from "../../component/gigCard/GigCard";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useLocation } from "react-router-dom";

function Gigs() {
  const [sort, setSort] = useState("sales");
  const [open, setOpen] = useState(false);
  const minRef = useRef();
  const maxRef = useRef();

  const { search } = useLocation();

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["gigs"],
    queryFn: () =>
      newRequest
        .get(
          `/gigs${search}?min=${minRef.current.value}&max=${maxRef.current.value}&sort=${sort}`
        )
        .then((res) => {
          return res.data;
        }),
  });

  console.log(data);

  const reSort = (type) => {
    setSort(type);
    setOpen(false);
  };

  useEffect(() => {
    refetch();
  }, [sort]);

  const apply = () => {
    refetch();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 md:py-12 font-inter">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Breadcrumbs */}
        <span className="text-sm text-gray-500 mb-2 block">
          Geniferr &gt;
        </span>

        {/* Title and Description */}
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
          Gigs
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl">
          Explore the boundaries of different gigs for finding most skillful freelancers
        </p>

        {/* Filter and Sort Menu */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10 p-4 bg-white rounded-xl shadow-lg">
          {/* Left: Budget Filters */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <span className="text-gray-700 font-semibold text-base whitespace-nowrap">Budget:</span>
            <input
              ref={minRef}
              type="number"
              placeholder="min"
              className="w-28 p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out text-sm"
            />
            <input
              ref={maxRef}
              type="number"
              placeholder="max"
              className="w-28 p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out text-sm"
            />
            <button
              onClick={apply}
              className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out w-full sm:w-auto"
            >
              Apply
            </button>
          </div>

          {/* Right: Sort By */}
          <div className="relative flex items-center gap-2 w-full md:w-auto justify-end">
            <span className="text-gray-700 font-semibold text-base whitespace-nowrap">Sort by:</span>
            <span
              className="sortType text-blue-600 font-semibold cursor-pointer flex items-center gap-1"
              onClick={() => setOpen(!open)}
            >
              {sort === "sales" ? "Best Selling" : "Newest"}
              {/* Placeholder for down arrow icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 text-gray-500 transform transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </span>

            {/* Sort Dropdown Menu */}
            {open && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-1 z-10 border border-gray-200">
                {sort === "sales" ? (
                  <span
                    onClick={() => reSort("createdAt")}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer text-sm"
                  >
                    Newest
                  </span>
                ) : (
                  <span
                    onClick={() => reSort("sales")}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer text-sm"
                  >
                    Best Selling
                  </span>
                )}
                {/* "Popular" option, always available */}
                <span
                  onClick={() => reSort("popular")} // Assuming 'popular' is another sort option
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer text-sm"
                >
                  Popular
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Gig Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {isLoading ? (
            <p className="col-span-full text-center text-xl font-medium text-gray-700 py-10">
              Loading gigs...
            </p>
          ) : error ? (
            <p className="col-span-full text-center text-xl font-medium text-red-600 py-10">
              Something went wrong! Please try again later.
            </p>
          ) : data.length === 0 ? (
            <p className="col-span-full text-center text-xl font-medium text-gray-700 py-10">
              No gigs found matching your criteria.
            </p>
          ) : (
            data.map((gig) => <GigCard key={gig._id} item={gig} />)
          )}
        </div>
      </div>
    </div>
  );
}

export default Gigs;