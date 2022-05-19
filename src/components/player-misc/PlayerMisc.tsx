import React, {ChangeEventHandler, FC} from 'react';

interface PlayerMiscProps{
    trackControl:any
    volume:number
    changeVolume:(val:number)=>void
}



const  PlayerMisc:FC<PlayerMiscProps> = ({trackControl,volume,changeVolume}) => {
    trackControl.volume(volume)
    return (
        <div className="footer-right">
            VOLUME:
            <input value={volume*100} onChange={(event:any)=>{
                const target = event.target
                const val = target.value/100
                changeVolume(val)
                trackControl.volume(val)
            }} type="range"/>
            </div>
    )
}
export default PlayerMisc
