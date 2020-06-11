import React from 'react';
import './../../css/App.css';
import './../../css/Trade.css';
import './../../css/Listing.css';
import CONFIG from '../config';

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
    }
  }

  componentDidMount() {
    console.log(this.props.match.match.params);
    let groupId = this.props.match.match.params.groupId;
    let postId1 = this.props.match.match.params.postId1;
    let postId2 = this.props.match.match.params.postId2;
    let item1 = null;
    let user1 = "";

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

  render() {
    console.log(this.state);
    if(this.state.item1 != null && this.state.item2 != null) {
      return (
        <div className='grid-container'>
          <div className='leftItem'>
            <h3>{this.state.user1}</h3>
            <div className='card'>
              <p>{this.state.item1.itemTitle}</p>
              <div className='image'>
                <p>IMAGE PLACEHOLDER</p>
              </div>
              <p>Looking for: {this.state.item1.desiredItems}</p>
            </div>
          </div>

          <div className='controls'>
            <button>Accept Offer!</button>
            <button>Reject Offer!</button>
          </div>

          <div className='rightItem'>
            <h3>{this.state.user2}</h3>
            <div className='card'>
              <p>{this.state.item2.itemTitle}</p>
              <div className='image'>
                <p>IMAGE PLACEHOLDER</p>
              </div>
              <p>Looking for: {this.state.item2.desiredItems}</p>
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
