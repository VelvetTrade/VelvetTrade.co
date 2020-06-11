import React, {useState} from 'react';
import TopNav from './nav/TopNav';
import PageContent from './PageContent';
import LoginPage from './loginpage/LoginPage'
import HomePage from './homepage/Homepage';
import SignupPage from './loginpage/SignPage';
import CreateGroupPage from './accountpage/CreateGroupPage';
import useSticky from '../miscJS/useSticky';
import GroupDetailPage from './groupspage/GroupDetailPage';
import CreateListingPage from './accountpage/CreateListingPage';
import RSNav from './nav/RSNav'
import '../css/App.css';

import { Nav, NavItem, NavLink, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Navbar, NavbarBrand, NavbarToggler, Collapse, UncontrolledDropdown, NavbarText } from 'reactstrap'
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom' 

function App() {
  // const { isSticky, element } = useSticky();
  const [ userInfo, setUserInfo ] = useState(null)
  const [ redirectLink, setRedirectLink ] = useState(null)

  if(redirectLink) {
    setRedirectLink(null)
    return <Redirect to={redirectLink}/>
  }

  return (
    <div className="App">
      <Router>
        {/* <Navbar color="light" light expand="md">
          <NavbarBrand href="/">VelvetTrade</NavbarBrand>
          <NavbarToggler onClick={()=>toggleDropdown(!dropdownOpen)} />
          <Collapse isOpen={dropdownOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink onClick={()=>setRedirectLink("/createGroup")}>Create a Group</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
              </NavItem>
              
            </Nav>
            {
                userInfo ? 
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>{userInfo.username}</DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem header>User Menu</DropdownItem>
                    <DropdownItem>My Listings</DropdownItem>
                    <DropdownItem>My Groups</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem onClick={()=>setUserInfo(null)}>Log Out</DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
                : <NavLink onClick={()=>setRedirectLink("/login")}>Login</NavLink>
              }
          </Collapse>
        </Navbar> */}
        {/* <Link to='/'><h2>VelvetTrade</h2></Link>
        <Nav>
          <NavItem>
            <Link to="/createGroup">Create a Group</Link>
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
        </Nav> */}
        {/* <TopNav sticky={isSticky}/> */}
        <RSNav userInfo={userInfo} setUserInfo={info=>setUserInfo(info)}/>
        <main>
          <Route exact={true} path="/" render={()=><HomePage userInfo={userInfo}/>}/>
          <Route exact={true} path="/signup" render={()=><SignupPage userInfo={userInfo} />}/>
          <Route exact={true} path="/createGroup" render={()=><CreateGroupPage userInfo={userInfo} />}/>
          <Route exact={true} path="/login" render={()=><LoginPage userInfo={userInfo} setUserInfo={info=>setUserInfo(info)}/>}/>
          <Route exact={true} path="/group/:groupId" render={routeInfo=><GroupDetailPage userInfo={userInfo} routeInfo={routeInfo}/>}/>
          <Route exact={true} path="/createListing/:groupId" render={routeInfo=><CreateListingPage userInfo={userInfo} routeInfo={routeInfo}/>}/>
          <Route exact={true} path="/test" render={()=><h1>test</h1>}/>
        </main>
      </Router>
    </div>
  );
}

export default App;
