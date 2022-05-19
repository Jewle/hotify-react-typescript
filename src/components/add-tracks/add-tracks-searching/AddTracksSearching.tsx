import React, {FC, ReactElement, useState} from "react";
import './add-tracks-searching.scss'

import {IRecentlyPlayedTrack, ITrack } from "../../../interfaces";
import AddTrackSearchingItem from "./add-tracks-searching-item/AddTracksSearchingItem";

interface AddTracksSearchingProps {
    tracks:ITrack[]
    addSongs:(songs:ITrack[])=>void
    playlistId:string
    recentlyPlayedTracks:ITrack[]
}

interface RenderTracksProps {
    tracks:ITrack[]
    setTrack:(track:ITrack)=>void
    addedTracks:ITrack[]

}


const  AddTracksSearching:FC<AddTracksSearchingProps> = (props) => {
    const {tracks,addSongs,playlistId:id,recentlyPlayedTracks} =props
    const [addedTracks, addTrack] = useState<ITrack[]>([])
    const setTrack = (track:ITrack)=>{
        addTrack(state=>{
            const candidate = state.find(t=>t.id===track.id)
            if (candidate){
                return state.filter(item=>item.id!==track.id)
            }
            return [...state,track]
        })
    }

    return (<div className='add-tracks-searching'>
                {tracks.length>0 && <RenderTracks tracks={tracks} setTrack={setTrack} addedTracks={addedTracks}/>}

                <div className="recently-played-items">
                    <h2>Ты недавно слушал</h2>
                    <RenderTracks tracks={recentlyPlayedTracks} setTrack={setTrack} addedTracks={addedTracks}/>
                </div>

        <button onClick={()=>addSongs(addedTracks)}>Сохранить </button>
    </div>)
}

const RenderTracks:({tracks, setTrack, addedTracks}: RenderTracksProps) => any = ({tracks,setTrack,addedTracks}) => {

    return [...tracks, ...addedTracks].map(track=>{
        const markedTrack =!!addedTracks.find(t=>t.id===track.id)
        return (<>
            <AddTrackSearchingItem isMarked={markedTrack} setTrack={setTrack} key={track.id} track={track}/>
        </>)
    })
}

export default AddTracksSearching

// <RenderTracks tracks={tracks} setTrack={setTrack} addedTracks={addedTracks}/>
