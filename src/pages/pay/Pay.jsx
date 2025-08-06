import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import newRequest from "../../utils/newRequest";
import { useParams } from "react-router-dom";
import CheckoutForm from "../../component/checkoutForm/CheckoutForm"

const stripePromise = loadStripe("pk_test_51Rt13VBtysJ4uha2KjHPeJnULUrjt92QXpHkAzbVymOnbwhzZxOVec3oW3poLtgNMe2l5RfdrX0vAnCN6V5wCwno00kgfUEPMf");

const Pay = () => {
  const [clientSecret, setClientSecret] = useState("");

  const { id } = useParams();

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await newRequest.post(
          `/api/orders/create-payment-intent/${id}`
        );
        setClientSecret(res.data.clientSecret);
      } catch (err) {
        console.log(err);
      }
    };
    makeRequest();
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return <div className="pay">
    {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
  </div>;
};

export default Pay;