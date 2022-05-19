interface ITrack {
    trackName:string,
    src:string,
    id:string,
    artists:{name:string,id:string}
    explicit?:boolean,
    trackCover:string,
    album?:string,
    albumId?:string,
    addingDate?:string,
    trackDuration?:string,
    uri?:string,
    track?:any,
    isInFav?:boolean,
    prev?:string,
    next?:string
}
interface IAlbumPreview {
    name:string,
    image:string,
    id:string
}

interface IDemoPlaylist{
    name:string,
    description?:string,
    image:string,
    id:string
}
interface IRecentlyPlayedTrack extends ITrack{
    plays:number
}

interface IArtist {

    img:string,
    artistCover?:string
    uri?:string
    headerImg:string,
    name:string,
    src:string,
    genres:string,
    monthlyListeners:string,
    verified:boolean | string,
    discography: {
        topTracks: any[],
        albums:IAlbumPreview[]
    }

}

interface IPlayList{
    title:string,
    isAlbum?:boolean,
    count:number,
    songs:ITrack[],
    isLocal?:boolean,
    id?:string
}

interface IArtistPreview {
    artistCover:{sources:any[]},
    name:string,
    uri:string

}

interface ITrackControl{
    new(src:string):ITrackControl
    // constructor:Function
    onplaying?:(fn:(duration:number)=>void)=>void
    stop?:()=>void
    pause?:()=>void
    play?:()=>void
    state?:()=>void
    once?:(event:string,cb:()=>void)=>void
    volume?:(number:number)=>void

}

interface ISearchResult extends ITrack, IArtist{
    type:string
    id:string
}



export type {
        ITrack,
        IArtist,
        IArtistPreview,
        IPlayList,
        IDemoPlaylist,
        ITrackControl,
        ISearchResult,
        IRecentlyPlayedTrack
}



