import React, {FC} from "react";
import {Link} from "react-router-dom";
import { IPlayList } from "../../../interfaces";

interface LeftMenuPlaylistsProps {
    playlists:IPlayList[]
}

 const  LeftMenuPlaylists:FC<LeftMenuPlaylistsProps> = ({playlists}) => {



    return (

        <React.Fragment>
            <div className="playlist-shadow"></div>
            <div className="playlists">
                <ul>
                    {playlists.map(playlist=>{

                        if (playlist.id==='fav') return null
                        const link = `/playlist/${playlist.id}`
                        return(
                        <li key={playlist.id}>
                            <Link to={link}>{playlist.title}</Link>
                        </li>
                        )
                    })}
                </ul>
            </div>
        </React.Fragment>

    )
}
// @ts-ignore
export default LeftMenuPlaylists;
