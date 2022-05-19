import React, {FC} from "react";
import { ITrack } from "../../../../interfaces";
import './ats-item.scss'


interface AddTrackSearchingItemProps{
    track:ITrack
    setTrack:(track:ITrack)=>void
    isMarked:boolean
}
const  AddTrackSearchingItem:FC<AddTrackSearchingItemProps> = ({track,setTrack,isMarked}) => {
    const {trackName,trackCover,artists}  = track



    return (
        <div  className='item-added'>
            <div data-testid="tracklist-row" className="h4HgbO_Uu1JYg5UGANeQ wTUruPetkKdWAR1dd6w4" draggable="true"
                 role="presentation">
                <div className="gvLrgQXBFVW6m9MscfFA" >
                    <div className="byLkljnIRd_DJeSMD3LM"><img aria-hidden="false" draggable="false" loading="eager"
                                                               src={trackCover}
                                                               alt=""
                                                               className="mMx2LUixlnN_Fu45JpFB rkw8BWQi3miXqtlJhKg0"
                                                               width="40" height="40"/>
                        <button className="RfidWIoz8FON2WhFoItU Qs11Fsr_XqTVFDFWWRkQ"
                                >
                            <svg height="32" role="img" width="32" viewBox="0 0 24 24" className="UIBT7E6ZYMcSDl1KL62g">
                                <polygon points="21.57 12 5.98 3 5.98 21 21.57 12" fill="currentColor"></polygon>
                            </svg>
                        </button></div>
                    <div className="iCQtmPqY0QvkumAOuCjr">
                        <div className="t_yrXoUO3qGsJS4Y6iXX standalone-ellipsis-one-line w_Xs9cRXMwmQHw8BpiID"
                             dir="auto">{trackName}
                        </div>
                        <span className="sQcIERaiZKFhOM1LrSmX w_Xs9cRXMwmQHw8BpiID"
                              style={{color: "rgb(179, 179, 179);"}}>
                        <a draggable="true" dir="auto"
                           href="/artist/3Ai9vPDuBVLSlRdeLoOaYn">
                            {/*{artists.name}*/}
                        </a>
                        </span>
                    </div>
                </div>

                <div className="HcMOFLaukKJdK5LfdHh0" >
                    <button  onClick={()=>setTrack(track)}
                             className={`Qt5xfSWikz6CLU8Vobxs X7lQWw2Ly_RZVPEFj2QY TIzP7JgU_iQ0NDYrqnQ ${isMarked ? 'marked' : ''}`}
                             type="button"
                            data-testid="add-to-playlist-button"
                            >

                        <span className="gvMYy0vqOxuYtbOkc6sH"
                              aria-label="Добавить в плейлист">
                            {isMarked ? 'Убрать': 'Добавить'}
                        </span>
                    </button>
                </div>
            </div>
        </div>
    )
}
export default AddTrackSearchingItem
