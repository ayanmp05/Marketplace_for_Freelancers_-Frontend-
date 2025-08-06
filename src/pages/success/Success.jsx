import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";

const Success = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(search);
  const payment_intent = params.get("payment_intent");

  useEffect(() => {
    const makeRequest = async () => {
      try {
        await newRequest.put("/api/orders", { payment_intent });
        setTimeout(() => {
          navigate("/orders");
        }, 5000);
      } catch (err) {
        console.log(err);
      }
    };

    makeRequest();
  }, []);

  return (
    <div class="flex items-center justify-center min-h-screen bg-gray-100 p-4">

      <div class="w-full max-w-md p-8 text-center bg-white rounded-lg shadow-md">

        <div class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
          <svg class="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h2 class="text-2xl font-bold text-gray-800 mb-2">
          Payment Successful
        </h2>

        <p class="text-gray-600">
          You are being redirected to the orders page. Please do not close this window.
        </p>

        <div class="mt-8 mx-auto w-8 h-8 border-4 border-gray-200 border-t-indigo-600 rounded-full animate-spin"></div>

      </div>
    </div>
  );
};

export default Success;