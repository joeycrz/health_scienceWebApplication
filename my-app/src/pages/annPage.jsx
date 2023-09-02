import React from 'react';
import { ChakraBaseProvider, Text } from '@chakra-ui/react';
const AnnouncementPost = ({ post }) => {
  return (
    <ChakraBaseProvider>
      <Text>{post.title}</Text>
      <p>{post.content}</p>
    </ChakraBaseProvider>
  );
}

export default AnnouncementPost;
