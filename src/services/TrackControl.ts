import {Howl} from "howler";
import { ITrackControl } from "../interfaces";

export default class TrackControl {
    private soundInstance:Howl
    private interval:any=null
    private _onplaying = ()=>{}

    constructor(src:string){
        this.soundInstance=new Howl({
            src:[src],
            html5:true,
        })
    }
    onplaying(fn:(duration:number)=>void){

        this._onplaying = ()=>fn(this.soundInstance.seek())
    }

    play(){
        this.soundInstance.play()
        this.playing()
    }
    pause(){
        this.soundInstance.pause()
        this.pausing()
    }
    stop(){
        clearInterval(this.interval)
        this.soundInstance.stop()
    }

    private playing(){
        if (this.interval){
            clearInterval(this.interval)
        }
        this.interval = setInterval(this._onplaying,500)
    }
    once(event:string,cb:()=>void){
        this.soundInstance.once(event,cb)
    }
    state(){
        return this.soundInstance.state()
    }
    volume(number:number){
        return this.soundInstance.volume(number)
    }

    pausing(){

        if (this.interval){
            clearInterval(this.interval)
        }
    }





}
