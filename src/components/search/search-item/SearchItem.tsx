import React, {FC} from "react";
import {IArtist, ISearchResult, ITrack } from "../../../interfaces";
import ArtistPreview from "./artist-preview/ArtistPreview";
import './search-item.scss'
import TrackPreview from "./track-preview/TrackPreview";

interface SearchItemProps {
    data:ISearchResult,
    trackSwitch:(track:any)=>void
    isTrackPlaying:boolean
    type:string,
    likeSong:(track:ITrack)=>void
    dislikeSong:(id:string)=>void
}

const SearchItem:FC<SearchItemProps> = ({
                                            data,
                                            type,
                                            trackSwitch,
                                            isTrackPlaying,
                                            likeSong,
                                            dislikeSong}) => {

    function bestResult(type:string) {
        switch (type) {
            case 'artist': return <ArtistPreview artist={data}/>
            case 'track' : return <TrackPreview dislikeSong={dislikeSong}
                                                likeSong={likeSong}
                                                isTrackPlaying={isTrackPlaying}
                                                trackSwitch={trackSwitch}
                                                track={data}/>
            default: return null
        }
    }

   return (
       <div className='search-item'>
           <h2>Лучший результат</h2>
           <div className="search-item-content">
               {bestResult(type)}
                {/*<SearchTracks/>*/}
           </div>
       </div>
   )
}

export default SearchItem
