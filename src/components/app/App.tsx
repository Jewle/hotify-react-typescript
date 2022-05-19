import React, {FC} from 'react'

import Player from "../player/Player";

import LeftMenu from "../left-menu/LeftMenu";
import './app.scss'

import {TrackControlContext} from '../context'

import {Provider} from "react-redux";

import PlayListView from "../playlist-view/PlayListView";
import {BrowserRouter, Route, Router, Switch} from "react-router-dom"
import MainPage from "../pages/MainPage";
import Artist from "../artist/Artist";
import TrackControl from "../../services/TrackControl";
import Search from "../search/Search";
import storeTwo from "../../store/store";
import Playlist from "../playlist/Playlist";



storeTwo.subscribe(()=>{
    localStorage.setItem('newStore', JSON.stringify(storeTwo.getState()))
})




const App = ()=>{

    return (
    <Provider store={storeTwo}>
        {/*<Provider store={store}>*/}
            <BrowserRouter>
            <TrackControlContext.Provider value={TrackControl}>


                <div className="wrapper">
                    <LeftMenu/>
                    <main>
                           <Switch>
                               <Route exact path='/playlist/:id' component={Playlist}/>
                               <Route exact path='/album/:id' component={Playlist}/>
                                <Route exact path='/' component={MainPage}/>
                                <Route exact path='/collection/:id' component={Playlist}/>
                                <Route exact path='/artist/:id' component={Artist}/>
                                <Route exact path='/search' component={Search}/>
                           </Switch>
                    </main>
                    <Player/>
                </div>
                {/*<AudioController/>*/}

           </TrackControlContext.Provider>
            </BrowserRouter>
        {/*</Provider>*/}
    </Provider>
    )
}

export default App
