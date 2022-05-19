import React, {Context, FC, useContext, useEffect, useMemo, useRef, useState} from 'react';
import './player.scss'
import PlayerTrackDisplay from "../player-track-display/PlayerTrackDisplay";
import PlayerMisc from "../player-misc/PlayerMisc";
import PlayerControls from "../player-controlls/PlayerControls";
import {TrackControlContext} from "../context";
import useTypedSelector from "../../hooks/useTypedSelector";
import {ITrack, ITrackControl } from '../../interfaces';
import trackSlice from "../../store/reducers/trackSlice";
import {useDispatch} from "react-redux";
import volume from "../../store/reducers/volume";

interface PlayerProps {

}

const Player:FC<PlayerProps> = () =>{

    const {currentTrack:track,isTrackPlaying} = useTypedSelector(state => state.track)
    const {trackSwitch,trackToggle,addSongToPlaylist} = trackSlice.actions
    const {change} = volume.actions
    const {volume:volumeValue} = useTypedSelector(state => state.volume)
    const dispatch = useDispatch()
    const TrackControl = useContext(TrackControlContext)

    const sound = useMemo(()=>new TrackControl(track.src),[track.src])




    sound.once('end', ()=>{
        dispatch(trackSwitch({track:track.next}))
    })



    useEffect(()=>{
        if (sound.state()==='loaded'){
            sound.play()
        }

        return ()=>{
            sound.stop()

        }
    },[track.id,sound])

    useEffect(()=>{
        if (isTrackPlaying){
            sound.play()

        }
        else{
            sound.pause()

        }

    },[sound,isTrackPlaying])

    return (
        <div className="footer-player-container">
            <footer>
                <PlayerTrackDisplay
                    track={track}
                    likeSong={(track:ITrack)=>addSongToPlaylist({songs:[track],playlistId:'fav'})}
                />
                <PlayerControls
                    trackControl={sound}
                    track={track}
                    trackSwitch={(track:any)=>dispatch(trackSwitch(track))}
                    trackToggle={()=>dispatch(trackToggle())}
                    isTrackPlaying={isTrackPlaying}
                />
                <PlayerMisc
                    trackControl={sound}
                    volume={volumeValue}
                    changeVolume={(val)=>{dispatch(change({volume:val}))}}/>
            </footer>
        </div>
    )
}



export default Player
