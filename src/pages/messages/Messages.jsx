import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import moment from "moment";

const Messages = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["conversations"],
    queryFn: () =>
      newRequest.get(`/conversations`).then((res) => {
        return res.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.put(`/conversations/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["conversations"]);
    },
  });

  const handleRead = (id) => {
    mutation.mutate(id);
  };

  return (
    <div className="messages bg-gray-100 min-h-screen p-4 sm:p-6 lg:p-8">
  {isLoading ? (
    <div className="text-center text-gray-500 text-xl">Loading messages...</div>
  ) : error ? (
    <div className="text-center text-red-500 bg-red-100 p-4 rounded-lg">
      Error: Could not fetch messages. Please try again.
    </div>
  ) : (
    <div className="container mx-auto max-w-5xl bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-6 sm:p-8 border-b border-gray-200">
        <div className="title">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Messages</h1>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm sm:text-base">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4 text-sm font-semibold text-gray-600 uppercase tracking-wider">
                {currentUser.isSeller ? "Buyer" : "Seller"}
              </th>
              <th className="p-4 text-sm font-semibold text-gray-600 uppercase tracking-wider">
                Last Message
              </th>
              <th className="p-4 text-sm font-semibold text-gray-600 uppercase tracking-wider">
                Date
              </th>
              <th className="p-4 text-sm font-semibold text-gray-600 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map((c) => {
              // This logic determines if a message is unread for the current user
              const isUnread =
                (currentUser.isSeller && !c.readBySeller) ||
                (!currentUser.isSeller && !c.readByBuyer);

              return (
                <tr
                  key={c.id}
                  // Apply a different background and font weight if the message is unread
                  className={`${
                    isUnread
                      ? "bg-blue-50 font-semibold text-gray-900"
                      : "text-gray-700"
                  } hover:bg-gray-100 transition-colors duration-200`}
                >
                  <td className="p-4 align-middle whitespace-nowrap">
                    {currentUser.isSeller ? c.buyerId : c.sellerId}
                  </td>
                  <td className="p-4 align-middle max-w-sm">
                    <Link
                      to={`/message/${c.id}`}
                      className="hover:underline"
                    >
                      <p className="truncate">
                        {c?.lastMessage || "No message yet."}
                      </p>
                    </Link>
                  </td>
                  <td className="p-4 align-middle text-gray-500 whitespace-nowrap">
                    {moment(c.updatedAt).fromNow()}
                  </td>
                  <td className="p-4 align-middle whitespace-nowrap">
                    {isUnread && (
                      <button
                        onClick={() => handleRead(c.id)}
                        className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold hover:bg-green-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 cursor-pointer">Mark as Read</button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  )}
</div>
  );
};

export default Messages;