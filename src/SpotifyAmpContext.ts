import { createContext, useContext } from "react";
import { Devices, SpotifyApi, Track } from "@spotify/web-api-ts-sdk";
import { Actions } from "./reducers/spotifyDataReducer";

export interface SpotifyData {
    token?: string | null,
    currentDevice?: string | '',
    currentTrack?: Track,
    allDevices?: Devices,
    sdk?: SpotifyApi | null,
    dispatch?: React.Dispatch<Actions>
}

export const SpotifyAmpContext = createContext<SpotifyData>({});
export const SpotifyDispatchContext = createContext<React.Dispatch<Actions>>(() => {});

export function useSpotifyDispatch() {
    return useContext(SpotifyDispatchContext);
}