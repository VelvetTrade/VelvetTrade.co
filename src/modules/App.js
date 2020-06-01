import React from 'react';
import TopNav from './nav/TopNav';
import PageContent from './PageContent';
import HomePage from './homepage/Homepage';
import Listing from './homepage/Listing';
import useSticky from '../miscJS/useSticky';
import '../css/App.css';

import { BrowserRouter as Router, Route } from 'react-router-dom' 

function App() {
  const { isSticky, element } = useSticky();
  return (
    <div className="App">
      <Router>
        <TopNav sticky={isSticky}/>
        <main>
          <Route exact={true} path="/" render={()=><PageContent element={element} content={<HomePage/>}/>}/>
          <Route exact={true} path="/test" render={()=><h1>test</h1>}/>
          <Route exact={true} path="/item" render={()=><PageContent element={element} content={<Listing/>}/>}/>
        </main>
      </Router>
    </div>
  );
}

export default App;
