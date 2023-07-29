import React from 'react';
import './App.css';
import './index.css';
import { Flex, Text, ChakraBaseProvider, Stack, WrapItem, Spacer, Center, VStack, HStack } from '@chakra-ui/react';
import { Grid, GridItem, Heading, Box, Button, ButtonGroup } from '@chakra-ui/react'
import { ListItem, OrderedList, Textarea } from '@chakra-ui/react';


import { db } from './firebase';
import { uid } from 'uid';
import { set, ref, onValue } from 'firebase/database';
import { useState, useEffect } from 'react';

// Database CRUD
import './announceSubmit';

// User Authentication
import SignIn from './components/auth/signin';
import SignUp from './components/auth/signup';
import AuthDetails from './components/authDetails';
import { Container } from 'react-bootstrap';
const AnnounceSubmit = () => {

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
                Object.values(data).map(todo => {
                    setTodos(oldArray => [...oldArray, todo])
                });
            }
        })
    }, []);

    // write
    const writeToDatabase = () => {
        const uuid = uid();
        set(ref(db, `/${uuid}`), {
            todo,
            uuid,
        });

        setTodo("");
    }

    return (
        <>
            <div align="center">
                <Textarea size='sm' value={todo} onChange={hanldeTodoChange} placeholder='Enter a new announcement.'></Textarea>
                
                <button onClick={writeToDatabase}>Submit</button>
            </div>
        </>
    );
}

export default AnnounceSubmit;
