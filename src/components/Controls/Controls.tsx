import { useContext, useEffect, useState } from "react";
import { SpotifyData, SpotifyAmpContext } from "../../SpotifyAmpContext";
import { SpotifyApi } from "@spotify/web-api-ts-sdk";

const Controls = ({sdk} : { sdk: SpotifyApi}) => {
    
    const spotifyData: SpotifyData = useContext(SpotifyAmpContext);
    const { currentDevice, currentDeviceData } = spotifyData;
    const [localVolume, setLocalVolume] = useState<number>(50);

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

    useEffect(() => {
        sdk && currentDevice && sdk.player.setPlaybackVolume(localVolume, currentDevice);
    }, [localVolume, sdk, currentDevice])

    const updateLocalVolume = (e: React.FormEvent<HTMLInputElement>) => {
        console.log('setting volume', e.currentTarget.value);
        setLocalVolume(Number(e.currentTarget.value));
    }

    return <>
        <button onClick={() => prevTrack()}>&lt; Prev</button>
        <button onClick={() => resumePlayback()}>Play</button>
        <button onClick={() => pausePlayback()}>Pause</button>
        <button onClick={() => nextTrack()}>Next &gt;</button>
        {currentDeviceData?.volume_percent && (
            <input
                type="range"
                value={localVolume}
                onChange={updateLocalVolume}
            />
        )}
    </>
}

export default Controls;
