import { Actions } from "../reducers/spotifyDataReducer";

export const addToken = (dispatch: React.Dispatch<Actions>, newToken: string) => {
    dispatch({
      type: 'addToken',
      token: newToken
    });
}
