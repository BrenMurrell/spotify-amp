import { Device, SpotifyApi, Track } from "@spotify/web-api-ts-sdk";
import { useState, useEffect, SetStateAction, useContext } from 'react';
import { SpotifyAmpContext } from "../../SpotifyAmpContext";


type Props = {
    token: string,
    setPlayerReady: React.Dispatch<SetStateAction<boolean>>,
    setDeviceId: (currentDevice: string) => void,
    setCurrentTrack: (currentTrack: Track) => void,
}

type LocalDevice = {
    device_id: string
}

function WebPlayback({ token, setPlayerReady, setDeviceId, setCurrentTrack }: Props) {
    const [player, setPlayer] = useState(undefined);
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;
    
        document.body.appendChild(script);
    
        window.onSpotifyWebPlaybackSDKReady = () => {
    
            const player = new window.Spotify.Player({
                name: 'SpotifyAmp',
                getOAuthToken: cb => { cb(token); },
                volume: 0.5
            });
    
            setPlayer(player);
            
            player.addListener('ready', ({ device_id }: LocalDevice) => {
                setPlayerReady(true);
                setDeviceId(device_id);
                console.log('Ready with Device ID', device_id);
            });
    
            player.addListener('not_ready', ({ device_id }: LocalDevice) => {
                console.log('Device ID has gone offline', device_id);
            });

            player.addListener('player_state_changed', ({
                position,
                duration,
                track_window: { current_track } 
              }: unknown) => {
                console.log('Currently Playing', current_track);
                console.log('Position in Song', position);
                console.log('Duration of Song', duration);
                setCurrentTrack(current_track);
              });
    
    
            player.connect();
    
        };
    }, []);

   return (
      <>
        <div className="container">
           <div className="main-wrapper">

            </div>
        </div>
      </>
    );
}

export default WebPlayback