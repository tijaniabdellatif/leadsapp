import React from 'react'
import logo from '../assets/images/multilist-logo.png';
import HeroImage from '../assets/images/hero.png';
import Wrapper from '../assets/wrappers/LandingPage';
import {ImageHandler} from '../components';
import {Link} from 'react-router-dom';


function Landing() {


  return (
    <Wrapper>
      <nav>
      <ImageHandler src={logo} alt='multilist-logo' classes='logo' />
      </nav>
      <div className='container page'>
        <div className='info'>
            <h1>
                Multilist <span>Employee</span> System
            </h1>

            <p> Multilist Employee system  it's an application to automate the 
                process of RH departement  
            </p>
            {localStorage.getItem('user') ?  <Link to='/' className='btn btn-hero'>Dashboard</Link> :  <Link to='/register' className='btn btn-hero'>Login/Register</Link> }
           
        </div>
        <ImageHandler src={HeroImage} alt='hero' classes='img main-img' />
      </div>

  
    </Wrapper>
  )
}



export default Landing;
