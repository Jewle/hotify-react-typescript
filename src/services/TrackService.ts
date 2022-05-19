
import {IArtist, IDemoPlaylist, IPlayList, ITrack} from "../interfaces";

import {SpotifyService} from "./spotify/SpotifyService";
import {RootState} from "../store/store";

interface ITrackService {
    getTracksById:(id:string[])=>Promise<ITrack[]>
    getDemoPlaylists:()=>Promise<IDemoPlaylist[]>
    getDemoPlaylistTracks:(id:string,isAlbum:boolean)=>Promise<IPlayList>
    getArtists:(id:string)=>Promise<IArtist[]>
    getPlayList:(id:string)=>Promise<IPlayList>
    search:(str:string)=>Promise<any>
    searchTrack:(str:string)=>Promise<ITrack>



}

 class TrackService implements ITrackService{

    private readonly  state;

    constructor(state:RootState) {
        this.state = state
    }
    private spot = new SpotifyService()
    getTracksByIds(id:string[]){
        return new Promise((resolve => {
            setTimeout(()=>resolve(this.spot.getTracksByIds(id)),1000)
        }))
    }
    getDemoPlaylists():Promise<IDemoPlaylist[]>{
        return this.spot.demoPlaylists()
    }
    getDemoPlaylistTracks(id:string,isAlbum:boolean):Promise<IPlayList>{
        return this.spot.demoPlaylistTracks(id,isAlbum).then(this.addMetaData)
    }
    get getArtist(){
        return (id:string,artistLoaded:()=>void)=>this.spot.getArtist(id,artistLoaded)
            .then((tracks:ITrack[])=>{
                const playlist = {songs:tracks} as IPlayList
                return this.addMetaData(playlist).songs
        })
    }
    //Если нет созданного плейлиста, тогда получаем плейлист с апи
     // @ts-ignore
     async getPlayList(playlistId:string,isAlbum:boolean):Promise<IPlayList>{

        if (isAlbum){
            return this.spot.getAlbumTracks(playlistId)
                .then(this.addMetaData)
        }
        const {track:{playlists}} = this.state
        let playlist = this._find(playlists,playlistId)
         if (playlistId==='fav'){
             playlist = this.state.track.favPlaylist
         }
        if (!playlist) {
            return this.getDemoPlaylistTracks(playlistId,isAlbum)
                .then(this.addMetaData)
        }

         playlist = this.addMetaData(playlist)
         playlist = {...playlist,count:playlist.songs.length}
         return playlist
    }

    search(str:string){
        return this.spot.search(str)
    }
    // @ts-ignore
     searchTrack(str:string){
        return this.spot.searchTrack(str).then((track:ITrack | ITrack[])=>{
            track = track as ITrack
            return {...track,isInFav:this.isInFav(track.id)}
        })
    }
    searchTrackByQuery(str:string){
        return this.spot.searchTrackByQuery(str)
    }

   private addMetaData = (playlist:IPlayList, isPlaylist=true)=>{

       let {songs} = playlist
       const newSongs = songs.map(s=>({...s}))
       const mutatedPlaylist = {...playlist, songs:newSongs.map((s,idx)=>{

               s.isInFav=this.isInFav(s.id)
               const prevTrack = songs[idx-1]
               const nextTrack = songs[idx+1]
               if (prevTrack){
                   s.prev = prevTrack.id
               }
               if (nextTrack){
                   s.next = nextTrack.id
               }
               return s
           })}
       return mutatedPlaylist
    }

    private isInFav(id:string){
        const {track:{favPlaylist}}  = this.state

        if (!favPlaylist) return false
        return !!favPlaylist.songs.find((song:ITrack)=>song.id===id)
    }

    private _findCb = (id:string)=>{

        return (item:any)=>item.id===id
    }
    private _find = (array:any[],id:string) => {
        return array.find(this._findCb(id))
    }

}

export default TrackService
