import React from 'react';
import './App.css';
import './index.css';
import { Flex, Image, Divider, Text, ChakraBaseProvider, Stack, SimpleGrid, Spacer, Center, VStack, HStack } from '@chakra-ui/react';
import { Grid, GridItem, Heading, Box, Button, ButtonGroup, StackDivider } from '@chakra-ui/react'
import { Card, CardBody, CardFooter, CardHeader, CardBodyProps } from '@chakra-ui/react';

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
          // Assuming that the timestamp property is a valid date string
          const timestampA = new Date(a.timestamp).getTime();
          const timestampB = new Date(b.timestamp).getTime();
          return timestampB - timestampA; // Sort in descending order
        });

        const titles = sortedAnnouncements.map(todo => todo.title);
        setTodos(sortedAnnouncements);
        setTitle(titles);
      }
    });
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
        justifySelf="center"
        bg={'blackAlpha.800'}
        templateColumns='repeat(6, 1fr)'
        templateRows='repeat(5, 1fr)'
        h='930px'>
        {/* START OF GRID LAYOUT */}
        {/* ///////////////////////////////////////////// */}

        {/* HEADER/TITLE */}
        <GridItem rowStart={1} rowEnd={2} colStart={1} colEnd={8} bg={'gray.200'}>
          <HStack paddingTop={5}>
            <Text paddingLeft={10} className='imported' fontSize={70} >Health Science Announcements</Text>
            <Spacer />
            <Box >
              <Popover offset={[-690, 100]} placement='bottom' isLazy>
                <Box paddingRight={10} >
                  <PopoverTrigger>
                    <Button>
                      <Text className='imported' fontSize={'20'} fontWeight={'bold'}>Login</Text>
                    </Button>
                  </PopoverTrigger>
                </Box>
                <PopoverContent bg={'white'}>
                  <Box
                    shadow={'dark-lg'} 
                    w={500} 
                    h={400} 
                    borderStyle={'solid'} borderColor={'black'} borderWidth={3}
                    >
                    <SignIn/>
                  </Box>
                </PopoverContent>
              </Popover>
            </Box>
            <Box paddingRight={20}>
              <Popover offset={[-790, 100]} placement='bottom' isLazy>
                <Box >
                  <PopoverTrigger>
                    <Button >
                    <Text className='imported' fontSize={'20'} fontWeight={'bold'}>SignUp</Text>
                    </Button>
                  </PopoverTrigger>
                </Box>
                <PopoverContent bg={'white'}>
                  <Box
                    shadow={'dark-lg'} 
                    w={500} 
                    h={400} 
                    borderStyle={'solid'} borderColor={'black'} borderWidth={3}
                    >
                    <SignUp/>
                  </Box>
                </PopoverContent>
              </Popover>
            </Box>
            
          </HStack>
        </GridItem>



        {/* ANNOUNCEMENTS CONTENT */}

        <GridItem colStart={1} colEnd={6} rowStart={2} rowEnd={5} bg='gray.200'>

          <Box padding={15}>
            <HStack>
              {todos.map((todo) => (
                <Box
                  borderWidth="1px"
                  borderColor="gray.300"
                  borderRadius="md"
                  p="8"
                  width="100%"
                  w="350px"
                  overflow="hidden"
                  boxShadow="md"
                  backgroundColor={'white'}
                >
                  <VStack align="start" spacing="2">
                    <Box w="300px" h="200px">
                      <Text paddingBottom={3} fontSize="lg" fontWeight="bold" >{todo.title}</Text>


                      <Divider />

                      <Text>{todo.todo}</Text>

                      <Text>{todo.timestamp}</Text>
                    </Box>

                  </VStack>
                </Box>
              ))}
            </HStack>
          </Box>


        </GridItem>


        {/* ANNOUNCEMENT SUBMISSION */}
        <GridItem colStart={6} colEnd={7} rowStart={2} rowEnd={5} bg='papayawhip'>

          <Center>
            <Box >
              <AuthPost />
            </Box>
          </Center>

        </GridItem>
        {/* FOOTER/CONTACT INFORMATION */}
        <GridItem colSpan={6} rowStart={5} backgroundColor={'gray.200'}>

          <Box w={500} paddingLeft={10}>
            <Text fontSize={20} paddingBottom={3} className='imported'>Contact Information</Text>
            <Text fontWeight={'medium'}>Feel free to message or email me at, ok@ok.com</Text>
          </Box>

        </GridItem>




      </Grid>


    </ChakraBaseProvider>
  );
}

export default App;
