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
    Text,

} from '@chakra-ui/react'


import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { Container } from 'react-bootstrap';
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

            <Box p={10}>
            <Text fontSize={20} className='imported' paddingLeft={5} paddingBottom={5} key={'signUp'}>Sign Up</Text>

                <form onSubmit={signUp}>
                    <FormControl id="email">
                        <Box
                            p={3}
                            borderStyle={'ridge'}
                            borderColor={'gray.700'}
                            borderWidth={3}
                        >
                            <FormLabel>
                                <Text paddingBottom={3} className='imported'>Email Address</Text>
                            </FormLabel>
                            <Input
                                type="email"
                                placeholder="Enter a username or pass"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Box>
                    </FormControl>

                    <FormControl mt={4} id="password">
                        <Box
                            p={3}
                            borderStyle={'ridge'}
                            borderColor={'gray.700'}
                            borderWidth={3}
                        >
                            <FormLabel>
                                <Text paddingBottom={3} className='imported'>Password</Text>
                            </FormLabel>
                            <Input
                                type="password"
                                placeholder="Create your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                        </Box>
                    </FormControl>

                    <Button
                        mt={6} type="submit">
                        <Box backgroundColor={'gray.300'}>
                            <Text p={2} className='imported'>Create Account</Text>
                        </Box>
                    </Button>
                </form>
            </Box>

        </ChakraBaseProvider>

    )
}

export default SignUp