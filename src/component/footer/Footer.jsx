import React from 'react'

const Footer = () => {
  return (
    <div className='footer bg-gray-50 text-gray-600 py-16 px-4 sm:px-6 lg:px-8'>
  <div className="container mx-auto max-w-7xl">
    
    {/* TOP SECTION: LINKS */}
    <div className="top grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
      <div className="item flex flex-col gap-4">
        <h2 className='text-base font-bold text-gray-800'>Categories</h2>
        <span className='text-sm hover:underline cursor-pointer'>Graphics & Design</span>
        <span className='text-sm hover:underline cursor-pointer'>Digital Marketing</span>
        <span className='text-sm hover:underline cursor-pointer'>Writing & Translation</span>
        <span className='text-sm hover:underline cursor-pointer'>Video & Animation</span>
        <span className='text-sm hover:underline cursor-pointer'>Music & Audio</span>
        <span className='text-sm hover:underline cursor-pointer'>Programming & Tech</span>
        <span className='text-sm hover:underline cursor-pointer'>Data</span>
        <span className='text-sm hover:underline cursor-pointer'>Business</span>
        <span className='text-sm hover:underline cursor-pointer'>Lifestyle</span>
        <span className='text-sm hover:underline cursor-pointer'>Photography</span>
        <span className='text-sm hover:underline cursor-pointer'>Sitemap</span>
      </div>
      <div className="item flex flex-col gap-4">
        <h2 className='text-base font-bold text-gray-800'>About</h2>
        <span className='text-sm hover:underline cursor-pointer'>Press & News</span>
        <span className='text-sm hover:underline cursor-pointer'>Partnerships</span>
        <span className='text-sm hover:underline cursor-pointer'>Privacy Policy</span>
        <span className='text-sm hover:underline cursor-pointer'>Terms of Service</span>
        <span className='text-sm hover:underline cursor-pointer'>Intellectual Property Claims</span>
        <span className='text-sm hover:underline cursor-pointer'>Investor Relations</span>
      </div>
      <div className="item flex flex-col gap-4">
        <h2 className='text-base font-bold text-gray-800'>Support</h2>
        <span className='text-sm hover:underline cursor-pointer'>Help & Support</span>
        <span className='text-sm hover:underline cursor-pointer'>Trust & Safety</span>
        <span className='text-sm hover:underline cursor-pointer'>Selling on Geniferr</span>
        <span className='text-sm hover:underline cursor-pointer'>Buying on Geniferr</span>
      </div>
      <div className="item flex flex-col gap-4">
        <h2 className='text-base font-bold text-gray-800'>Community</h2>
        <span className='text-sm hover:underline cursor-pointer'>Community Hub</span>
        <span className='text-sm hover:underline cursor-pointer'>Forum</span>
        <span className='text-sm hover:underline cursor-pointer'>Events</span>
        <span className='text-sm hover:underline cursor-pointer'>Blog</span>
        <span className='text-sm hover:underline cursor-pointer'>Influencers</span>
        <span className='text-sm hover:underline cursor-pointer'>Affiliates</span>
        <span className='text-sm hover:underline cursor-pointer'>Podcast</span>
        <span className='text-sm hover:underline cursor-pointer'>Invite a Friend</span>
        <span className='text-sm hover:underline cursor-pointer'>Become a Seller</span>
      </div>
      <div className="item flex flex-col gap-4">
        <h2 className='text-base font-bold text-gray-800'>More From Geniferr</h2>
        <span className='text-sm hover:underline cursor-pointer'>Geniferr Business</span>
        <span className='text-sm hover:underline cursor-pointer'>Geniferr Pro</span>
        <span className='text-sm hover:underline cursor-pointer'>Geniferr Logo Maker</span>
        <span className='text-sm hover:underline cursor-pointer'>Geniferr Guides</span>
        <span className='text-sm hover:underline cursor-pointer'>Get Inspired</span>
        <span className='text-sm hover:underline cursor-pointer'>Learn</span>
      </div>
    </div>

    <hr className='my-10 border-t border-gray-200' />

    {/* BOTTOM SECTION: LOGO, COPYRIGHT, SOCIALS */}
    <div className="bottom flex flex-col-reverse md:flex-row md:items-center md:justify-between gap-8">
      <div className="left flex flex-col md:flex-row items-center gap-4">
        <h2 className='text-3xl font-bold text-gray-700'>Geniferr</h2>
        <span className='text-sm text-gray-500'>© Geniferr International Ltd. 2025</span>
      </div>
      <div className="right flex items-center justify-center flex-wrap gap-x-6 gap-y-4">
        <div className="social flex items-center gap-4">
          <img src="/img/twitter.png" alt="Twitter" className="w-6 h-6 cursor-pointer opacity-70 hover:opacity-100 transition-opacity" />
          <img src="/img/facebook.png" alt="Facebook" className="w-6 h-6 cursor-pointer opacity-70 hover:opacity-100 transition-opacity" />
          <img src="/img/linkedin.png" alt="LinkedIn" className="w-6 h-6 cursor-pointer opacity-70 hover:opacity-100 transition-opacity" />
          <img src="/img/pinterest.png" alt="Pinterest" className="w-6 h-6 cursor-pointer opacity-70 hover:opacity-100 transition-opacity" />
          <img src="/img/instagram.png" alt="Instagram" className="w-6 h-6 cursor-pointer opacity-70 hover:opacity-100 transition-opacity" />
        </div>
        <div className="link flex items-center gap-2 cursor-pointer hover:text-gray-900">
          <img src="/img/language.png" alt="Language" className="w-5 h-5" />
          <span className='text-sm font-medium'>English</span>
        </div>
        <div className="link flex items-center gap-2 cursor-pointer hover:text-gray-900">
          <img src="/img/coin.png" alt="Currency" className="w-5 h-5" />
          <span className='text-sm font-medium'>USD</span>
        </div>
        <img src="/img/accessibility.png" alt="Accessibility" className="w-7 h-7 cursor-pointer opacity-70 hover:opacity-100 transition-opacity" />
      </div>
    </div>
  </div>
</div>
  )
}

export default Footer