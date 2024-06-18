import { useContext, useEffect } from "react";
import { Device, Devices, SpotifyApi } from '@spotify/web-api-ts-sdk';
import { SpotifyAmpContext } from "@/SpotifyAmpContext";

type DeviceListType = {
    sdk: SpotifyApi, 
    setAllDevices: (allDevices: Devices) => void,
    setCurrentDeviceData: (currentDeviceData: Device) => void | undefined,
}

const DeviceList = ({ sdk, setAllDevices, setCurrentDeviceData }: DeviceListType) => {
    const spotifyData = useContext(SpotifyAmpContext);
    const { allDevices, currentDevice } = spotifyData;

    useEffect(() => {
        (async () => {
            const results = await sdk.player.getAvailableDevices();
            setAllDevices(results);
            console.log(spotifyData);
        })();
    }, [sdk]);

    useEffect(() => {
        const theCurrentDevice = allDevices?.devices.find(device => device.id === currentDevice);

        theCurrentDevice && setCurrentDeviceData(theCurrentDevice)
    }, [allDevices?.devices, currentDevice])

    

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