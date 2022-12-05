import {ImStatsBars2} from 'react-icons/im';
import {SiGoogleadsense} from 'react-icons/si';
import {AiOutlineAppstoreAdd} from 'react-icons/ai';
import {CgProfile} from 'react-icons/cg';
import {TbLayoutDashboard} from 'react-icons/tb';
import { getUserFromLocalStorage } from './storage';
import customFetch from './axios';

export const dataLinks = [

      {
        id:1,
        text:"Stats",
        url:'/',
        icon:<ImStatsBars2 />
      },
      {
        id:2,
        text:"All leads",
        url:'/all-leads',
        icon: <SiGoogleadsense />
      },
      {
        id:3,
        text:"Add lead",
        url:'/add-lead',
        icon:<AiOutlineAppstoreAdd />
      },
      {
        id:4,
        text:"Profile",
        url:'/profile',
        icon:<CgProfile />
      },

      {
        id:5,
        text:"Settings",
        url:'/seetings',
        icon:<TbLayoutDashboard />
      }

];

export const getToken = () => {
  const result = localStorage.getItem('token');
  return result ? result : null;

}


export const getList = async () => {
 
  try {
    const resp = await customFetch.get(`/userprofile/${getUserFromLocalStorage('user').id}`, {
      headers: {
        authorization: `Bearer ${getToken()}`,
      },
    });
  
    return resp.data;
  } catch (error) {
    console.log(error);
  }

}