import React from 'react'

const CloudDesign1 = () => {
  return (
    <>
        <div className='fixed inset-0 z-[-1] overflow-hidden'>
           {/* Bottom Right Group */}
            <div>
            <div className='bg-gradient-to-br from-yellow-100 via-orange-200 to-orange-500 absolute rounded-[50%] h-64 w-64 -right-40 bottom-96'></div>
            <div className='bg-gradient-to-br from-yellow-100 via-orange-200 to-orange-500 absolute rounded-[50%] h-80 w-80 -right-36 bottom-48'></div>
            <div className='bg-gradient-to-bl from-orange-300 via-orange-400 to-orange-500 absolute rounded-[50%] h-80 w-80 -right-24 -bottom-20'></div>
            <div className='bg-gradient-to-br from-yellow-100 via-orange-200 to-orange-500 absolute rounded-[50%] h-96 w-96 -right-8 bottom-0'></div>
            <div className='bg-gradient-to-br from-yellow-100 via-orange-200 to-orange-500 absolute rounded-[50%] h-96 w-96 right-32 -bottom-48'></div>
            <div className='bg-gradient-to-br from-yellow-100 via-orange-200 to-orange-500 absolute rounded-[50%] h-64 w-64 right-96 -bottom-48'></div>
            </div>

        </div>
    </>
  )
}

export default CloudDesign1;