import React, { useState } from 'react';
import { FaBars , FaTimes } from "react-icons/fa";
import { Link } from "react-scroll";


const Navbar = () => {

const [ nav , setNav] = useState();



  const links = [{
    id: 1,
    link : 'home',
  },
  {
    id: 2,
    link : 'about',
  },
  {
    id: 3,
    link : 'portfolio',
  },
  {
    id: 4,
    link : 'experience',
  },
  {
    id: 5,
    link : 'contact me',
  },
]
  
  return (
    <div className='flex justify-between w-full h-20 items-center bg-black fixed'>
      <div className='w-[200px] pt-[20px]  ml-[-20px] '>
      <figure>
        <img src="src\images\logo1.png" alt="image" />
      </figure>
      </div>

      <ul className=' hidden md:flex'>
      {links.map(({id , link })=>(
        <li 
        key ={id}
        className='px-4 text-gray-400 hover:scale-110 hover:text-gray-300 duration-300 capitalize  cursor-pointer  '>
      <Link className='active:text-blue-500' to={link} smooth duration={500}>{link} </Link>
    </li>
      ))}

    
      </ul>


      <div 
      onClick={()=> setNav(!nav)}
      className=' text-gray-400 cursor-pointer pr-4  z-10 md:hidden'>



   { nav ? <FaTimes size={30} /> : <FaBars size={30}/>}
      </div>

{nav && (
      <ul className='flex flex-col items-center justify-center w-full h-screen  top-0  left-0 bg-gradient-to-b from-black  to-gray-800  text-gray-400  absolute'>

    
        {links.map(({id , link })=>(
        <li 
        key ={id}
        className='px-4 py-6 cursor-pointer capitalize text-4xl '>
      <Link onClick={()=> setNav(!nav)} to={link} smooth duration={500}>{link} </Link>
    </li>
      ))}
      </ul>

)}



    </div>
  );
}

export default Navbar
