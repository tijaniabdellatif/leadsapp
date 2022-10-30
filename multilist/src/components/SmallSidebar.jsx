import React from 'react'
import Wrapper from '../assets/wrappers/SmallSidebar';
import { FaTimes } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import ImageHandler from './ImageHandler';
import Logo from '../assets/images/multilist-logo.png';
import { useSelector,useDispatch } from 'react-redux';

const SmallSidebar = () => {
  return (
    <Wrapper>
      <div className='sidebar-container show-sidebar'>
        <div className="content">
          <button className="close-btn" onClick={() => console.log('yes')}>
            <FaTimes />
          </button>
          <header>
            <ImageHandler src={Logo} alt="logo" classes='logo' />
          </header>

          <div className="nav-links">
            navLinks
          </div>

        </div>
      </div>
    </Wrapper>
  )
}

export default SmallSidebar;
