import {ImStatsBars2} from 'react-icons/im';
import {SiGoogleadsense} from 'react-icons/si';
import {AiOutlineAppstoreAdd} from 'react-icons/ai';
import {CgProfile} from 'react-icons/cg';
import {TbLayoutDashboard} from 'react-icons/tb';


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