import React, {FC,useState} from "react";
import './playlists-view.scss'
import TrackListView from "../track-list-view/TrackListView";
import {IPlayList, ITrack } from "../../interfaces";
import LoadingSpinner from "../hotify-ui/LoadingSpiner/LodaingSpiner";
import PlaylistHeader from "../playlist/playlist-header/PlaylistHeader";

interface PlaylistViewProps {
   params:{
       playlist:IPlayList,
       currentTrack:ITrack,
       isTrackPlaying:boolean,
       playlists:IPlayList[],
       volume:number,
       playlistLoading:boolean
       match?:{
           path:string
           params:{id:string}
       }
       actions:{
           addSongToPlaylist:(songs:ITrack[],playlistId:string)=>void,
           trackSwitch:(track:ITrack | string)=>void,
           clearPlaylist:()=>void,
           removeSongFromPlaylist:(id:string,playlistId:string)=>void,
           searchTrack:(q:string)=>Promise<ITrack>
           searchTrackByQuery:(q:string)=>Promise<ITrack>
       }
       isAlbum:boolean
   }
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
const PlaylistsView:FC<PlaylistViewProps> = ({params})=>{
    const [open,setOpen] = useState(false)
    let {playlist,
        currentTrack,
        isTrackPlaying,
        playlists,
        volume,
        playlistLoading
    } = params
    const {
        addSongToPlaylist,
        trackSwitch,
        removeSongFromPlaylist,
        searchTrack,
        searchTrackByQuery
    } = params.actions







    if (playlistLoading){
        return <LoadingSpinner/>
    }


    return <div className='playlists-view'>
            <div className="main-container">
                <TrackListView addSongs={addSongToPlaylist}
                               playlist={playlist}
                               trackListType={''}
                               playlists={playlists}
                               currentTrack ={currentTrack}
                               trackSwitch={trackSwitch}
                               removeSong={removeSongFromPlaylist}
                               isTrackPlaying={isTrackPlaying}
                               searchTrack={searchTrack}
                               searchTrackByQuery={searchTrackByQuery}
                />
            </div>

        </div>

}



export default PlaylistsView

// export default PlaylistsView
