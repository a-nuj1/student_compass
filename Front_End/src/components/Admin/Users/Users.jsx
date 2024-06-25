import { Box, Button, Grid, HStack, Heading, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import React from 'react'
import cursor from "../../../assets/images/cursor.png"
import Sidebar from '../Sidebar'
import { RiDeleteBin2Line } from 'react-icons/ri'

function Users() {
  const users = [{
      _id:"xysxa",
      name: "Anuj",
      email:'anuj@gamil.com',
      role: 'admin',
      subscription:{
        status:'active'
      },
  }];

  const updateHandler = (userId)=>{
    console.log(userId);
  }
  const deleteHandler = (userId)=>{
    console.log(userId)
  }

  return (
    <Grid
     minH={'100vh'}
     templateColumns={['1fr', '5fr 1fr']}
     css = {{
        cursor: `url(${cursor}), default`
     }}
    >
        <Box p={['0', '16']} overflowX={'auto'}>
          <Heading 
            textTransform={'uppercase'}
            children = "All Users"
            my={'16'}
            textAlign={['center','left']}
            />

            <TableContainer w={['100vw', 'full']} >
              <Table variant={'simple'} size={'lg'}>
                <TableCaption >All available users in the databases</TableCaption>
                <Thead>
                  <Tr>
                     <Th>Id</Th>
                     <Th>Name</Th>
                     <Th>Email</Th>
                     <Th>Role</Th>
                     <Th>Subscription</Th>
                     <Th isNumeric>Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {
                    users.map(item =>(
                      <Row updateHandler={updateHandler} deleteHandler={deleteHandler} key={item._id} item={item} />
                    ))
                  }
                </Tbody>
              </Table>
            </TableContainer>
        </Box>
        <Sidebar/>

    </Grid>
  )
}

export default Users

function Row({item, updateHandler, deleteHandler}){
  return (
    <Tr>
      <Td>#{item._id}</Td>
      <Td>{item.name}</Td>
      <Td>{item.email}</Td>
      <Td>{item.role}</Td>
      <Td>{item.subscription.status === 'active'?"Active": "Not Active"}

      </Td>
      <Td isNumeric>
        <HStack justifyContent={'flex-end'}>
            <Button onClick={()=>updateHandler(item._id)} variant={'outline'} color={'purple.500'}>Change Role</Button>
            <Button onClick={()=>deleteHandler(item._id)} color={'red'} >
              <RiDeleteBin2Line/>
            </Button>
        </HStack>
      </Td>

    </Tr>
  )
}