import React, { useState } from 'react'
import { Avatar, Box, Button, Container, FormLabel, Heading, Input, VStack, background, border } from "@chakra-ui/react"
import { Link } from 'react-router-dom';

export const fileUploadCSS = {
    cursor:"pointer",
    marginLeft: "-5%",
    width: "110%",
    border: "none",
    height: "100%",
    color: "#ECC94B",
    backgroundColor: "white",
};

const fileUploadStyle = {
    "&::file-selector-button":fileUploadCSS,
};

function Signup() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [imagePrev, setImagePrev] = useState('');
    const [image, setImage] = useState('');

    const changeFileHandler = (e)=>{
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = ()=>{
            setImagePrev(reader.result);
            setImage(file);
        };
    };

  return (
    <Container h={'100vh'}>
        <VStack  h={'full'} justifyContent={'center'} spacing={'10'}>
            <Heading textTransform={'uppercase'} fontSize={'30'} children={"Happy Registration"}/>
            <form style={{width: '100%'}}>

                <Box my={'4'} display={'flex'} justifyContent={'center'}>
                    <Avatar src={imagePrev} size={'2xl'}></Avatar>
                </Box>

                <Box my={'4'}>
                    <FormLabel       
                    htmlFor='name' children = "Your Name" />
                    <Input 
                        required id='name'
                        value={name}
                        onChange={e =>setName(e.target.value)}
                        placeholder='abc'
                        type='text'
                        focusBorderColor='yellow.500'
                    />
                </Box>
                <Box my={'4'}>
                    <FormLabel       
                    htmlFor='email' children = "Email Address" />
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
                <Box my={'4'}>
                    <FormLabel       
                    htmlFor='chooseAvatar' children = "Choose Avatar"
                    />
                    <Input 
                        accept='image/*'
                        required id='chooseAvatar'
                        type='file'
                        focusBorderColor='yellow.500'
                        css = {fileUploadStyle}
                        onChange={changeFileHandler}
                    />
                </Box>


                <Button my={'4'} colorScheme='yellow' type='submit'>Sign Up
                </Button>
                <Box my={'4'}>
                    Already Registered?{' '}
                    <Link to='/login'>
                        <Button colorScheme='yellow' variant={'link'}>Sign In
                        </Button>
                    </Link>
                </Box>
            </form>
        </VStack>
    </Container>
  )
}

export default Signup