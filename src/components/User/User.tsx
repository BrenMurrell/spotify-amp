import React, { useContext, useEffect  } from 'react';
import { SpotifyDispatchContext } from '@/SpotifyAmpContext';
import { useToken } from '@/hooks/useToken';
import { Scopes, SpotifyApi } from '@spotify/web-api-ts-sdk';
import { useSpotify } from '@/hooks/useSpotify';
import { setSdk } from '@/actions/sdk';



const User: React.FC = () => {
    const dispatch = useContext(SpotifyDispatchContext);
    const token = useToken().token;
    useEffect(() => {
        if(token) {
            dispatch && dispatch({
                type: 'addToken',
                token
              });
        }

    }, [dispatch, token]);
    // const [data, dispatch] = useReducer(
    //     spotifyDataReducer, {}
    //   );
    const getSdk: SpotifyApi | null = useSpotify(
        import.meta.env.VITE_SPOTIFY_CLIENT_ID, 
        import.meta.env.VITE_REDIRECT_TARGET, 
        Scopes.all
    );

    useEffect(() => {
        if (getSdk !== undefined) {
            console.log('got sdk', getSdk)
            setSdk(dispatch, getSdk);
        }
    }, [dispatch, getSdk])

    return (
        // getSdk ? <p>Logged in!</p> : <UserLogin />
        <>User panel</>
    );
};

export default User;