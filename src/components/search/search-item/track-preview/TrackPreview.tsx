import {Link} from "react-router-dom";
import React, {FC, useEffect, useState} from "react";
import TrackToggle from "../../../track-toggle/TrackToggle";
import { ITrack } from "../../../../interfaces";
import LoadingSpinner from "../../../hotify-ui/LoadingSpiner/LodaingSpiner";
import {useDispatch} from "react-redux";
import {searchTrack} from "../../../../store/action-creators";
import AddButton from "../../../common/add-button/AddButton";

interface TrackPreviewProps {
    track:ITrack
    trackSwitch:(track:any)=>void
    isTrackPlaying:boolean
    likeSong:(track:ITrack)=>void
    dislikeSong:(id:string)=>void
}


const  TrackPreview:FC<TrackPreviewProps> = (props) => {
    const [track,setCompleteTrack] = useState({} as ITrack)
    const {track:searchedTrack,likeSong,dislikeSong} = props
    const { trackCover, trackName, artists,id,src} = track
    const {trackSwitch,isTrackPlaying} = props

    const dispatch = useDispatch()
    useEffect(()=>{

       setTimeout(()=>{
           // @ts-ignore
           dispatch(searchTrack({src:searchedTrack.id})).then(({payload})=>{
               setCompleteTrack(payload)
           })
       },1500)
    },[searchedTrack.id])



    if (track?.id){
        return <div className='artist-preview'>
            <img className='artist-preview-cover' src={trackCover} alt=""/>
            <h2 className='artist-preview-title'>{trackName}</h2>
            <Link to={`/artist/${track.id}`}><small>{artists?.name}</small></Link>
            <p>ТРЕК</p>
            <div className="preview-overlay"></div>
            <div className="preview-play-button">
                <button onClick={()=>trackSwitch(track)} >
                    <TrackToggle isActive={isTrackPlaying} isTrackPlaying={isTrackPlaying}/>
                </button>
            </div>

            <AddButton track={track} attachSongsToPlaylist={likeSong} removeSong={dislikeSong}/>

        </div>
    }
    return <LoadingSpinner/>
}

export default TrackPreview
