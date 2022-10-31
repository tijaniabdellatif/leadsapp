import React from 'react'
import Wrapper from '../assets/wrappers/BigSidebar';
import ImageHandler from './ImageHandler';
import Logo from '../assets/images/multilist-logo.png';
import { useSelector } from 'react-redux';
import NavLinks from './NavLinks';
const BigSidebar = () => {

  const {isSidebarOpen} = useSelector((store) => store.user);
  return (
    <Wrapper>
       <div className={
         isSidebarOpen 
          ? 'sidebar-container'
          : 'sidebar-container show-sidebar'
       }>

        <div className='content'>
          <header>
            <ImageHandler src={Logo} alt="logo" classes='logo-tinner-2' />
          </header>

          <NavLinks />
        </div>
       </div>
    </Wrapper>
  )
}

export default BigSidebar;
