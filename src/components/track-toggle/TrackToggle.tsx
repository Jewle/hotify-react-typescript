import React, {FC} from 'react'
import './track-toggle.scss'
import PlayTriangle from "../hotify-ui/PlayTriangle/PlayTriangle";
import Pause from "../hotify-ui/Pause/Pause";

interface TrackToggleProps {
    isTrackPlaying:boolean,
    isActive:boolean
}


const TrackToggle:FC<TrackToggleProps> =({isTrackPlaying,isActive})=> {

    if(isTrackPlaying && isActive){
        return (
            <Pause/>
        )
    }
    return (
           <PlayTriangle/>
    )
}


export default TrackToggle

