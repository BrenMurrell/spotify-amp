import { useContext } from "react";
import { SpotifyData, SpotifyAmpContext } from "../../SpotifyAmpContext";
import { SpotifyApi } from "@spotify/web-api-ts-sdk";

const Controls = ({sdk} : { sdk: SpotifyApi}) => {
    
    const spotifyData: SpotifyData = useContext(SpotifyAmpContext);
    const { currentDevice } = spotifyData;

    const resumePlayback = () => {
        console.log('resuming', currentDevice);
        currentDevice && sdk.player.startResumePlayback(currentDevice);
    }

    const pausePlayback = () => {
        console.log('pausing', currentDevice);

        currentDevice && sdk.player.pausePlayback(currentDevice);
    }

    const prevTrack = () => {
        currentDevice && sdk.player.skipToPrevious(currentDevice);
    }

    const nextTrack = () => {
        currentDevice && sdk.player.skipToNext(currentDevice);
    }

    return <>
        <button onClick={() => prevTrack()}>&lt; Prev</button>
        <button onClick={() => resumePlayback()}>Play</button>
        <button onClick={() => pausePlayback()}>Pause</button>
        <button onClick={() => nextTrack()}>Next &gt;</button>
    </>
}

export default Controls;
