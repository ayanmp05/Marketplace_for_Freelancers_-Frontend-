import React from 'react'
import { Link } from 'react-router-dom'

const ProjectCard = ({item}) => {
  return (
    <Link to='/' className='link'>
    <div className='projectCard w-72 h-72 rounded-[5px] cursor-pointer overflow-hidden'>
      <img className='w-full h-[70%] object-cover' src={item.img} alt="" />
      <div className="info flex items-center gap-5 p-3.5">
        <img className='w-10 h-10 rounded-[50%] object-cover' src={item.pp} alt="" />
        <div className="texts text-[14px] font-medium">
          <h2>{item.cat}</h2>
          <span className='text-[14px] '>{item.username}</span>
        </div>
      </div>
    </div>
    </Link>
  )
}

export default ProjectCard