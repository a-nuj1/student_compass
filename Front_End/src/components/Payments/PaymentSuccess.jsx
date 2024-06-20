import React from 'react'
import { Box, Container, Heading, VStack ,Text, Button} from "@chakra-ui/react"
import {RiCheckboxCircleFill} from "react-icons/ri"
import {Link}from "react-router-dom"

function PaymentSuccess() {
  return (
    <Container h={'90vh'} p={'15'}>
      <Heading my={'8'} textAlign={'center'}
      >You have Pro Pack🔥</Heading>
      <VStack
       boxShadow={'lg'}
       pb={'16'}
       alignItems={'center'} 
       borderRadius={'lg'} >

          <Box w={'full'} bg={'yellow.400'} p={'4'} css= {{borderRadius: '8px 8px 0 0'}}>
            <Text color={'black'} >Payment Success</Text>
          </Box>

          <Box p={'4'} >
            <VStack textAlign={'center'} px={'8'} mt={'4'}
            spacing={'8'}>
              <Text>
                Congratulation 🎊🎉 You're a Pro-Member. 
                You have access to premimum Content.
              </Text>
              <Heading size={'3xl'}>
                <RiCheckboxCircleFill/>
              </Heading>
            </VStack>
          </Box>

          <Link to={'/profile'}>
            <Button variant={'ghost'}>Go to Profile</Button>
          </Link>
          <Heading size={'xs'}>
            Reference: sgffdfg,agf
          </Heading>
      </VStack>
    </Container>
  )
}

export default PaymentSuccess