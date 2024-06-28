import { Device, Devices } from "@spotify/web-api-ts-sdk"
import { SpotifyData } from "../SpotifyAmpContext"

export interface Actions extends SpotifyData {
    type: 'addToken'|'setCurrentTrack'|'setPlayerId' | 'setDevices' | 'setSdk' | 'removeDevice',
    deviceId?: string,    
}

interface LocalDevices extends Devices, Array<Device> {

}

export const spotifyDataReducer = (data: SpotifyData = {}, action: Actions) => {
    console.log('running action', action)
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
            return {
                ...data,
                allDevices: action.allDevices
            }
        }
        // case 'removeDevice': {
        //     const localDevices: LocalDevices = data.allDevices as LocalDevices;
        //     return {
        //         ...data,
        //         allDevices: localDevices?.filter((device: Device) => device.id !== action.deviceId)
        //     }
        // }

        case 'setCurrentTrack': {
            return {
                ...data,
                currentTrack: action.currentTrack
            }
        }
        case 'setSdk': {
            return {
                ...data,
                sdk: action.sdk
            }
        }
        default: {
            return data;
        }
    }
}