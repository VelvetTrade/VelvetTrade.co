import React, {useState} from 'react';
import TopNav from './nav/TopNav';
import PageContent from './PageContent';
import SignPage from './loginpage/SignPage'
import LoginPage from './loginpage/LoginPage'
import HomePage from './homepage/Homepage';
import useSticky from '../miscJS/useSticky';
import '../css/App.css';

import { Nav, NavItem, NavLink, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom' 
import SignupPage from './loginpage/SignPage';

function App() {
  const { isSticky, element } = useSticky();
  const [ userInfo, setUserInfo ] = useState(null)
  const [ dropdownOpen, toggleDropdown ] = useState(false)

  return (
    <div className="App">
      <Router>
        <Link to='/'><h2>VelvetTrade</h2></Link>
        <Nav>
          <NavItem>
            
          </NavItem>
          { userInfo ? 
            <Dropdown nav isOpen={dropdownOpen} toggle={()=> toggleDropdown(!dropdownOpen)}>
              <DropdownToggle nav caret>{userInfo.username}</DropdownToggle>
              <DropdownMenu>
                <DropdownItem header>User Menu</DropdownItem>
                <DropdownItem>My Listings</DropdownItem>
                <DropdownItem>My Groups</DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={()=>setUserInfo(null)}>Log Out</DropdownItem>
              </DropdownMenu>
            </Dropdown> :
            <NavItem>
              <Link to="/login">Login</Link>
            </NavItem>
          }
        </Nav>
        {/* <TopNav sticky={isSticky}/> */}
        <main>
          <Route exact={true} path="/" render={()=><PageContent element={element} content={<HomePage userInfo={userInfo}/>}/>}/>
          <Route exact={true} path="/signup" render={()=><SignupPage userInfo={userInfo} />}/>
          <Route exact={true} path="/login" render={()=><LoginPage userInfo={userInfo} setUserInfo={info=>setUserInfo(info)}/>}/>
          <Route exact={true} path="/test" render={()=><h1>test</h1>}/>
        </main>
      </Router>
    </div>
  );
}

export default App;
