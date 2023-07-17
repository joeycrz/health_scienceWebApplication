import React from 'react';
import './App.css';
import './index.css';
import { Flex, Text, ChakraBaseProvider, Stack, WrapItem, Spacer, Center} from '@chakra-ui/react';
import { Grid, GridItem, Heading, Box, Button, ButtonGroup } from '@chakra-ui/react'
import { ListItem, OrderedList } from '@chakra-ui/react';
import {
  FormControl,
  FormLabel,
  Input
} from '@chakra-ui/react'

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

import {db} from './firebase';
import { uid } from 'uid';
import {set, ref, onValue} from 'firebase/database';
import { useState, useEffect } from 'react';

// User Authentication
import SignIn from './components/auth/signin';
import SignUp from './components/auth/signup';
import AuthDetails from './components/authDetails';
import { Container } from 'react-bootstrap';

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

  

  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  

  return (
    <ChakraBaseProvider>
  
      <Grid
        templateColumns='repeat(4, 1fr)'
        templateRows='repeat(5, 1fr)'
        h='937px' gap={4}>
        {/* START OF GRID LAYOUT */}
        {/* ///////////////////////////////////////////// */}

        {/* HEADER/TITLE */}
        <GridItem colSpan={4} bg={'gray.300'}> 

          <Stack direction={['column', 'row']} spacing='1px'>
            <Box w='1500px' h='150px' bg={'gray.200'}>
              <Text paddingTop={10} fontFamily={'mono'} fontSize={60} >Health Science Announcements</Text>
            </Box>

            {/* LOGIN / USER AUTHENTICATION */}
            <Box w='220px' h='100px' bg={'gray.200'}>
              <Text align={'center'}>Already have an acccount? Sign In below!!</Text>
              <Popover offset={[1,10]} placement='bottom' isLazy>
                <Box alignContent={'center'} >
                <PopoverTrigger>
                  <Button className='ButtonPadding'>
                    <Text fontWeight={'bold'}>Login</Text>
                  </Button>
                </PopoverTrigger>
                </Box>
                <PopoverContent bg={'gray.300'}>
                  
                  <PopoverHeader fontWeight='semibold'>Please enter your login credentials</PopoverHeader>
                  <PopoverArrow />
                  {/* <PopoverCloseButton /> */}
                  <PopoverBody>
                    <SignIn/>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            </Box>

            <Box w='220px' h='100px' bg={'gray.200'}>
              <Text align={'center'}>Don't have an acccount? Create an account below!</Text>
              <Popover offset={[1,10]} placement='bottom' isLazy>
                <Box alignContent={'center'} >
                <PopoverTrigger>
                  <Button className='ButtonPadding'>
                    <Text fontWeight={'bold'}>Sign Up</Text>
                  </Button>
                </PopoverTrigger>
                </Box>
                <PopoverContent bg={'red.300'}>
                  
                  <PopoverHeader fontWeight='semibold'>Please enter a username and password.</PopoverHeader>
                  <PopoverArrow />
                  {/* <PopoverCloseButton /> */}
                  <PopoverBody>
                    <SignUp/>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            </Box>
          </Stack>

        </GridItem>
        

        {/* ANNOUNCEMENTS CONTENT */}
        <GridItem colSpan={3} rowStart={2} rowEnd={5} bg='papayawhip'>

          <Text fontSize={25} fontFamily={'monospace'} align="center" paddingBottom={3}>Check out the announcements below!!!</Text>

          <Box paddingLeft={10} fontSize={20}>
            <OrderedList>
              {todos.map((todo) => (
                <ListItem>{todo.todo}</ListItem>
              ))}
            </OrderedList>
          </Box>
          </GridItem>        
        
        {/* FOOTER/CONTACT INFORMATION */}
        <GridItem colSpan={4} rowStart={5}  bg='light gray'>
          <Text fontSize={20} align="center" paddingBottom={3}>AWESOME PROGRAMMER INFO</Text>
          <Text>@joey.cz on the gram</Text>
        </GridItem>




      </Grid>

        {/* <SignIn/>
        <SignUp/>
        <AuthDetails/>
      */}
      
    </ChakraBaseProvider>

    

  );
}

export default App;
