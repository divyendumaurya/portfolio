import React from 'react'

const Contact = () => {
  return (
    <div name="contact me" className='w-full h-screen  bg-gradient-to-b from-black to bg-gray-800  text-white '>
      <div className='flex flex-col p-4 justify-center max-w-screen-lg mx-auto h-full'>
        <div className='pb-8'>
            <p className=' text-4xl font-bold inline border-b-4 border-gray-400'>Contact Me</p>
            <p className='text-xl mt-10'>Submit the form below to get in touch!</p>
        </div>
        <div className=' flex justify-center items-center'>

            <form className=' flex flex-col w-full md:w-1/2 ' action="https://getform.io/f/0f786bea-bb83-4ded-a781-58be38caedd9" method="POST"
            >
                <input 
                type="text"
                name='name'
                placeholder='Enter your name'
                className='p-2 bg-transparent border-2 rounded-lg text-white focus:outline-none' />
                <input 
                type="email"
                name='email'
                placeholder='Enter your email'
                className='my-5 p-2 bg-transparent border-2 rounded-lg text-white focus:outline-none' />
                <textarea className='p-2 bg-transparent border-2 rounded-lg text-white focus:outline-none' name="share your thoughts"  rows="10" ></textarea>

                <button className='text-white bg-gradient-to-b from  from-cyan-400 to to-blue-500 px-6 py-3 my-8 mx-auto flex items-center rounded-md hover:scale-110 duration-300 '>Let's talk</button>
            </form>
        </div>
      </div>
    </div>
  )
}

export default Contact
