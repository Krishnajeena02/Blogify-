import React from 'react'
import Navbar from '../components/Navbar.jsx'
import Header from '../components/Header.jsx'
import BlogList from '../components/Bloglist.jsx'
import Newsletter from '../components/Newsletter.jsx'
import Footer from '../components/Footer.jsx'

const Home = () => {
  return (
    <div className=''>
    <Navbar/>
    <Header/>
    <BlogList/>
    <Newsletter/>
    <Footer/>
    </div>
  )
}

export default Home