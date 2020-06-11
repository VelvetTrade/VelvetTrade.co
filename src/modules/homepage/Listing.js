import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap'
import './../../css/Listing.css';
import CONFIG from '../config';

const fetch = require('node-fetch');

class Listing extends React.Component {
    constructor(props) {
      super(props);
      
      this.state = {
        item: null,
        user: "",
        offers: null,
        attemptStatus: "",
      }
    }

    componentDidMount() {
      let groupId = this.props.match.match.params.groupId;
      let postId = this.props.match.match.params.postId;

      // Fetch item data
      let targetURL = CONFIG.apiURL + `/getPostingById/${groupId}/${postId}`;
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
          if(!json) this.setState({ atemptStatus: "Item not found" })
          else {
            return json;
          }
        })
        .catch(error => {
          console.error(error);
          this.setState({ attemptStatus: `Network Failure: ${error.message}` });
        })
        .then(json => {
          if(!json) return;
          this.setState({ item: json });

          // Fetch user info
          targetURL = CONFIG.apiURL + `/getUserById/${json.userId}`
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
              if(!json) this.setState({ ttemptStatus: "Item not found" })
              else {  
                this.setState({ user: json.username });
              }
            })
            .catch(error => {
              console.error(error);
              this.setState({ attemptStatus: `Network Failure: ${error.message}` });
            })
            return json;
        })
        .then(json => {
          if(!json) return;
          // Fetch Offers info
          if(json.offers && json.offers.length > 0) {
            const batchListingTargetURL = CONFIG.apiURL + `/getPostingsByIds/${this.props.match.match.params.groupId}/${json.offers.join()}`
            fetch(batchListingTargetURL, { headers: CONFIG.corsHeader })
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
                if(!json) this.setState({ atemptStatus: "Item not found" })
                else {  
                  this.setState({offers: json})
                }
              })
              .catch(error => {
                console.error(error);
                this.setState({ attemptStatus: `Network Failure: ${error.message}` });
              })
          }
          else this.setState({offers: []})
        })
    }

    makeCards (posts) {
      if(this.state.item.acceptedOfferId) return <p>This trade post is completed.</p>
      if(!posts) return <p>Loading Offers...</p>
      if(posts.length === 0) return <p>No Offers Found.</p>
      if(this.state.attemptStatus) return <p>{this.state.attemptStatus}</p>;
      let allCards = posts.map(post => post ? (
        <div key={post.id}>
            <div className="offerContainer">
              <img src="" className="offerImg" alt={`img<${post.itemTitle}>`}/>
              <div className="offerDetails">
                <Link to={`/trade/${this.props.match.match.params.groupId}/${this.state.item.id}/${post.id}`}><h5 className="offerDetailText">{post.itemTitle}</h5></Link>
                <p className="offerDetailText">Price: {post.price}</p>
                <p className="offerDetailText">{post.description}</p>
              </div>
            </div>
            <hr/>
        </div>
      ) : null)
      return allCards
    }

    render() {
      if(this.state.item != null) {
        return (
          <div className='Listing'>
            <div className='main'>
              <div className='image'>
                  <p>IMAGE PLACEHOLDER</p>
              </div>
              <div className='description'>
                  <h3>{this.state.item.itemTitle}</h3>
                  <ul>
                      <li>Status: {this.state.item.acceptedOfferId ? (this.state.item.offer ? "Offer" : "Completed") : "Incomplete"}</li>
                      <li>Seller: {this.state.user}</li>
                      <li>Price: ${this.state.item.price}</li>
                      <li>{this.state.item.description}</li>
                      <li>Looking for: {this.state.item.desiredItems}</li>
                  </ul>
                  <div>
                    {/* Button should be disabled if the user is not signed in, is the original poster, or the item isn't loaded yet */}
                    <Button 
                      to={`/createOffer/${this.props.match.match.params.groupId}/${this.state.item.id}`}
                      disabled={!this.props.userInfo || !this.state.item || (this.props.userInfo && this.props.userInfo.id === this.state.item.userId)} 
                      tag={Link}
                    >
                      Make Offer
                    </Button>
                    {this.props.userInfo ? null : <p>Sign in to make an offer!</p> }
                    {this.props.userInfo && this.state.item && this.props.userInfo.id === this.state.item.userId ? <p>Cannot make an offer on your own post</p> : null}
                  </div>
              </div>
            </div>
              <div className='offers'>
                <h3 id="offerTitle">Offers</h3>
                <hr/>
                {this.makeCards(this.state.offers)}
              </div>
          </div>
        )
      }
      else
        return null;
    }
}

export default Listing;
