import { createContext, useContext } from "react";
import { Device, Devices, Track } from "@spotify/web-api-ts-sdk";

export interface SpotifyData {
    token?: string | null,
    currentDevice?: string,
    currentDeviceData?: Device | null,
    currentTrack?: Track,
    allDevices?: Devices | null,
}

export const SpotifyAmpContext = createContext<SpotifyData>({});
export const SpotifyDispatchContext = createContext<unknown>(null);

export function useSpotifyDispatch() {
    return useContext(SpotifyDispatchContext);
}