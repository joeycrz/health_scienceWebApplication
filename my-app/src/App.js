import React from 'react';
import './App.css';
import './index.css';
import { Flex, Text, ChakraBaseProvider, Stack, WrapItem, Spacer, Center, VStack, HStack } from '@chakra-ui/react';
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
import AnnounceSubmit from './announceSubmit';
import AuthPost from './components/authPost';
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



  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);


  return (
    <ChakraBaseProvider>

      <Grid
        bg={'blackAlpha.800'}
        templateColumns='repeat(6, 1fr)'
        templateRows='repeat(5, 1fr)'
        h='930px' gap={2}>
        {/* START OF GRID LAYOUT */}
        {/* ///////////////////////////////////////////// */}

        {/* HEADER/TITLE */}
        <GridItem rowStart={1} rowEnd={2} colStart={2} colEnd={6} bg={'gray.200'}>
          <Text align={'center'} paddingTop={10} fontFamily={'mono'} fontStyle={'oblique'} fontSize={70} >Health Science Announcements</Text>
        </GridItem>

        <GridItem rowStart={1} rowEnd={2} colStart={6} colEnd={7} bg={'gray.400'}>
          <HStack>
            <Box>
              <Popover offset={[1, 10]} placement='bottom' isLazy>
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
                    <SignIn />
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            </Box>
            <Box>
              <Popover offset={[1, 10]} placement='bottom' isLazy>
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
                    <SignUp />
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            </Box>
          </HStack>

          <Center>
            <Box paddingTop={20} paddingLeft={10}>
              <Text fontWeight={'bold'}>
                <AuthDetails />
              </Text>
            </Box>
          </Center>


        </GridItem>




        {/* ANNOUNCEMENTS CONTENT */}
        <GridItem colStart={1} colEnd={6} rowStart={2} rowEnd={5} bg='papayawhip'>

          <Text fontSize={25} fontFamily={'monospace'} align="center" paddingBottom={3}>Check out the announcements below!!!</Text>
          <Center>
            <Box paddingLeft={10} fontSize={20}>
              <OrderedList>
                {todos.map((todo) => (
                  <ListItem>{todo.todo}</ListItem>
                ))}
              </OrderedList>
            </Box>
          </Center>

        </GridItem>


        {/* ANNOUNCEMENT SUBMISSION */}

        <GridItem colStart={6} colEnd={7} rowStart={2} rowEnd={5} bg='papayawhip'>

          <Center>
            <Box >
              <AuthPost/>
            </Box>
          </Center>

        </GridItem>
        {/* FOOTER/CONTACT INFORMATION */}
        <GridItem colSpan={6} rowStart={5} backgroundColor={'gray.200'}>
          <Center>
            <Box w={500}>
              <Text fontSize={20} align="center" paddingBottom={3}>Contact Information</Text>
              <Text>Feel free to message or email me at, ok@ok.com</Text>
            </Box>
          </Center>

        </GridItem>




      </Grid>

    </ChakraBaseProvider>
  );
}

export default App;
