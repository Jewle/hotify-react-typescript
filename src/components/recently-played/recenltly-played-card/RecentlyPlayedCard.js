import React from 'react';
import TrackToggle from "../../track-toggle/TrackToggle";

export default function RecentlyPlayedCard (props) {
    const {trackCover,trackName,artists,id} =  props.track

    const {currentTrack,isTrackPlaying,trackSwitch} = props
    return (
        <div className="hello-playlist-card">
            <div className="hello-playlist-card-content">
                <div className="playlist-cover cover-rounded">
                    <img className="cover-rounded"
                        src={trackCover} alt=""/>
                </div>
                <div className="playlist-name">
                    {trackName}
                </div>
                <button onClick={()=>trackSwitch(props.track)} className="playlist-playButton roundedButton activated-bg">
                   <TrackToggle id={id} isTrackPlaying={isTrackPlaying} currentTrackId={currentTrack.id}/>
                </button>
            </div>
        </div>
    )
}
