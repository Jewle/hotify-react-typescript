function trackSwitch(track,playlist={}) {

    return {
        type:'TRACK_SWITCH',
        payload:{track,playlist}
    }
}

function trackToggle() {
    return{
        type:'TRACK_TOGGLE'
    }
}
function addPlaylist(payload) {
    return{
        type:'PLAYLIST_ADD',
        payload
    }
}
function playlistLoad(payload) {
    return{
        type:'PLAYLIST_LOAD',
        payload
    }
}

function attachSongsToPlaylist(payload) {
    return{
        type:'PLAYLIST_ATTACH_SONGS',
        payload
    }
}

function detachSongFromPlaylist(payload) {
    return{
        type:'PLAYLIST_DETACH_SONG',
        payload
    }
}
function changeVolume(payload) {
    return {
        type:'CHANGE_VOLUME',
        payload
    }
}

export {
    trackSwitch,
    trackToggle,
    addPlaylist,
    attachSongsToPlaylist,
    detachSongFromPlaylist,
    playlistLoad,
    changeVolume
}
