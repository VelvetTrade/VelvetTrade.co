import React from 'react';
import '../../css/HomePage.css';
import { Link, Redirect } from 'react-router-dom'
import { TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, CardImg, CardBody, CardSubtitle } from 'reactstrap';
import CONFIG from '../config'

const fetch = require('node-fetch')

class GroupDetailPage extends React.Component {
  constructor(props) {

    super(props);

    this.state = {
      group: null,
      status: 0,
      redirect: "",
      memberList: []
    };
    
  }

  componentDidMount() {
    console.log(this.props.match);
    const targetURL = CONFIG.apiURL + `/getGroup/${this.props.match.match.params.groupId}`;
    fetch(targetURL, {headers: CONFIG.corsHeader})
      .then(res => {
        this.setState({status: res.status})
        if(res.status !== 200) {
          console.error(`Status ${res.status}: Unable to fetch groups`)
        }
        else return res.json()
      })
      .then(json => {
        // if(!json) console.error(`Unable to fetch groups`)
        this.setState({
          group: json
        })
        const getUserURL = CONFIG.apiURL + `/getUserById/`
        return Promise.all(json.members.map(
          memberId => fetch(getUserURL + memberId, {headers: CONFIG.corsHeader})
            .then(res => (res.status === 200 ? res.json() : Promise.resolve(null)))
            .then(json => json.username)
        ))
      })
      .then(memberList => this.setState({memberList: memberList}))
  }

  makeCards (posts) {
    if(!posts) return <p>Loading Posts...</p>
    if(posts.length === 0) return <p>No posts in this group.</p>
    return posts.map(post => (
      <Card key={post.Id}>
        <CardImg top width="100%" src="" alt={post.itemTitle} />
        <CardBody>
          <CardTitle><Link to={`/item/${this.state.activeTab}/${post.id}`}>{post.itemTitle}</Link></CardTitle>
          <CardSubtitle>{`Looking for: ${post.description}`}</CardSubtitle>
          <CardText>{post.description}</CardText>
          <Button>Button</Button>
        </CardBody>
      </Card>
    ))
  }

  render() {
    if(this.state.redirect) return <Redirect to={this.state.redirect}/>

    else if(this.state.status === 0 || this.state.group === null) return <p>Loading...</p>

    else if(this.state.status === 404) return <p>Could not find group</p>

    if(this.state.status !== 200) return <p>{`Unexpected Error. Status ${this.state.status}. Check Network Page`}</p>

    return (
      <div className="GroupDetailPage">
        <h3>{`Group Details: ${this.state.group.name}`}</h3>
        <h5>{this.state.group.description}</h5>
        <p>{this.state.group.isPrivate ? "Private Group" : "Public Group"}</p>
        <hr/>
        <h6>Members:</h6>
        {this.state.memberList.map(name=><p key={name}>{name}</p>)} 
      </div>
    );
  }
}

export default GroupDetailPage;
