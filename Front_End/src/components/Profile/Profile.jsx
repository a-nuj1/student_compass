import { Avatar, Button, Container, HStack, Heading, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, VStack, useDisclosure } from '@chakra-ui/react'
import React, { useState , useEffect} from 'react'
import { Link } from 'react-router-dom'
import {RiDeleteBin2Fill} from 'react-icons/ri'
import {fileUploadCSS} from "../Auth/Signup"
import { updatePPicture } from '../../redux/actions/profile'
import { useDispatch , useSelector} from 'react-redux'
import { getMyProfile } from '../../redux/actions/user'
import { toast } from 'react-hot-toast'

function Profile({user}) {

    const removeHandler = id =>{
        console.log(id);
    }
    const dispatch = useDispatch();
    const { loading, message, error } = useSelector(state => state.profile);
    
    const changeHandler = async(e, image)=>{
        e.e.preventDefault();
       const myForm = new FormData();
       myForm.append('file', image);
       await dispatch(updatePPicture(myForm));
       dispatch(getMyProfile());

    }

    useEffect(() => {
        if (error) {
          toast.error(error);
          dispatch({ type: 'clearError' });
        }
        if (message) {
          toast.success(message);
          dispatch({ type: 'clearMessage' });
        }
      }, [dispatch, error, message]);
    const {isOpen, onClose, onOpen} = useDisclosure();

  return (
    <Container minH = {'95vh'} maxW={'container.lg'} py={'8'}>
        <Heading children = "Profile"
         m={'8'} textTransform={'uppercase'}/>


        <Stack 
         justifyContent={'flex-start'}
         direction={['column', 'row']}
         alignItems={'center'}
         spacing={['8', '16']}
         padding={'8'}
        >
            <VStack>
                <Avatar boxSize={'48'} src={user.avatar.url} />
                <Button  
                    
                 onClick={onOpen}
                 colorScheme='yellow'
                 variant={'ghost'} 
                > Change Photo 
                </Button>
            </VStack>

            <VStack
             spacing={'4'}
             alignItems={['center', 'flex-start']}>
             <HStack>
                <Text children = "Name"  fontWeight={'bold'}/>
                <Text children = {user.name} />
             </HStack>
             <HStack>
                <Text children = "Email"  fontWeight={'bold'}/>
                <Text children = {user.email} />
             </HStack>
             <HStack>
                <Text children = "CreatedAt"  fontWeight={'bold'}/>
                <Text children = {user.createdAt.split('T')[0]} />
             </HStack>
             {
                user.role !== 'admin' && (
                <HStack>
                    <Text children = "Subscription"  fontWeight={'bold'}/>
                    {
                       user.subscription && user.subscription.status === 'active'?(
                           <Button color='yellow.500' variant={'unstyled'}>Cancel Subscription</Button> 
                        ):(
                            <Link to={'/subscribe'}>
                                <Button colorScheme='yellow'>
                                    Subscribe
                                </Button>
                            </Link>
                        )
                    }
                </HStack>
              )}

              <Stack
               direction={['column', 'row']}
               alignItems={'center'}>
                <Link to={'/updateprofile'}>
                    <Button>Update Profile</Button>
                </Link>
                <Link to={'/changepassword'}>
                    <Button>Change Password</Button>
                </Link>
              </Stack>
            </VStack>
        </Stack>

        <Heading children = "PlayList" size={'md'} my={'8'}/>
        {
           user.playlist && user.playlist.length > 0 && (
                <Stack
                 direction={['column', 'row']}
                 alignItems={'center'}
                 flexWrap={'wrap'}
                 p={'4'}>

                {
                    user.playlist.map((ele)=>(
                        <VStack w={'48'} m={'2'} key={ele.course}>
                            <Image
                             boxSize={'full'}
                             objectFit={'contain'}
                             src={ele.poster}
                            ></Image>
                            <HStack>
                                <Link to={`/course/${ele.course}`}>
                                    <Button variant={'ghost'} colorScheme='yellow'>Watch Now</Button>
                                </Link>
                                <Button>
                                    <RiDeleteBin2Fill onClick={()=>removeHandler(ele.course)} />
                                </Button>
                            </HStack>
                        </VStack>
                    ))
                }

                </Stack>
            )
        }
        <ChangePicBox changeHandler={changeHandler} isOpen={isOpen} onClose={onClose} 
        loading={loading}/>
    </Container>
  )
}

export default Profile

function ChangePicBox({isOpen, onClose, changeHandler, loading}){
    const [image, setImage] = useState('');
    const [imagePrev, setImagePrev] = useState('');
    const changeImage = (e)=>{
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = ()=>{
            setImagePrev(reader.result);
            setImage(file);
        };
    };
    const closeHandler = ()=>{
        onClose();
        setImagePrev('');
        setImage('');
    }
    return (
        <Modal isOpen = {isOpen} onClose={closeHandler}>
           <ModalOverlay backdropFilter={'blur(8px)'}/> 
           <ModalContent >
            <ModalHeader>Change Photo</ModalHeader>
            <ModalCloseButton/>
            <ModalBody>
                <Container>
                    <form onSubmit={(e) => changeHandler(e, image)}>
                        <VStack >
                            {
                               imagePrev && <Avatar src={imagePrev} boxSize={'48'}/> 
                            }
                            <Input type={'file'} css = {{
                                "&::file-selector-button":fileUploadCSS 
                            }}
                            onChange={changeImage}
                            />

                            <Button isLoading = {loading} w={'full'} colorScheme='yellow' type='submit'>Change</Button>
                        </VStack>
                    </form>
                </Container>
            </ModalBody>
            <ModalFooter>
                <Button mr={'3'} onClick={closeHandler}>
                    Cancel
                </Button>
            </ModalFooter>
           </ModalContent>
        </Modal>
    )
}