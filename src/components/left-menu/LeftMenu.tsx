import React, {FC} from 'react';
import './left-menu.scss'


import LeftMenuBottom from "./left-menu-bottom/LeftMenuBottom";
import {Link} from "react-router-dom";
import HomeIcon from "../hotify-ui/HomeIcon/HomeIcon";
import Logo from "../hotify-ui/Logo/Logo";
import SearchIcon from "../hotify-ui/SearchIcon/SearchIcon";
import LibIcon from "../hotify-ui/LibIcon/LibIcon";
import useTypedSelector from "../../hooks/useTypedSelector";
import trackSlice from "../../store/reducers/trackSlice";
import {useDispatch} from "react-redux";

const LeftMenu:FC = ()=>{
    const {playlists} = useTypedSelector(state => state.track)
    const {createNewPlaylist} = trackSlice.actions
    const dispatch = useDispatch()
    const reqCounter = localStorage.getItem('reqCounter') || 0
    return (
        <div className="left-menu">
            <div className="logo">
                <span id='reqCounter' style={{color:'red', fontSize:'30px'}}>{reqCounter}</span>
               <Logo/>
            </div>
            <div className="left-menu-content">
                <div className="left-menu-top-content">
                    <div className="left-menu-item">
                        <HomeIcon/>
                        <Link to='/' className="left-menu-action">Главная</Link></div>
                    <div className="left-menu-item">
                        <SearchIcon/>
                        <Link className='left-menu-action' to='/search'>Поиск</Link>
                    </div>
                    <div className="left-menu-item">
                       <LibIcon/>
                        <a className="left-menu-action" href="#">
                            Моя медиатека
                        </a>
                    </div>
                </div>
                <LeftMenuBottom playlists={playlists} addNewPlaylist={
                    (title:string)=>{
                       dispatch( createNewPlaylist({title}))
                    }
                }/>

            </div>
        </div>
    )
}
export default LeftMenu
