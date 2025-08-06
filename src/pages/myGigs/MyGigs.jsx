import React from "react";
import { Link } from "react-router-dom";
import getCurrentUser from "../../utils/getCurrentUser";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

function MyGigs() {
  const currentUser = getCurrentUser();

  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["myGigs"],
    queryFn: () =>
      newRequest.get(`/gigs?userId=${currentUser.id}`).then((res) => {
        return res.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.delete(`/gigs/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myGigs"]);
    },
  });

  const handleDelete = (id) => {
    mutation.mutate(id);
  };

  return (
    <div className="myGigs bg-gray-100 min-h-screen p-4 sm:p-6 lg:p-8">
      {isLoading ? (
        <div className="text-center text-gray-500 text-lg">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500 text-lg">Error loading gigs.</div>
      ) : (
        <div className="container max-w-7xl mx-auto bg-white rounded-xl shadow-md p-6 sm:p-8">
          <div className="title flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              My Gigs
            </h1>
            {currentUser.isSeller && (
              <Link to="/add">
                <button className="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg shadow cursor-pointer hover:bg-green-600 transition-colors duration-300">
                  Add New Gig
                </button>
              </Link>
            )}
          </div>

          {/* This wrapper makes the table scroll horizontally on small screens */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] table-auto">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sales</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map((gig) => (
                  <tr key={gig._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img className="image h-12 w-20 object-cover rounded-md" src={gig.cover} alt="Gig Cover" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{gig.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-700">${gig.price.toFixed(2)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{gig.sales}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img
                        className="delete h-6 w-6 cursor-pointer transform hover:scale-110 transition-transform"
                        src="./img/delete.png"
                        alt="Delete"
                        onClick={() => handleDelete(gig._id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyGigs;