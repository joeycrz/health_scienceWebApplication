import React, {useEffect, useState} from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

import AnnounceSubmit from "../announceSubmit";


const AuthPost = () => {
    const [authUser, setAuthUser] = useState(null);

    useEffect(() => {
        const listen = onAuthStateChanged(auth,(user) => {
            if(user) {
                setAuthUser(user)
            } else{
                setAuthUser(null);
            }
        });

        return () => {
            listen();
        }
    }, [])
    
    const userSignOut = () => {
        signOut(auth).then(() => {
            console.log("You signed out successfully");

        }).catch(error => console.log(error))
    }
    return (
        <div>{authUser ? <><AnnounceSubmit/> </> : <p>You are currently signed out and do not have permission to post announcements.</p>}</div>
    )
}

export default AuthPost;