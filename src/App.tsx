import { useSpotify } from "./hooks/useSpotify";
import { Scopes, Track, SpotifyApi } from '@spotify/web-api-ts-sdk';
import { useEffect, useState } from 'react'
import DeviceList from "./components/Device/DeviceList";
import WebPlayback from "./components/WebPlayback/WebPlayback";

function App() {
  
  const sdk = useSpotify(
    import.meta.env.VITE_SPOTIFY_CLIENT_ID, 
    import.meta.env.VITE_REDIRECT_TARGET, 
    Scopes.all
  );

  return sdk
    ? (<SpotifySearch sdk={sdk} />) 
    : (<></>);
}

function SpotifySearch({ sdk }: { sdk: SpotifyApi}) {
  const [token, setToken] = useState<string>('');
  const [deviceId, setDeviceId] = useState<string>('');
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);

  const [playerReady, setPlayerReady] = useState(false);
  useEffect(() => {
    const fullToken = window.localStorage.getItem('spotify-sdk:AuthorizationCodeWithPKCEStrategy:token');
    const parseToken = fullToken ? JSON.parse(fullToken) : {};
    setToken(parseToken.access_token);
  }, [sdk]);

  

  return (
    <>
      {playerReady && (
        <DeviceList sdk={sdk} />
      )}
      {token && (
        <WebPlayback 
          token={token}
          setPlayerReady={setPlayerReady}
          setDeviceId={setDeviceId}
          setCurrentTrack={setCurrentTrack}
        />
      )}
      {deviceId && (
        <>
          <button onClick={() => sdk.player.startResumePlayback(deviceId)}>Start</button>
          <button onClick={() => sdk.player.pausePlayback(deviceId)}>Pause</button>
        </>
      )}
      {currentTrack && (
        <>
          <p><img src={currentTrack.album.images[2].url} alt={currentTrack.name}/></p>
          <p>{currentTrack.name}</p>
          <p>{currentTrack.artists[0].name}</p>
        </>
      )}
      
    </>
  )
}

export default App;
