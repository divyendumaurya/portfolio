import React from 'react';
import react11 from "../images/logos/react11.png";
import tailwind from "../images/logos/tailwind.png";
import bootstrap from "../images/logos/bootstrap.png";
import html from "../images/logos/html.png";
import css from "../images/logos/css.png";
import github from "../images/logos/github.png";
import javascript from "../images/logos/javascript.png";

const Exp = () => {
   
  const techs =[
    {
      id:1,
      src : html,
      title : "HTML",
      style : "shadow-orange-500"
    },
    {
      id:2,
      src : css,
      title : "CSS",
      style : "shadow-sky-400"
    },
    {
      id:3,
      src : javascript,
      title : "Javascript",
      style : "shadow-yellow-500"
    },
    {
      id:4,
      src : react11,
      title : "React Js",
      style : "shadow-blue-500"
    },
    {
      id:5,
      src : tailwind,
      title : "Tailwind Css",
      style : "shadow-cyan-300 items-center justify-center  "
    },
    {
      id:6,
      src : bootstrap,
      title : "Bootstrap",
      style : "shadow-violet-400"
    },
    {
      id:7,
      src : github,
      title : "Github",
      style : "shadow-gray-300"
    },
  ]


  return (

      <div name="experience" className=' pt-[100px] bg-gradient-to-b from-gray-800 to to-black w-full h-screen '>
        <div className='max-w-screen-lg  mx-auto p-4 flex flex-col justify-center w-full h-full text-zinc-50 '>

    <div>
        <p className='text-4xl font-bold border-b-4 border-gray-400 p-2 inline'>Experience</p>
        <p className='py-6'>Here are some technologies i have worked with</p>

        </div>

        <div className='w-full grid grid-cols-2 sm:grid-cols-3 gap-8 text-center py-8 px-15 sm:px-0'>

          {techs.map(({id,src,title,style}) =>(
            <div key={id} className={`shadow-md hover:scale-105 duration-500 py-3 rounded-lg ${style}`}>
                <img className=' w-20 mx-auto  ' src={src} alt="html5" />
                <p className='mt-4'>{title}</p>
            </div>
          ))}

            
        </div>
        </div>

      </div>
    
  )
}

export default Exp
