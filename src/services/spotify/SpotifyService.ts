import {IArtist, IArtistPreview, ITrack, IPlayList, IDemoPlaylist, ISearchResult } from "../../interfaces"


interface ITrackPreviewData {
    name:string,
    albumOfTrack:any,
    artists:any,
    id:string
}

interface ISearch extends ITrackPreviewData, IArtistPreview{
    type:string,

}

interface IGetParams {
    id?:string,
    ids?:string | string[],
    limit?:string | number,
    offset?:string | number,
    numberOfTopResults?:string | number,
    q?:string,
    type?:string,
}


class FetchCore{
    _options = {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "spotify23.p.rapidapi.com",
            "x-rapidapi-key": "bfdd5696eamsh4902840e2cebcd3p175847jsna7a7e5fe5ec7"
        }
    }

    // @ts-ignore
    _query =( data:{})=> Object.keys(data).map((key:string)=>`${key}=${data[key]}`).join('&')

    _delayRequest = (time:number)=>new Promise((resolve => setTimeout(_=>resolve(''),time)))

    async get(url:string, params:IGetParams) {
        if (!url) return Promise.resolve()
        Array.isArray(params.ids) && (params.ids = params.ids.join(','))

        const queries = this._query(params)

        //req debug
        console.log('Perform request')


        //req debug

        const response = await fetch(url+'?'+queries, this._options)

        return await response.json()
    }
}
class SpotifyMapper {
    _artistsUrl = 'https://spotify23.p.rapidapi.com/artists/'
    _tracksUrl ='https://spotify23.p.rapidapi.com/tracks/'
    _albumsUrl = 'https://spotify23.p.rapidapi.com/albums/'
    _searchUrl = `https://spotify23.p.rapidapi.com/search/`
    _playlistTracksUrl = `https://spotify23.p.rapidapi.com/playlist_tracks/`
    _artistUrl = 'https://spotify23.p.rapidapi.com/artist_overview/'
    _albumUrl = `https://spotify23.p.rapidapi.com/album_tracks/`
    _mapToTrackData(track:any):ITrack{
        const albumData = track.album
        return {
            trackName:track.name,
            src:track.preview_url,
            id:track.id,
            artists:track.artists[0] || {},
            explicit:track.explicit,
            trackCover:albumData?.images[0]?.url,
            album:'single',
            albumId:'',
            addingDate:"сколько-то дней назад",
            trackDuration:'0:30',
            uri:track.uri
        }
    }
    _mapToArtistData(data:any):IArtist{


        const artist = data.data.artist
        const {profile,visuals,discography}=artist

        return {
            img:visuals?.avatarImage?.sources[0]?.url,
            headerImg:visuals?.headerImage?.sources[0]?.url,
            name:profile.name,
            genres:artist.genres,
            monthlyListeners:artist.stats.total,
            verified:profile.verified,
            src:artist.uri,
            discography:{
                topTracks:discography.topTracks.items.map((item:any)=>item.track.id),
                albums:discography.albums.items.map((albumItem:any)=>{
                    const {releases:album} = albumItem
                    const{items} = album
                    const {name,id,coverArt} = items[0]
                    const image = coverArt.sources[0].url
                    return {
                        name,
                        image,
                        id
                    }
                })
            }
        }
    }
    _mapToTrackPreviewData({name,albumOfTrack,artists,id}:ITrackPreviewData){
        return {
            trackCover:albumOfTrack.coverArt.sources[0].url,
            trackName:name,
            artists:{name:artists.items[0].profile.name,id:''},
            id
        }
    }
    _mapToArtistPreviewData(artist:any):IArtistPreview{


        let {profile:{name},uri, visuals:{avatarImage:{sources}}} =artist

        uri = uri.split(':')[2]
        return {
            artistCover:sources[0].url,
            name,
            uri
        }
    }
    _mapToPlaylistData(playlist:any){
        const {data:{uri,name,description,images:{items}}} = playlist
        const id = uri.split(':')[2]
        const image = items[0].sources[0].url
        return {
            name,
            description,
            image,
            id
        }
    }
    // _mapToAlbumTracksData(album){
    //
    // }
    //
    // _mapToArtistAlbumsData(albums) {
    //     if (!Array.isArray(albums)) return {}
    //     return albums
    // }
    //
    // _mapToArtistAlbumData(album){
    //     return album
    // }
    // _mapToTracksData(tracks){
    //     if (!Array.isArray(tracks)) return {}
    //     return tracks.map(this._mapToTrackData)
    // }


    _mapDataFromSearch(type:string,data:any):ISearch | any{
        switch (type) {
            case 'artist': return {...this._mapToArtistPreviewData(data),type}
            case  'track': return {...this._mapToTrackPreviewData(data),type}
            default: return  null
        }

    }
}
export  class SpotifyService extends SpotifyMapper{


    fetchService = new FetchCore()

    // async getArtist(ids){
    //     const json = await this.fetchService.get(this._artistUrl, {ids})
    //     const artist = json.artists[0]
    //     return this._mapToArtistData(artist)
    // }
    // async getTrackByAlbumId(ids){
    //     const json = await this.fetchService.get(this._albumsUrl, {ids})
    //     const trackData = json.albums[0]
    //     const track = trackData.tracks.items[0]
    //     return this._mapToTrackData(track)
    // }
    async getTracksByIds(ids:string[]):Promise<ITrack[]>{
        const json = await this.fetchService.get(this._tracksUrl, {ids})
        let data = json.tracks.map(this._mapToTrackData)
        data = data.length>1 ? data : data[0]
        return data
    }
    async search(q:string):Promise<ISearchResult>{
        const json = await this.fetchService.get(this._searchUrl,{
            q,
            type:'multi',
            limit:10,
            offset: '0',
            numberOfTopResults: '5'
        })

        if(!json) return {} as ISearchResult
        const {topResults :{items}} = json
        const popularResult  = items[0].data
        const searchType = popularResult.uri.split(':')[1]

        return this._mapDataFromSearch(searchType,popularResult)
    }
    async searchTrack(id:string){
            // @ts-ignore
        return await this.getTracksByIds(id)

    }
    async searchTrackByQuery(q:string){
        const result = await this.search(q)
        if (result && result.type==='track'){

            await new Promise((resolve) => setTimeout(resolve,1500))
            return await this.getTracksByIds([result.id])
        }
        return null
    }
    async demoPlaylists():Promise<IDemoPlaylist[]>{
        const json = await this.fetchService.get(this._searchUrl,{
            q:'The death of peace of mind',
            type:'playlists',
            limit:8,
            offset: '0',
        })
        const data = json.playlists.items
        if (!json && !Array.isArray(data)) return []
        return data.map(this._mapToPlaylistData)
    }
    //Плейлист работает как альбом
    async demoPlaylistTracks(id:any,isAlbum=false):Promise<IPlayList>{
        const currentUrl = isAlbum ? this._albumUrl : this._playlistTracksUrl
        const json = await this.fetchService.get(currentUrl,{
            id,
            limit:16,
            offset: '0',

        })
        //Получаем данные в зависимости что это плейлист или альбом
        const data = !isAlbum  ? json.items : json.data.album.tracks.items
        const count = !isAlbum ? json.total : json.data.album.tracks.totalCount

            return {
                title:'Playlist or Album',
                isAlbum,
                count,
                songs:data.map((item:ITrack)=>{
                    const track = this._mapToTrackData(item.track)
                    // @ts-ignore
                    isAlbum && (track.id = track.uri.split(':')[2])
                    return track
                })

            }


    }
    async getAlbumTracks(albumId:string){
        const result = await this.demoPlaylistTracks(albumId,true)
        const trackIds = result.songs.map(s=>s.id)
        await new Promise((resolve) => setTimeout(resolve,1500))
        return {...result,songs:await this.getTracksByIds(trackIds)}
    }
    getArtist:any = (id:string,artistLoaded:(artist:any)=>any)=>{
        return this.fetchService.get(this._artistUrl,{id})
            .then<IArtist>((artist:IArtist)=> {
                    return new Promise((resolve => {
                        artist = this._mapToArtistData(artist)
                        artistLoaded(artist)
                        setTimeout(_=>resolve(artist),1500)
                    }))
                }
            )
            .then(({discography:{topTracks}})=>{
                return this.getTracksByIds(topTracks)
            })

    }




}

