import React from "react";
import './track-list-with-stats.scss'
import TrackListItem from "../track-list/track-list-item/TrackListItem";
function TrackListWithStats() {
    const track = {
        trackCover:"https://i.scdn.co/image/ab67616d000048519929bb4e1fb3302a2abd6853",
        trackName:'I am Damnation',
        artistName:'Bleed From Within',
        addingDate:"11 дней назад",
        trackDuration:'4:20',
        album:'Single',
        src:"https://dl.muzonovs.ru/files/music/2021/11/bleed-from-within-i-am-damnation.mp3",
        albumId:0
    }
    return (
        <div>
            <TrackListItem track={track} />
        </div>
    )
}

export default TrackListWithStats
