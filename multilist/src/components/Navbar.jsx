import React,{useState,useEffect} from 'react';
import Wrapper from '../assets/wrappers/Navbar';
import {FaAlignLeft,FaUserCircle,FaCaretDown} from "react-icons/fa";
import { useDispatch,useSelector } from 'react-redux';
import  ImageHandler  from './ImageHandler';
import Logo from "../assets/images/multilist-logo.png";
import { logoutUser, toggleSidebar,logginOut } from '../features/user/userSlice';

const Navbar = () => {

  const {user} = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [showLogout,setShowLogout] = useState(false);

  const toggle = () => {

     dispatch(toggleSidebar());
  }

  return (
    <Wrapper>
    <div className='nav-center'>
      <button type='button' className='toggle-btn' onClick={toggle}>
        <FaAlignLeft />
      </button>
      <div>
        <ImageHandler src={Logo} alt="logo" classes="logo" />
        <h3 className='logo-text'>dashboard</h3>
      </div>
      <div className='btn-container'>
        <button
          type='button'
          className='btn btn-block'
          onClick={() => setShowLogout(!showLogout)}>
          <FaUserCircle />
          {user?.fullname}
          <FaCaretDown />
        </button>
        <div className={showLogout ? 'dropdown show-dropdown':'dropdown'}>
          <button
            type='button'
            className='dropdown-btn'
            onClick={() => dispatch(logginOut())}
          >
            Logout
          </button>

          
        </div>
      </div>
    </div>
  </Wrapper>
  )
}

export default Navbar
