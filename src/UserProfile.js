// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';
import '../../css/sentinel.css';
import CONFIG from '../config';

//insert with <Route exact={true} path="/item/:groupId/:postId" render={match=><Listing match={match}/>}/>
const fetch = require('node-fetch');
class UserProfile extends React.Component {
	//The barebones html code is here
    render() {
		let i = 0;
		for(i= 0; i<this.getGroups(); i++){
			this.postingTags.push(this.commitGroups(i), this.getPostings(i));
		}
        const style1 = {
            marginRight: "100%", 
            fontSize: "20px",
            color: "white"
		};
        return (
            <div id = "Container">
			    <div id= "Title" >
				    <p id = "name" style = {{ align:"center"}}>Ishan Parikh</p>
			    </div>
			<div id="EditBox" style = {{width: "100%"}}>
				<table align = "center">
					<tr>
							<td>
								<p>Username</p>
							</td>
							<td>
                                <p>{this.state.username}</p>
							</td>
						</tr>
					<tr>
							<td>
								<p>Password</p>
							</td>
							<td>
                                <p>{this.state.password}</p>
							</td>
						</tr>
				</table>
				<button> 
					<p>Save</p>
				</button>
			</div>
			<div id = "PostingTitle">
				<label style = {style1}>Listings: </label>
				<button style = {{display: "inline-block"}}> Add</button>
			</div>
			<div id ="PostingBox">
				posting Tags;
			</div>			
		</div>
        );
    }

	commitPostings(int_i, posting){ //should be working fine
		return (
				<div class = "Posting" id = {int_i}>
					<label style = {{float: "left"}}>posting.itemTitle</label>
				</div>
		);
	}

	getPostings(int_i){ //should be working fine
		return this.state.postings[int_i];
	}

	doSet(){
      let groupId = this.props.match.match.params.groupId;
      let postId = this.props.match.match.params.postId;
      let item = null;
      let user = "";

      // Fetch item data
      let targetURL = CONFIG.apiURL + `/getPostingById/${groupId}/${postId}`;
      console.log(targetURL);
	  fetch(targetURL, { headers: CONFIG.corsHeader }).then(res => 
		{
          if(res.status === 404) {
            this.setState({ attemptStatus: "Item not found" });
          }
          else if(res.status !== 200 ) {
            this.setState({ attemptStatus: `Network Failure: Status ${res.status}, the server may be down.` }); //
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
		  this.setState({ item: json })
		}); 
		//
		targetURL = CONFIG.apiURL + `/getUserById/${this.state.json.userId}`
		console.log(targetURL)
		fetch(targetURL, { headers: CONFIG.corsHeader }).then(res => 
		  {
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
			  this.setState({ username : json.username });
			  this.setState({password : json.password});
			  this.setState({ attemptStatus: "finished" });
			}
		  })
		  .catch(error => {
			console.error(error);
			this.setState({ attemptStatus: `Network Failure: ${error.message}` });
		  })
		//username
		targetURL = CONFIG.apiURL + `/getUserById/${this.state.json.userId}`
		console.log(targetURL)
		fetch(targetURL, { headers: CONFIG.corsHeader }).then(res => 
		  {
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
			  this.setState({ username : json.username });
			  this.setState({ attemptStatus: "finished" });
			}
		  })
		  .catch(error => {
			console.error(error);
			this.setState({ attemptStatus: `Network Failure: ${error.message}` });
		  })

		  /** 
		   * 
		   **/
		  targetURL = CONFIG.apiURL + `getAllPostingsPerUser/${this.state.json.userId}`
		console.log(targetURL)
		fetch(targetURL, { headers: CONFIG.corsHeader }).then(res => 
		  {
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
			  this.setState({ postings : json });
			}
		  })
		  .catch(error => {
			console.error(error);
			this.setState({ attemptStatus: `Network Failure: ${error.message}` });
		  })
		  /** 
		   * 
		   * 
		  */
		 
	}


    constructor(props) {
        super(props);
        this.state = {
			userInfo: props.userInfo,
			username: "",
			password: "",
			item: "",
            postings: []
        }
		this.postingTags = [];
		this.doSet();
    }
    
    
    
}

export default UserProfile;