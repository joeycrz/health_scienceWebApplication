import React, { useState } from 'react';
import {
    ChakraBaseProvider,
    useDisclosure,
    Box,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Button,

} from '@chakra-ui/react'


import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
const SignUp = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signUp = (e) => {
        // sign in
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential);
            }).catch((error) => {
                console.log(error);
            })
    }

    const { isOpen, onOpen, onClose } = useDisclosure()

    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)

    return (
        <ChakraBaseProvider>
            <Box
                w={494}
                h={394}
                borderWidth="1px"
                borderRadius="lg"
                boxShadow="md"
            >
                <Box
                p={20} 
                h={393}
                backgroundColor={'gray.400'}
                >
                    <form onSubmit={signUp}>
                        <FormControl id="email">
                            <FormLabel>Email address</FormLabel>
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </FormControl>

                        <FormControl mt={4} id="password">
                            <FormLabel>Password</FormLabel>
                            <Input
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </FormControl>

                        <Button mt={6} type="submit">
                            Sign Up
                        </Button>
                    </form>
                </Box>

            </Box>
        </ChakraBaseProvider>
        // <ChakraBaseProvider>
        //     <div >
        //         <form onSubmit={signUp}>


        //             <input
        //                 type="email"
        //                 placeholder='Enter your email'
        //                 value={email}
        //                 onChange={(e) => setEmail(e.target.value)}
        //             ></input>

        //             <input
        //                 type="password"
        //                 placeholder='Enter your password'
        //                 value={password}
        //                 onChange={(e) => setPassword(e.target.value)}
        //             ></input>

        //             <button type='submit'>Sign Up</button>
        //         </form>
        //     </div>
        // </ChakraBaseProvider>
    )
}

export default SignUp