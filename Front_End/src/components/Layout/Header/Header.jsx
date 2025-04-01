import React from 'react';
import { ColorModeSwitcher } from '../../../ColorModeSwitcher';
import {Link} from "react-router-dom"
import {
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent, 
  DrawerHeader,
  DrawerBody,
  useDisclosure,
  VStack,
  HStack,
} from '@chakra-ui/react'

import {RiDashboardFill, RiLogoutBoxLine, RiMenu5Fill}from "react-icons/ri"
import { useDispatch } from 'react-redux';
import { logout } from '../../../redux/actions/user';

const LinkBtn = ({url = "/", title = "Home", onClose})=>(
  <Link onClick={onClose} to={url}>
      <Button variant={'ghost'}>{title}</Button>
  </Link> 
)


function Header({isAuthenticated = false, user}) {
  const {isOpen, onOpen, onClose} = useDisclosure();

  const dispatch = useDispatch();

  const logoutHandler=()=>{
    onClose();
    dispatch(logout());
  }


  return (
    <>
      <ColorModeSwitcher />
      <Button
       onClick={onOpen}
       colorScheme='yellow'
       width={'12'} height={'12'} rounded={'full'} 
       zIndex={'overlay'}
       position={'fixed'} 
       top={'6'} left={'6'}>
        <RiMenu5Fill/>
      </Button>
      
      <Drawer placement='left'
       onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay backdropFilter={'blur(2px)'}/>
      <DrawerContent>
        <DrawerHeader borderBottom={'1px'}>Course Guide</DrawerHeader>
        <DrawerBody>


        <VStack spacing={'3'} alignItems={'flex-start'}>
        <LinkBtn onClose={onClose} url = '/' title="Home" />
        <LinkBtn onClose={onClose} url = '/courses' title="See All Courses" />
        <LinkBtn onClose={onClose} url = '/request' title="Request a course" />
        <LinkBtn onClose={onClose} url = '/contact' title="Contact Us" />
        <LinkBtn onClose={onClose} url = '/about' title="About" />

        <HStack justifyContent={'space-evenly'} position={'absolute'} bottom={'2rem'} width={'80%'}>
          {isAuthenticated ? (
          <>
              <VStack>
                <HStack>
                <Link onClick={onClose} to={'/profile'}>
                  <Button variant={'ghost'} colorScheme='yellow'>Profile
                  </Button>
                </Link>
                  <Button variant={'ghost'} onClick={logoutHandler}
                      colorScheme='yellow'>
                        <RiLogoutBoxLine/>
                        Logout
                  </Button>
                </HStack>

                {
                  user && user.role === 'admin' && <Link onClick={onClose} to={'/admin/dashboard'}>
                    <Button colorScheme='purple' variant={'ghost'} >
                      <RiDashboardFill style={{margin: '4px'}}/>
                      Dashboard
                    </Button>
                  </Link>
                }
              </VStack>

          </>
        ): (<>
          
          <Link onClick={onClose} to={'/login'}>
            <Button colorScheme='yellow'>Login</Button>
          </Link>
          <p>OR</p>
            <Link onClick={onClose} to={'/signup'}>
              <Button colorScheme='yellow' >SignUp</Button>
            </Link>
          </>)}
        </HStack>
        </VStack>

        </DrawerBody>
      </DrawerContent>
      </Drawer>


    </>
  );
}

export default Header;
