import React from 'react';
import '../App.css';
import '../index.css';
import { useMediaQuery, Flex, Image, Divider, Text, ChakraBaseProvider, Stack, SimpleGrid, Spacer, Center, VStack, HStack } from '@chakra-ui/react';
import { Grid, GridItem, Heading, Box, Button, ButtonGroup, StackDivider } from '@chakra-ui/react'
import { Card, Icon, IconButton, CardBody, CardFooter, CardHeader, CardBodyProps } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';

import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    PopoverAnchor,
    useDisclosure
} from '@chakra-ui/react'

import { db } from '../firebase';
import { uid } from 'uid';
import { set, ref, remove, onValue, update, get } from 'firebase/database';
import { getAuth, onAuthStateChanged, listUsers } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { useState, useEffect } from 'react';

// Database CRUD
import '../announceSubmit';

// User Authentication
import SignIn from '../components/auth/signin';
import SignUp from '../components/auth/signup';
import AuthDetails from '../components/authDetails';
import AnnounceSubmit from '../announceSubmit';
import AuthPost from '../components/authPost';

import { ViewIcon } from '@chakra-ui/icons';
import AuthDelete from '../components/authDelete';


const HomePage = () => {

    const [title, setTitle] = useState("");
    const [todo, setTodo] = useState("");
    const [todos, setTodos] = useState([]);

    const hanldeTodoChange = (e) => {
        setTodo(e.target.value);
    }

    // Read
    useEffect(() => {
        onValue(ref(db), snapshot => {
            setTodos([]);
            const data = snapshot.val();
            if (data !== null) {
                const sortedAnnouncements = Object.values(data).sort((a, b) => {
                    const timestampA = new Date(a.timestamp).getTime();
                    const timestampB = new Date(b.timestamp).getTime();
                    return timestampB - timestampA;
                });

                setTodos(sortedAnnouncements);
            }
        });
    }, []);

    const handleLike = async (todo, setTodos) => {
        // Ensure likes is a number and increment it
        const likes = typeof todo.likes === 'number' ? todo.likes + 1 : 1;

        // Update the likes count locally
        setTodos((prevTodos) => {
            return prevTodos.map((t) => {
                if (t.uuid === todo.uuid) {
                    return { ...t, likes };
                }
                return t;
            });
        });

        // Update the likes count in the database
        try {
            await set(ref(db, `/${todo.uuid}/likes`), likes);
        } catch (error) {
            console.error('Failed to update likes in the database:', error);
            // You can add error handling as needed
        }
    };

    return (
        <ChakraBaseProvider>
            <Grid
                bg={'gray.200'}
                templateColumns='repeat(6, 1fr)'
                templateRows='repeat(5, 1fr)'
                maxH='930px'
                minHeight="100vh"
                p={1} // Added padding for responsiveness
            >
                {/* HEADER/TITLE */}
                <GridItem rowStart={1} rowEnd={2} colStart={1} colEnd={8} bg={'gray.200'}>
                    <HStack
                        paddingTop={[2, 5]} // Adjust padding based on breakpoints
                        flexDirection={['column', 'row']} // Stack elements vertically on small screens, horizontally on larger screens
                        alignItems={['center', 'flex-start']} // Center elements vertically on small screens, align to the start on larger screens
                    >
                        <Text
                            paddingLeft={[0, 10]} // Remove left padding on small screens, add padding on larger screens
                            className='imported'
                            fontSize={[40, 70]} // Adjust font size based on breakpoints
                            textAlign={['center', 'left']} // Center text on small screens, align to the left on larger screens
                        >
                            Health Science Announcements
                        </Text>
                        <Spacer />
                        <HStack
                            alignItems={['space-between', 'flex-start']} // Align items to center on small screens, to start on larger screens
                            marginTop={[1, 0]} // Add space on top on small screens, remove on larger screens
                        >
                            <Popover placement='bottom' isLazy>
                                <Box>
                                    <PopoverTrigger >
                                        <Button >
                                            <Text paddingTop={[0, 10]} paddingLeft={[8, 12]} className='imported' fontSize={['16', '20']} fontWeight={'bold'}>
                                                Post Form
                                            </Text>
                                        </Button>
                                    </PopoverTrigger>
                                </Box>
                                <PopoverContent paddingLeft={[5, 10]} paddingRight={[10, 0]}>
                                    <Box
                                        shadow={'dark-lg'}
                                        w={[300, 500]}
                                        maxH={600}
                                        borderStyle={'solid'}
                                        borderColor={'black'}
                                        borderWidth={3}
                                        bg={'white'}
                                    >
                                        <AuthPost />
                                    </Box>
                                </PopoverContent>
                            </Popover>

                            {/* Login Button */}
                            <Popover placement='bottom' isLazy>
                                <Box>
                                    <PopoverTrigger>
                                        <Button>
                                            <Text
                                                className='imported'
                                                fontSize={['16', '20']}
                                                fontWeight={'bold'}
                                                paddingLeft={[5, 5]}
                                                paddingRight={5}
                                                paddingTop={[0, 10]}
                                            >
                                                Login
                                            </Text>
                                        </Button>
                                    </PopoverTrigger>
                                </Box>
                                <PopoverContent paddingLeft={[59, 0]} paddingRight={[8, 5]}>
                                    <Box
                                        shadow={'dark-lg'}
                                        w={[300, 500]}
                                        maxH={400}
                                        borderStyle={'solid'}
                                        borderColor={'black'}
                                        borderWidth={3}
                                        bg={'white'}
                                    >
                                        <SignIn />
                                    </Box>
                                </PopoverContent>
                            </Popover>

                            <Box >
                                <AuthDetails />
                            </Box>

                            {/* SignUp Button */}
                            <Popover visibility={'hidden'} offset={[-790, 100]} placement='bottom' isLazy>
                                <Box visibility={'hidden'}>
                                    <PopoverTrigger>
                                        <Button>
                                            <Text className='imported' fontSize={['16', '20']} fontWeight={'bold'}>
                                                SignUp
                                            </Text>
                                        </Button>
                                    </PopoverTrigger>
                                </Box>
                                <PopoverContent bg={'white'}>
                                    <Box
                                        shadow={'dark-lg'}
                                        w={500}
                                        h={400}
                                        borderStyle={'solid'}
                                        borderColor={'black'}
                                        borderWidth={3}
                                    >
                                        <SignUp />
                                    </Box>
                                </PopoverContent>
                            </Popover>
                        </HStack>
                    </HStack>

                </GridItem>

                {/* ANNOUNCEMENTS CONTENT */}
                <GridItem colStart={1} colEnd={8} rowStart={[2, null, 2]} rowEnd={5} bg="gray.200">
                    <Box padding={15} overflowX="auto">
                        <HStack css={{ display: "flex", flexWrap: "nowrap", padding: "10px 0" }}>
                            {todos.map((todo) => (
                                <Box
                                    borderWidth="1px"
                                    borderColor="gray.300"
                                    borderRadius="md"
                                    p="8"
                                    width="350px"
                                    minWidth="350px" // Ensure each item has a fixed width
                                    boxShadow="md"
                                    backgroundColor={"white"}
                                    marginRight="20px" // Add some space between items
                                >
                                    <VStack align="start" spacing="2">
                                        <Box w="300px" h="200px">
                                            <HStack justify={'space-between'}>
                                                <Link to={`/post/${todo.uuid}`}>
                                                    <Text paddingBottom={3} fontSize="lg" fontWeight="bold" >{todo.title}</Text>

                                                </Link>


                                                <Text>

                                                </Text>
                                            </HStack>

                                            <Divider />

                                            <Text>{todo.todo}</Text>

                                            <Text>{todo.timestamp}</Text>
                                            <HStack>

                                                <Text>
                                                    <button onClick={() => handleLike(todo, setTodos)}>
                                                        Like ({todo.likes || 0})
                                                    </button>
                                                </Text>


                                            </HStack>

                                        </Box>

                                    </VStack>
                                </Box>
                            ))}
                        </HStack>
                    </Box>
                </GridItem>

                {/* FOOTER/CONTACT INFORMATION */}
                <GridItem colSpan={6} rowStart={5} backgroundColor={'gray.200'}>
                    <Box paddingLeft={[0, 10]} maxW={500}>
                        <Text fontSize={20} paddingBottom={3} className='imported'>Contact Information</Text>
                        <Text fontWeight={'medium'}>Feel free to message or email me at, ok@ok.com</Text>
                    </Box>


                </GridItem>
            </Grid>

        </ChakraBaseProvider>
    )
}

export default HomePage;