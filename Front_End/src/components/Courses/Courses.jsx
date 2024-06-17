import React, { useState } from 'react'
import {
  Button, 
  Container, 
  HStack, 
  Heading, 
  Image, 
  Input, 
  Stack, 
  Text, 
  VStack
}from "@chakra-ui/react"

import {Link} from "react-router-dom"


const addToPlay =()=>{
    console.log('added to Playlist');
};

const Course = ({views, title, imageSrc, id, addToPlay, creater, desc, lectCnt}) =>{
  return (

    <VStack className='course' alignItems={['center', 'flex-start']}>
      <Image src={imageSrc} boxSize={'60'} objectFit={'contain'}/>
      <Heading 
        size={'sm'}
        textAlign={['center', 'left']} maxW={'200px'} 
        fontFamily={'sans-serif'} 
        noOfLines={3}
        children={title}
      />
      <Text noOfLines={2} children = {desc}/>

      <HStack>
        <Text fontWeight={'bold'} textTransform={'uppercase'} children={'Creator'}/>
        <Text fontFamily={'body'} textTransform={'uppercase'} children={creater}/>
      </HStack>

      <Heading 
        textAlign={'center'} 
        size={'xs'} 
        children={`Lectures - ${lectCnt}`}
        textTransform={'uppercase'}
      />
      <Heading 
        size={'xs'} 
        children={`Views - ${views}`}
        textTransform={'uppercase'}
      />
      <Stack 
       direction={['column', 'row']} 
       alignItems={'center'}>
        <Link to = {`/course/${id}`}>

        <Button colorScheme='yellow'>Watch Now</Button>
        </Link>
        <Button
         variant={'ghost'}
         colorScheme='yellow'
         onClick={()=>addToPlay(id)}
        >
          Add to PlayList
        </Button>
      </Stack>
    </VStack>
  )

  
}

function Courses() {
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');

  const categories = [
    "Web Development", "Artificial Intelligence", "Data Structures & Algorithm ", "Data Science", "Machine Learning",
  ];
  return (
      <Container minH={'95vh'} maxW={'container.lg'} padding={'8'}>
          <Heading children={"All Courses"} m={'8'}/>

          <Input 
          value={keyword} onChange={e => setKeyword(e.target.value)} placeholder = "search a course..."  type='text'
          focusBorderColor='yellow.500'
          ></Input>

          <HStack overflowX={'auto'} paddingY={'8'} css={{
              '&::-webkit-scrollbar': {
                display: 'none',
              },
            }}>
            {
              categories.map((item,index)=>(
                <Button key={index}
                onClick = {()=>setCategory(item)} minW={'60'}>
                <Text children= {item} />
                </Button>
              ))
            }
          </HStack>

          <Stack
           direction={['column', 'row']}
           flexWrap={'wrap'}
           justifyContent={['flex-start', 'space-evenly']}
           alignItems={['center', 'flex-start']}
          >
            
            <Course 
              title={'Sample'}
              desc={'Sample'}
              views={23}
              imageSrc={'Sample'}
              id={'Sample'}
              creater={'Sample'}
              lectCnt={2}
              addToPlay={addToPlay}
            />
            

          </Stack>
      </Container>
  )
}

export default Courses