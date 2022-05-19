import React, {FC, useEffect, useState} from "react";
import Header from "../header/Header";
import RecentlyPlayed from "../recently-played/RecentlyPlayed";
import DemoPlaylists from "../demo-playlists/DemoPlaylists";
import {useDispatch} from "react-redux";
import {fetchDemoPlaylists} from "../../store/action-creators";
import { IDemoPlaylist, ITrack } from "../../interfaces";
import LoadingSpinner from "../hotify-ui/LoadingSpiner/LodaingSpiner";
import useTypedSelector from "../../hooks/useTypedSelector";
import trackSlice from "../../store/reducers/trackSlice";

interface IMainPageProps {

}

const  MainPage:FC<IMainPageProps> = ()=> {

    let lsState =localStorage.getItem('newStore')
    let recentlyPlayedTracks = []
    if (lsState) recentlyPlayedTracks=JSON.parse(lsState).track.recentlyPlayedTracks

    const [playlists,setPlaylists] = useState<IDemoPlaylist[]>([])
    const {currentTrack,isTrackPlaying} = useTypedSelector(state => state.track)
    const {trackSwitch} = trackSlice.actions
    const dispatch = useDispatch()



    useEffect(()=>{
        // @ts-ignore
        dispatch(fetchDemoPlaylists(2)).then(({payload}:IDemoPlaylist[])=>{
            setPlaylists(payload)
        })
    },[])


    return(
        <React.Fragment>
            <Header/>
            <RecentlyPlayed
                trackSwitch={(track:ITrack)=>{dispatch(trackSwitch({track}))}}
                isTrackPlaying={isTrackPlaying}
                currentTrack={currentTrack}
                recentlyPlayedTracks={recentlyPlayedTracks}

            />
            {playlists.length>0 ? <DemoPlaylists playlists={playlists}/>: <LoadingSpinner/>}
        </React.Fragment>
    )
}

export default MainPage
