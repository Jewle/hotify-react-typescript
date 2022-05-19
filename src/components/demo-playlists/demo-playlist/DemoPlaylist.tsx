import React, {FC} from "react";
import './demo-playlist.scss'
import {Link} from "react-router-dom";
import { IDemoPlaylist } from "../../../interfaces";

interface DemoPlaylistProps {
    playlist:IDemoPlaylist
    displayType?:string
}

const DemoPlaylist:FC<DemoPlaylistProps> = ({playlist:{description,name,id,image},displayType})=> {
    return <div className='demo-playlist'>
            <div className="demo-playlist-content">
                <Link to={`/${displayType==='album' ? 'album': 'playlist'}/${id}`}>
                    <img src={image} alt=""/>
                </Link>
                <h4 className='demo-playlist-header'>{name}</h4>
                <p className='demo-playlist-desc'>{description}</p>
            </div>
    </div>
}

export default DemoPlaylist
