import {TrackServiceConsumer} from "../context";
import React from 'react'
export default function withService(Component){
    return function (props) {
        return (
            <div {...props}></div>

        )
    }
}
{/*<TrackServiceConsumer>*/}
{/*    {(service)=>{*/}
{/*        return <Component service={service} {...props} />*/}
{/*    }}*/}
{/*</TrackServiceConsumer>*/}
