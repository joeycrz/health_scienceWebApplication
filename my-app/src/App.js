import React from 'react';
import './App.css';
import './index.css';
import { useMediaQuery, Flex, Image, Divider, Text, ChakraBaseProvider, Stack, SimpleGrid, Spacer, Center, VStack, HStack } from '@chakra-ui/react';
import { Grid, GridItem, Heading, Box, Button, ButtonGroup, StackDivider } from '@chakra-ui/react'
import { useDisclosure, Card, Icon, IconButton, CardBody, CardFooter, CardHeader, CardBodyProps } from '@chakra-ui/react';


// Router
import { BrowserRouter as Router, Route, Routes, Switch } from 'react-router-dom';

// Database Libraries
import { db } from './firebase';
import { uid } from 'uid';
import { set, ref, remove, onValue, update, get } from 'firebase/database';
import { getAuth, onAuthStateChanged, listUsers } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { useState, useEffect } from 'react';

// Database CRUD
import './announceSubmit';

// User Authentication and Functionality Calls
import SignIn from './components/auth/signin';
import SignUp from './components/auth/signup';
import AuthDetails from './components/authDetails';
import AnnounceSubmit from './announceSubmit';
import AuthPost from './components/authPost';
import HomePage from './pages/homePage';
import AuthDelete from './components/authDelete';
import PostPage from './pages/postPage';



function App() {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  return (
    <ChakraBaseProvider>
      <Routes>
        
          <Route path="/" element={<HomePage />} />
          <Route path="/post/:postId" element={<PostPage />} />
      </Routes>

    </ChakraBaseProvider>
  );
}

export default App;
