import React from 'react';

const LeftAside = (props) => {
    return(
        <div>
        <h3 className = "leftHeader">{props.leftHead}</h3>
        <a className = "links1" href = "/">{props.linkTitle}</a>
        <p>{props.para}</p>
        </div>
    )
}
export default LeftAside;