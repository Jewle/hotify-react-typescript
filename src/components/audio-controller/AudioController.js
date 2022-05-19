import React, {Component, useEffect} from "react";
import {connect} from "react-redux";
import {compose} from "../../utils";
import withService from "../hoc/withService";
import {Howl} from 'howler';
function AudioController({currentTrack,isTrackPlaying}) {
    let audioRef = null


    console.log(audioRef)

    useEffect(()=>{
        if (audioRef){
            audioRef.src = currentTrack.src
            isTrackPlaying ? audioRef.play() : audioRef.pause()
        }
    },[isTrackPlaying,currentTrack])
    return <div>
        <audio src=""></audio>
    </div>
}



class Audio extends Component{
    // audioRef = null
    // state={
    //     canPlay:false
    // }
    // componentDidMount() {
    //     this.audioRef = document.querySelector('audio')
    // }
    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     if(prevState.canPlay===this.state.canPlay) return
    //     const currentTrack = this.props.currentTrack
    //
    //     this.audioRef.src=currentTrack.src
    //     this.setState({canPlay:false})
    // }
    //
    render() {


        return <div>
            <audio onLoadedData={()=>{
                this.setState({canPlay:true})
            }}></audio>
        </div>
    }
}





const mapDispatchToProps = {}
const mapStateToProps = ({isTrackPlaying,currentTrack}) => ({
    isTrackPlaying,
    currentTrack
})

export default compose(connect(mapStateToProps,mapDispatchToProps),withService)(Audio)
