import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    volume:0
}

export default createSlice({
    name:'volume',
    initialState,
    reducers:{
        change(state,{payload}){
            const {volume} = payload
            state.volume = volume
        },

    }
})
