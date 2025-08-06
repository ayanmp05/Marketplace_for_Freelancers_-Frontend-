import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // 1. This useEffect hook handles the redirect back from Stripe.
  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return; // If no client secret, do nothing (we're in the initial state)
    }

    // Retrieve the PaymentIntent status
    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded! 🎉");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  // 2. This function handles the initial form submission.
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);
    setMessage(null); // Clear any previous messages

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // IMPORTANT: Change this URL to the page that contains this form
        return_url: `${window.location.origin}${window.location.pathname}`,
      },
    });

    // This code only runs if there's an immediate client-side error.
    if (error) { // <-- CRITICAL FIX is here
      if (error.type === "card_error" || error.type === "validation_error") {
        setMessage(error.message);
      } else {
        setMessage("An unexpected error has occurred.");
      }
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  // 3. Render the status message OR the payment form.
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">

        {/* The main card for the form or the message */}
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
          {message ? (
            // --- Status Message ---
            // Displayed after the payment attempt
            <div id="payment-message" className="text-center text-gray-700">
              {/* You can add icons or specific color classes here based on message type (e.g., text-green-600 for success) */}
              <p className="text-lg font-medium">{message}</p>
            </div>
          ) : (
            // --- Payment Form ---
            // Shown initially to the user
            <form id="payment-form" onSubmit={handleSubmit} className="space-y-6">

              {/* Optional: Add a title for clarity */}
              <h2 className="text-2xl font-bold text-center text-gray-800">
                Complete your payment
              </h2>

              {/* Stripe Link Authentication Element */}
              <LinkAuthenticationElement
                id="link-authentication-element"
                // Stripe Elements are largely styled via JS options, but Tailwind can handle the container
                className="w-full"
                onChange={(e) => setEmail(e.target.value)}
              />

              {/* Stripe Payment Element (Card, etc.) */}
              <PaymentElement
                id="payment-element"
                options={paymentElementOptions}
                className="w-full"
              />

              {/* Submit Button */}
              <button
                disabled={isLoading || !stripe || !elements}
                id="submit"
                // --- Tailwind CSS Classes for the Button ---
                className="w-full flex justify-center items-center px-4 py-3 font-semibold text-white bg-indigo-600 rounded-md shadow-sm
                     hover:bg-indigo-700 
                     focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                     disabled:opacity-50 disabled:cursor-not-allowed
                     transition-colors duration-200"
              >
                <span id="button-text" className="text-lg">
                  {isLoading ? (
                    // --- Spinner for Loading State ---
                    <div
                      className="w-5 h-5 border-4 border-solid border-white border-t-transparent rounded-full animate-spin"
                      id="spinner"
                    ></div>
                  ) : (
                    "Pay now"
                  )}
                </span>
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default CheckoutForm;