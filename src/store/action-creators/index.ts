import {createAsyncThunk} from "@reduxjs/toolkit";
import TrackService from "../../services/TrackService";



const fetchPlayList = createAsyncThunk('fetch/playlist',async (data:any,{getState})=>{
   const {id,isAlbum} = data
    const service = new TrackService(getState());
    return await service.getPlayList(id,isAlbum).catch(console.log)
 })

const fetchDemoPlaylists = createAsyncThunk('fetch/demoplaylists', async (_:any,{getState})=>{
    const service = new TrackService(getState());
    return await service.getDemoPlaylists()
})

const search = createAsyncThunk('search/all', async ({query}:{query:string},{getState})=>{
    const service = new TrackService(getState());
    return await service.search(query)
})

const searchTrack = createAsyncThunk('search/track', async ({src}:{src:string},{getState})=>{
    const service = new TrackService(getState());
    return await service.searchTrack(src)
})

const fetchArtist = createAsyncThunk('fetch/artist', async ({id,artistLoaded}:any,{getState})=>{
    const service = new TrackService(getState());
    return await service.getArtist(id,artistLoaded)
})

const searchTrackByQuery = createAsyncThunk('searchByQuery/track', async ({src}:{src:string},{getState})=>{
    const service = new TrackService(getState());
    return await service.searchTrackByQuery(src)
})











export {
    fetchPlayList,
    fetchDemoPlaylists,
    search,
    searchTrackByQuery,
    searchTrack,
    fetchArtist
}
