import React from 'react'
import Slide from '../../component/slide/Slide'
import { useParams } from 'react-router-dom';
import { useQuery } from "@tanstack/react-query"
import newRequest from '../../utils/newRequest';
import Reviews from '../../component/reviews/Reviews';
import { Link } from 'react-router-dom';

const Gig = () => {

  const { id } = useParams();

  const { isLoading, error, data } = useQuery({
    queryKey: ["gig"],
    queryFn: () => newRequest.get(`/gigs/single/${id}`)
      .then((res) => {
        return res.data;
      }),
  });
  const { isLoading: isLoadingUser, error: errorUser, data: dataUser } = useQuery({
    queryKey: ["user"],
    queryFn: () => newRequest.get(`/users/${data.userId}`)
      .then((res) => {
        return res.data;
      }),
  });



  return (
    <div className="gig flex justify-center">
      {isLoading ? "loading" : error ? "Something went wrong" : <div className="container w-[1400px] pt-7 pb-7 flex gap-12">
        <div className="left flex-2 flex flex-col gap-5 max-w-5xl">
          <span className="breadCrumbs font-light text-[13px] text-[#555]">GENIFERR &gt; </span>
          <h1 className='font-bold text-2xl'>{data.title}</h1>

          {isLoadingUser ? "loading" : error ? "Something went wrong" : (<div className="user flex items-center gap-2.5">
            <img className='w-8 h-8 rounded-[50%]' src={dataUser.img || "/img/noavatar.jpg"} alt="" />
            <span className='text-[15px] font-medium'>{dataUser.username}</span>
            {!isNaN(data.totalStars / data.starNumber) &&
              <div className="stars flex items-center gap-1.5">
                {Array(Math.round(data.totalStars / data.starNumber)).fill().map((item, i) => (
                  <img className='w-3.5 h-3.5' key={i} src="/img/star.png" alt="" />
                ))}
                <span className='text-[14px] font-semibold text-[#ffc108]'>
                  {Math.round(data.totalStars / data.starNumber)}
                </span>
              </div>}
          </div>)}
          <div className="box max-w-3xl">
            <Slide slidesToSlide={1} arrowsScroll={1} className='slider'>
              {data.images.map(img => (
                <img className='max-h-[500px] object-contain' src={img} key={img} alt="" />
              ))}
            </Slide>
          </div>
          <h2 className='font-normal'>About This Gig</h2>
          <p className='font-light text-[#555]'>
            {data.desc}
          </p>
          {isLoadingUser ? "loading" : error ? "Something went wrong" : (<div className="seller mt-12 flex flex-col gap-5">
            <h2>About The Seller</h2>
            <div className="user flex items-center gap-5">
              <img className='w-24 h-24 rounded-[50%] object-cover' src={dataUser.img || "/img/noavatar.jpg"} alt="" />
              <div className="info flex flex-col gap-2.5">
                <span>{dataUser.username}</span>
                {!isNaN(data.totalStars / data.starNumber) &&
                  <div className="stars flex items-center gap-1.5">
                    {Array(Math.round(data.totalStars / data.starNumber)).fill().map((item, i) => (
                      <img className='w-3.5 h-3.5' key={i} src="/img/star.png" alt="" />
                    ))}
                    <span className='text-[14px] font-semibold text-[#ffc108]'>
                      {Math.round(data.totalStars / data.starNumber)}
                    </span>
                  </div>}
                <button className='bg-white rounded-[5px] border border-gray-500 p-2 cursor-pointer'>Contact Me</button>
              </div>
            </div>
            <div className="box border border-gray-500 rounded-[5px] p-5 mt-5">
              <div className="items flex flex-wrap justify-between">
                <div className="item w-[300px] flex flex-col gap-2.5 mb-5">
                  <span className="title font-light">From</span>
                  <span className="desc">{dataUser.country}</span>
                </div>
                <div className="item w-[300px] flex flex-col gap-2.5 mb-5">
                  <span className="title font-light">Member since</span>
                  <span className="desc">Aug 2022</span>
                </div>
                <div className="item w-[300px] flex flex-col gap-2.5 mb-5">
                  <span className="title font-light">Avg. response time</span>
                  <span className="desc">4 hours</span>
                </div>
                <div className="item w-[300px] flex flex-col gap-2.5 mb-5">
                  <span className="title font-light">Last delivery</span>
                  <span className="desc">1 day</span>
                </div>
                <div className="item w-[300px] flex flex-col gap-2.5 mb-5">
                  <span className="title font-light">Languages</span>
                  <span className="desc">English</span>
                </div>
              </div>
              <hr className='h-0 border border-gray-500 mb-5' />
              <p className='font-light text-[#555]'>
                {dataUser.desc}
              </p>
            </div>
          </div>)}
          <Reviews gigId={id} />
        </div>
        <div className="flex flex-col h-max gap-6 rounded-xl border border-slate-200 bg-white p-8 shadow-lg min-w-[350px] sticky top-8">
          {/* --- Header: Title & Price --- */}
          <div className="flex items-start justify-between">
            <h3 className='text-xl font-bold text-slate-800'>{data.shortTitle}</h3>
            <h2 className='text-2xl font-semibold text-slate-900 whitespace-nowrap'>
              <span className='text-xl font-medium text-slate-500'>$</span> {data.price}
            </h2>
          </div>

          {/* --- Short Description --- */}
          <p className='text-slate-600'>
            {data.shortDesc}
          </p>

          {/* --- Delivery & Revisions --- */}
          <div className="flex items-center justify-between text-sm text-slate-700">
            <div className="flex items-center gap-2">
              <img className='w-5' src="/img/clock.png" alt="Delivery Time" />
              <span className="font-medium">{data.deliveryTime} Days</span>
            </div>
            <div className="flex items-center gap-2">
              <img className='w-5' src="/img/recycle.png" alt="Revisions" />
              <span className="font-medium">{data.revisionNumber} revisions</span>
            </div>
          </div>

          {/* --- Features List --- */}
          <div className="flex flex-col gap-3">
            {data.features.map((feature) => (
              <div className="flex items-center gap-3 text-slate-600" key={feature}>
                <img className='w-4 h-4' src="/img/greencheck.png" alt="Checkmark" />
                <span>{feature}</span>
              </div>
            ))}
          </div>

          {/* --- Call to Action Button --- */}
          <Link to={`/pay/${id}`}>
          <button className='w-full rounded-lg bg-[#1dbf73] px-6 py-3 text-lg font-semibold text-white transition-colors hover:bg-[#19a463] focus:outline-none focus:ring-2 focus:ring-[#1dbf73] focus:ring-offset-2 cursor-pointer'>
            Continue
          </button>
          </Link>
        </div>
      </div>}
    </div>
  )
}

export default Gig