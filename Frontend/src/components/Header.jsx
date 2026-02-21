import React from 'react'
import { useRef } from 'react'
import { assets } from '../assets/assets.js'
import { useAppContext } from '../context/appContext.jsx'

const Header = () => {

  const {setInput,input} = useAppContext()
  const inputRef = useRef()
  const onSubmitHandler = async(e)=>{
    e.preventDefault();
    setInput(inputRef.current.value)
  }
  const onClear = ()=>{
    setInput('');
    inputRef.current.value = ''
  }
  return (
    <div className="mx-8 sm:mx-24 lg:mx-24 relative">

      {/* Background gradient (behind content) */}
      <img
        src={assets.gradientBackground}
        alt=""
        className="absolute inset-0 -z-10 opacity-50 pointer-events-none"
      />

      <div className="text-center mt-20 mb-8">
        
        <div className="inline-flex items-center justify-center gap-4 rounded-full px-6 py-1.5 mb-4
                        border-1 border-dashed border-black/20 bg-black/5   text-md">
          <p className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-blue-600 to-purple-500 ">New: AI integrated feature</p>
          <img src={assets.star_icon} alt="star"  />
        </div>

        <h1 className="text-3xl shadow-xl shadow-indigo-600/15 sm:text-6xl font-semibold sm:leading-[4rem] bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-blue-600 to-purple-500 ">
          Your Own <span className="text-black">Blogging</span>
          <br />
          Platform
        </h1>

        <p className="my-6 sm:my-8 max-w-2xl mx-auto max-sm:text-xs text-gray-500">
          Create, share, and connect with a community of passionate writers and readers.
        </p>

        {/* Search Form */}
        <form onSubmit={onSubmitHandler} className="flex justify-between max-w-lg mx-auto
                         border border-dashed border-black/20 bg-white rounded-md">
          <input ref={inputRef}
            type="text"
            placeholder="Search for blogs..."
            className="w-full px-4 py-2 outline-none"
          />

          <button
            type="submit"
            className="bg-black hover:bg-indigo-700
                       hover:scale-95 transition-all
                       text-white px-8 py-2 m-1.5 rounded-md cursor-pointer"
          >
            Search
          </button>
        </form>

      </div>
      <div className='text-center'>
       {input &&  <button onClick={onClear} className='border font-light text-xs py-1 px-3 rounded-sm cursor-pointer'>clear search</button>
}
      </div>
    </div>
  )
}

export default Header
