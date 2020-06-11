import React from 'react';
import { Redirect } from 'react-router-dom'
import { Button, Form, FormGroup, Label, Input, FormText, Col } from 'reactstrap';
import CONFIG from '../config'

const fetch = require('node-fetch');

class SignPage extends React.Component {
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
    if(this.state.password !== this.state.confirmpassword) {
      this.setState({attemptStatus: "Password does not match confirmpassword"})
      return;
    }
    const targetURL = CONFIG.apiURL + `/addNewUser`

    let headers = Object.assign(CONFIG.corsHeader)
    headers['Content-Type'] = "application/json"
    let body = {
      username: this.state.username,
      password: this.state.password,
      email: this.state.email,
      address: this.state.address,
      zip: this.state.zip,
      tin: "",
      online:false
    }
    
    fetch(targetURL, {
      headers: CONFIG.corsHeader,
      method: "POST",
      body: JSON.stringify(body)
    }).then(res => {
        if(res.status === 400) {
          this.setState({attemptStatus: "Signup failed."})
        }
        else if(res.status !== 200 ) {
          this.setState({attemptStatus: `Network Failure: Status ${res.status}, login server may be down.`})
        }
        else {
          this.setState({attemptStatus: "finished"})
        }
      })
  }

  render() {
    if(this.props.userInfo)
      return (
        <Redirect to="/"/>
      )

    if(this.state.attemptStatus === "finished")
      return (
        <Redirect to="/login"/>
      )

    return (
      <div className="LoginPage">
        <h4>Sign Up</h4>
        <Form onSubmit={e=>this.onSubmit(e)}>
          <FormGroup row>
            <Label for="username" sm={2}>UserName</Label>
            <Col sm={10}>
              <Input type="text" name="username" id="username" placeholder="Your Velvet UserName" onChange={e=>this.setState({username: e.target.value})}/>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="password" sm={2}>Password</Label>
            <Col sm={10}>
              <Input type="password" name="password" id="password" placeholder="Password" onChange={e=>this.setState({password: e.target.value})} />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="confirmpassword" sm={2}>Confirm Password</Label>
            <Col sm={10}>
              <Input type="password" name="confirmpassword" id="confirmpassword" placeholder="Confirm Password" onChange={e=>this.setState({confirmpassword: e.target.value})} />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="email" sm={2}>Email</Label>
            <Col sm={10}>
              <Input type="email" name="email" id="email" placeholder="Email" onChange={e=>this.setState({email: e.target.value})} />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="address" sm={2}>Address</Label>
            <Col sm={10}>
              <Input type="text" name="address" id="address" placeholder="address" onChange={e=>this.setState({address: e.target.value})} />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="zip" sm={2}>Zip Code</Label>
            <Col sm={10}>
              <Input type="text" name="zip" id="zip" placeholder="ex. 12345" onChange={e=>this.setState({address: e.target.value})} />
            </Col>
          </FormGroup>
          {this.state.attemptStatus ? <FormText color="danger">{this.state.attemptStatus}</FormText> : null}
          <FormGroup>
            <Button type="submit">Submit</Button>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

export default SignPage;
