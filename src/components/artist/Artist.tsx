import React, {FC, useEffect, useState} from "react";
import Header from "../header/Header";
import DemoPlaylists from "../demo-playlists/DemoPlaylists";
import {useDispatch} from "react-redux";
import {fetchArtist} from "../../store/action-creators";
import { IArtist } from "../../interfaces";
import LoadingSpinner from "../hotify-ui/LoadingSpiner/LodaingSpiner";
import Playlist from "../playlist/Playlist";


interface ArtistProps{
    match:any
}

const Artist:FC<ArtistProps> = (props)=> {
    const {id} = props.match.params
    const [artist,setArtist] = useState<IArtist>({} as IArtist)
    const [tracks,setTracks] = useState([])
    const dispatch = useDispatch()

    useEffect(()=>{
        // @ts-ignore
        dispatch(fetchArtist({id,artistLoaded})).then(({payload})=>setTracks(payload))
    },[id])

    const artistLoaded = (artist:IArtist)=> {
        setArtist(artist)
    }

    return(
        <div className='artist'>
            {   Object.keys(artist).length<1
                ? <LoadingSpinner/>
                : <Header type='artist' artistInfo={{
                name:artist.name,
                monthlyListeners:artist.monthlyListeners,
                isVerified:artist.verified,
                headerImg:artist.headerImg
            }}/> }
           <Playlist withHeader={false} data={tracks}/>
            {tracks.length>0 && <DemoPlaylists displayType='album'  playlists={artist.discography.albums}></DemoPlaylists>}
        </div>
    )
}



export default Artist
