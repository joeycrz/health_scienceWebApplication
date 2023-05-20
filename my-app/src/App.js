//import { Text } from '@chakra-ui/react';
import { Box, Center, ChakraBaseProvider, Divider, extendBaseTheme, Spacer } from '@chakra-ui/react';
import React from 'react';
import { Grid, GridItem, Textarea } from '@chakra-ui/react'
import { Card, CardHeader, CardBody, Text, CardFooter, Heading, Stack } from '@chakra-ui/react'
import { List, ListItem, ListIcon, OrderedList, UnorderedList} from '@chakra-ui/react'
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
import './App.css';
import {db} from './firebase';
import { uid } from 'uid';
import {set, ref, onValue} from 'firebase/database';
import { useState, useEffect } from 'react';

function App() {
  
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
      if(data !== null){
        Object.values(data).map(todo => {
          setTodos(oldArray => [...oldArray,todo])
        });
      }
    })
  }, []);

  // write
  const writeToDatabase = () => {
    const uuid = uid();
    set(ref(db,`/${uuid}`),{
      todo,
      uuid,
    });

    setTodo("");
  }

  return (
    <ChakraBaseProvider>
      <div>
        <Text fontSize={30} align="center" paddingBottom={5} >Health Science Announcements Web Application</Text>
      </div>
     
      <div>
        <Grid templateColumns='repeats(5,1fr)' gap={6}>
          <GridItem colStart={2} colEnd={4} bg='yellow.200'>
            <Text align={'center'}>Below you will find the announcements for the class</Text>

          </GridItem>



          {/* Second column for user sign in button */}
          <GridItem colStart={4} colEnd={5} bg='blue.200'>
            <Text align={'center'}>Login</Text>
          </GridItem>
          
          <GridItem colStart={2} colEnd={4}>
            <div align="center">
              <Textarea size='sm' value={todo} onChange={hanldeTodoChange} placeholder='Enter a new announcement.'></Textarea>
              {/* <input type='text' value={todo} onChange={hanldeTodoChange} placeholder='ENTER A ANNOUNCEMENT'/> */}
              <button onClick={writeToDatabase}>Submit</button>
            </div>
      
          </GridItem>

          <GridItem colStart={2} colEnd={4} colSpan={4} rowSpan={'25'} bg='lightgrey'>
          <Text fontSize={20} align="center" paddingBottom={3}>Announcements</Text>

            <Center>
              <OrderedList>
              {todos.map((todo) => (
                <ListItem>{todo.todo}</ListItem>
              ))}
              </OrderedList>
             
            </Center>
          </GridItem>
        </Grid>
        


        <Box paddingLeft={75} paddingRight={75} paddingTop={5} bg='orange.50'>
          <Text fontSize={20} align="center" paddingBottom={3}>AWESOME PROGRAMMER INFO</Text>
          <Text>@joey.cz on the gram</Text>
        </Box>

      </div>
      
    </ChakraBaseProvider>

  );
}

export default App;
