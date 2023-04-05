//import { Text } from '@chakra-ui/react';
import { Box, Center, ChakraBaseProvider, Divider, extendBaseTheme, Spacer } from '@chakra-ui/react';
import React from 'react';
import { Grid, GridItem } from '@chakra-ui/react'
import { Card, CardHeader, CardBody, Text, CardFooter, Heading, Stack } from '@chakra-ui/react'
import { List, ListItem, ListIcon, OrderedList, UnorderedList} from '@chakra-ui/react'
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
import './App.css';


function App() {
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
            <Text align={'center'}>Login/Signup</Text>
          </GridItem>
        </Grid>

        <Box paddingLeft={75} paddingRight={75} paddingTop={5} bg='orange.50'>
          <Text fontSize={20} align="center" paddingBottom={3}>Announcements</Text>
          <Center>
            <UnorderedList spacing={3}>
              <ListItem>
                <Text>
                  Reminder to do your homework!!
                </Text>
              </ListItem>
              <ListItem>
                <Text>
                  Exam on Monday!!! DO NOT PANIC, only a 1000 questions
                </Text>
              </ListItem><ListItem>
                <Text>
                  No class this Friday!!
                </Text>
              </ListItem><ListItem>
                <Text>
                  Meeting for new school club next Tuesday!
                </Text>
              </ListItem>
            </UnorderedList>
          </Center>
        </Box>

      </div>
      
    </ChakraBaseProvider>

  );
}

export default App;
