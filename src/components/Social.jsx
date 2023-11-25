import React from 'react';
import { FaLinkedin , FaGithub } from "react-icons/fa"
import { HiOutlineMail } from "react-icons/hi"
import { BsPersonLinesFill } from "react-icons/bs"

const Social = () => {

  const links = [
    {
      id : 1,
      child : (
        <>
            GitHub  <FaGithub size={30}/> 
            </>
      ),
      href : 'https://github.com/divyendumaurya',
      style: 'rounded-tr-md'
    },
    {
      id : 2,
      child : (
        <>
            LinkedIn  <FaLinkedin size={30}/> 
            </>
      ),
      href : 'https://www.linkedin.com/in/divyendu-m/',
      
    },

    {
      id : 3,
      child : (
        <>
            Mail Me  <HiOutlineMail size={30}/> 
            </>
      ),
      href : 'mailto:divyendumaurya@gmail.com',
      
    },

    {
      id : 4,
      child : (
        <>
            Resume  <BsPersonLinesFill size={30}/> 
            </>
      ),
      href : '/resume.pdf',
      download : true,
      style: 'rounded-br-md'
    }
  ]


  return (


    <div className='hidden lg:flex flex-col left-0 fixed top-[30%]'>
      <ul>

        {links.map(({id , child , href , download ,style})=>(<li key={id} className={'flex justify-between items-center w-40 h-14 px-4  bg-gray-400  ml-[-100px] hover:ml-[-5px] hover:rounded-md duration-300' + " " + style}>
          <a href={href} className='flex  justify-between items-center w-full text-white' 
          download={download}
          target='_blank'>

            {child}
          </a>
        </li>

        ))}

       
        
      </ul>
    </div>
  )
}

export default Social
