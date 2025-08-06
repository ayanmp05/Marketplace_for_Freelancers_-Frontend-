import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

const Orders = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const navigate = useNavigate();
  const { isLoading, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: () =>
      newRequest.get(`/api/orders`).then((res) => {
        return res.data;
      }),
  });

  const handleContact = async (order) => {
    const sellerId = order.sellerId;
    const buyerId = order.buyerId;
    const id = sellerId + buyerId;

    try {
      const res = await newRequest.get(`/api/conversations/single/${id}`);
      navigate(`/message/${res.data.id}`);
    } catch (err) {
      if (err.response.status === 404) {
        const res = await newRequest.post(`/api/conversations/`, {
          to: currentUser.seller ? buyerId : sellerId,
        });
        navigate(`/message/${res.data.id}`);
      }
    }
  };
  return (
    <div className="orders bg-gray-100 min-h-screen p-4 sm:p-6 lg:p-8">
  {isLoading ? (
    <div className="text-center text-gray-500 text-xl">Loading your orders...</div>
  ) : error ? (
    <div className="text-center text-red-500 bg-red-100 p-4 rounded-lg">
      Error: Could not fetch your orders. Please try again later.
    </div>
  ) : (
    <div className="container mx-auto max-w-5xl bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-6 sm:p-8">
        <div className="title mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Your Orders</h1>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b-2 border-gray-200">
              <tr>
                <th className="p-4 text-sm font-semibold text-gray-600 uppercase tracking-wider">Image</th>
                <th className="p-4 text-sm font-semibold text-gray-600 uppercase tracking-wider">Title</th>
                <th className="p-4 text-sm font-semibold text-gray-600 uppercase tracking-wider">Price</th>
                <th className="p-4 text-sm font-semibold text-gray-600 uppercase tracking-wider text-center">Contact</th>
              </tr>
            </thead>
            <tbody>
              {data.map((order) => (
                <tr key={order._id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200">
                  <td className="p-4 align-middle">
                    <img
                      className="image h-16 w-16 object-cover rounded-md shadow-sm"
                      src={order.img || 'https://via.placeholder.com/150'} // Fallback image
                      alt={order.title}
                    />
                  </td>
                  <td className="p-4 align-middle font-medium text-gray-800">
                    {order.title}
                  </td>
                  <td className="p-4 align-middle text-gray-600">
                    ${order.price.toFixed(2)}
                  </td>
                  <td className="p-4 align-middle text-center">
                    <button
                      onClick={() => handleContact(order)}
                      className="p-2 cursor-pointer rounded-full hover:bg-blue-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                      aria-label="Contact seller"
                    >
                      <img
                        className="message h-6 w-6"
                        src="./img/message.png"
                        alt="Contact"
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )}
</div>
  );
};

export default Orders;