import { Button, Container, Heading, VStack, Input} from '@chakra-ui/react'
import React, { useState } from 'react'
import {useParams} from 'react-router-dom'


function ResetPass() {
    const [Password, setPassword] = useState('');
    const params = useParams();

    console.log(params.token);

    return (
      <Container py={'16'} h={'87vh'}>
          <form>
              <Heading 
               children = "Reset Password" 
               my={'16'}
               textTransform={'uppercase'}
               textAlign={['center', 'left']}
              />
  
              <VStack spacing={'8'}>
              <Input 
                  required
                  value={Password}
                  onChange={e =>setPassword(e.target.value)}
                  placeholder='New Password'
                  type='password'
                  focusBorderColor='yellow.500'
              />
  
              <Button 
               type='submit' 
               w={'full'} 
               colorScheme='yellow'>
                Reset Password
              </Button>
  
              </VStack>
  
          </form>
      </Container>
    )
}

export default ResetPass