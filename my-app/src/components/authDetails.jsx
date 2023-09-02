import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

import { ChakraBaseProvider, Text, Box, Button, Divider } from "@chakra-ui/react";



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
        <ChakraBaseProvider>

            {authUser ? (
                <>
                    {/* <Text className="imported">{`Signed In as ${authUser.email} `}</Text> */}
                    
                    <Button onClick={userSignOut}>
                        <Box paddingRight={[0,5]} paddingTop={[0,10]}>
                            <Text className="imported" fontSize={['16', '20']} >Sign Out</Text>
                        </Box>
   
                    </Button>
                </>
            ) : (
                <>
              
                <Text className="imported"></Text>
                </>
            )}

        </ChakraBaseProvider>

    )
}

export default AuthDetails;