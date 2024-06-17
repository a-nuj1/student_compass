import React, { useState } from 'react'
import { Box, Button, Container, FormLabel, Heading, Input, VStack } from "@chakra-ui/react"
import { Link } from 'react-router-dom';
function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


  return (
    <Container h={'90vh'}>
        <VStack  h={'full'} justifyContent={'center'} spacing={'10'}>
            <Heading fontSize={'30'} children={"Welcome to Student Compass"}/>
            <form style={{width: '100%'}}>
                <Box my={'4'}>
                    <FormLabel       
                    htmlFor='email' children = "Email Address"
                    />
                    <Input 
                        required id='email'
                        value={email}
                        onChange={e =>setEmail(e.target.value)}
                        placeholder='abc@gmail.com'
                        type='email'
                        focusBorderColor='yellow.500'
                    />
                </Box>
                <Box my={'4'}>
                    <FormLabel       
                    htmlFor='password' children = "Password"
                    />
                    <Input 
                        required id='password'
                        value={password}
                        onChange={e =>setPassword(e.target.value)}
                        placeholder='Enter Your Password'
                        type='password'
                        focusBorderColor='yellow.500'
                    />
                </Box>

                <Box>
                    <Link to = '/forgetpassword'>
                        <Button variant={'link'} fontSize={'sm'}>Forget Password</Button>
                    </Link>
                </Box>

                <Button my={'4'} colorScheme='yellow' type='submit'>Login
                </Button>

                <Box my={'4'}>
                    New User?{' '}
                    <Link to='/signup'>
                        <Button colorScheme='yellow' variant={'link'}>Sign Up
                        </Button> {" "}
                        here
                    </Link>
                </Box>
            </form>
        </VStack>
    </Container>
  )
}

export default Login