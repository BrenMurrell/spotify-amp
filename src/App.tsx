import { useSpotify } from "./hooks/useSpotify";
import { Scopes, Track, SpotifyApi, Devices, TrackItem } from '@spotify/web-api-ts-sdk';
import { useEffect, useReducer, useState } from 'react'
import DeviceList from "./components/Device/DeviceList";
import WebPlayback from "./components/WebPlayback/WebPlayback";
import {SpotifyAmpContext, SpotifyDispatchContext, SpotifyData } from "./SpotifyAmpContext";
import Controls from "./components/Controls/Controls";
import { spotifyDataReducer } from "./reducers/spotifyDataReducer";
import CurrentTrackWindow from "./components/CurrentTrackWindow/CurrentTrackWindow";
// import { ISpotifyAmpContext } from "./SpotifyAmpContext";

function App() {
  
  const [state, setState] = useState<SpotifyData>({});

  const sdk = useSpotify(
    import.meta.env.VITE_SPOTIFY_CLIENT_ID, 
    import.meta.env.VITE_REDIRECT_TARGET, 
    Scopes.all
  );

  

  return (
    
        sdk
          ? (<SpotifySearch sdk={sdk} />) 
          : (<></>)
  )
}

function SpotifySearch({ sdk }: { sdk: SpotifyApi}) {
  const [spotifyData, dispatch] = useReducer(
    spotifyDataReducer, {}
  );

  const [token, setToken] = useState<string>('');

  const [playerReady, setPlayerReady] = useState(false);
  useEffect(() => {
    const fullToken = window.localStorage.getItem('spotify-sdk:AuthorizationCodeWithPKCEStrategy:token');
    const parseToken = fullToken ? JSON.parse(fullToken) : {};
    setToken(parseToken.access_token);
    addToken(parseToken.access_token);
  }, [sdk]);
 

  const addToken = (newToken: string) => {
    dispatch({
      type: 'addToken',
      token: newToken
    })
  }

  const setAllDevices = (allDevices: Devices) => {
    dispatch({
        type: 'setDevices',
        allDevices
    })
  }

  const setCurrentDevice = (currentDevice: string)  => {
    dispatch({
        type: 'setPlayerId',
        currentDevice
    })
  }

  const setCurrentPlayingTrack = (currentTrack: Track) => {
    dispatch({
        type: 'setCurrentTrack',
        currentTrack
    })
  }

  const {
    currentDevice,
    currentTrack
  } = spotifyData;

  return (
    <SpotifyAmpContext.Provider value={spotifyData}>
      <SpotifyDispatchContext.Provider value={dispatch}>
        <CurrentTrackWindow />
        <p>Current player: {currentDevice}</p>
        
        {playerReady && (
            <DeviceList sdk={sdk} setAllDevices={setAllDevices} />
        )}
        {token && (
            <WebPlayback 
                token={token}
                setPlayerReady={setPlayerReady}
                setDeviceId={setCurrentDevice}
                setCurrentTrack={setCurrentPlayingTrack}
            />
        )}
        {currentTrack && (
        <>
            <p><img src={currentTrack.album.images[2].url} alt={currentTrack.name}/></p>
            <p>{currentTrack.name}</p>
            <p>{currentTrack.artists[0].name}</p>
        </>
        )}
        <Controls sdk={sdk} />

      </SpotifyDispatchContext.Provider>
      </SpotifyAmpContext.Provider>
      
  )
}

export default App;
