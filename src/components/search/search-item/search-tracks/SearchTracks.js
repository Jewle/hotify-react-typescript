import React from "react";
import TrackListItem from "../../../track-list/track-list-item/TrackListItem";

function SearchTracks(props) {
    const track = {
        addingDate: "11 дней назад",
        album: "single",
        albumId: "",
        artists: {external_urls: {spotify: "https://open.spotify.com/artist/24Oiw7BlvO1BETecDLJt6m"}},
        explicit: true,
        id: "2G61gCzYQY7iabxAXZdj2t",
        src: "https://p.scdn.co/mp3-preview/adc0f2e817b43984b58a6fc66b2d04595592a9bb?cid=f6a40776580943a7bc5173125a1e8832",
        trackCover: "https://i.scdn.co/image/ab67616d0000b273216bcc698a15eb6101b9c9e3",
        trackDuration: "4:20",
        trackName: "Your Only"
        }
    return (
        <div className='search-tracks'>
            <h2>Треки</h2>
            <div className="search-tracks-container">
                <ul className="track-set">
                    <li className="track-set-item">
                        <TrackListItem track={track}/>
                    </li>
                    <li className="track-set-item">
                        <TrackListItem track={track}/>
                    </li>
                    <li className="track-set-item">
                        <TrackListItem track={track}/>
                    </li>
                    <li className="track-set-item">
                        <TrackListItem track={track}/>
                    </li>
                </ul>

            </div>
        </div>
    )
}

export default SearchTracks
