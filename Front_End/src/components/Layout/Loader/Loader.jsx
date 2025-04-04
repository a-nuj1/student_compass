import { Spinner, VStack } from '@chakra-ui/react'
import React from 'react'

function Loader({color = "yellow.500"}) {
  return (
    <VStack h= "100vh" justifyContent={'center'}>
        <div style={{transform: 'scale(3)'}}>
            <Spinner thickness='2px' speed='0.67s' emptyColor='transparent' color={color}
            size="xl"/>
        </div>
    </VStack>
  )
}

export default Loader