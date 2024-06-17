import { Button, Container, Heading, VStack, Input} from '@chakra-ui/react'
import React, { useState } from 'react'

function ForgetPass() {
    const [email, setEmail] = useState('');

  return (
    <Container py={'16'} h={'87vh'}>
        <form>
            <Heading 
             children = "Forget Password" 
             my={'16'}
             textTransform={'uppercase'}
             textAlign={['center', 'left']}
            />

            <VStack spacing={'8'}>
            <Input 
                required
                value={email}
                onChange={e =>setEmail(e.target.value)}
                placeholder='abc@gmail.com'
                type='email'
                focusBorderColor='yellow.500'
            />

            <Button 
             type='submit' 
             w={'full'} 
             colorScheme='yellow'>
             Send Rest Link
            </Button>

            </VStack>

        </form>
    </Container>
  )
}

export default ForgetPass