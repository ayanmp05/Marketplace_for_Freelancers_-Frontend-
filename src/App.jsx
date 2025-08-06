import { useState } from 'react';
import Navbar from './component/navbar/Navbar';
import Home from './pages/home/Home';
import Footer from './component/footer/Footer';
import Gigs from './pages/gigs/Gigs';
import MyGigs from './pages/myGigs/MyGigs';
import Orders from './pages/orders/Orders';
import Messages from './pages/messages/Messages';
import Message from './pages/message/Message';
import Add from './pages/add/Add';
import Gig from './pages/gig/Gig';
import { createBrowserRouter, RouterProvider, Outlet, } from "react-router-dom";
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import { QueryClient, QueryClientProvider, useQuery, } from '@tanstack/react-query'
import Pay from './pages/pay/pay';
import Success from './pages/success/Success';


function App() {

  const queryClient = new QueryClient()

  const Layout = () => {
    return (
      <div className="app">
        <QueryClientProvider client={queryClient}>
          <Navbar />
          <Outlet />
          <Footer />
        </QueryClientProvider>
      </div>
    )
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: "/gigs",
          element: <Gigs />
        },
        {
          path: "/mygigs",
          element: <MyGigs />
        },
        {
          path: "/orders",
          element: <Orders />
        },
        {
          path: "messages",
          element: <Messages />
        },
        {
          path: "/message/:id",
          element: <Message />
        },
        {
          path: "/add",
          element: <Add />
        },
        {
          path: "/gig/:id",
          element: <Gig />
        },
        {
          path: "/login",
          element: <Login />
        },
        {
          path: "/register",
          element: <Register />
        },
        {
          path: "/pay/:id",
          element: <Pay />
        },
        {
          path: "/success",
          element: <Success />
        },
      ],
    },
  ]);

  const [count, setCount] = useState(0)

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
