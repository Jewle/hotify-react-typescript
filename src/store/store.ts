import {combineReducers} from "redux";

import trackSlice from "./reducers/trackSlice";
import {configureStore} from "@reduxjs/toolkit";
import volume from "./reducers/volume";



const rootReducer:any=combineReducers({
    track:trackSlice.reducer,
    volume:volume.reducer
})

const store2 = ()=>configureStore({
    reducer:rootReducer
})




const storeTwo = store2()

export default storeTwo
export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof store2>
export type AppDispatch = AppStore['dispatch']



