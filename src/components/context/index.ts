import React from "react";
import { ITrackControl } from "../../interfaces";
import TrackControl from "../../services/TrackControl";



// @ts-ignore
const TrackControlContext = React.createContext<typeof TrackControl>({})

export {
    TrackControlContext
}
