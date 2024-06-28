import { useContext, useEffect } from "react";
import { SpotifyAmpContext, SpotifyDispatchContext } from "@/SpotifyAmpContext";
import { setAllDevices } from "@/actions/devices";

const DeviceList = () => {
    const spotifyData = useContext(SpotifyAmpContext);
    const dispatch = useContext(SpotifyDispatchContext);
    const { sdk, allDevices, currentDevice } = spotifyData;


    useEffect(() => {
        !allDevices && sdk?.player.getAvailableDevices().then(results => {
            setAllDevices(dispatch, results);
        });        
    }, [allDevices, dispatch, sdk?.player, spotifyData])

    const removeDevice = (deviceId: string | null) => {
        //not sure this can be done
        if(deviceId) {
        //     sdk?.player.removeDevice(deviceId).then(() => {
        //         sdk?.player.getAvailableDevices().then(results => {
        //             setAllDevices(dispatch, results);
        //         });
        //     })
        }
    }

    return (
        <>
            <ul>
                {allDevices && (
                    allDevices.devices.map(device => (
                        <li 
                            key={device.id}
                            style={device.id === currentDevice ? {fontWeight: 'bold' } : {}}
                        >
                            {device.name}
                            <button onClick={() => removeDevice(device.id)}>Remove</button>
                        </li>
                    ))
                )}
            </ul>
            <p>Current device is {currentDevice}</p>

        </>
    )
}

export default DeviceList;