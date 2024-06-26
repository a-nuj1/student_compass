import { Box, Button, Grid, HStack, Heading, Image, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import cursor from "../../../assets/images/cursor.png"
import Sidebar from '../Sidebar'
import { RiDeleteBin2Line } from 'react-icons/ri'
import CourseModel from './CourseModel'

function AdminCourses() {
  const courses = [{
      _id:"xysxa",
      title: "React Course",
      poster:{
        url:'https://plus.unsplash.com/premium_photo-1675793715030-0584c8ec4a13?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      },
      category: 'web development',
      createdBy: 'Anuj Gupta',
      views: 101,
      numofVideos: 12,
  }];

  const {isOpen, onClose, onOpen} = useDisclosure();

  const detailHandler = (userId)=>{
    console.log(userId)
    onOpen();
  }
  const deleteHandler = (userId)=>{
    console.log(userId)
  }
  const deleteLecHandler = (courseId, lectId)=>{
    console.log(courseId, lectId)
  }
  const addLectHandler = (e, courseId, title, description, video)=>{
      e.preventDefault();
  }

  return (
    <Grid
     minH={'100vh'}
     templateColumns={['1fr', '5fr 1fr']}
     css = {{
        cursor: `url(${cursor}), default`
     }}
    >
        <Box p={['0', '8']} overflowX={'auto'}>
          <Heading 
            textTransform={'uppercase'}
            children = "All Users"
            my={'16'}
            textAlign={['center','left']}
            />

            <TableContainer w={['100vw', 'full']} >
              <Table variant={'simple'} size={'lg'}>
                <TableCaption >All available Courses in the databases</TableCaption>
                <Thead>
                  <Tr>
                     <Th>Id</Th>
                     <Th>Poster</Th>
                     <Th>Title</Th>
                     <Th>Category</Th>
                     <Th>Creator</Th>
                     <Th isNumeric>Views</Th>
                     <Th isNumeric>Lectures</Th>
                     <Th isNumeric>Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {
                    courses.map(item =>(
                      <Row detailHandler={detailHandler} deleteHandler={deleteHandler} key={item._id} item={item} />
                    ))
                  }
                </Tbody>
              </Table>
            </TableContainer>
            <CourseModel
             isOpen = {isOpen} 
             onClose = {onClose} 
             id={'xyzuvw'}
             CourseTitle={"React Course"}
             deleteHandler={deleteLecHandler}
             addLectHandler = {addLectHandler}
            />
        </Box>
        <Sidebar/>

    </Grid>
  )
}


function Row({item, detailHandler, deleteHandler}){
  return (
    <Tr>
      <Td>#{item._id}</Td>
      <Td>
        <Image src={item.poster.url} alt={item.title}  />
      </Td>
      <Td>{item.title}</Td>
      <Td textTransform={'uppercase'} >{item.category}</Td>
      <Td>{item.createdBy}</Td>
      <Td isNumeric>{item.views}</Td>
      <Td isNumeric>{item.numofVideos}</Td>
      
      <Td isNumeric>
        <HStack justifyContent={'flex-end'}>
            <Button onClick={()=>detailHandler(item._id)} variant={'outline'} color={'purple.500'}>View Lectures</Button>
            <Button onClick={()=>deleteHandler(item._id)} color={'red'} >
              <RiDeleteBin2Line/>
            </Button>
        </HStack>
      </Td>

    </Tr>
  )
}
export default AdminCourses