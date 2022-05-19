import React, {FC} from 'react';
import './recently-played.scss'
import RecentlyPlayedCard from "./recenltly-played-card/RecentlyPlayedCard";
import { ITrack } from '../../interfaces';

interface RecentlyPlayedProps {
    isTrackPlaying:boolean
    recentlyPlayedTracks:ITrack[]
    trackSwitch:(track:ITrack)=>void
    currentTrack:ITrack
}
 const  RecentlyPlayed:FC<RecentlyPlayedProps> =  ({isTrackPlaying,recentlyPlayedTracks,trackSwitch,currentTrack}) => {


    return (
        <div className="home-page-wrapper">
            <div className="section-bg"></div>
            <section className="home-page main-container">
                <section className="hello">
                    <div className="hello-title title-1">
                        Добрый день
                    </div>
                    <div className="hello-playlists">
                        {recentlyPlayedTracks.map(track=><RecentlyPlayedCard
                            key={track.id}
                            isTrackPlaying={isTrackPlaying}
                            trackSwitch={trackSwitch}
                            currentTrack={currentTrack}
                            track={track}
                        />)}
                    </div>
                </section>
            </section>
        </div>
    )
}



// @ts-ignore
export default RecentlyPlayed
