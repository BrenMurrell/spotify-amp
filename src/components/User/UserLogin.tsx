import { SpotifyAmpContext } from "@/SpotifyAmpContext";
import { useContext, useState } from "react";
import UserPerformLogin from "./UserPerformLogin";


const UserLogin = () => {
    const { sdk } = useContext(SpotifyAmpContext);

    const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);

    // console.log('sdk', sdk);
    
    return <>
        <h2>Login</h2>
        {sdk ? JSON.stringify(sdk) : <button onClick={() => setIsLoggingIn(true)}>Login</button>}
        { isLoggingIn && (
            <UserPerformLogin setIsLoggingIn={setIsLoggingIn} />
        )}
        
    </>
}

export default UserLogin;
