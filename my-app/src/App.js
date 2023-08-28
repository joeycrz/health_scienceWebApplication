import React from 'react';
import './App.css';
import './index.css';
import { useMediaQuery, Flex, Image, Divider, Text, ChakraBaseProvider, Stack, SimpleGrid, Spacer, Center, VStack, HStack } from '@chakra-ui/react';
import { Grid, GridItem, Heading, Box, Button, ButtonGroup, StackDivider } from '@chakra-ui/react'
import { Card, Icon, IconButton, CardBody, CardFooter, CardHeader, CardBodyProps } from '@chakra-ui/react';


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
import { set, ref, onValue, update, get } from 'firebase/database';
import { getAuth, onAuthStateChanged, listUsers } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { useState, useEffect } from 'react';

// Database CRUD
import './announceSubmit';

// User Authentication
import SignIn from './components/auth/signin';
import SignUp from './components/auth/signup';
import AuthDetails from './components/authDetails';
import AnnounceSubmit from './announceSubmit';
import AuthPost from './components/authPost';


import { ViewIcon } from '@chakra-ui/icons';



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
          const timestampA = new Date(a.timestamp).getTime();
          const timestampB = new Date(b.timestamp).getTime();
          return timestampB - timestampA;
        });

        setTodos(sortedAnnouncements);
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

  const handleLike = (uuid, userEmail) => {
    const todoRef = ref(db, uuid);

    get(todoRef).then((snapshot) => {
      const todoData = snapshot.val();
      if (todoData) {
        const currentLikes = todoData.likes || 0;

        // Check if the user has already liked the post
        if (!todoData.likesBy || !todoData.likesBy[userEmail]) {
          const updatedLikes = currentLikes + 1;

          // Update likes count and add the user's email to likesBy
          update(ref(db, uuid), {
            likes: updatedLikes,
            [`likesBy/${userEmail}`]: true
          });
        }
      }
    });
  };




  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  // UI CONFIGURATION Responsive(to any screen)
  const breakpoints = {
    sm: '30em', // 480px
    md: '48em', // 768px
    lg: '62em', // 992px
    xl: '80em', // 1280px
    '2xl': '96em', // 1536px
  }


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
              alignItems={['center', 'flex-start']} // Align items to center on small screens, to start on larger screens
              marginTop={[2, 0]} // Add space on top on small screens, remove on larger screens
            >
              {/* Login Button */}
              <Popover offset={[-690, 100]} placement='bottom' isLazy>
                <Box paddingRight={10} >
                  <PopoverTrigger>
                    <Button>
                      <Text className='imported' fontSize={['16', '20']} fontWeight={'bold'}>
                        Login
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
                    <SignIn />
                  </Box>
                </PopoverContent>
              </Popover>

              {/* SignUp Button */}
              <Popover offset={[-790, 100]} placement='bottom' isLazy>
                <Box>
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
          <HStack
            justifyContent={['center', 'space-between']} // Center content on small screens, distribute space on larger screens
            marginTop={[2, 0]} // Add space on top on small screens, remove on larger screens
          >
            <Popover offset={[500, 100]} placement='bottom' isLazy>
              <Box>
                <PopoverTrigger>
                  <Button>
                    <Text paddingLeft={5} className='imported' fontSize={['16', '20']} fontWeight={'bold'}>
                      Post Form
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
                  <AuthPost />
                </Box>
              </PopoverContent>
            </Popover>
            <Text
              paddingRight={[0, 7]} // Remove right padding on small screens, add padding on larger screens
            >
              <AuthDetails />
            </Text>
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
                  key={todo.uuid}
                  marginRight="20px" // Add some space between items
                >
                  <VStack align="start" spacing="2">
                    <Box w="300px" h="200px">
                      <Text paddingBottom={3} fontSize="lg" fontWeight="bold" >{todo.title}</Text>


                      <Divider />

                      <Text>{todo.todo}</Text>

                      <Text>{todo.timestamp}</Text>
                      <HStack>
                        <IconButton icon={<ViewIcon />} onClick={() => handleLike(todo.uuid)} />
                        <Text fontSize={15}>[{todo.likes || 0}]</Text>
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
  );
}

export default App;
