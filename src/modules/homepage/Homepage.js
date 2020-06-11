import React from 'react';
import '../../css/Homepage.css';
import { Link, Redirect } from 'react-router-dom'
import { TabPane, Nav, NavItem, NavLink, Card, CardTitle, CardText, CardImg, CardBody, CardSubtitle} from 'reactstrap';
import CONFIG from '../config'

class Homepage extends React.Component {
  constructor(props) {

    super(props);

    this.state = {
      activeTab: 'none',
      groupTabNames: [],
      posts: null,
      redirect: ""
    }
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
            return this.getAllPosts(this.props.userInfo.groups[0]);
        })
        .then(posts => {
          this.setState({posts})
        })
    }
  }

  changeTab(tab) {
      this.setState({
        activeTab: tab,
        posts: null
      })
      this.getAllPosts(tab).then(posts=>this.setState({posts}));
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
      .then(posts=>{
        let filteredPosts = []
        for(let post of posts) {
          if(post && !post.offer && !post.acceptedOfferId) filteredPosts.push(post);
          else console.log(post.id)
        }
        
        return filteredPosts
      })
  }

  makeCards (posts) {
    if(!posts) return <p>Loading Posts...</p>
    if(posts.length === 0) return <p>No posts in this group.</p>
    // Apply cardStyles inline to override bootstrap
    const CardStyle = {
        height: "100%",
        margin: 10,
        padding: 5,
        backgroundColor: "#E3E3E3",
        width: "80%"
    }
    let allCards = posts.map(post => post ? (
      <Card key={post.Id} className="ListingCard" style={CardStyle} onClick={()=>this.setState({redirect: `/item/${this.state.activeTab}/${post.id}`})}>
        <CardImg top width="100%" src="" alt={`img<${post.itemTitle}>`} />
        <CardBody>
          <CardTitle><Link to={`/item/${this.state.activeTab}/${post.id}`}>{post.itemTitle}</Link></CardTitle>
          <CardSubtitle>{`Price: ${post.price}`}</CardSubtitle>
          <CardSubtitle>{`Looking for: ${post.desiredItems}`}</CardSubtitle>
          <CardText>{post.description}</CardText>
        </CardBody>
      </Card>
    ) : null)
    let finalCardStack = [];
    while(allCards.length > 0) {
      let row = [];
      for(let i = 0; i < 3; i++) {
        if(allCards.length <= 0) break;
        row.push(
          <th key={i}>{allCards.shift()}</th>
        )
      }
      finalCardStack.push(<tr key={allCards.length}>{row}</tr>)
    }
    return (
      <table>
        <tbody>
          {finalCardStack ? finalCardStack : "No posts in this group"}
        </tbody>
      </table>
    )
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
    if(this.state.redirect) {
      this.setState({redirect: ""})
      return <Redirect to={this.state.redirect}/>
    }

    if(!this.props.userInfo)
      return (
        <div className="Homepage">
          <Link to="/login">Log in </Link>to see listings!
        </div> 
      )

    if(!this.props.userInfo.groups || this.props.userInfo.groups.length === 0)
      return (
        <div className="Homepage">
          <p>You are currently not part of a group.</p>
          <Link to="/createGroup">Create A Group!</Link>
        </div> 
      )

    return (
      <div className="Homepage">
        <h3>Listings</h3>
        <Nav tabs>
          {this.makeGroupTabs(this.props.userInfo.groups)}
        </Nav>
        <Link to={`/group/${this.state.activeTab}`}>Group Details</Link>
        <br/>
        <Link to={`/createListing/${this.state.activeTab}`}>Make a New Listing</Link>
        {this.makeCards(this.state.posts)}
      </div>
    );
  }
}

export default Homepage;
