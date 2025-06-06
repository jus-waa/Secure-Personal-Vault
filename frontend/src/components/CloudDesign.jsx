import React from 'react'

const CloudDesign = () => {
  return (
    <>
        <div className='fixed h-screen w-screen '>
            <div>
                {/* Bottom Left Group */}
                <div className='bg-gradient-to-bl from-yellow-100 via-orange-200 to-orange-500 absolute rounded-[50%] h-64 w-64 -left-40  bottom-96'></div>
                <div className='bg-gradient-to-bl from-yellow-100 via-orange-200 to-orange-500 absolute rounded-[50%] h-80 w-80 -left-36 bottom-48'></div>
                <div className='bg-gradient-to-br from-orange-300 via-orange-400 to-orange-500 absolute rounded-[50%] h-80 w-80 -left-24 -bottom-20'></div>
                <div className='bg-gradient-to-bl from-yellow-100 via-orange-200 to-orange-500 absolute rounded-[50%] h-96 w-96 -left-8 bottom-0'></div>
                <div className='bg-gradient-to-bl from-yellow-100 via-orange-200 to-orange-500 absolute rounded-[50%] h-96 w-96 left-32 -bottom-48'></div>
                <div className='bg-gradient-to-bl from-yellow-100 via-orange-200 to-orange-500 absolute rounded-[50%] h-64 w-64 left-96 -bottom-48'></div>

                {/* Top Right Group */}
                <div>
                  <div className='bg-gradient-to-tr from-yellow-100 via-orange-200 to-orange-500 absolute rounded-[50%] h-64 w-64 -right-40 top-96'></div>
                  <div className='bg-gradient-to-tr from-yellow-100 via-orange-200 to-orange-500 absolute rounded-[50%] h-80 w-80 -right-36 top-48'></div>
                  <div className='bg-gradient-to-tl from-orange-300 via-orange-400 to-orange-500 absolute rounded-[50%] h-80 w-80 -right-24 -top-20'></div>
                  <div className='bg-gradient-to-tr from-yellow-100 via-orange-200 to-orange-500 absolute rounded-[50%] h-96 w-96 -right-8 top-0'></div>
                  <div className='bg-gradient-to-tr from-yellow-100 via-orange-200 to-orange-500 absolute rounded-[50%] h-96 w-96 right-32 -top-48'></div>
                  <div className='bg-gradient-to-tr from-yellow-100 via-orange-200 to-orange-500 absolute rounded-[50%] h-64 w-64 right-96 -top-48'></div>
                </div>
            </div>
        </div>
    </>
  )
}

export default CloudDesign;