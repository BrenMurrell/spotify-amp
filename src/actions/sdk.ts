import { SpotifyApi } from "@spotify/web-api-ts-sdk";
import { Actions } from "../reducers/spotifyDataReducer";

export const setSdk = (dispatch: React.Dispatch<Actions>, sdk: SpotifyApi | null) => {
    dispatch({
      type: 'setSdk',
      sdk
    });
}
