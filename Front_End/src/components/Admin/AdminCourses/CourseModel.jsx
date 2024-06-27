import { Box, Button, Grid, Heading, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { RiDeleteBin2Line } from 'react-icons/ri'

import {fileUploadCSS} from "../../Auth/Signup"

// const CourseTitle = "React Course"


function CourseModel({ isOpen, onClose, id, deleteHandler, CourseTitle, addLectHandler, lectures = [] }) {
  // const deleteHandler = (courseId, lectId)=>{
  //   console.log(courseId, lectId)
  // }

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [video, setVideo] = useState('');
  const [videoPrev, setVideoPrev] = useState('');

  const changeVidHandler = (e)=>{
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = ()=>{
        setVideoPrev(reader.result);
        setVideo(file);
    };
  };

  const closeHandler = ()=>{
    setTitle('');
    setDescription('');
    setVideo('');
    setVideoPrev('');
    onClose();
  }
  return (
    <Modal isOpen={isOpen} size={'full'} onClose={closeHandler} scrollBehavior='outside'>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{CourseTitle}</ModalHeader>
        <ModalCloseButton />

        <ModalBody p={'16'}>
          <Grid templateColumns={['1fr', '3fr 1fr']} >
            <Box px={['0', '16']}>
              <Box my={'5'}>
                <Heading children={CourseTitle} />
                <Heading children={`#${id}`} size={'sm'} opacity={0.4} />
              </Box>

              <Heading children={'Lectures'} size={'lg'} />
              <VideoCard
                title={'Introduction to React'}
                description={'This is the first lecture of the course'}
                num={1}
                lectId={1}
                courseId={id}
                deleteHandler={deleteHandler}
              />
            </Box>

            <Box>
              <form onSubmit={e => addLectHandler(e, id, title, description, video)}>

                <VStack spacing={'4'} >
                  <Heading
                    children="Add Lectures"
                    size={'md'}
                    textTransform={'uppercase'}
                  />

                  <Input
                    focusBorderColor="purple.400" placeholder="Title"
                    value={title}
                    onChange={(e => setTitle(e.target.value))}
                  />
                  <Input
                    focusBorderColor="purple.400" placeholder="Description"
                    value={description}
                    onChange={(e => setDescription(e.target.value))}
                  />


                  <Input
                    accept='video/mp4'
                    required
                    type={'file'}
                    focusBorderColor='purple.400'
                    css={{
                      "&::file-selector-button": {
                        ...fileUploadCSS, color: "purple",
                      }
                    }}
                    onChange={changeVidHandler}
                  />
                  {
                    videoPrev && (
                      <video
                       controlsList='nodownload'
                       controls src={videoPrev}
                      ></video>
                    )
                  }

                  <Button w={"full"} colorScheme='purple' type='submit'>Add Lectures</Button>

                </VStack>
              </form>
            </Box>
          </Grid>
        </ModalBody>

        <ModalFooter>
          <Button onClick={closeHandler}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default CourseModel

function VideoCard({ title, description, num, lectId, courseId, deleteHandler }) {
  return (
    <Stack
      direction={['column', 'row']}
      my={'8'}
      borderRadius={'lg'}
      boxShadow={'0 0 10px rgba(107, 70, 193, 0.5)'}
      justifyContent={['flex-start', 'space-between']}
      p={['4', '8']}
    >
      <Box>
        <Heading size={'sm'} children={`#${num} ${title}`} />
        <Text children={description} />

      </Box>
      <Button color={'red'} onClick={() => deleteHandler(courseId, lectId)} >
        <RiDeleteBin2Line />
      </Button>
    </Stack>
  )
}