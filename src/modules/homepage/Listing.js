import React from 'react';
import PageContent from './../PageContent'
import './../../css/App.css';
import './../../css/Listing.css';

class Listing extends React.Component {
    render() {
        return (
            <div className='Listing'>
                <div className='image'>
                    <p>IMAGE PLACEHOLDER</p>
                </div>
                <div className='description'>
                    <h3>Yarn Yoshi amiibo</h3>
                    <ul>
                        <li>Seller: Raghav Vivek</li>
                        <li>Price: $9999</li>
                        <li>RARE Yarn Yoshi Amiibo, loose. Came with Yoshi's Wooly World game.</li>
                        <li>Looking for: Other rare amiibo</li>
                    </ul>
                    <button>Trade Item</button>
                </div>
            </div>
        )
    }
}

export default Listing;
