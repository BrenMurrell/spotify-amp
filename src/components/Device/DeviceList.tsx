import { useEffect, useState } from "react";
// import { useSpotify } from "../../hooks/useSpotify";
import { Devices, SpotifyApi } from '@spotify/web-api-ts-sdk';



const DeviceList = ({ sdk }: { sdk: SpotifyApi}) => {
//   const [results, setResults] = useState<SearchResults<["artist"]>>({} as SearchResults<["artist"]>);
  const [devices, setDevices] = useState<Devices>({} as Devices);

    useEffect(() => {
        (async () => {
        const results = await sdk.player.getAvailableDevices();
          console.log('results', results.devices);
          setDevices(() => results);      
        })();
      }, [sdk]);
    useEffect(() => {
      console.log('devices is now', devices);
    }, [devices])
    return (
      <>
        {devices?.devices?.map(device => (
          <p>{ device.name }</p>
        ))}

      </>
    )
}

export default DeviceList;