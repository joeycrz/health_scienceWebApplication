//import { Text } from '@chakra-ui/react';
import { Box, Center, ChakraBaseProvider, extendBaseTheme, Spacer } from '@chakra-ui/react';
import React from 'react';
import { Card, CardHeader, CardBody, Text, CardFooter, Heading, Stack, StackDivider } from '@chakra-ui/react'
import './App.css';


const mainCard = {
 
}

function App() {
  return (
    <ChakraBaseProvider>
      <div>
        <Text fontSize={30} align="center" paddingRight={200}>Health Science Announcements Application</Text>
      </div>
      <div>
        <Card align={'center'} border='4px' marginLeft={90} marginRight={90} marginBlock={10}>
          <CardHeader>
            <Heading size='md'>Announcements</Heading>
          </CardHeader>

          <CardBody>
            <Stack divider={<StackDivider />} spacing='4'>
              <Box>
                <Heading size='xs' textTransform='uppercase'>
                  Summary
                </Heading>
                <Text pt='2' fontSize='sm'>
                  View a summary of all your clients over the last month.
                </Text>
              </Box>
              <Box>
                <Heading size='xs' textTransform='uppercase'>
                  Overview
                </Heading>
                <Text pt='2' fontSize='sm'>
                  Check out the overview of your clients.
                </Text>
              </Box>
              <Box>
                <Heading size='xs' textTransform='uppercase'>
                  Analysis
                </Heading>
                <Text pt='2' fontSize='sm'>
                  See a detailed analysis of all your business clients.
                </Text>
              </Box>
              <Spacer></Spacer>
            </Stack>
          </CardBody>
        </Card>
      </div>
    </ChakraBaseProvider>

  );
}

export default App;
