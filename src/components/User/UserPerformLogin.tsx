import { SpotifyAmpContext, SpotifyDispatchContext } from "@/SpotifyAmpContext";
import { setSdk } from "@/actions/sdk";
import { addToken } from "@/actions/token";
import { useSpotify } from "@/hooks/useSpotify";
import { Scopes, SpotifyApi } from "@spotify/web-api-ts-sdk";
import { useContext, useEffect } from "react";

type Props = {
    setIsLoggingIn: React.Dispatch<React.SetStateAction<boolean>>
}

const UserPerformLogin: React.FC<Props> = ({ setIsLoggingIn }) => {
    const spotifyData = useContext(SpotifyAmpContext);
    const dispatch = useContext(SpotifyDispatchContext);
    
    // const localSdk: SpotifyApi | null = useSpotify(
    //     import.meta.env.VITE_SPOTIFY_CLIENT_ID, 
    //     import.meta.env.VITE_REDIRECT_TARGET, 
    //     Scopes.all
    // );

    // if (spotifyData.sdk) {
    //     setIsLoggingIn(false);
    //     console.log('checking token')
    //     const fullToken = window.localStorage.getItem('spotify-sdk:AuthorizationCodeWithPKCEStrategy:token');
    //     const parseToken = fullToken ? JSON.parse(fullToken) : {};
    //     addToken(dispatch, parseToken.access_token);
    // }

    // useEffect(() => {
    //     localSdk && setSdk(dispatch, localSdk);
    // }, [dispatch, localSdk]);

    return <></>
}

export default UserPerformLogin;

