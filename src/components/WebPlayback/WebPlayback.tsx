import { SpotifyApi, Track } from "@spotify/web-api-ts-sdk";
import { useState, useEffect, SetStateAction, useContext } from 'react';
import { SpotifyAmpContext, SpotifyDispatchContext } from "../../SpotifyAmpContext";
import { setCurrentPlayingTrack } from "@/actions/track";
import { setCurrentDevice } from "@/actions/devices";


type Props = {
    token: string,
    setPlayerReady: React.Dispatch<SetStateAction<boolean>>,
    setCurrentTrack: any
}


function WebPlayback({ token, setPlayerReady, setCurrentTrack }: Props) {
    const [player, setPlayer] = useState<any>(undefined);
    // const spotifyData = useContext(SpotifyAmpContext);
    const dispatch = useContext(SpotifyDispatchContext);
    const { allDevices, currentDevice } = useContext(SpotifyAmpContext);
    
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;
    
        document.body.appendChild(script);
    
        window.onSpotifyWebPlaybackSDKReady = () => {
            console.log('ready for player to load')
            const ampPlayer = new window.Spotify.Player({
                name: 'SpotifyAmp',
                getOAuthToken: cb => { cb(token); },
                volume: 0.5
            });
            console.log('ampPlayer', ampPlayer);
            
            setPlayer(ampPlayer);


            if(player) {
                console.log('player is of type', typeof player, player);
                player.addListener('ready', ({ device_id }: Spotify.WebPlaybackInstance) => {
                    setPlayerReady(true);
                    setCurrentDevice(dispatch, device_id);
                    console.log('Ready with Device ID', device_id);
                });
        
                player.addListener('not_ready', ({ device_id }: Spotify.WebPlaybackInstance) => {
                    console.log('Device ID has gone offline', device_id);
                });
    
                player.addListener('player_state_changed', (state: Spotify.PlaybackState) => {
                    const {
                        position,
                        duration,
                        track_window: { current_track } 
                      } = state
                    console.log('Currently Playing', current_track, position, duration, state);
                    
                    setCurrentTrack(current_track);
                    setCurrentPlayingTrack(dispatch, current_track);
                  });
        
        
                player.connect();

            }
    
        };
    }, []);

    

   return (
      <>
        <div className="container">
           <div className="main-wrapper">
                <h2>Players</h2>
                {allDevices && (
                    allDevices.devices.map(device => (
                        <div key={device.id}>
                            <p>
                                {device.name}{device.id === currentDevice && ' (current)'}&nbsp;
                                {device.id}
                            </p>
                            <button onClick={() => player.disconnect(device.id)}>Disconnect</button>
                        </div>
                    ))
                )}
            </div>
        </div>
      </>
    );
}

export default WebPlayback