import { SpotifyData } from "@/SpotifyAmpContext";
import { spotifyDataReducer } from "../spotifyDataReducer";

const initialData: SpotifyData = {
    token: 'startToken',
    currentDevice: '',
};

describe('spotifyDataReducer', () => {
    test('adds token', () => {
        const actual = spotifyDataReducer(initialData, { type: 'addToken', token: 'test token' });
        expect(actual).toEqual({
            ...initialData,
            token: 'test token',
        });
    });
    test('adds player ID', () => {
        const actual = spotifyDataReducer(initialData, { type: 'setPlayerId', currentDevice: 'testDeviceId' });
        expect(actual).toEqual({
            ...initialData,
            currentDevice: 'testDeviceId'
        });
    });
});
