
import {IPlayList, IRecentlyPlayedTrack, ITrack } from '../../interfaces';
import {createSlice} from "@reduxjs/toolkit";
import {PayloadAction} from "@reduxjs/toolkit/dist/createAction";
import { IAddSongs } from '../payload-types';
import {fetchArtist, fetchPlayList} from "../action-creators";
import {uid} from "uid";
const stateFromLocalStorage = localStorage.getItem('newStore') as string
const {track:lsState} = JSON.parse(stateFromLocalStorage) || {track:{}}//вытаксиваем track из newStore из localStorage

const playlists =
    lsState && lsState.playlists
        ? lsState.playlists
        : []
const recentlyPlayedTracks = lsState  ? (lsState.recentlyPlayedTracks || []) : []



const favPlaylist = lsState && lsState.favPlaylist
    ? lsState.favPlaylist
    :  {title:'Любимые треки', count:1,songs:[], id:'fav', isLocal:true}


interface ITrackState {
  currentTrack:ITrack,
  isTrackPlaying:boolean,
  playlists:IPlayList[],
  recentlyPlayedTracks:IRecentlyPlayedTrack[],
  currentPlaylist:IPlayList,
  playlist:IPlayList,
  favPlaylist:IPlayList,
  playlistLoading:boolean

}



const initialState:ITrackState = {
  currentTrack:{id:'', trackName:'', artists:{name:'',id:''},trackCover:'',src:''},
  isTrackPlaying:false,
  playlists:playlists.map((p:IPlayList)=>{
    return {...p,isLocal:true}
  }),
  favPlaylist,
  recentlyPlayedTracks,
  currentPlaylist:{title:'',songs:[],count:0},
  playlist:{title:'',songs:[],count:1},
  playlistLoading:false

}


export default createSlice({
  name:'track',
  initialState,
  reducers:{
    trackSwitch(state,{payload}){

      let {track} = payload
      const currentTrack = typeof track === 'string'
          ? state.currentPlaylist.songs.find(t=>t.id===track)
          : track
      const isTrackPlaying = state.currentTrack.id === track.id ? !state.isTrackPlaying : true
      state.currentTrack = currentTrack
      state.isTrackPlaying = isTrackPlaying
      state.currentPlaylist= state.playlist
      state.recentlyPlayedTracks = setRecentlyPlayed(state.recentlyPlayedTracks,currentTrack)
    },
    trackToggle(state){
      state.isTrackPlaying = !state.isTrackPlaying
    },
    test(state){

    },
    addSongToPlaylist(state, {payload}:PayloadAction<IAddSongs>){
      let {songs,playlistId} = payload
      let playlist = state.playlists.find(plist=>plist.id===playlistId)
      if (playlistId==='fav'){
        playlist = state.favPlaylist
      }

      if (!playlist){
        return
      }
      // @ts-ignore
      playlist.songs.push(...songs)
    },

    removeSongFromPlaylist(state,{payload:{id,playlistId}}){
      const playlists = state.playlists
      const playlistIndex = playlists.findIndex(plist=>plist.id===playlistId)

        playlistId=== 'fav'
        ? state.favPlaylist.songs = state.favPlaylist.songs.filter(song=>song.id!==id)
        : state.playlists[playlistIndex].songs = state.playlists[playlistIndex].songs.filter(song=>song.id!==id)


    },
    createNewPlaylist(state,action:PayloadAction<{title:string}>){
        const {title} = action.payload
        const newPlaylist:IPlayList = {
          id:uid(10),
          title,
          count: 1,
          songs: []
        }
        state.playlists.push(newPlaylist)
    },
    setPlaylist(state,{payload}){
      state.playlist = payload
    },
    clearPlaylist(state,{payload}){
      state.playlist = {count:1} as IPlayList
    }
  },

  extraReducers:{
    [fetchPlayList.fulfilled.type](state,{payload}){
      state.playlist=payload
      state.playlistLoading = false
    },
    [fetchPlayList.rejected.type](state,{payload}){
      console.log('ERROR')
    },
    [fetchPlayList.pending.type](state,{payload}){
      state.playlistLoading = true
      state.playlist = {count:1} as IPlayList
    },
    [fetchArtist.rejected.type](state,{payload}){
      console.log(payload)
    },
    [fetchArtist.pending.type](state,{payload}){
      state.playlistLoading=true
    },
    [fetchArtist.fulfilled.type](state,{payload}){
      state.playlist={count:payload.length,title:'',songs:payload}
      state.playlistLoading=false
    }
  }
})


function setRecentlyPlayed(rPlayed:IRecentlyPlayedTrack[],track:ITrack):IRecentlyPlayedTrack[] {
  const result = [...rPlayed]
  const candidate = result.find(t=>t.id===track.id)
  if (candidate){
    candidate.plays++
  }else {
    // result.push({...track,plays:1})

  }
  return result

}
