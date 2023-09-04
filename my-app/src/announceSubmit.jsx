import React from 'react';
import './App.css';
import './index.css';
import { ChakraBaseProvider, Container, Button, Input, Textarea } from '@chakra-ui/react';
import { Box, Text, } from '@chakra-ui/react';
import {FormControl,FormLabel,} from '@chakra-ui/react'
import { BrowserRouter as Router, Route, useNavigate, useParams } from 'react-router-dom';

import { db } from './firebase';
import { uid } from 'uid';
import { set, ref, onValue } from 'firebase/database';
import { useState, useEffect } from 'react';



// User Authentication
const AnnounceSubmit = () => {
    const [title, setTitle] = useState("");
    const [todo, setTodo] = useState("");
    const [content, setContent] = useState("");
    const [todos, setTodos] = useState([]);

    const hanldeTodoChange = (e) => {
        setTodo(e.target.value);
    }

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    }

    const handleContentChange = (e) => {
        setContent(e.target.value)
    }

    // Read
    useEffect(() => {

        onValue(ref(db), snapshot => {
            setTodos([]);
            const data = snapshot.val();
            if (data !== null) {
                Object.values(data).map(todo => {
                    setTodos(oldArray => [...oldArray, todo])
                });
            }
        })
    }, []);

    // write
    
    
    const writeToDatabase = () => {
        if (title && todo) {
            const uuid = uid();
            const currentDate = new Date();
            const timestamp = currentDate.toLocaleString();
            set(ref(db, `/${uuid}`), {
                title,
                todo,
                timestamp,
                content,
                uuid,
            });

            setTitle('');
            setTodo('');
            setContent('');

            // Navigate to a new page (you can specify the route path)
             // Change '/new-page' to your desired route path
        }
    };

    return (
        <ChakraBaseProvider>
            
                <ChakraBaseProvider>
                    <Box p={10} w={[300, 500]}>
                        <Text fontSize={[18, 20]} className='imported' paddingLeft={[0, 5]} paddingBottom={5} key={'signUp'}>
                            Post Announcement Form
                        </Text>

                        <form>
                            <FormControl>
                                <Box p={3} borderStyle={'ridge'} borderColor={'gray.700'} borderWidth={3}>
                                    <FormLabel>
                                        <Text paddingBottom={3} className='imported'>
                                            Title
                                        </Text>
                                    </FormLabel>
                                    <Input
                                        type='text'
                                        placeholder='Enter a title for the post.'
                                        value={title}
                                        onChange={handleTitleChange}
                                        width={[190, 300]}
                                    />
                                </Box>
                            </FormControl>

                            <FormControl mt={4}>
                                <Box p={3} borderStyle={'ridge'} borderColor={'gray.700'} borderWidth={3}>
                                    <FormLabel>
                                        <Text paddingBottom={3} className='imported'>
                                            Description
                                        </Text>
                                    </FormLabel>
                                    <Input
                                        type='text'
                                        placeholder='Enter a description for the post.'
                                        value={todo}
                                        onChange={hanldeTodoChange}
                                        width={[190, 300]}
                                    />
                                </Box>
                            </FormControl>

                            <FormControl mt={4}>
                                <Box p={3} borderStyle={'ridge'} borderColor={'gray.700'} borderWidth={3}>
                                    <FormLabel>
                                        <Text paddingBottom={3} className='imported'>
                                            Content
                                        </Text>
                                    </FormLabel>
                                    <Input
                                        type='text'
                                        placeholder='Enter the content for the post.'
                                        value={content}
                                        onChange={handleContentChange}
                                        width={[190, 300]}
                                    />
                                </Box>
                            </FormControl>

                            <Button mt={6} onClick={writeToDatabase}>
                                <Box backgroundColor={'gray.300'}>
                                    <Text p={2} className='imported'>
                                        Post
                                    </Text>
                                </Box>
                            </Button>
                        </form>
                    </Box>
                </ChakraBaseProvider>

                {/* Define the route for the new page */}
                
        </ChakraBaseProvider>

    );
}

export default AnnounceSubmit;
