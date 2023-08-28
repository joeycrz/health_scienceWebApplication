import React from 'react';
import './App.css';
import './index.css';
import { ChakraBaseProvider, Container, Button, Input, Textarea } from '@chakra-ui/react';
import {Box, Text, } from '@chakra-ui/react';
import {
    FormControl,
    FormLabel,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    PopoverAnchor,
    setIsPopoverOpen,
    isPopoverOpen,
} from '@chakra-ui/react'

import { db } from './firebase';
import { uid } from 'uid';
import { set, ref, onValue } from 'firebase/database';
import { useState, useEffect } from 'react';

// Database CRUD
import './announceSubmit';

// User Authentication
const AnnounceSubmit = () => {
    const [title, setTitle] = useState("");
    const [todo, setTodo] = useState("");
    const [todos, setTodos] = useState([]);

    const hanldeTodoChange = (e) => {
        setTodo(e.target.value);
    }

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
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
        if (title && todo) { // Check if both title and todo are not empty
            const uuid = uid();
            const currentDate = new Date();
            const timestamp = currentDate.toLocaleString();
            set(ref(db, `/${uuid}`), {
                title,
                todo,
                timestamp,
                uuid,
            });

            setTitle("");
            setTodo("");
        }
    }

    return (
        <ChakraBaseProvider>

            <Box p={10}>
            <Text fontSize={20} className='imported' paddingLeft={5} paddingBottom={5} key={'signUp'}>Post Announcement Form</Text>

                <form >
                    <FormControl >
                        <Box
                            p={3}
                            borderStyle={'ridge'}
                            borderColor={'gray.700'}
                            borderWidth={3}
                        >
                            <FormLabel>
                                <Text paddingBottom={3} className='imported'>Title</Text>
                            </FormLabel>
                            <Input
                                type="text"
                                placeholder="Enter a title for the post."
                                value={title}
                                onChange={handleTitleChange}
                                width={300}
                            />
                        </Box>
                    </FormControl>

                    <FormControl mt={4} >
                        <Box
                            p={3}
                            borderStyle={'ridge'}
                            borderColor={'gray.700'}
                            borderWidth={3}
                        >
                            <FormLabel>
                                <Text paddingBottom={3} className='imported'>Description</Text>
                            </FormLabel>
                            <Input
                                type="text"
                                placeholder="Enter a description for the post."
                                value={todo}
                                onChange={hanldeTodoChange}
                                width={300}
                            />

                        </Box>
                    </FormControl>

                    <Button
                        mt={6}
                        onClick={writeToDatabase}>
                        <Box backgroundColor={'gray.300'}>
                            <Text p={2} className='imported'>Post</Text>
                        </Box>
                    </Button>
                </form>
            </Box>

        </ChakraBaseProvider>

    );
}

export default AnnounceSubmit;
