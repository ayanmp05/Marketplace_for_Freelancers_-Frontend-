import React from 'react'
import { Link } from 'react-router-dom'

const CatCard = ({item}) => {
  return (
    <Link to='/gigs'>
    <div className='catCard w-64 h-80 text-white rounded-md cursor-pointer relative overflow-hidden'>
      <img className='w-full h-full object-cover' src={item.img} alt="" />
      <span className='desc absolute font-light top-3.5 left-3.5 '>{item.desc}</span>
      <span className='title absolute font-medium text-2xl left-3.5 top-10'>{item.title}</span>
    </div>
    </Link>
  )
}

export default CatCard