import './navigations.css';
import React from 'react';

class Navigations extends React.Component {


    render(){
        var visibility = "hide";
 
        if (this.props.menuVisibility) {
        visibility = "show";
        }
        
        return(
            <div id = "flyoutMenu" onMouseDown = {this.props.handleMouseDown} className= {visibility}>
            <nav className = "navigations">
                <a href = "/">Home</a>
                <a href = "/">Places</a>
                <a href = "/">Things</a>
                <a href = "/">Blog</a>
                <a href = "/">Contact</a>
            </nav>
        </div>
        )
    }
}
export default Navigations;