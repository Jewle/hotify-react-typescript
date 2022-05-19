import React, {FC} from 'react';
import './track-list.scss'
import TrackListItem from "./track-list-item/TrackListItem";
import {IPlayList, ITrack } from '../../interfaces';

interface TrackListProps {
    tracks:ITrack[],
    type:string,
    addSongs:(songs:ITrack[],playlistId:string)=>void,
    removeSong:(id:string,playlistId:string)=>void
    trackSwitch:(track:ITrack|string)=>void,
    currentTrack:ITrack,
    isTrackPlaying:boolean,
    playlists:IPlayList[]
}


const TrackList:FC<TrackListProps> = (
    {
        tracks=[],
        type,
        trackSwitch,
        currentTrack,
        isTrackPlaying,
        addSongs,
        playlists,
        removeSong
    }
    )=> {

    const numberOfTracks=tracks.length
     if (numberOfTracks===0){
         return (
             <div>
                 Пока нет треков здесь
             </div>
         )
     }
    return (
        <div className="track-list-wrapper">
            <section className="track-list">
                {type!=='stats'
                && <div className="track-list-header">
                    <div className="track-list-header-item">#</div>
                    <div className="track-list-header-item">НАЗВАНИЕ</div>
                    <div className="track-list-header-item">АЛЬБОМ</div>
                    <div className="track-list-header-item">ДАТА ДОБАВЛЕНИЯ</div>
                    <div className="track-list-header-item">ЧАСИКИ</div>
                </div>
                }

                <ul className="track-set">
                    {tracks.map((track,index)=>{
                        const isActive = track.id===currentTrack.id
                        return <li key={track.id} className="track-set-item">
                            <TrackListItem
                                           type={type}
                                           track={track}
                                           index={index}
                                           trackSwitch={trackSwitch}
                                           isTrackPlaying={isTrackPlaying}
                                           isActive={isActive}
                                           addSongs={addSongs}
                                           playlists={playlists}
                                           removeSong={removeSong}
                            />
                        </li>
                    })}

                </ul>
            </section>
        </div>
    )
}


export default TrackList;
