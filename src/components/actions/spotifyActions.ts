import { Devices, Track } from "@spotify/web-api-ts-sdk"
import { Actions } from "@/reducers/spotifyDataReducer"

export const addToken = (newToken: string, dispatch: (value: Actions) => void) => {
    dispatch({
      type: 'addToken',
      token: newToken
    })
  }

 export const setAllDevices = (allDevices: Devices, dispatch: (value: Actions) => void) => {
    dispatch({
        type: 'setDevices',
        allDevices
    })
  }

 export const setCurrentDevice = (currentDevice: string, dispatch: (value: Actions) => void) => {
    dispatch({
        type: 'setPlayerId',
        currentDevice
    })
  }

 export const setCurrentPlayingTrack = (currentTrack: Track, dispatch: (value: Actions) => void) => {
    dispatch({
        type: 'setCurrentTrack',
        currentTrack
    })
  }