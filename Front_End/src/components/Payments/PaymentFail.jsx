import React from 'react'
import { Container, Heading, VStack , Button} from "@chakra-ui/react"
import {RiErrorWarningFill} from "react-icons/ri"

import {Link}from "react-router-dom"

function PaymentFail() {
  return (
    <Container h={'90vh'}>
    <VStack justifyContent={'center'} h={'full'} 
     spacing={'4'}>
      <RiErrorWarningFill size={'5rem'}/>
      <Heading> 
        Payment Failed..
      </Heading>
        <Link to={'/subscribe'}>
          <Button colorScheme='yellow' >Try Again</Button>
        </Link>
    </VStack>
  </Container>
  )
}

export default PaymentFail