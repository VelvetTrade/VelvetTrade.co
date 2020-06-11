import React, { useState } from 'react'
import { Nav, NavItem, NavLink as RSNavLink, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Navbar, NavbarBrand, NavbarToggler, Collapse, UncontrolledDropdown, NavbarText } from 'reactstrap'
import { Redirect, NavLink as RRNavLink } from 'react-router-dom';

function RSNav (props) {
  const [ dropdownOpen, toggleDropdown ] = useState(false)
  const [ redirectLink, setRedirectLink ] = useState("")

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  if(redirectLink) return <Redirect to={redirectLink}/>

  return (
    
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">VelvetTrade</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <RSNavLink to="/createGroup" tag={RRNavLink}>Create a Group</RSNavLink>
            </NavItem>
            <NavItem>
              <RSNavLink href="https://github.com/VelvetTrade/VelvetTrade.co">GitHub</RSNavLink>
            </NavItem>
            
          </Nav>
          {props.userInfo ? 
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                {props.userInfo.username}
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  <RSNavLink to="/test" tag={RRNavLink}>Profile</RSNavLink>
                </DropdownItem>
                <DropdownItem>
                  <RSNavLink to="/test" tag={RRNavLink}>My Listings</RSNavLink>
                </DropdownItem>
                <DropdownItem>
                  <RSNavLink to="/test" tag={RRNavLink}>My Groups</RSNavLink>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={()=>props.setUserInfo(null)}>
                  Sign Out
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            : <RSNavLink to="/login" tag={RRNavLink}>Login</RSNavLink>
          }
        </Collapse>
      </Navbar>
    </div>
  )
}

export default RSNav;