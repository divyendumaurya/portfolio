import React from 'react'

const About = () => {
  return (
    <div name="about" className=' w-full h-screen  bg-gradient-to-b from-gray-800 to bg-black text-white'>
        <div className=' max-w-screen-lg mx-auto p-4 flex flex-col  justify-center w-full h-full'>
            <div className='pb-8'>
                <p className='text-4xl font-bold inline border-b-4 border-gray-400'>
                    About me 
                </p>

            </div>
            <p className='text-xl mt-20'>Hello there! I'm Divyendu, a front-end developer who graduated from Galgotias University with a passion for turning ideas into interactive and visually appealing digital experiences.I've honed my skills in front-end development and design. I find joy in crafting seamless user interfaces that not only look great but also enhance the overall user experience.</p>

            <br />
            <p className='text-xl '>
            At the core of my work is a love for programming and cutting-edge technologies. From creating responsive websites to implementing intuitive user interfaces, I thrive on the dynamic nature of front-end development. My goal is to blend creativity with functionality, bringing ideas to life in the digital realm.
            </p>
        </div>
    </div>
  )
}

export default About
