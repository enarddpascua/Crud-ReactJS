import React from 'react';

const Footer = (props) => {
    return (
     <div className = "foot">
        <div className = "leftFootLinks">
            <a className = "links2" href = "/">{props.link}</a>
         </div>
         <div className = "rightFootLinks">
            <a className = "links2" href = "/">{props.links}</a>
         </div>
     </div>   
    )
}
export default Footer;