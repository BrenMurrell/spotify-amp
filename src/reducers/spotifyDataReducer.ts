import { SpotifyData } from "../SpotifyAmpContext"

export interface Actions extends SpotifyData {
    type: 'addToken'|'setCurrentTrack'|'setPlayerId' | 'setDevices' | 'setPlayerData'
}

export const spotifyDataReducer = (data: SpotifyData = {}, action: Actions) => {
    switch (action.type) {
        case 'setPlayerData' : {
            return {
                ...data,
                currentDeviceData: action.currentDeviceData
            }
        }
        case 'addToken': {
            return {
                ...data,
                token: action.token,
            }
        }
        case 'setPlayerId': {
            return {
                ...data,
                currentDevice: action.currentDevice
            }
        }
        case 'setDevices': {
            console.log('setting devices', action);
            return {
                ...data,
                allDevices: action.allDevices
            }
        }
        case 'setCurrentTrack': {
            console.log('setting track', action);
            return {
                ...data,
                currentTrack: action.currentTrack
            }
        }
        default: {
            return data;
        }
    }
}