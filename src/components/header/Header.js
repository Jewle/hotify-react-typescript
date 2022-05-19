import React from 'react';
import './header.scss'
import HeaderElements from "./header-elements/HeaderElements";
import HeaderInfo from "./header-info/HeaderInfo";

export default  function Header (props) {
    const {type}=props
    const isWide  = type==='artist'
    const bgStyles = type==='artist' ? {backgroundImage:`url(${props.artistInfo.headerImg})`} : {}

    return(
        <div className={`header-wrapper ${isWide && ' wide ' }`}>

            <div className="section-bg" style={bgStyles}></div>
            <header className="main-container">
                <HeaderElements/>
                <HeaderInfo info={props.artistInfo}/>
            </header>
        </div>

    )
}
