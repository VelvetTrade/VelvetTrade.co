import React from 'react';
import './../../css/App.css';
import './../../css/Listing.css';
import CONFIG from '../config';

const fetch = require('node-fetch');

class Listing extends React.Component {
    constructor(props) {
      super(props);
      
      this.state = {
        item: null,
        user: "",
        attemptStatus: "",
      }
    }

    componentDidMount() {
      console.log(this.props.match.match.params);
      let groupId = this.props.match.match.params.groupId;
      let postId = this.props.match.match.params.postId;

      // Fetch item data
      let targetURL = CONFIG.apiURL + `/getPostingById/${groupId}/${postId}`;
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
          this.setState({ item: json });

          // Fetch user info
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
                this.setState({ user: json.username });
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
      if(this.state.item != null) {
        return (
          <div className='Listing'>
            <div className='image'>
                <p>IMAGE PLACEHOLDER</p>
            </div>
            <div className='description'>
                <h3>{this.state.item.itemTitle}</h3>
                <ul>
                    <li>Seller: {this.state.user}</li>
                    <li>Price: ${this.state.item.price}</li>
                    <li>{this.state.item.description}</li>
                    <li>Looking for: {this.state.item.desiredItems}</li>
                </ul>
                <button>Make offer</button>
            </div>
          </div>
        )
      }
      else
        return null;
    }
}

export default Listing;
