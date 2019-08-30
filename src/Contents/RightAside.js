import './rightAside.css';
import React from 'react';

const RightAside = () => {
    return (
        <div className = "rootDiv">
            <h1 className = "rightTitle">Advertisment</h1>
            <div className = "ad1">
                <img src="ad1.jpeg" alt="alcohol"/>
            </div>
            <div className ="ad2">
                <img src = "ad2.jpeg" alt ="commentator"/>
            </div>
        </div>
    )
} 
export default RightAside;