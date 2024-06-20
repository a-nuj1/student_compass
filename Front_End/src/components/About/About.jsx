import { Avatar, Box, Button, Container, HStack, Heading, Stack, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom';
import {RiSecurePaymentFill} from "react-icons/ri"

import termsAndCondition from '../../assets/docs/termsAndCondition'

const MySelf = ()=>{
    return (
        <Stack direction={['column', 'row']} spacing={['4','16']} padding={'8'}>
          <VStack>
            <Avatar src='https://avatars.githubusercontent.com/u/114460825?v=4' boxSize={['40', '48']} />
            <Text children="Co-Founder" opacity={'0.7'} />
          </VStack>

          <VStack justifyContent={'center'} alignItems={['center', 'flex-start']}>
            <Heading children="Anuj Kumar Gupta" size={['md', 'xl']} />
            <Text textAlign={['center', 'left']} children="Hi, I'm a Full-Stack Web Developer, Our mission is to provide a righ path to deserving students."/>
          </VStack>
        </Stack>
    );
};

// const videoPlayer = ()=>{
//     <Box>
//         <video src=""></video>
//     </Box>
// }

const TandC = ({termsAndCondition})=>{
  return(
    <Box>
      <Heading size={'md'} children = "Terms & Condition" textAlign={['center', 'left']} my={'4'}>
        
      </Heading>

      <Box h={'sm'} p={'4'} overflow={'scroll'}>
        <Text
         textAlign={['center', 'left']}
         letterSpacing={'widest'}
          fontFamily={'heading'}>
          {termsAndCondition}        
        </Text>
        <Heading  my={'4'} size={'xs'} children = "Refund only applicable for cancellation within 7 days."/>
      </Box>
    </Box>
  )
}


function About() {
  return (
    <Container maxW={'container.lg'} padding = '16' boxShadow={'lg'}>
        <Heading children="About Me" textAlign={['center', 'left']}/>

        <MySelf/>

        <Stack m={'8'} direction={['column', 'row']} alignItems={'center'}>
            <Text fontFamily={'cursive'} m={'8'} textAlign={['center', 'left']}>
                We Guide Students.
            </Text>

            <Link to={'/subscribe'}>
                <Button variant={'ghost'} colorScheme='yellow'>
                    Checkout Our Plans
                </Button>
            </Link>
        </Stack>
        {/* {<videoPlayer/>  } for intro video */}

        <TandC termsAndCondition = {termsAndCondition}/>

      <HStack my={'4'} px={'4'}>
        <RiSecurePaymentFill />
        <Heading size={'xs'} fontFamily={'sans-serif'}
         textTransform={'uppercase'} children = "Payment is secured by Razorpay"/>
      </HStack>
    </Container>
  )
}

export default About