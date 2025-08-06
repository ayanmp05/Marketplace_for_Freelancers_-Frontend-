import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Link, useParams } from "react-router-dom";
import newRequest from "../../utils/newRequest";

const Message = () => {
  const { id } = useParams();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["messages"],
    queryFn: () =>
      newRequest.get(`/api/messages/${id}`).then((res) => {
        return res.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: (message) => {
      return newRequest.post(`/api/messages`, message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["messages"]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      conversationId: id,
      desc: e.target[0].value,
    });
    e.target[0].value = "";
  };

  return (
    <div className="message bg-gray-100 p-4 sm:p-6 lg:p-8 flex justify-center items-center min-h-screen">
      <div className="container mx-auto max-w-3xl h-[75vh] flex flex-col bg-white rounded-xl shadow-2xl overflow-hidden">

        {/* BREADCRUMBS / HEADER */}
        <div className="breadcrumbs p-4 text-sm text-gray-500 border-b border-gray-200 shrink-0">
          <Link to="/messages" className="text-blue-600 hover:underline">
            Messages
          </Link>
          <span className="mx-2">&gt;</span>
        </div>

        {isLoading ? (
          <div className="flex-grow flex items-center justify-center text-gray-500">Loading conversation...</div>
        ) : error ? (
          <div className="flex-grow flex items-center justify-center text-red-500">Error loading messages.</div>
        ) : (
          // MESSAGES AREA
          <div className="messages flex-grow p-4 sm:p-6 flex flex-col gap-5 overflow-y-auto">
            {data.map((m) => {
              const isOwner = m.userId === currentUser._id;
              return (
                <div
                  key={m._id}
                  className={`item flex items-end gap-3 max-w-xl ${isOwner ? "self-end" : "self-start"}`}
                >
                  {!isOwner && (
                    <img
                      className="w-8 h-8 rounded-full object-cover shrink-0"
                      src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
                      alt="User Avatar"
                    />
                  )}
                  <p
                    className={`rounded-2xl px-4 py-2 shadow-sm ${isOwner
                        ? "bg-blue-600 text-white rounded-br-none"
                        : "bg-gray-200 text-gray-800 rounded-bl-none"
                      }`}
                  >
                    {m.desc}
                  </p>
                  {isOwner && (
                    <img
                      className="w-8 h-8 rounded-full object-cover shrink-0"
                      src="https://images.pexels.com/photos/1115697/pexels-photo-1115697.jpeg?auto=compress&cs=tinysrgb&w=1600"
                      alt="My Avatar"
                    />
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* MESSAGE INPUT FORM */}
        <div className="write p-4 border-t border-gray-200 shrink-0">
          <form onSubmit={handleSubmit} className="flex items-center gap-4">
            <textarea
              rows="1"
              className="flex-grow bg-gray-100 rounded-full py-2 px-4 border-2 border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Write a message..."
            />
            <button
              type="submit"
              className="bg-blue-600 text-white font-semibold py-2 px-5 rounded-full hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Message;