import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

const GigCard = ({ item }) => {


  console.log('GigCard item:', item);

  const { isLoading, error, data } = useQuery({
    queryKey: [item.userId],
    queryFn: () =>
      newRequest.get(`/users/${item.userId}`).then((res) => {
        return res.data;
      }),
  });

const rating = typeof item.totalStars === "number" && item.starNumber > 0 ? Math.round(item.totalStars / item.starNumber) : "New";

  return (
    <Link to={`/gig/${item._id}`} className="block group">
      <div className="w-full bg-white border border-gray-200 rounded-lg overflow-hidden flex flex-col h-full transition-all duration-300 ease-in-out group-hover:shadow-lg group-hover:-translate-y-1">

        {/* --- Card Image --- */}
        {/* Using a fixed aspect ratio container to prevent layout shifts */}
        <div className="aspect-w-16 aspect-h-9">
          <img className="w-full h-full object-cover" src={item.cover} alt={`Cover for gig: ${item.title}`} onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x400/cccccc/ffffff?text=Image+Not+Found"; }} />
        </div>

        <div className="p-4 flex flex-col flex-grow">
          {/* --- User Info Section --- */}
          <div className="flex items-center mb-3">
            {isLoading ? (
              // Skeleton loader for user info
              <div className="animate-pulse flex items-center w-full">
                <div className="w-8 h-8 bg-gray-300 rounded-full mr-3"></div>
                <div className="w-1/2 h-4 bg-gray-300 rounded"></div>
              </div>
            ) : error ? (
              <span className="text-red-500 text-sm font-medium">Error loading user</span>
            ) : (
              <div className="flex items-center">
                <img className="w-8 h-8 rounded-full object-cover mr-3" src={data.img || "/img/noavatar.jpg"} alt={`Profile of ${data.username}`} />
                <span className="font-bold text-gray-700 text-sm truncate">{data.username}</span>
              </div>
            )}
          </div>

          {/* --- Gig Description --- */}
          {/* Using line-clamp plugin to truncate text neatly */}
          <p className="text-gray-600 text-base line-clamp-2 mb-4 flex-grow">
            {item.desc}
          </p>

          {/* --- Star Rating --- */}
          <div className="flex items-center text-yellow-500 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-gray-800 font-bold ml-1.5">
              {rating}
            </span>
          </div>
        </div>

        {/* --- Footer with Price --- */}
        <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between">
          {/* Heart Icon can be a button in a real app */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400 group-hover:text-red-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <div className="text-right">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              Starting At
            </span>
            <h2 className="text-xl font-bold text-gray-800">${item.price}</h2>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GigCard;