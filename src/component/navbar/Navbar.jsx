import React from 'react'
import { useState, useEffect } from 'react'
import "./Navbar.css"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import newRequest from '../../utils/newRequest'

const Navbar = () => {

  const [active, setActive] = useState(false)
  const [open, setOpen] = useState(false)

  const { pathname } = useLocation()

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false)
  }
  useEffect(() => {
    window.addEventListener("scroll", isActive);

    return () => {
      window.removeEventListener("scroll", isActive);
    }
  }, []);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await newRequest.post("/auth/logout");
      localStorage.setItem("currentUser", null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={active || pathname !== "/" ? "navbar active" : "navbar"}>
      <div className="container  flex justify-between pt-5 pb-5">
        <div className="logo text-3xl font-bold">
          <Link to='/'>
            <span className='text'>Geniferr</span>
          </Link>
          <span className='dot text-green-500'>.</span>
        </div>
        <div className="links flex gap-5 items-center font-medium">
          <span>Geniferr Business</span>
          <span>Explore</span>
          <span>English</span>
          {!currentUser && <Link to="/login">Sign in</Link>}
          {!currentUser?.isSeller && <span>Become a Seller</span>}
          {!currentUser && <Link to="/register"><button className='pl-4 pr-4 pt-2 pb-2 rounded border-2 border-gray-600 cursor-pointer bg-transparent hover:bg-gray-600 hover:border-gray-600 hover:text-white'>Join</button></Link>}
          {currentUser && (
            <div className="user flex items-center gap-2.5 cursor-pointer relative" onClick={() => setOpen(!open)}>
              <img className='w-8 h-8 rounded-[50%] object-cover' src="https://w7.pngwing.com/pngs/184/113/png-transparent-user-profile-computer-icons-profile-heroes-black-silhouette-thumbnail.png" alt="" />
              <span>{currentUser?.username}</span>
              {open && (
                // Main dropdown container
                <div className="absolute top-14 right-0 z-10 w-56 bg-white rounded-lg border border-gray-200 shadow-xl p-2">

                  {currentUser?.isSeller && (
                    <>
                      <Link
                        to='/mygigs'
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 rounded-md hover:bg-gray-100 transition-colors duration-150"
                      >
                        Gigs
                      </Link>
                      <Link
                        to='/add'
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 rounded-md hover:bg-gray-100 transition-colors duration-150"
                      >
                        Add New Gig
                      </Link>
                    </>
                  )}

                  <Link
                    to='/orders'
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 rounded-md hover:bg-gray-100 transition-colors duration-150"
                  >
                    Orders
                  </Link>
                  <Link
                    to='/messages'
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 rounded-md hover:bg-gray-100 transition-colors duration-150"
                  >
                    Messages
                  </Link>

                  {/* A separator line for better visual structure */}
                  <div className="border-t border-gray-100 my-1"></div>

                  {/* The logout button with all classes applied inline */}
                  <span
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm rounded-md transition-colors duration-150 cursor-pointer !text-red-600 hover:!bg-red-50"
                  >
                    Log Out
                  </span>

                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {(active || pathname !== "/") && (
        <> <hr className='w-full h-0 border-[0.5] text-gray-400' />
          <div className="menu pt-1 pb-1 flex gap-5 font-medium text-gray-500">
            <Link to='/'>Trending 🔥</Link>
            <Link to='/'>Graphics & Design</Link>
            <Link to='/'>Writing & Translation</Link>
            <Link to='/'>AI Services</Link>
            <Link to='/'>Digital Marketing</Link>
            <Link to='/'>Music & Audio</Link>
            <Link to='/'>Programming & Tech</Link>
            <Link to='/'>Business</Link>
            <Link to='/'>Lifestyle</Link>

          </div>
          <hr className='w-full h-0 border-[0.5] text-gray-400' />
        </>
      )}
    </div>
  )
}

export default Navbar