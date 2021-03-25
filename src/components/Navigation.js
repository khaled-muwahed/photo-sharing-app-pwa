import React from 'react';
import { Nav, NavItem} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faHome, faUserCircle } from '@fortawesome/free-solid-svg-icons';

const tabs = [{
  route: "/",
  icon: faHome,
  label: "Home"
},{
  route: "/signup",
  icon: faSearch,
  label: "SignUp"
},{
  route: "/login",
  icon: faUserCircle,
  label: "Login"
}]

const Navigation = (props) => {

  return (
    <div>
      
    <nav  role="navigation">
      <Nav >
        <div >
          {
            tabs.map((tab, index) =>(
              <NavItem className = "nav-bar"
               key={`tab-${index}`}>
                <NavLink to={tab.route}  activeClassName="active">
                  <div >
                    <FontAwesomeIcon size="lg" icon={tab.icon}/>
                    <div className="bottom-tab-label">{tab.label}</div>
                  </div>
                </NavLink>
              </NavItem>
            ))
          }
        </div>
      </Nav>
    </nav>
    </div>
  )
};

export default Navigation;