import React, { useState } from 'react'
import { Button, Container, Heading, Input, VStack } from "@chakra-ui/react"

function ChangePass() {

    const [OldPassword, setOldPassword] = useState('')
    const [NewPassword, setNewPassword] = useState('');


  return (
    <Container py={'16'} minH={'90vh'}>
        <form >
            <Heading textTransform={'uppercase'}
                children = "Change Password"
                my={'16'}
                textAlign={['center', 'left']}
            ></Heading>
            <VStack spacing={'8'}>
                <Input 
                    required
                    value={OldPassword}
                    onChange={e =>setOldPassword(e.target.value)}
                    placeholder='Enter Old Password'
                    type='password'
                    focusBorderColor='yellow.500'
                />
                <Input
                    required
                    value={NewPassword}
                    onChange={e =>setNewPassword(e.target.value)}
                    placeholder='Enter New Password'
                    type='password'
                    focusBorderColor='yellow.500'
                />
                <Button 
                 w={'full'} colorScheme='yellow'
                 type='submit'>
                    Change
                </Button>
            </VStack>
        </form>
    </Container>
  )
}

export default ChangePass