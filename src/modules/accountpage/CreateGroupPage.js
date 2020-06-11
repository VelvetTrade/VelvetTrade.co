import React from 'react';
import { Link, Redirect } from 'react-router-dom'
import { Button, Form, FormGroup, Label, Input, FormText, Col } from 'reactstrap';
import CONFIG from '../config'

const fetch = require('node-fetch');

class createGroupPage extends React.Component {
  constructor(props) {

    super(props);
    
    this.state = {
      userInfo: props.userInfo,
      username: "",
      password: "",
      isPrivate: false,
      attemptStatus: "",
      isPrivate: "",
      description: ""
    }
  }

  onSubmit(e) {
    e.preventDefault();
    // call to validate
    if(this.state.password !== this.state.confirmpassword) {
      this.setState({attemptStatus: "Password does not match confirmpassword"})
      return;
    }
    const targetURL = CONFIG.apiURL + `/createGroup`

    let headers = Object.assign(CONFIG.corsHeader)
    headers['Content-Type'] = "application/json"
    let body = {
      name: this.state.username,
      password: this.state.password,
      isPrivate: this.state.isPrivate,
      description: this.state.description,
    }
    
    fetch(targetURL, {
      headers: CONFIG.corsHeader,
      method: "POST",
      body: JSON.stringify(body)
    }).then(res => {
        if(res.status === 400) {
          this.setState({attemptStatus: "Create Group failed."})
        }
        else if(res.status !== 200 ) {
          this.setState({attemptStatus: `Network Failure: Status ${res.status}, server may be down.`})
        }
        else {
          this.setState({attemptStatus: "finished"})
        }
      })
  }

  render() {
    if(!this.props.userInfo)
      return (
        <div className="createGroupPage">
          <p>You must be signed in to create a group</p>
          <Link to="/">Back to Home Page</Link>
        </div>
      )

    if(this.state.attemptStatus === "finished")
      return (
        <Redirect to="/"/>
      )

    return (
      <div className="createGroupPage">
        <h4>Sign Up</h4>
        <Form onSubmit={e=>this.onSubmit(e)}>
          <FormGroup row>
            <Label for="username" sm={2}>Group Name</Label>
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
            <Label for="description" sm={2}>Description</Label>
            <Col sm={10}>
              <Input type="text" name="description" id="description" placeholder="description" onChange={e=>this.setState({description: e.target.value})} />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="isPrivate" sm={2}>isPrivate</Label>
            <Col sm={1}>
              <Input type="checkbox" name="isPrivate" id="isPrivate" onChange={e=>this.setState({isPrivate: !this.state.isPrivate})} />
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

export default createGroupPage;
