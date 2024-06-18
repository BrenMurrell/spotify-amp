import { createContext, useContext, useReducer } from "react";
import { Devices, Track } from "@spotify/web-api-ts-sdk";

export interface SpotifyData {
    token?: string | null,
    currentDevice?: string | '',
    currentTrack?: Track,
    allDevices?: Devices | null
}

export const SpotifyAmpContext = createContext<SpotifyData>({});
export const SpotifyDispatchContext = createContext<any>(null);

export function useSpotifyDispatch() {
    return useContext(SpotifyDispatchContext);
}