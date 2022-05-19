import { ITrack } from "../../interfaces";

interface IAddSongs {
    songs:ITrack[],
    playlistId:string
}

export type {
    IAddSongs
}
