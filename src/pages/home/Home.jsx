import React from 'react'
import Featured from '../../component/featured/Featured'
import TrustedBy from '../../component/trustedBy/TrustedBy'
import Slide from '../../component/slide/Slide'
import { cards, projects } from '../../data'
import CatCard from '../../component/catCard/catCard'
import ProjectCard from '../../component/projectCard/ProjectCard'

const Home = () => {
  return (
    <div className="home">
      <Featured />
      <TrustedBy />
      <Slide slidesToSlide={5} arrowsScroll={5}>
        {cards.map(card => (
          <CatCard item={card} key={card.id} />
        ))}
      </Slide>
      <div className="features bg-[#65967d] text-white flex justify-center py-16 sm:py-24">
  <div className="container mx-auto max-w-7xl flex flex-col lg:flex-row items-center gap-12 lg:gap-24 px-4 sm:px-6 lg:px-8">
    
    {/* LEFT COLUMN - TEXT CONTENT */}
    <div className="item flex-1 lg:w-2/5 flex flex-col gap-8">
      <h1 className='text-4xl md:text-4xl font-bold leading-tight'>A whole world of freelance talent at your fingertips</h1>
      
      {/* Feature Item 1 */}
      <div className="flex flex-col gap-2">
        <div className="title flex items-center gap-3 font-semibold text-lg">
          <img className='w-6 h-6' src="./img/check.png" alt="checkmark" />
          The best for every budget
        </div>
        <p className='text-white/80 font-light leading-relaxed pl-9'>
          Find high-quality services at every price point. No hourly rates, just project-based pricing.
        </p>
      </div>

      {/* Feature Item 2 */}
      <div className="flex flex-col gap-2">
        <div className="title flex items-center gap-3 font-semibold text-lg">
          <img className='w-6 h-6' src="./img/check.png" alt="checkmark" />
          Quality work done quickly
        </div>
        <p className='text-white/80 font-light leading-relaxed pl-9'>
          Find the right freelancer to begin working on your project within minutes.
        </p>
      </div>

      {/* Feature Item 3 */}
      <div className="flex flex-col gap-2">
        <div className="title flex items-center gap-3 font-semibold text-lg">
          <img className='w-6 h-6' src="./img/check.png" alt="checkmark" />
          Protected payments, every time
        </div>
        <p className='text-white/80 font-light leading-relaxed pl-9'>
          Always know what you'll pay upfront. Your payment isn't released until you approve the work.
        </p>
      </div>

      {/* Feature Item 4 */}
      <div className="flex flex-col gap-2">
        <div className="title flex items-center gap-3 font-semibold text-lg">
          <img className='w-6 h-6' src="./img/check.png" alt="checkmark" />
          24/7 support
        </div>
        <p className='text-white/80 font-light leading-relaxed pl-9'>
          Our support team is available around the clock to help you with any issues.
        </p>
      </div>
    </div>

    {/* RIGHT COLUMN - VIDEO */}
    <div className="item flex-1 lg:w-3/5">
      <video className='w-full rounded-lg shadow-2xl' src="./img/video.mp4" controls></video>
    </div>

  </div>
</div>

      <div className="features bg-[#0d084d] flex justify-center pt-24 pb-24 pl-0 pr-0">
        <div className="container flex w-7xl items-center gap-36">
          <div className="item flex flex-[2] flex-col gap-3.5">
            <h1 className='font-medium mb-2.5 text-3xl text-white'>Geniferr business</h1>
            <h1 className='font-medium mb-2.5 text-3xl text-white'>A business solution designed for teams</h1>
            <p className='text-[15px] font-light leading-7 tracking-[1px] text-white mb-5'>Upgrade to a curated experience packed with tools and benefits, dedicated to business</p>
            <div className="title flex items-center gap-2.5 text-[14px] text-white font-light">
              <img className='w-6 h-6' src="./img/check.png" alt="" />
              Connect to freelancers with proven business experience
            </div>
            <div className="title flex items-center gap-2.5 text-[14px] text-white font-light">
              <img className='w-6 h-6' src="./img/check.png" alt="" />
              Get matched with the perfect talent by a customer success manager
            </div>
            <div className="title flex items-center gap-2.5 text-[14px] text-white font-light">
              <img className='w-6 h-6' src="./img/check.png" alt="" />
              Manage teamwork and boost productivity with one powerful workspace
            </div>
            <button className='bg-[#1dbf73] text-white pt-2.5 pb-2.5 pl-5 pr-5 rounded-[5px] text-[16px] cursor-pointer mt-5 w-max border-none'>Explore Geniferr Business</button>
          </div>
          <div className="item flex flex-[3] flex-col gap-3.5">
            <img src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_870,dpr_1.0/v1/attachments/generic_asset/asset/2321104e0c585cceea525419551d3a7c-1721984733481/fiverr-pro.png" alt="" />
          </div>
        </div>
      </div>
      <Slide slidesToSlide={5} arrowsScroll={5}>
        {projects.map(card => (
          <ProjectCard item={card} key={card.id} />
        ))}
      </Slide>
    </div>
  )
}

export default Home