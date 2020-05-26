import React from 'react';
import Menu from './Menu';
import MenuItem from './MenuItem';
import MenuButton from './MenuButton';
import "./TopNav.css";

class TopNav extends React.Component {
  constructor(props){
    super(props);
    this.state={
      menuOpen: false,
      sticky: false
    }
  }
  
  handleMenuClick() {
    this.setState({menuOpen:!this.state.menuOpen});
  }
  
  handleLinkClick() {
    this.setState({menuOpen: false});
  }
  
  render(){
    const styles= 
      {
        container:{
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: '99',
          opacity: 0.9,
          display:'flex',
          alignItems:'center',
          background: 'blueviolet',
          width: '100%',
          color: 'white',
          fontFamily:'Lobster',
        },
        logo: {
          margin: '0 auto',
        },
        body: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100vw',
          height: '100vh',
          filter: this.state.menuOpen ? 'blur(2px)':null,
          transition: 'filter 0.5s ease',
        },
      }
    const menu = ['About Us','Our Products','Services','FAQ','Contact Us']
    const menuItems = menu.map((val,index)=>{
      return (
        <MenuItem 
          key={index} 
          delay={`${index * 0.1}s`}
          onClick={()=>{this.handleLinkClick();}}>{val}</MenuItem>)
    });
    
    return(
      <div  id="navbase" className={this.props.sticky? "topnav-sticky" : "topnav"}>
        <div style={styles.container}>
          <MenuButton open={this.state.menuOpen} onClick={()=>this.handleMenuClick()} color='white'/>
          <h4>VelvetTrade</h4>
        </div>
        <Menu open={this.state.menuOpen}>
          {menuItems}
        </Menu>
      </div>
    )
  }
}

export default TopNav;