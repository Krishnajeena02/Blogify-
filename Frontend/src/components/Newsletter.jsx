import React from 'react'

const Newsletter = () => {
  return (
    <div className='flex flex-col justify-center text-center space-y-2 items-center my-32'>
        <h1 className='text-2xl md:text-4xl font-semibold'>
        Never Miss a Blog!
        </h1>
        <p className='md:text-lg text-gray-500/70  pb-8'>
            Subscribe to our newsletter to get the latest updates.
        </p>
<form className="flex flex-col sm:flex-row items-center justify-center w-full max-w-2xl gap-2">
  <input
    type="email"
    placeholder="Enter your email"
    className="flex-1 border border-gray-300 rounded-md px-3 py-2 outline-none text-gray-500"
  />
  <button className="px-6  sm:px-12 py-2 text-white bg-black hover:bg-black/80 transition-all rounded-md">
    Subscribe
  </button>
</form>
    </div>
  )
}

export default Newsletter