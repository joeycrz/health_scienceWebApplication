import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { ChakraBaseProvider, Text, Box,  } from "@chakra-ui/react";

import AnnounceSubmit from "../announceSubmit";


const AuthPost = () => {
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
        <ChakraBaseProvider>
            {authUser ? (
                
                <AnnounceSubmit />
            ) : (
                <Box>
                    <Text p={[5,20]} fontSize={[15,20]} className="imported">You do not have permission to post.</Text>
                </Box>
                
            )}
        </ChakraBaseProvider>

    )
}

export default AuthPost;