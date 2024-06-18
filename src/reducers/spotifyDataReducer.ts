import { SpotifyData } from "../SpotifyAmpContext"

interface Actions extends SpotifyData {
    type: 'addToken'|'setCurrentTrack'|'setPlayerId' | 'setDevices'
    
}

export const spotifyDataReducer = (data: SpotifyData = {}, action: Actions) => {
    console.log(action)
    switch (action.type) {
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