import React, {FC} from 'react';

import { detachSongFromPlaylist} from "../../../actions/index";
import TrackToggle from "../../track-toggle/TrackToggle";
import AddButton from "../../common/add-button/AddButton";

import { ITrack,IPlayList } from '../../../interfaces';
import {Link} from "react-router-dom";
import MiscIcon from "../../hotify-ui/MiscIcon/MiscIcon";
import {Button} from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, {bindMenu,bindTrigger} from "material-ui-popup-state";






interface TrackListItem {
    track:ITrack,
    type:string,
    index:number,
    isActive:boolean,
    trackSwitch:(track:ITrack|string)=>void,
    isTrackPlaying:boolean,
    addSongs:(songs:ITrack[],playlistId:string)=>void,
    removeSong:(id:string,playlistId:string)=>void
    playlists:IPlayList[]
}


const TrackListItem:FC<TrackListItem> = (
     {
         track,
         type,
         index,
         isActive,
         trackSwitch,
         isTrackPlaying,
         addSongs,
         playlists,
         removeSong

     })=> {


    const {trackCover,
           trackDuration,
           addingDate,
           artists,
           trackName,
           album,isInFav} = track

    // @ts-ignore
    const popUp =  <PopupState variant="popover" popupId="demo-popup-menu">
        {(popupState:any) => (
            <React.Fragment>
                <Button variant="contained" {...bindTrigger(popupState)}>
                    Dashboard
                </Button>
                <Menu {...bindMenu(popupState)}>
                    {
                        playlists.map(({id,title,songs})=>{
                            const isInPlaylist = songs.find(song=>song.id===track.id)
                            return (<MenuItem
                                onClick={()=>isInPlaylist
                                    ? removeSong(track.id,id as string)
                                    : addSongs([track],id as string)}
                                style={{color:'black'}}>
                                                     <span style={{color:'black'}}>
                                                         {isInPlaylist&&<span style={{color:'black'}}>-</span>}
                                                         {title}
                                                     </span>
                            </MenuItem>)
                        })
                    }
                </Menu>
            </React.Fragment>
        )}
    </PopupState>








    return (
        <ul className="track-set-item-data">
            <button className="track-item-play" onClick={()=>{
                trackSwitch(track)

            }}>
                <TrackToggle isActive={isActive} isTrackPlaying={isTrackPlaying}/>
            </button>
            <li className="tdata"><span className='track-number'>{index+1}</span></li>
            <li className="tdata">
                <div className="track-data-cover">
                    <img src={trackCover} alt=""/>
                </div>
                <div className="track-title">
                    <span className={isActive ? 'active-track' : ''}>{trackName}</span>
                    <span className="band-name"><Link to={`/artist/${artists.id}`}>{artists.name}</Link></span>
                </div>
            </li>
           <React.Fragment>
                <li className="tdata">{album}</li>
                <li className="tdata">{type==='stats' ? '' :  addingDate}</li>
                <li className="tdata">
                   <div className="hidden-heart">
                       <AddButton removeSong={removeSong}
                                  onRemovedFromFav={()=>{
                                      const el =  document.querySelector(`.track-set-item`) as HTMLElement
                                      // @ts-ignore
                                      el.querySelector('.track-item-play').remove()
                                      el.style.opacity = '0.5'
                                  }}
                                  track={track}
                                  isInFav={isInFav}
                                  attachSongsToPlaylist={(track)=>{
                                      addSongs([track],'fav')
                                  }}/>
                   </div>
                    {trackDuration}</li>
               <li className='track-misc'>
                   {popUp}
               </li>
            </React.Fragment>
        </ul>
    )
}




export default TrackListItem
