import React, {FC, useState} from "react";
import './add-button.scss'
import HeartIcon from "../../hotify-ui/HeartIcon/HeartIcon";
import { ITrack } from "../../../interfaces";
import MiscIcon from "../../hotify-ui/MiscIcon/MiscIcon";

interface AddButtonProps {
    track:ITrack,
    isInFav?:boolean,
    attachSongsToPlaylist:(track:ITrack)=>void,
    removeSong:(id:string,playlistId:string)=>void,
    onRemovedFromFav?:()=>void
}

const AddButton:FC<AddButtonProps> =({track,attachSongsToPlaylist,removeSong,onRemovedFromFav}) =>{
    const hasAdded =true
    const {isInFav} = track
    const [fav,setFav] = useState(isInFav)


    function addToFav(track:ITrack) {
       if(!fav){
           attachSongsToPlaylist(track)
           setFav(true)
           return
       }
       removeSong(track.id,'fav')
        setFav(false)
        if (onRemovedFromFav && typeof onRemovedFromFav === 'function'){
            onRemovedFromFav()
        }


    }

    return(
        <>
            <button onClick={()=>addToFav(track)} className={`added-heart ${hasAdded ? 'added' : ''}`}>
                <HeartIcon isFilled={fav}/>
            </button>
            </>)
}

export default AddButton
