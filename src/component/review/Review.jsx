import { useQuery } from "@tanstack/react-query";
import React from "react";
import newRequest from "../../utils/newRequest";
const Review = ({ review }) => {
  const { isLoading, error, data } = useQuery(
    {
      queryKey: [review.userId],
      queryFn: () =>
        newRequest.get(`/users/${review.userId}`).then((res) => {
          return res.data;
        }),
    },
  );


  return (
    <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm w-full max-w-4xl mx-auto font-sans">
      <div className="flex flex-col gap-4">
        {/* User Info Section with Loading/Error states */}
        {isLoading ? (
          <div className="flex items-center gap-4 animate-pulse">
            <div className="w-12 h-12 rounded-full bg-gray-300"></div>
            <div className="flex flex-col gap-2">
                <div className="h-4 w-24 bg-gray-300 rounded"></div>
                <div className="h-3 w-20 bg-gray-300 rounded"></div>
            </div>
          </div>
        ) : error ? (
          <div className="text-red-500">Could not load user information.</div>
        ) : (
          <div className="flex items-center gap-4">
            <img
              className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
              src={data.img || "/img/noavatar.jpg"}
              alt={`${data.username}'s profile picture`}
              onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/100x100/E2E8F0/4A5568?text=AV"; }}
            />
            <div className="flex flex-col">
              <span className="font-semibold text-gray-800">{data.username}</span>
              <span className="text-sm text-gray-500">{data.country}</span>
            </div>
          </div>
        )}

        {/* Star Rating Section */}
        <div className="flex items-center gap-1">
          {Array(review.star)
            .fill(0)
            .map((_, i) => (
              <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
            ))}
          <span className="ml-2 font-bold text-gray-700">{review.star}</span>
        </div>

        {/* Review Description */}
        <p className="text-gray-700 leading-relaxed">
          {review.desc}
        </p>

        {/* Helpful Section */}
        <div className="flex items-center gap-4 text-sm text-gray-600 pt-2 border-t border-gray-200 mt-2">
          <span>Helpful?</span>
          <button className="flex items-center gap-1.5 hover:text-blue-600 transition-colors">
            <svg className="w-5 h-5 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.969 0-1.858-.6-2.233-1.483l-2.48-6.203A2 2 0 016.233 11H5V5h2.233a2 2 0 011.95 1.517l.483 1.45m4.334 2.533V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h8.263a2 2 0 001.95-1.517l3.5-7A2 2 0 0018.764 10H14z"></path>
            </svg>
            <span className="cursor-pointer">Yes</span>
          </button>
          <button className="flex items-center gap-1.5 hover:text-red-600 transition-colors">
            <svg className="w-5 h-5 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.737 3h4.017c.969 0 1.858.6 2.233 1.483l2.48 6.203A2 2 0 0117.767 13H19v6h-2.233a2 2 0 01-1.95-1.517l-.483-1.45m-4.334-2.533V19a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2h-8.263a2 2 0 00-1.95 1.517l-3.5 7A2 2 0 005.236 14H10z"></path>
            </svg>
            <span className="cursor-pointer">No</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Review;