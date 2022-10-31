import { NavLink } from "react-router-dom";
import { dataLinks } from "../helpers/utils";
const NavLinks = ({toggleSidebar}) => {

    return(
        <div className="nav-links">
        {
          dataLinks.map((item) => {

              const{id,text,url,icon} = item;

              return(
                <NavLink 
                to={url}
                className={({isActive}) => {
                   return isActive ? 'nav-link active':"nav-link"
                }}
                key={id}
                onClick={toggleSidebar}
                >
                  <span className='icon'>{icon}</span>
                  {text}
                  
                </NavLink>
              );
          })
        }
      </div>
    )
}

export default NavLinks;