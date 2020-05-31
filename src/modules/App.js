import React from 'react';
import TopNav from './nav/TopNav';
import PageContent from './PageContent';
import useSticky from '../miscJS/useSticky';
import '../css/App.css';

function App() {
  const { isSticky, element } = useSticky();
  return (
    <div className="App">
      <TopNav sticky={isSticky}/>
      <PageContent element={element}/>
    </div>
  );
}

export default App;
