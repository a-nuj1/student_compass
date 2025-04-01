import { Heading, Stack, VStack,Text, Button, Image, Box, HStack} from '@chakra-ui/react'
import React from 'react'
import {Link} from "react-router-dom"
import "../App.css"
import {CgGoogle, CgYoutube}from "react-icons/cg"
import {SiCoursera, SiUdemy}from "react-icons/si"
import  {DiAws}from "react-icons/di"
import im from "../assets/images/bg.png"
const Home =()=> {
  return (
    <section className="home">
    <div className="container">
      <Stack
        direction={['column', 'row']}
        height="100%"
        justifyContent={['center', 'space-between']}
        alignItems="center"
        spacing={['16', '56']}
      >
        <VStack
          width={'full'}
          alignItems={['center', 'flex-end']}
          spacing="8"
        >
          <Heading children="LEARN FROM THE BEST" size={'2xl'} />
          <Text
            fontSize={'2xl'}
            fontFamily="cursive"
            textAlign={['center', 'left']}
            children="Find Valuable Content At FREE!"
          />
          <Link to="/courses">
            <Button size={'lg'} colorScheme="yellow">
              Explore Now
            </Button>
          </Link>
        </VStack>

        <Image
          className="vector-graphics"
          boxSize={'md'}
          src={im}
          objectFit="contain"
        />
      </Stack>
    </div>

    {/* <Box padding={'6'} bg="blackAlpha.800">
      <Heading
        textAlign={'center'}
        fontFamily="body"
        color={'yellow.500'}
        children="OUR BRANDS"
      />
      <HStack
        className="brandsBanner"
        justifyContent={'space-evenly'}
        marginTop="4"
      >
        <CgGoogle />
        <CgYoutube />
        <SiCoursera />
        <SiUdemy />
        <DiAws />
      </HStack>
    </Box>

    <div className="container2">
      <video
        controls
        controlsList="nodownload nofullscreen noremoteplayback"
        disablePictureInPicture
        disableRemotePlayback
        
      ></video>
    </div> */}
  </section>
  );
};

export default Home