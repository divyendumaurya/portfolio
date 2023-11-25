import React from 'react';
import { MdOutlineKeyboardArrowRight } from "react-icons/md"
import HeroImage from '../images/hero1.jpg';
import { Link } from 'react-scroll';


const Home = () => {
  return (
    <div  name='home' className=' h-screen w-full  bg-gradient-to-b from-black via-black to bg-gray-800 '>
        
<div className=' max-w-screen-lg h-full mx-auto flex flex-col justify-center items-center px-4 md:flex-row  '>
<div className='flex flex-col  justify-center h-full'>

  <h2 className='text-white text-4xl sm:text-7xl font-bold'>
    I'm a Front End Developer
  </h2>
  <p className=' text-gray-400 py-4 max-w-md '>I'm an aspiring Front End Developer with a passion for creating visually appealing and user-friendly webexperiences . I love to work on web applications using technologies like React , Javascript , Html , Css and other frameworks</p>

  <div>
  <Link to='portfolio' smooth duration={500} className='group text-white px-6  py-3 my-2  w-fit flex items-center rounded-md 
   bg-gradient-to-r from-cyan-400 to to-blue-500 cursor-pointer'>
  Portfolio
  <span className='group-hover:rotate-90 duration-300'>
    <MdOutlineKeyboardArrowRight size={22}/>
  </span>
  </Link>
  </div>
</div>
<div>
  <img className=' w-[500px] rounded-xl'  src={HeroImage} alt="pict" />
</div>
</div>


    </div>
  )
}

export default Home
