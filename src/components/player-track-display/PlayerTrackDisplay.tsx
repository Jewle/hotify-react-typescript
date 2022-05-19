import React, {FC} from 'react';
import { ITrack } from '../../interfaces';
import SharePlayIcon from "../hotify-ui/SharePlayIcon/SharePlayIcon";
import AddButton from "../common/add-button/AddButton";

interface PlayerTrackDisplayProps {
    track:ITrack,
    likeSong:(track:ITrack)=>void
}


const  PlayerTrackDisplay:FC<PlayerTrackDisplayProps> = ({track,likeSong}) => {
    const {trackCover,artists,trackName} = track
    return (
        <div className="footer-left">
            <div className="artist-cover">
                <img src={trackCover} alt=""/>
            </div>
            <div className="track-data">
                <div className="track-data-item"><a href='#' >{trackName}</a></div>
                <div className="track-data-item"><a href='#'></a></div>
            </div>
            <div className="track-misc">
                   <AddButton track={track} attachSongsToPlaylist={()=>likeSong(track)} removeSong={(track)=>{}} />
                <button>
                    <SharePlayIcon/>
                </button>
            </div>
        </div>
    )
}

export default PlayerTrackDisplay
