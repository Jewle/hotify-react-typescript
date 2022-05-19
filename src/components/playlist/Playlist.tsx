import React, {FC, PropsWithChildren, ReactNode, useEffect, useState} from 'react';
import useTypedSelector from "../../hooks/useTypedSelector";
import trackSlice from "../../store/reducers/trackSlice";
import {fetchPlayList, searchTrack, searchTrackByQuery} from "../../store/action-creators";
import LoadingSpinner from "../hotify-ui/LoadingSpiner/LodaingSpiner";
import {useDispatch} from "react-redux";
import { ITrack } from '../../interfaces';
import PlaylistHeader from "./playlist-header/PlaylistHeader";
import PlaylistsView from "../playlist-view/PlayListView";

interface PlaylistProps{
    data?:ITrack[] | string
    match?:any
    withHeader?:boolean
    children?:ReactNode

}

const Playlist:FC<PlaylistProps> = (props) => {
    let  {withHeader, data} = props
    withHeader = true
    const [header,setHeader] = useState(withHeader)


    const id = data ? '' : props?.match?.params?.id

    let {playlist,
        currentTrack,
        isTrackPlaying,
        playlists,
        volume,
        playlistLoading
    } = useTypedSelector(state => state.track)
    const {
        addSongToPlaylist,
        trackSwitch,
        test,
        clearPlaylist,
        removeSongFromPlaylist,
        setPlaylist
    } = trackSlice.actions
    const {title,count} = playlist
    const dispatch = useDispatch()
    let isAlbum = false




    useEffect(()=>{

        isAlbum = props?.match?.path?.search('album') !== -1
        if (data){
            dispatch(setPlaylist({count:data.length,title:'',songs:data}))
            setHeader(false)
        }
        else {
            dispatch(fetchPlayList({id,isAlbum}))
        }
        return ()=>{
            dispatch(clearPlaylist(3))
        }
    },[id])


    if (playlistLoading){
        return <LoadingSpinner/>
    }
    return (
        <div>
            {header && <PlaylistHeader title={title} count={count}/>}
            <PlaylistsView params={{
                playlist,
                currentTrack,
                isTrackPlaying,
                playlists,
                volume,
                playlistLoading,
                isAlbum,
                actions:{
                    addSongToPlaylist:(songs:ITrack[],playlistId:string)=>dispatch(addSongToPlaylist({songs,playlistId})),
                    trackSwitch:(track:ITrack | string)=>dispatch(trackSwitch({track})),
                    clearPlaylist:()=>dispatch(clearPlaylist(3)),
                    removeSongFromPlaylist:(id:string,playlistId:string)=>dispatch(removeSongFromPlaylist({id,playlistId})),
                    searchTrack:(q:string)=>dispatch(searchTrack({src:q})) as unknown as Promise<ITrack>,
                    searchTrackByQuery:(q:string)=>dispatch(searchTrackByQuery({src:q})) as unknown as Promise<ITrack>
                }
            }}/>
        </div>
    );
};

export default Playlist;
