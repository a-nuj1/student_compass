import { Box, HStack, Heading, Stack } from '@chakra-ui/react'
import React from 'react'
import { FaLinkedin } from "react-icons/fa"
import { DiGithub } from "react-icons/di"

function Footer() {
  return (
    <Box padding={'4'} bg={'blackAlpha.900'} minH={'10vh'}>
      <HStack 
        justifyContent="center" 
        alignItems="center" 
        spacing={10} // Adjust space between text and icons
        width="full" // Ensure it takes the full width
        color={'white'}
      >
        <Heading 
          children="@Anuj Gupta | All Rights Reserved" 
          fontSize={'sm'} // Smaller text size
          textAlign="center" 
        />
        
        <HStack spacing={5} fontSize={'30'}> {/* Space between icons */}
          <a href='https://linkedin.com/in/anuj-kumar-gupta-631651227/' target='_blank' rel="noopener noreferrer">
            <FaLinkedin />
          </a>
          <a href='https://github.com/a-nuj1' target='_blank' rel="noopener noreferrer">
            <DiGithub />
          </a>
        </HStack>
      </HStack>
    </Box>
  )
}

export default Footer;
