import React from 'react';
import './App.css';
import './index.css';
import { ChakraBaseProvider, Textarea } from '@chakra-ui/react';
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

            <div align='center'>
                <input
                    type="text"
                    value={title}
                    onChange={handleTitleChange}
                    placeholder='Enter a title.'
                />
                <Textarea size='sm' value={todo} onChange={hanldeTodoChange} placeholder='Enter a new announcement.'></Textarea>

                <button onClick={writeToDatabase}>Submit</button>
            </div>


        </ChakraBaseProvider>

    );
}

export default AnnounceSubmit;
