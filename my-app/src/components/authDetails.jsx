import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

import { ChakraBaseProvider } from "@chakra-ui/react";


const AuthDetails = () => {
    const [authUser, setAuthUser] = useState(null);

    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthUser(user)
            } else {
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
        <div>
            {authUser ? (
                <>
                    <span>{`Signed In as ${authUser.email} `}</span>
                    <button onClick={userSignOut}>Sign Out</button>
                </>
            ) : (
                <span>You are currently signed out.</span>
            )}
        </div>

    )
}

export default AuthDetails;