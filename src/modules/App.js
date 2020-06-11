import React, {useState} from 'react';
import LoginPage from './loginpage/LoginPage'
import HomePage from './homepage/Homepage';
import SignupPage from './loginpage/SignPage';
import CreateGroupPage from './accountpage/CreateGroupPage';
import Listing from './homepage/Listing';
import Trade from './homepage/Trade';
import GroupDetailPage from './groupspage/GroupDetailPage';
import CreateListingPage from './accountpage/CreateListingPage';
import RSNav from './nav/RSNav'
import '../css/App.css';

import { BrowserRouter as Router, Route } from 'react-router-dom' 
function App() {
  const [ userInfo, setUserInfo ] = useState(null)

  return (
    <div className="App">
      <Router>
        <RSNav userInfo={userInfo} setUserInfo={info=>setUserInfo(info)}/>
        <main>
          <Route exact={true} path="/" render={()=><HomePage userInfo={userInfo}/>}/>
          <Route exact={true} path="/signup" render={()=><SignupPage userInfo={userInfo} />}/>
          <Route exact={true} path="/createGroup" render={()=><CreateGroupPage userInfo={userInfo} />}/>
          <Route exact={true} path="/login" render={()=><LoginPage userInfo={userInfo} setUserInfo={info=>setUserInfo(info)}/>}/>
          <Route exact={true} path="/group/:groupId" render={routeInfo=><GroupDetailPage userInfo={userInfo} routeInfo={routeInfo} setUserInfo={info=>setUserInfo(info)}/>}/>
          <Route exact={true} path="/item/:groupId/:postId" render={match=><Listing match={match} userInfo={userInfo}/>}/>
          <Route exact={true} path="/trade/:groupId/:postId1/:postId2" render={match=><Trade match={match} userInfo={userInfo}/>}/>
          <Route exact={true} path="/createListing/:groupId" render={routeInfo=><CreateListingPage userInfo={userInfo} routeInfo={routeInfo}/>}/>
          <Route exact={true} path="/test" render={()=><h1>test</h1>}/>
        </main>
      </Router>
    </div>
  );
}

export default App;
