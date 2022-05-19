import {Link} from "react-router-dom";
import React, {FC} from "react";
import { IArtist } from "../../../../interfaces";

interface ArtistPreviewProps {
    artist:IArtist
}

const  ArtistPreview:FC<ArtistPreviewProps> = ({artist}) => {
    const {artistCover,name,uri} = artist

    return (
        <div className='artist-preview'>
            <img className='artist-preview-cover' src={artistCover} alt=""/>
            <h2 className='artist-preview-title'><Link to={'/artist/'+ uri}>{name}</Link></h2>
            <p>ИСПОЛНИТЕЛЬ</p>
        </div>
    )
}

export default ArtistPreview
