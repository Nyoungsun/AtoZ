import React from 'react';
import '../css/Result.css';
import logo from '../logo.png';

const search = () => {
    return (
        <div>
            <div id='logoDiv'>
                <img src={logo} alt='logo'/>
            </div>
            <div id='searchDiv'>
                <input></input>
            </div>
        </div>
    );
};

export default search;