import { useState } from "react"
import React from 'react'
import { useNavigate } from "react-router-dom"

const Featured = () => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate(`/gigs?search=${input}`);
  };
  return (
    <div className="featured w-full bg-indigo-900 py-16 sm:py-24 text-white">
      <div className="container mx-auto max-w-7xl flex flex-col lg:flex-row items-center gap-12 px-4 sm:px-6 lg:px-8">

        {/* LEFT SIDE: TEXT CONTENT & SEARCH */}
        <div className="left flex flex-col gap-8 w-full text-center lg:text-left">
          <h1 className='text-4xl md:text-5xl font-bold leading-tight'>
            Our <i className='font-light'>freelancers</i> will take it from here
          </h1>

          {/* Search Bar */}
          <div className="search flex items-center bg-white rounded-md overflow-hidden w-full shadow-lg">
            <div className="searchInput flex-grow flex items-center gap-3">
              <img src="./img/search.png" alt="" className='w-5 h-5 ml-4 text-gray-400' />
              <input
                type="text"
                onChange={(e) => setInput(e.target.value)}
                placeholder='Search for any service...'
                className='w-full h-12 bg-transparent text-gray-800 placeholder:text-gray-500 focus:outline-none'
              />
            </div>
            <button className='bg-[#1dbf73] h-12 px-6 sm:px-8 font-bold text-white hover:bg-green-600 transition-colors duration-200 cursor-pointer' onClick={handleSubmit}>
              Search
            </button>
          </div>

          {/* Popular Tags */}
          <div className="popular flex items-center justify-center lg:justify-start flex-wrap gap-x-3 gap-y-2">
            <span className='font-medium'>Popular:</span>
            <button className='border border-white rounded-full px-4 py-1 text-sm hover:bg-white hover:text-[#013914] transition-colors cursor-pointer duration-200'>Website Development</button>
            <button className='border border-white rounded-full px-4 py-1 text-sm hover:bg-white hover:text-[#013914] transition-colors cursor-pointer duration-200'>Architecture</button>
            <button className='border border-white rounded-full px-4 py-1 text-sm hover:bg-white hover:text-[#013914] transition-colors cursor-pointer duration-200'>UGC Videos</button>
            <button className='border border-white rounded-full px-4 py-1 text-sm hover:bg-white hover:text-[#013914] transition-colors cursor-pointer duration-200'>Video Editing</button>
          </div>
        </div>

        {/* RIGHT SIDE: IMAGE */}
        <div className="right hidden lg:flex h-[500px] items-end">
          <img src="./img/man.png" alt="" className='h-full w-full object-contain' />
        </div>

      </div>
    </div>
  )
}

export default Featured