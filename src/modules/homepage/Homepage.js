import React from 'react';
import '../../css/HomePage.css';
import { Link } from 'react-router-dom'
import { TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, CardImg, CardBody, CardSubtitle } from 'reactstrap';
import CONFIG from '../config'

class Homepage extends React.Component {
  constructor(props) {

    super(props);

    this.state = {
      activeTab: 'none',
      groupTabNames: [],
      posts: [],
    };

    
  }

  componentDidMount() {
    if(this.props.userInfo && this.props.userInfo.groups.length > 0) {
      const targetURL = CONFIG.apiURL + `/getGroups/${this.props.userInfo.groups.join()}`;
      fetch(targetURL, {headers: CONFIG.corsHeader})
        .then(res => {
          if(res.status !== 200) {
            console.error(`Status ${res.status}: Unable to fetch groups`)
          }
          else return res.json()
        })
        .then(json => {
            console.log(json)
            let tabNames = json.map(group => group.name)
            this.setState({
              groupTabNames: tabNames,
              activeTab: this.props.userInfo.groups[0],
            })
            return this.getAllPosts(tabNames[0]);
        })
        .then(posts => {
          console.log(posts)
          this.setState({posts})
        })
    }
  }

  changeTab(tab) {
      this.setState({activeTab: tab})
      this.getAllPosts(tab);
  }

  makeGroupTabs(userGroups) {
    if(!userGroups) {
      console.error("Group property is null");
      return null;
    }
    return userGroups.map((groupId, index) => (
      <NavItem key={groupId}>
        <NavLink
          className={this.state.activeTab === groupId ? 'active' : ''}
          onClick={() => this.changeTab(groupId)}
        >
          {(!this.state.groupTabNames || this.state.groupTabNames.length < index) ? `Group ${index}` : this.state.groupTabNames[index]}
        </NavLink>
      </NavItem>
    ))
  }

  getAllPosts (groupId) {
    const targetURL = CONFIG.apiURL + `/getAllPostingPerGroup/${groupId}`;

    return fetch(targetURL, {headers: CONFIG.corsHeader})
      .then(res => {
          if(res.status !== 200) {
            console.error(`Status ${res.status}: Unable to fetch group posts`)
          }
          else return res.json()
      })
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

  makeTabContent (groupId) {
    let posts = this.state.posts.length === 0 
      ? <p>There are no posts in this group.</p>
      : this.state.posts.map(post => this.makeCards(this.state.posts))
    return (
      <TabPane tabId={groupId}>
        <p>{`Group ID: ${groupId}`}</p>
        {posts}
      </TabPane>
    )
  }

  render() {
    if(!this.props.userInfo)
      return (
        <div className="Homepage">
          <p>Log in to see listings!</p>
        </div> 
      )

    if(!this.props.userInfo.groups || this.props.userInfo.groups.length === 0)
      return (
        <div className="Homepage">
          <p>You are currently not part of a group.</p>
        </div> 
      )

    return (
      <div className="Homepage">
        <h3>Listings</h3>
        <Nav tabs>
          {this.makeGroupTabs(this.props.userInfo.groups)}
        </Nav>
        {this.makeCards(this.state.posts)}
      </div>
    );
  }
}

export default Homepage;
