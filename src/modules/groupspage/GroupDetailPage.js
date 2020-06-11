import React from 'react';
import { Link, Redirect } from 'react-router-dom'
import { Card, Button, CardTitle, CardText, CardImg, CardBody, CardSubtitle, Input } from 'reactstrap';
import CONFIG from '../config'
import '../../css/GroupDetailPage.css'

const fetch = require('node-fetch')

class GroupDetailPage extends React.Component {
  constructor(props) {

    super(props);

    this.state = {
      group: null,
      status: 0,
      redirect: "",
      joinPW: "",
      memberList: []
    };
    
  }

  componentDidMount() {
    const targetURL = CONFIG.apiURL + `/getGroup/${this.props.routeInfo.match.params.groupId}`;
    fetch(targetURL, {headers: CONFIG.corsHeader})
      .then(res => {
        this.setState({status: res.status})
        if(res.status !== 200) {
          console.error(`Status ${res.status}: Unable to fetch groups`)
        }
        else return res.json()
      })
      .then(json => {
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

  leaveGroup() {
    const targetURL = CONFIG.apiURL + `/removeUserFromGroupById/${this.state.group.id}/${this.props.userInfo.id}`
    fetch(targetURL, {headers: CONFIG.corsHeader, method: "DELETE"})
      .then(res => {
        if(res.status !== 200) {
          return Promise.reject(res.message)
        }
        else {
          let newUserInfo = Object.assign(this.props.userInfo);
          newUserInfo.groups = newUserInfo.groups.filter(id => (id !== this.state.group.id))
          this.props.setUserInfo(newUserInfo)
          this.setState({redirect: "/"})
        }
      })
      .catch(error => {
        this.setState({
          error: error.message
        })
      })
  }

  joinGroup() {
    const targetURL = CONFIG.apiURL + `/validateUserEntry/${this.state.group.id}/${this.props.userInfo.id}/${this.state.joinPW ? this.state.joinPW : 'none'}`
    fetch(targetURL, {headers: CONFIG.corsHeader})
      .then(res => {
        if(res.status === 400) {
          return Promise.reject("Invalid Password")
        }
        if(res.status !== 200) {
          return Promise.reject(res.message)
        }
        else {
          let newUserInfo = Object.assign(this.props.userInfo);
          newUserInfo.groups.push(this.state.group.id);
          this.props.setUserInfo(newUserInfo)
          this.setState({redirect: "/"})
        }
      })
      .catch(error => {
        this.setState({
          error: error.message
        })
      })
  }

  renderUserControl() {
    if(!this.props.userInfo) return <p>Sign in for more options.</p>
    if(this.state.group.members.includes(this.props.userInfo.id)) {
      //User is in the group
      return <div>
        <p>You are currently in this group.</p>
        <Button color="danger" onClick={()=>this.leaveGroup()} className="groupAccessButton leave">Leave Group</Button>
      </div>
    }
    else if(this.state.group.private){
      // User is not in the private group and needs a password
      return (
        <div>
          <p>This group is private.</p>
          <p>You must enter a password to join.</p>
          <Input type="password" placeholder="Group Password" value={this.state.joinPW} className="pwField" onChange={(e)=>this.setState({joinPW: e.target.value})}/>
          <Button color="primary" onClick={()=>this.joinGroup()} className="groupAccessButton join">Join</Button>
        </div> 
      )
    }
    else {
      //User is not part of the public group, and can join at will
      return (
        <div>
          <p>This group is public. You can join and leave at any time.</p>
          <Button color="primary" onClick={()=>this.joinGroup()} className="groupAccessButton join">Join</Button>
        </div>
      )
    }
  }

  render() {
    if(this.state.redirect) return <Redirect to={this.state.redirect}/>

    else if(this.state.status === 0 || this.state.group === null) return <p>Loading...</p>

    else if(this.state.status === 404) return <p>Could not find group</p>

    if(this.state.status !== 200) return <p>{`Unexpected Error. Status ${this.state.status}. Check Network Page`}</p>

    return (
      <div className="GroupDetailPage">
        <div className="UpperContainer">
          <div className="BasicDetailContainer">
            <h3>{`Group Details: ${this.state.group.name}`}</h3>
            <h5>{this.state.group.description}</h5>
            <p>{this.state.group.private ? "Private Group" : "Public Group"}</p>
          </div>
          <hr/>
          <div className="memberList">
            <h4 className="memberListTitle">Members:</h4>
            {this.state.memberList.map(name=><p key={name} className="memberListEntry">{name}</p>)} 
          </div>
        </div>
        
        
        <div className={`userAccessControl ${this.props.userInfo && this.state.group && this.state.group.members.includes(this.props.userInfo.id) ? 'leave' : 'join'}`}>
            {this.renderUserControl()}
            {this.state.error ? <p style={{color:"red"}}>{this.state.error}</p> : null}
          </div>
      </div>
    );
  }
}

export default GroupDetailPage;
