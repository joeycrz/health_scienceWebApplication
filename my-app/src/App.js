//import { Text } from '@chakra-ui/react';
import { Box, Center, ChakraBaseProvider, Divider, extendBaseTheme, Spacer } from '@chakra-ui/react';
import React from 'react';
import { Grid, GridItem } from '@chakra-ui/react'
import { Card, CardHeader, CardBody, Text, CardFooter, Heading, Stack } from '@chakra-ui/react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './App.css';


function App() {
  return (
    <ChakraBaseProvider>
      <div>
        <Text fontSize={30} align="center" >Health Science Announcements Application</Text>
        
      </div>
      <div>
        <Container fluid>
          <Row>
            <Col align='center'>
              <Container>
                <div >
                  <Text>Announcements</Text>
                </div>
                <div >
                </div>
              </Container>
            </Col>
          </Row>
        </Container>
      </div>
      
    </ChakraBaseProvider>

  );
}

export default App;
