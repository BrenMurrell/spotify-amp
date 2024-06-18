import { SpotifyAmpContext } from "@/SpotifyAmpContext"
import { useContext, useEffect, useRef, useState } from "react"
import Panel from "../Panel/Panel";
import moment from "moment";
const CurrentTrackWindow = () => {
    const spotifyData = useContext(SpotifyAmpContext);

    const {
        currentTrack
    } = spotifyData;

    const duration = moment.utc(currentTrack?.duration_ms).format('mm:ss');
    
    return currentTrack
        ? <Panel title="Current Track">
            <>
                {currentTrack.artists[0].name} - {currentTrack.name} - {duration} 
            </>
        </Panel>
        : <></>
}

export default CurrentTrackWindow;
