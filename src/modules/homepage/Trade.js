import React from 'react';
import { Link } from 'react-router-dom'
import { Button, Spinner } from 'reactstrap'
import CONFIG from '../config';
import '../../css/Trade.css'

const fetch = require('node-fetch');

class Trade extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      item1: null,
      user1: "",
      item2: null,
      user2: "",
      attemptStatus: "",
      tradeStatus: "normal"
    }
  }

  componentDidMount() {
    console.log(this.props.match.match.params);
    let groupId = this.props.match.match.params.groupId;
    let postId1 = this.props.match.match.params.postId1;
    let postId2 = this.props.match.match.params.postId2;

    // Fetch item1 data
    let targetURL = CONFIG.apiURL + `/getPostingById/${groupId}/${postId1}`;
    console.log(targetURL);
    fetch(targetURL, { headers: CONFIG.corsHeader })
      .then(res => {
        if(res.status === 404) {
          this.setState({ attemptStatus: "Item not found" });
        }
        else if(res.status !== 200 ) {
          this.setState({ attemptStatus: `Network Failure: Status ${res.status}, the server may be down.` });
        }
        return res.json();
      })
      .then(json => {
        console.log(json)
        if(!json) this.setState({ ttemptStatus: "Item not found" })
        else {
          this.setState({ attemptStatus: "finished" });
          return json;
        }
      })
      .catch(error => {
        console.error(error);
        this.setState({ attemptStatus: `Network Failure: ${error.message}` });
      })
      .then(json => {
        console.log(json);
        this.setState({ item1: json });

        // Fetch user1 info
        targetURL = CONFIG.apiURL + `/getUserById/${json.userId}`
        console.log(targetURL)
        fetch(targetURL, { headers: CONFIG.corsHeader })
          .then(res => {
            if(res.status === 404) {
              this.setState({ attemptStatus: "Item not found" });
            }
            else if(res.status !== 200 ) {
              this.setState({ attemptStatus: `Network Failure: Status ${res.status}, the server may be down.` });
            }
            return res.json();
          })
          .then(json => {
            console.log("res: " + json)
            if(!json) this.setState({ ttemptStatus: "Item not found" })
            else {
              console.log(json.username);
              this.setState({ user1: json.username });
              this.setState({ attemptStatus: "finished" });
            }
          })
          .catch(error => {
            console.error(error);
            this.setState({ attemptStatus: `Network Failure: ${error.message}` });
          })
        })
    
    // Fetch item2 data
    targetURL = CONFIG.apiURL + `/getPostingById/${groupId}/${postId2}`;
    console.log(targetURL);
    fetch(targetURL, { headers: CONFIG.corsHeader })
      .then(res => {
        if(res.status === 404) {
          this.setState({ attemptStatus: "Item not found" });
        }
        else if(res.status !== 200 ) {
          this.setState({ attemptStatus: `Network Failure: Status ${res.status}, the server may be down.` });
        }
        return res.json();
      })
      .then(json => {
        console.log(json)
        if(!json) this.setState({ ttemptStatus: "Item not found" })
        else {
          this.setState({ attemptStatus: "finished" });
          return json;
        }
      })
      .catch(error => {
        console.error(error);
        this.setState({ attemptStatus: `Network Failure: ${error.message}` });
      })
      .then(json => {
        console.log(json);
        this.setState({ item2: json });

        // Fetch user1 info
        targetURL = CONFIG.apiURL + `/getUserById/${json.userId}`
        console.log(targetURL)
        fetch(targetURL, { headers: CONFIG.corsHeader })
          .then(res => {
            if(res.status === 404) {
              this.setState({ attemptStatus: "Item not found" });
            }
            else if(res.status !== 200 ) {
              this.setState({ attemptStatus: `Network Failure: Status ${res.status}, the server may be down.` });
            }
            return res.json();
          })
          .then(json => {
            console.log("res: " + json)
            if(!json) this.setState({ ttemptStatus: "Item not found" })
            else {
              console.log(json.username);
              this.setState({ user2: json.username });
              this.setState({ attemptStatus: "finished" });
            }
          })
          .catch(error => {
            console.error(error);
            this.setState({ attemptStatus: `Network Failure: ${error.message}` });
          })
        })
  }

  // Activated when the accept button is pressed
  accept() {
    const targetURL = CONFIG.apiURL + `/acceptTrade/${this.props.match.match.params.groupId}/${this.state.item1.id}/${this.state.item2.id}`
    this.setState({tradeStatus: 'pending'})
    fetch(targetURL, {headers: CONFIG.corsHeader, method: "POST"})
      .then(res => {
        if(res.status !== 200) {
          this.setState({
            tradeStatus: "failed",
            error: res.message
          })
        }
        else this.setState({tradeStatus: "completed"})
      })
      .catch(error => {
        this.setState({
          tradeStatus: "failed",
          error: error.message
        })
      })
  }

  // Activated when the reject button is pressed
  reject() {
    const targetURL = CONFIG.apiURL + `/deletePosting/${this.props.match.match.params.groupId}/${this.state.item2.id}`
    this.setState({tradeStatus: 'pending'})
    fetch(targetURL, {headers: CONFIG.corsHeader, method: "POST"})
      .then(res => {
        if(res.status !== 200) {
          this.setState({
            tradeStatus: "failed",
            error: res.message
          })
        }
        else this.setState({tradeStatus: "rejected"})
      })
      .catch(error => {
        this.setState({
          tradeStatus: "failed",
          error: error.message
        })
      })
  }

  makeTradePendingDiv (status) {
    switch(status) {
      case "pending":
        return (
          <div>
            <Spinner color="primary"/>
            <p>Requesting...</p>
          </div>
        );
      case "failed":
        return <p style={{color:"red"}}>Request Failed: {this.state.error ? this.state.error : "Unknown Error"}</p>
      case "completed":
        return (
          <div>
            <p>Trade Successfully Completed</p>
            <Link to={`/item/${this.props.match.match.params.groupId}/${this.props.match.match.params.postId1}`}>Return to Post</Link>
          </div>
        )
      case "rejected":
        return (
          <div>
            <p>Trade Successfully Rejected</p>
            <Link to={`/item/${this.props.match.match.params.groupId}/${this.props.match.match.params.postId1}`}>Return to Post</Link>
          </div>
        )
    }
  }

  render() {
    if(!this.state.item1) {
      return <p>Loading Items...</p>
    }
    // if(!this.props.userInfo || this.props.userInfo.id !== this.state.item1.userId) {
    //   return (
    //   <div>
    //     <p>You cannot access this trading page as you are not the owner of the listing.</p>
    //     <Link to="/">Back to Home Page</Link>
    //   </div>
    //   )
    // }
    console.log(this.state);
    if(this.state.item1 != null && this.state.item2 != null) {
      return (
        <div>
          <div id="backLink">
            <Link to={`/item/${this.props.match.match.params.groupId}/${this.props.match.match.params.postId1}`}>{"< Return to Post"}</Link>
          </div>
          <div className='grid-container'>
            <div className='leftItem'>
              <h3>Original Poster: {this.state.user1}</h3>
              <div className='card'>
                <h4>{this.state.item1.itemTitle}</h4>
                <img className='image' src="" alt={`img<${this.state.item1.itemTitle}>`}/>
                <p style={{color:"gray"}}>{this.state.item1.description}</p>
                <hr/>
                <p>Looking for: {this.state.item1.desiredItems}</p>
              </div>
            </div>

            <div className='controls'>
              <Button className='controlButton' color="success" onClick={()=>this.accept()}>Accept Offer!</Button>
              <Button className='controlButton' color="danger" onClick={()=>this.reject()}>Reject Offer!</Button>
              {this.makeTradePendingDiv(this.state.tradeStatus)}
            </div>

            <div className='rightItem'>
              <h3>Offerer: {this.state.user2}</h3>
              <div className='card'>
                <h4>{this.state.item2.itemTitle}</h4>
                <img className='image' src="" alt={`img<${this.state.item2.itemTitle}>`}/>
                <p style={{color:"gray"}}>{this.state.item2.description}</p>
                <hr/>
                <p>Looking for: {this.state.item2.desiredItems}</p>
              </div>
            </div>
          </div>
        </div>
      )
    }
    else
      return null;
  }
}

export default Trade;
