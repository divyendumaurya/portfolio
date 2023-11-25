import React from 'react';
import wiz from '../images/Banner/wiz.png'
import textutil from '../images/Banner/textutil.png'
import WizServices from '../images/Banner/WizServices.png'
import Netflix from '../images/Banner/Netflix.png'

const Portfolio = () => {

   

    const portfolios = [
        {
            id : 1,
            src : wiz,
            text : 'E-commerce website using React Js',
            href1 : 'https://wizecommerce.netlify.app/',
            href2 : 'https://github.com/divyendumaurya/wizecommerce.git'
            
        },
        {
            id : 2,
            src : textutil,
            text: 'Text Utility Website',
            href1 : 'https://texteditonline.netlify.app/',
            href2 : 'https://github.com/divyendumaurya/TextOnlineEdit.git'
        },
        {
            id : 3,
            src : WizServices,
            text: 'Responsive Food Services Website',
            href1 : 'https://github.com/divyendumaurya/WizServices.git',
            href2 : 'https://github.com/divyendumaurya/WizServices.git'
        },
        {
            id : 4,
            src : Netflix,
            text: 'Netflix Homepage ',
            href1 : 'https://github.com/divyendumaurya/NetFlix-HomePage-Clone.git',
            href2 : 'https://github.com/divyendumaurya/NetFlix-HomePage-Clone.git'
        }
    ]


        return (
            <div name="portfolio" className=' bg-gradient-to-b from-black to bg-gray-800 text-white md:h-screen  '>
            <div className=' max-w-screen-lg p-4 mx-auto flex flex-col justify-center w-full h-full '>
                <div className='pb-8'>
        <p className='text-4xl font-bold inline border-b-4 border-gray-400'>Portfolio</p>
        <p className='py-6 text-xl'>Check out some of my work here</p>

        </div>
        <div  className='grid sm:grid-cols-2 md:grid-cols-3 gap-8 px-12 sm:px-0 '>

       { portfolios.map(({id , src, href1, href2,  style,text})=>(
        <div key={id} className={`shadow-md  shadow-cyan-500  rounded-md  ${style}`}>
            <img className=' rounded-md duration-200 hover:scale-105 ' src={src} alt="" />
            <div className=' bg-gray-500 opacity-50 text-white   '>
                <p className=' items-center justify-center text-center  '>{text}</p>
            </div>
            <div className='flex items-center justify-center'>

                <a href={href1} target='_blank' className='px-8'>
                
                <button  className='w-1/2 px-3 py-3 m-3 duration-150 hover:scale-105 hover:text-cyan-300 '>Demo</button>
                </a>
                <a href={href2} target='_blank' className='px-8'>
                <button  className='w-1/2 px-3 py-3 m-3 duration-150 hover:scale-105 hover:text-cyan-300 '>Code</button></a>
            </div>
        </div>

))}
</div>
       
        
      </div>


    </div>
  )
}

export default Portfolio
