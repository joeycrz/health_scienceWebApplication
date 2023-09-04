import React from 'react';
import '../App.css';
import '../index.css';
import { Box, Grid, GridItem, Text, ChakraBaseProvider, Stack, Spacer, Center, VStack, HStack } from '@chakra-ui/react';

import { db } from '../firebase';
import { uid } from 'uid';
import { set, ref, remove, onValue, update, get } from 'firebase/database';
import { getAuth, onAuthStateChanged, listUsers } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import HomePage from './homePage';

const PostPage = () => {
    const { postId } = useParams();

    const [todo, setTodo] = useState(null); // Initialize todo as null to handle loading state

    useEffect(() => {
        onValue(ref(db), snapshot => {
            const data = snapshot.val();
            if (data !== null) {
                const sortedAnnouncements = Object.values(data).sort((a, b) => {
                    const timestampA = new Date(a.timestamp).getTime();
                    const timestampB = new Date(b.timestamp).getTime();
                    return timestampB - timestampA;
                });

                // Find the todo with the matching UUID
                const selectedTodo = sortedAnnouncements.find(todo => todo.uuid === postId);

                // Set the selected todo to the state
                setTodo(selectedTodo);
            }
        });
    }, [postId]); // Include postId in the dependency array to re-run the effect when postId changes

    return (
        <ChakraBaseProvider>
            <Grid
                bg={'gray.200'}
                templateColumns='repeat(6, 1fr)'
                templateRows='repeat(5, 1fr)'
                maxH='930px'
                minHeight="100vh"
                p={1}
            >

                <GridItem rowStart={1} rowEnd={2} colStart={1} colEnd={8} bg={'gray.200'}>
                    <VStack>
                        <Box>
                            {todo ? (
                                <>
                        
                                    <Text className='imported' fontSize={50} >{todo.title}</Text>


                                    <Text fontSize={20} fontStyle={'italic'} fontWeight={'semibold'}>{todo.todo}</Text>

                                </>
                            ) : (
                                <Text>Loading...</Text>
                            )}
                        </Box>
                    </VStack>
                </GridItem>
                <GridItem rowStart={1} rowEnd={2} colStart={6} colEnd={8} bg={'gray.200'}>

                </GridItem>

                <GridItem rowStart={2} rowEnd={5} colStart={2} colEnd={6} bg={'gray.200'}>
                    <VStack>
                        <Box css={{ display: "flex", flexWrap: "nowrap", padding: "10px 0" }}>
                            {todo ? (
                                <>
                                    <Text className='imported' fontSize={20} >{todo.content}</Text>
                                </>
                            ) : (
                                <Text>Loading...</Text>
                            )}
                        </Box>
                    </VStack>
                </GridItem>

                <GridItem rowStart={5} rowEnd={6} colStart={1} colEnd={8} bg={'gray.200'}>
                    <VStack>
                        <Box>
                            {todo ? (
                                <>
                                    <Text fontSize={[12, 20]} >{todo.timestamp}</Text>
                                </>
                            ) : (
                                <Text>Loading...</Text>
                            )}
                        </Box>
                    </VStack>
                </GridItem>

            </Grid>


        </ChakraBaseProvider>
    );
}

export default PostPage;