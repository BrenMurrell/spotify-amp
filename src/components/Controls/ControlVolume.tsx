import { SpotifyAmpContext } from "@/SpotifyAmpContext"
import { SpotifyApi } from "@spotify/web-api-ts-sdk";
import { useContext, useEffect, useState } from "react"

const ControlVolume = ({sdk} : { sdk: SpotifyApi}) => {
    const [localVolume, setLocalVolume] = useState<number>(50);
    const spotifyData = useContext(SpotifyAmpContext);
    const { currentDeviceData, currentDevice } = spotifyData;
    console.log('sdk is', sdk)

    const updateLocalVolume = (e: React.FormEvent<HTMLInputElement>) => {
        console.log('setting volume', e.currentTarget.value);
        setLocalVolume(Number(e.currentTarget.value));
    }

    useEffect(() => {
        console.log(sdk);
        sdk && currentDevice && sdk.player.setPlaybackVolume(localVolume, currentDevice);
    }, [localVolume, sdk, currentDevice])

    return (
        <>
            {currentDeviceData?.volume_percent && (
                <input
                    type="range"
                    value={localVolume}
                    onChange={updateLocalVolume}
                />
            )}
        </>
    )
}

export default ControlVolume