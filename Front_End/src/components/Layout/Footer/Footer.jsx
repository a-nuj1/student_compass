import { Box, HStack, Heading, Stack, VStack } from '@chakra-ui/react'
import React from 'react'
import { 
  TiSocialYoutubeCircular}from "react-icons/ti"
  import { SlSocialInstagram } from "react-icons/sl";
 import {FaLinkedin} from "react-icons/fa"

import {DiGithub,} from "react-icons/di"

function Footer() {
  return (
    <Box padding={'4'} bg={'blackAlpha.900'} minH={'10vh'}>
        <Stack direction={['column', 'row']} >
          <VStack 
           alignItems={['center', 'flex-start']}
           width={'full'}>
            <Heading children = "All Rights Reserved " color={'white'}/>
            <Heading children = "@Anuj Gupta" color={'yellow.400'} fontFamily={'body'} size={'sm'}/>
           </VStack>
            <HStack spacing={['2', '10']} justifyContent={'center'} color={'white'} fontSize={'50'}>
              <a href='https://youtube.com' target='blank'>
                <TiSocialYoutubeCircular />
              </a>
              <a href='https://instagram.com' target='blank'>
                <SlSocialInstagram />
              </a>
              <a href='https://linkedin.com/in/anuj-kumar-gupta-631651227/' target='blank'>
                <FaLinkedin/>
              </a>
              <a href='https://github.com/a-nuj1' target='blank'>
                <DiGithub />
              </a>
            </HStack>
        </Stack>
    </Box>

  )
}

export default Footer