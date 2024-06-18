import { useContext, useEffect } from "react";
import { SpotifyApi } from '@spotify/web-api-ts-sdk';
import { SpotifyAmpContext } from "@/SpotifyAmpContext";

const DeviceList = ({ sdk, setAllDevices }: { sdk: SpotifyApi, setAllDevices: any}) => {
    const spotifyData = useContext(SpotifyAmpContext);
    useEffect(() => {
        (async () => {
            const results = await sdk.player.getAvailableDevices();
            setAllDevices(results);
            console.log(spotifyData);
        })();
    }, [sdk]);

    const { allDevices, currentDevice } = spotifyData;
    const transferPlayback = ( deviceId: string | null) => {
        deviceId && sdk.player.transferPlayback([deviceId]);
    }

    return (
        <>
            <ul>
                {allDevices && (
                    allDevices.devices.map(device => (
                        <li 
                            key={device.id}
                            style={device.id === currentDevice ? {fontWeight: 'bold' } : {}}
                            onClick={() => transferPlayback(device.id)}
                        >
                            {device.name}
                        </li>
                    ))
                )}
            </ul>
            <p>Current device is {currentDevice}</p>

        </>
    )
}

export default DeviceList;