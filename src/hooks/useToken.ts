export const useToken = () => {
    const getToken = () => {
        const tokenString = window.localStorage.getItem('spotify-sdk:AuthorizationCodeWithPKCEStrategy:token');
        const userToken = JSON.parse(tokenString || '{}');
        return userToken?.access_token;
    };

    return {
        // setToken: saveToken,
        token: getToken()
    }
}