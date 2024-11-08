import React from 'react'

const Home = () => {
  return (
    <div className='w-full'>

      {/* Up to 50% */}
      <div className='flex justify-center'>
        <div className='md: grid grid-cols-[auto,1fr] p-[84px] w-[1440px]'>
          <div className='md: mr-8'>
            <h1 className='md:text-7xl font-bold'>Up to 50% Off</h1>
            <h1 className='md:text-7xl font-bold'>Sitewide</h1>
            <p className='md:text-xl py-8'>Start Your Holiday Decor & Gifting Now</p>
            <button className='md:px-12 py-3 bg-black text-white'>Shop now</button>
          </div>
          <div>
            <img
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              alt=""
              className='md:object-cover h-[463px] w-full' />
          </div>
        </div>
      </div>

    </div>
  )
}

export default Home