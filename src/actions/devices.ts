import { Devices } from "@spotify/web-api-ts-sdk";
import { Actions } from "../reducers/spotifyDataReducer";


export const setAllDevices = (dispatch: React.Dispatch<Actions>, allDevices: Devices) => {
    dispatch({
        type: 'setDevices',
        allDevices
    })
} 

export const setCurrentDevice = (dispatch: React.Dispatch<Actions>, currentDevice: string)  => {
    dispatch({
        type: 'setPlayerId',
        currentDevice
    })
}

export const removeDevice = (dispatch: React.Dispatch<Actions>, deviceId: string) => {
    dispatch({
        type: 'removeDevice',
        deviceId
    })
}
