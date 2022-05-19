import React, {FC} from "react";
import { IDemoPlaylist } from "../../interfaces";
import DemoPlaylist from "./demo-playlist/DemoPlaylist";
import './demo-playlists.scss'

interface DemoPlaylistsProps {
    playlists:IDemoPlaylist[],
    displayType?:string
}
const  DemoPlaylists:FC<DemoPlaylistsProps> = ({playlists,displayType})=> {
    return <div className="main-container">
        {displayType==='album'
            ? <h1>Альбомы исполнителя</h1>
            : <h1>Плейлисты для тебя</h1>
        }
            <div className="demo-playlists">
                {playlists.map((playlist)=>{
                    return <DemoPlaylist key={playlist.id} playlist={playlist} displayType={displayType}/>
                })}
            </div>
          </div>
}

// @ts-ignore
export default DemoPlaylists;
