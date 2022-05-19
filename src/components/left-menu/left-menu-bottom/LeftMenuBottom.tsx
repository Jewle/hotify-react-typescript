import React, {FC} from "react";
import LeftMenuPlaylists from "../left-menu-playlists/LeftMenuPlaylists";
import {Link} from "react-router-dom";
import { IPlayList } from "../../../interfaces";


interface LeftMenuBottomProps {
    addNewPlaylist:(title:string)=>void,
    playlists:IPlayList[]
}


const LeftMenuBottom:FC<LeftMenuBottomProps> = ({addNewPlaylist,playlists}) => {
    const newPlaylist = ()=>{
        const title = prompt('Playlist Title') || ''
        if (title) addNewPlaylist(title)
    }
    return (
        <div className="left-menu-bottom-content">
            <div className="playlists-control">
                <div className="left-menu-item">
                    <button onClick={newPlaylist}>
                        <svg role="img" height="12" width="12" aria-hidden="true" viewBox="0 0 16 16"
                             className="Svg-sc-1bi12j5-0 hDgDGI">
                            <path d="M14 7H9V2H7v5H2v2h5v5h2V9h5z"></path>
                            <path fill="none" d="M0 0h16v16H0z"></path>
                        </svg>
                    </button>
                    <a className="left-menu-action"  >Создать плейлист</a>
                </div>

                <div className="left-menu-item">
                    <button className="loved-songs">
                        <svg role="img" height="12" width="12" aria-hidden="true" viewBox="0 0 16 16"
                             className="Svg-sc-1bi12j5-0 hDgDGI">
                            <path fill="none" d="M0 0h16v16H0z"></path>
                            <path
                                d="M13.797 2.727a4.057 4.057 0 00-5.488-.253.558.558 0 01-.31.112.531.531 0 01-.311-.112 4.054 4.054 0 00-5.487.253c-.77.77-1.194 1.794-1.194 2.883s.424 2.113 1.168 2.855l4.462 5.223a1.791 1.791 0 002.726 0l4.435-5.195a4.052 4.052 0 001.195-2.883 4.057 4.057 0 00-1.196-2.883z">
                            </path>
                        </svg>
                    </button>
                    <div className="left-menu-action">
                        <Link to={`/collection/fav`}>Мои любимые треки</Link>
                    </div>
                </div>
            </div>
            <LeftMenuPlaylists playlists={playlists}/>

        </div>
    )
}




export default LeftMenuBottom
