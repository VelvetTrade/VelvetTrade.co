import React from 'react';
import { Link, Redirect } from 'react-router-dom'
import { Button, Form, FormGroup, Label, Input, FormText, Col } from 'reactstrap';
import CONFIG from '../config'

const fetch = require('node-fetch');

class CreateListingPage extends React.Component {
  constructor(props) {

    super(props);
    
    this.state = {
      userInfo: props.userInfo,
      name: "",
      price: "",
      desire: "",
      attemptStatus: "",
      description: ""
    }
  }

  onSubmit(e) {
    e.preventDefault();
    // call to validate
    const targetURL = CONFIG.apiURL + `/createNewPosting`

    let headers = Object.assign(CONFIG.corsHeader)
    headers['Content-Type'] = "application/json"
    let body = {
      userId: this.props.userInfo.id,
      name: this.state.username,
      description: this.state.description,
      price: this.state.price,
      isOffer: false,
      desiredItems: this.state.desire,
    }
    
    fetch(targetURL, {
      method: "POST",
      headers: CONFIG.corsHeader,
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
          <p>You must be signed in to create a listing</p>
          <Link to="/">Back to Home Page</Link>
        </div>
      )

    if(this.state.attemptStatus === "finished")
      return (
        <Redirect to="/"/>
      )

    return (
      <div className="createGroupPage">
        <h4>Create New Post</h4>
        <p>{`Posting to ${this.props.routeInfo.match.params.groupId}`}</p>
        <Form onSubmit={e=>this.onSubmit(e)}>
          <FormGroup row>
            <Label for="name" sm={2}>Item Name</Label>
            <Col sm={10}>
              <Input type="text" name="name" id="name" placeholder="Short Phrase describing your item" onChange={e=>this.setState({name: e.target.value})}/>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="price" sm={2}>Price</Label>
            <Col sm={10}>
              <Input type="text" name="price" id="price" placeholder="price" onChange={e=>this.setState({price: e.target.value})} />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="desire" sm={2}>Desired Items</Label>
            <Col sm={10}>
              <Input type="text" name="desire" id="desire" placeholder="Items that you want to trade for" onChange={e=>this.setState({desire: e.target.value})} />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="description" sm={2}>Description</Label>
            <Col sm={10}>
              <Input type="textarea" name="description" id="description" placeholder="description" onChange={e=>this.setState({description: e.target.value})} />
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

export default CreateListingPage;
