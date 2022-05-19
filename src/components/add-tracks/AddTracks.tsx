import React, {FC, RefObject, useState} from "react";
import { ITrack } from "../../interfaces";

import AddTracksSearching from "./add-tracks-searching/AddTracksSearching";
import useTypedSelector from "../../hooks/useTypedSelector";
import Hmodal from "../hotify-ui/Hmodal/Hmodal";
import AddTrackSearchingItem from "./add-tracks-searching/add-tracks-searching-item/AddTracksSearchingItem";



const inputRef:RefObject<HTMLInputElement> = React.createRef()

interface AddTracksProps {
    addSongs:(tracks:ITrack[])=>void
    playlistId:string,
    searchTrack:(q:string)=>Promise<ITrack>
    searchTrackByQuery:(q:string)=>Promise<ITrack>
}

const AddTracks:FC<AddTracksProps> = ({addSongs,playlistId,searchTrackByQuery}) =>{
    const [foundTracks,setTracks] = useState<ITrack[]>([])
    const [modalOpen, setModalOpen] = useState(false)
    const {recentlyPlayedTracks} = useTypedSelector(state => state.track)
    function searchTracks(q:string) {
    searchTrackByQuery(q).then((data:any)=>{
        const payload  = data.payload
            if (payload){
                setTracks([payload])
            }
        })


    }

    return (
        <div className='add-tracks'>
            <button onClick={()=>setModalOpen(true)} >CHECK</button>
            <Hmodal isOpen={modalOpen}>
                <AddTrackSearchingItem track={{} as ITrack} setTrack={()=>{}} isMarked={true}/>
            </Hmodal>
            <h1 className="title-1" style={{marginBottom:'15px'}}>Давай добавим что-нибудь в твой плейлист</h1>
            <input ref={inputRef} placeholder='Поиск треков' className='add-tracks-input' type="text"/>
            <button onClick={()=>{
                if (inputRef.current)
                searchTracks(inputRef.current.value)
            }}>Найти</button>
            <AddTracksSearching recentlyPlayedTracks={recentlyPlayedTracks}
                                playlistId={playlistId}
                                addSongs={addSongs}
                                tracks={foundTracks}/>

        </div>
    )
}

// @ts-ignore
export default AddTracks
