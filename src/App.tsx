import { useReducer } from 'react'
import {SpotifyAmpContext, SpotifyDispatchContext } from "./SpotifyAmpContext";
import { spotifyDataReducer } from "./reducers/spotifyDataReducer";
import User from "./components/User/User";
import DeviceList from './components/Device/DeviceList';

function App() {

  const [state, dispatch] = useReducer(spotifyDataReducer, {});
  
  return (
    <SpotifyAmpContext.Provider value={state}>
      <SpotifyDispatchContext.Provider value={dispatch}>
        <User />
        <DeviceList />
      </SpotifyDispatchContext.Provider>
      </SpotifyAmpContext.Provider>
  )
}

// function SpotifySearch({ sdk }: { sdk: SpotifyApi}) {
//   const [spotifyData, dispatch] = useReducer(
//     spotifyDataReducer, {}
//   );

//   const [token, setToken] = useState<string>('');

//   const [playerReady, setPlayerReady] = useState(false);
//   useEffect(() => {
//     console.log('checking token')
//     const fullToken = window.localStorage.getItem('spotify-sdk:AuthorizationCodeWithPKCEStrategy:token');
//     const parseToken = fullToken ? JSON.parse(fullToken) : {};
//     setToken(parseToken.access_token);
//     addToken(dispatch, parseToken.access_token);
//   }, [sdk]);
 

  
//   const setCurrentPlayingTrack = (currentTrack: Track) => {
//     dispatch({
//         type: 'setCurrentTrack',
//         currentTrack
//     })
//   }

//   const {
//     currentDevice,
//     currentTrack
//   } = spotifyData;
//   return <></>
//   return (
//     <SpotifyAmpContext.Provider value={spotifyData}>
//       <SpotifyDispatchContext.Provider value={dispatch}>
//         <CurrentTrackWindow />
//         <p>Current player: {currentDevice}</p>
        
//         {playerReady && (
//             <DeviceList sdk={sdk} />
//         )}
//         {token && (
//             <WebPlayback 
//                 token={token}
//                 setPlayerReady={setPlayerReady}
//                 setCurrentTrack={setCurrentPlayingTrack}
//             />
//         )}
//         {/* {currentTrack && (
//         <>
//             <p><img src={currentTrack.album.images[2].url} alt={currentTrack.name}/></p>
//             <p>{currentTrack.name}</p>
//             <p>{currentTrack.artists[0].name}</p>
//         </>
//         )} */}
//         <Controls sdk={sdk} />

//       </SpotifyDispatchContext.Provider>
//       </SpotifyAmpContext.Provider>
      
//   )
// }

export default App;
