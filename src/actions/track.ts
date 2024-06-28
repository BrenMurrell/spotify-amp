import { Actions } from "@/reducers/spotifyDataReducer"
import { Dispatch } from "react"

export const setCurrentPlayingTrack = (dispatch: Dispatch<Actions>, currentTrack: Spotify.Track) => {
    dispatch({
        type: 'setCurrentTrack',
        currentTrack
    })
}