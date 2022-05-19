import TrackList from "../track-list/TrackList";
import React, {FC} from "react";
import AddTracks from "../add-tracks/AddTracks";
import { IPlayList, ITrack } from "../../interfaces";
interface TrackListViewProps {
    addSongs:(songs:ITrack[],playlistId:string)=>void,
    removeSong:(id:string,playlistId:string)=>void
    playlist:IPlayList,
    trackListType:string,
    currentTrack:ITrack,
    trackSwitch:(track:ITrack|string)=>void,
    isTrackPlaying:boolean,
    playlists:IPlayList[],
    searchTrack:(q:string)=>Promise<ITrack>
    searchTrackByQuery:(q:string)=>Promise<ITrack>
}


const TrackListView:FC<TrackListViewProps> =(
    {
        addSongs,
        playlist,
        trackListType,
        currentTrack,
        trackSwitch,
        isTrackPlaying,
        playlists,
        searchTrack,
        removeSong,
        searchTrackByQuery
    })=> {

    if (playlist.count>0){
        return <TrackList trackSwitch={trackSwitch}
                          currentTrack={currentTrack}
                          type={trackListType}
                          isTrackPlaying={isTrackPlaying}
                          addSongs={addSongs}
                          tracks={playlist.songs}
                          playlists={playlists}
                          removeSong={removeSong}
        />
    }
    return  <AddTracks addSongs={(tracks)=>addSongs(tracks,playlist.id as string)}
                       searchTrack={searchTrack}
                       searchTrackByQuery={searchTrackByQuery}
                       playlistId={playlist.id as string}/>
}

export default TrackListView
