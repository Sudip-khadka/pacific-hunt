import React from 'react'
import Navbar from './Sections/Navbar'
import Home from './Sections/Home';
import PopularCategories from './Sections/PopularCategories';
import Jobs from './Sections/Jobs';
import Branding from './Sections/Branding';
import Companies from './Sections/Companies';
import AboutUs from './Sections/AboutUs';
import JoinUs from './Sections/JoinUs';
import Footer from './Sections/Footer';

function LandingPage() {
  return (
    <>
    <Navbar />
      <Home/>
      <PopularCategories/>
      <Jobs/>
      <Branding/>
      <Companies/>
      <AboutUs/>
      <JoinUs/>
      <Footer/>
    </>
  )
}

export default LandingPage
