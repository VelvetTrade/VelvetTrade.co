import React, {useState} from 'react';
import '../../css/Homepage.css';
import { Redirect } from 'react-router-dom'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import CONFIG from '../config'

const fetch = require('node-fetch');

class LoginPage extends React.Component {
  constructor(props) {

    super(props);
    
    this.state = {
      userInfo: props.userInfo,
      username: "",
      password: "",
      attemptStatus: "",
    }
  }

  onSubmit(e) {
    e.preventDefault();
    // call to validate
    const targetURL = CONFIG.apiURL + `/authenticateUser/${this.state.username}/${this.state.password}`
    console.log(targetURL)
    fetch(targetURL, {headers: CONFIG.corsHeader})
      .then(res => {
        if(res.status === 400) {
          this.setState({attemptStatus: "Login Failed, Check Credientials"})
        }
        else if(res.status !== 200 ) {
          this.setState({attemptStatus: `Network Failure: Status ${res.status}, login server may be down.`})
        }
        return res.json()
      })
      .then(json => {
        console.log(json)
        if(!json) this.setState({attemptStatus: "Login Failed, Check Credientials"})
        else {
          this.props.setUserInfo(json)
          this.setState({attemptStatus: "finished"})
        }
      })
      .catch(error => {
        console.error(error)
        this.setState({attemptStatus: `Network Failure: ${error.message}`})
      })
  }

  render() {
    if(this.state.attemptStatus === "finished")
      return (
        <Redirect to="/"/>
      )

    return (
      <div className="LoginPage">
        <Form onSubmit={e=>this.onSubmit(e)}>
          <FormGroup>
            <Label for="username">UserName</Label>
            <Input type="text" name="username" id="username" placeholder="Your Velvet UserName" onChange={e=>this.setState({username: e.target.value})}/>
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input type="password" name="password" id="password" placeholder="Password" onChange={e=>this.setState({password: e.target.value})} />
          </FormGroup>
          {this.state.attemptStatus ? <FormText color="danger">{this.state.attemptStatus}</FormText> : null}
          <Button type="submit">Login</Button>
        </Form>
      </div>
    );
  }
}

export default LoginPage;
