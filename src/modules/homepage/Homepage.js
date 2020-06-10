import React, {useState} from 'react';
import '../../css/Homepage.css';
import { Link } from 'react-router-dom'
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import CONFIG from '../config'

class Homepage extends React.Component {
  constructor(props) {

    super(props);
    
    this.state = {
      userInfo: props.userInfo,
      activeTab: 'none'
    }
  }

  changeTab(tab) {
      this.setState({activeTab: tab})
  }

  render() {
    if(!this.state.userInfo)
      return (
        <div className="Homepage">
          <p>Log in to see listings!</p>
        </div> 
      )

    if(!this.state.userInfo.groups || this.state.userInfo.groups.length == 0)
      return (
        <div className="Homepage">
          <p>Log in to see listings!</p>
        </div> 
      )

    return (
      <div className="Homepage">
        <h3>Listings</h3>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={this.state.activeTab == '1' ? 'active' : ''}
              onClick={() => this.changeTab('1')}
            >
              Tab1
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={this.state.activeTab == '2' ? 'active' : ''}
              onClick={() => this.changeTab('2')}
            >
              Moar Tabs
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            tab1
          </TabPane>
          <TabPane tabId="2">
            Tab2
          </TabPane>
        </TabContent>
      </div>
    );
  }
}

export default Homepage;
