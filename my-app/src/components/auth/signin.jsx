import React, { useState } from 'react';
import { ChakraBaseProvider, Box, FormControl, FormLabel, Input, Button, Text } from '@chakra-ui/react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [signInStatus, setSignInStatus] = useState(''); // Track sign-in status
    const [errorMessage, setErrorMessage] = useState('');

    const signIn = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            setSignInStatus('success'); // Set sign-in status to success
        } catch (error) {
            setSignInStatus('error'); // Set sign-in status to error
            setErrorMessage('Account does not exist.'); // Set the error message
            console.error(error);
        }
    }

    return (
        <ChakraBaseProvider>
            <Box p={10}>
                <Text className='imported' fontSize={20} paddingLeft={5} paddingBottom={5} key={'signIn'}>Sign In</Text>
                {signInStatus === 'success' ? (
                    <Text color="green.500">Sign-in successful! Box is closed.</Text>
                ) : (
                    <form onSubmit={signIn}>
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
                                    placeholder="Username or Email"
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
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />

                            </Box>
                        </FormControl>
                        <Button mt={6} type="submit">
                            <Box backgroundColor={'gray.300'}>
                                <Text p={2} className='imported'>Login</Text>
                            </Box>
                        </Button>
                        {/* {signInStatus === 'error' && (
                            <Text color="red.500" mt={3}>{errorMessage}</Text>
                        )} */}
                    </form>
                )}
            </Box>
        </ChakraBaseProvider>
    )
}

export default SignIn;
