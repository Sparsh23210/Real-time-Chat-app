import React from 'react'
import onlineImage from '../icons/onlineImage.png';
import imageclose from '../icons/imageclose.png';
export default function Navbar({room}) {
return (
    <div className="infobar d-flex justify-content-between align-items-center p-2 bg-light border-bottom">
        <div className="leftInnerContainer d-flex align-items-center">
            <img className="onlineIcon me-2" src={onlineImage} alt="online" width="24" height="24" />
            <h5 className="ml-10">{room}</h5>
        </div>
        <div className="rightInnerContainer">
            <a href="/" className="btn btn-outline-secondary btn-sm">
                <img src={imageclose} alt="close" width="20" height="20" />
            </a>
        </div>
    </div>
)
}
