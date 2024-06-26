import { Box, Button, Grid, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import { RiDeleteBin2Line } from 'react-icons/ri'

// const CourseTitle = "React Course"


function CourseModel({isOpen, onClose, id, deleteHandler,CourseTitle, addLectHandler, lectures = []}) {
  // const deleteHandler = (courseId, lectId)=>{
  //   console.log(courseId, lectId)
  // }
  return (
    <Modal isOpen = {isOpen} size={'full'} >
        <ModalOverlay/>
        <ModalContent>
          <ModalHeader>{CourseTitle}</ModalHeader>
          <ModalCloseButton/>

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
            </Grid>
          </ModalBody>
        </ModalContent>
    </Modal>
  )
}

export default CourseModel

function VideoCard({title, description, num, lectId, courseId, deleteHandler}) {
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
        <Heading size={'sm'} children = {`#${num} ${title}`}/>
        <Text children={description} />

      </Box>
      <Button color={'red'} onClick={()=>deleteHandler(courseId, lectId)} >
        <RiDeleteBin2Line/>
      </Button>
   </Stack>
  )
}