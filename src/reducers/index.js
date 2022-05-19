import { uid } from 'uid';
import {createSlice} from "@reduxjs/toolkit";
const lsState = JSON.parse(localStorage.getItem('state')) || {}
const playlists =
      lsState && lsState.playlists
    ? lsState.playlists
    : [{id:"fav",title: 'Любимые треки', songs:[]}]
const recentlyPlayedTracks = lsState  ? (lsState.recentlyPlayedTracks || []) : []


//Fix problem with track switching

const initialState = {
    currentTrack:{id:'', title:'', artistName:'',trackCover:''},
    isTrackPlaying:false,
    playlists:playlists.map(p=>({...p,isLocal:true})),
    recentlyPlayedTracks,
    currentPlaylist:{songs:[]},
    volume:0.3

}










function TrackControlReducer(state=initialState,action) {
    switch (action.type) {

        case 'TRACK_SWITCH':{
            let {track,playlist} = action.payload
            const currentTrack = typeof track === 'string'
                ? state.currentPlaylist.songs.find(t=>t.id===track)
                : track

            const isTrackInCurrentPlaylist = !!state.currentPlaylist.songs.find(t=>t.id===track.id)

            if (Object.keys(playlist).length<1){
                playlist = state.currentPlaylist
            }
            const isTrackPlaying = state.currentTrack.id === track.id ? !state.isTrackPlaying : true
            let recentlyPlayedTracks = []

            if (state.recentlyPlayedTracks.length===6 ){
                recentlyPlayedTracks = state.recentlyPlayedTracks.slice(0,5)
            }
            else {
                recentlyPlayedTracks = state.recentlyPlayedTracks
            }

            if (!recentlyPlayedTracks.find(t=>t.id==track.id)){
                recentlyPlayedTracks =[...recentlyPlayedTracks,track]
            }


            return{
                ...state,
                currentTrack,
                isTrackPlaying,
               recentlyPlayedTracks,
                currentPlaylist:playlist

            }
        }
        case 'TRACK_TOGGLE':{
            return {
                ...state,
                isTrackPlaying: !state.isTrackPlaying
            }
        }
        case 'PLAYLIST_ADD':{
            const newId  = uid(16)
            const newPlaylist = {
                title:action.payload,
                id:newId,
                songs:[]
            }
            return {
                ...state,
                playlists: [newPlaylist,...state.playlists]
            }
        }
        case 'PLAYLIST_ATTACH_SONGS':{
            let {songs:newSongs,id} = action.payload

            const clonedPlaylists = state.playlists.map(plist=>({...plist}))
            const playlist = clonedPlaylists.find(plist=>plist.id===id)
            playlist.songs = [...playlist.songs,...newSongs]
            return {
                ...state,
                playlists: clonedPlaylists
            }
        }
        case 'PLAYLIST_DETACH_SONG':{
            let {songId,id} = action.payload
            const clonedPlaylists = state.playlists.map(plist=>({...plist}))
            const playlist = clonedPlaylists.find(plist=>plist.id===id)
            playlist.songs = playlist.songs.filter(track=>track.id!==songId)
            return {
                ...state,
                playlists: clonedPlaylists
            }
        }

        case `CHANGE_VOLUME`:{
            return {
                ...state,
                volume:action.payload
            }
        }

        default: return state
    }
}

export {
    TrackControlReducer
}
