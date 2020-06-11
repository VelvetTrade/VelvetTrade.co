import React from 'react';
import './../../css/App.css';
import './../../css/Trade.css';

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


  render() {
    return (
      <div className='grid-container'>
        <div className='leftItem'>
          <h3>Raghav Vivek</h3>
          <div className='card'>
            <p>Yarn Yoshi Amiibo</p>
            <img className='thumbnail'
              src='https://nintendofigures.files.wordpress.com/2017/02/yarn-poochy-amiibo-licking-yarn-yoshi.jpg'
            />
            <p>Looking for: Other rare amiibo</p>
          </div>
        </div>

        <div className='controls'>
          <input type='checkbox' title='Ready?' />
          <button>Trade!</button>
          <input type='checkbox' title='Ready?' />
        </div>

        <div className='rightItem'>
          <h3>Yifan Xu</h3>
          <div className='card'>
            <p>Celica Amiibo</p>
            <img className='thumbnail'
              src='https://pbs.twimg.com/media/EOQc9duW4AIaEs5.png'
            />
            <p>Looking for: Other rare amiibo</p>
          </div>
        </div>
      </div>
    )
  }
}

export default Trade;
