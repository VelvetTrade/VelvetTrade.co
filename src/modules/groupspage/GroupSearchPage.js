import React from 'react';
import { Link,  } from 'react-router-dom'
import {Button,  Input, Form, FormGroup, Label, Col, Spinner } from 'reactstrap';
import CONFIG from '../config'
import '../../css/GroupSearchPage.css'
import { isCompositeComponent } from 'react-dom/test-utils';

const fetch = require('node-fetch')

class GroupSearchPage extends React.Component {
  constructor(props) {

    super(props);

    this.state = {
      searchBar: "",
      searchStatus: "initial",
      error: "",
      results: []
    };
    
  }

  componentDidMount() {
  }

  onSearch(e) {
    e.preventDefault();
    if(!this.state.searchBar) return;


    const targetURL = CONFIG.apiURL + `/searchByName/${this.state.searchBar}`
    fetch(targetURL, {headers: CONFIG.corsHeader})
      .then(res => {
        if(res.status !== 200) return Promise.reject(res.message)
        else return res.json()
      })
      .then(json => {
        console.log(json)
        this.setState({
          results: json
        })
      })
      .catch(error => {
        this.setState({
          status: "error",
          error: error.message
        })
      })
  }

  renderResults () {
    // if(this.state.searchStatus === "initial") return null
    // else if(this.state.searchStatus === "pending") return <Spinner/>
    if(this.state.results.length === 0) return <p>No results found</p>
    else return this.state.results.map(group => (
      <div className="groupDisplayDiv" key={group.id}>
        <Link to={`/group/${group.id}`}><h3>{`${group.name}(${group.id})`}</h3></Link>
        <p>{`${group.members.length} Member${group.members.length === 1 ? '' : 's'}`}</p>
        <p>{group.description}</p>
      </div>
    ))
  }

  render() {
    return (
      <div id="GroupSearchPage" >
        <Form onSubmit={e=>this.onSearch(e)}>
          <FormGroup row>
            <Label for="searchbar" sm={2}>Search Group by Name</Label>
            <Col sm={6}>
              <Input type="text" name="searchbar" id="searchbar" placeholder="Type a Group Name to Begin..." value={this.state.searchBar} onChange={e=>this.setState({searchBar: e.target.value})} />
            </Col>  
            <Button type="submit">Search</Button>
          </FormGroup>
        </Form>
        <div>
          {this.state.searchStatus === "error" ? `Error: ${this.state.error}` : null}
          {this.renderResults()}
        </div>
      </div>
    )
  }
}

export default GroupSearchPage;
