import { Box, Button, Container, Grid, Heading, Image, Input, Select, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import cursor from "../../../assets/images/cursor.png"
import Sidebar from '../Sidebar'
import { fileUploadCSS } from '../../Auth/Signup'

const categories = [
  "Web Development","App Development", "Python","C/c++","Java", "Artificial Intelligence", "Data Structures & Algorithm ", "Data Science", "Machine Learning","Game Development",
];



function CreateCourse() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [createdBy, setCreatedBy] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [imagePrev, setImagePrev] = useState('');


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
    <Grid
      minH={'100vh'}
      templateColumns={['1fr', '5fr 1fr']}
      css={{
        cursor: `url(${cursor}), default`
      }}
    >

      <Container py={'16'}>
        <form>
          <Heading children="Create Course"
            my={'16'}
            textTransform={'uppercase'}
            textAlign={['center', 'left']} 
          />

          <VStack m={'auto'} spacing={'8'} >
            <Input
                value={title}
                onChange={e =>setTitle(e.target.value)}
                placeholder='Title'
                type='text'
                focusBorderColor='purple.400'
              />
            <Input
                value={description}
                onChange={e =>setDescription(e.target.value)}
                placeholder='Description'
                type='text'
                focusBorderColor='purple.400'
              />
            <Input
                value={createdBy}
                onChange={e =>setCreatedBy(e.target.value)}
                placeholder='Cretor Name'
                type='text'
                focusBorderColor='purple.400'
              />

            <Select focusBorderColor='purple.400'
              value={category}
              onChange={e =>setCategory(e.target.value)}
            >
              <option value={''}>Category</option>
              {categories.map(item=>(
                <option key={item} value={item}>{item}</option>
              ))}
            </Select>

            <Input 
                accept='image/*'
                required
                type={'file'}
                focusBorderColor='purple.400'
                css = {{
                  "&::file-selector-button":{
                    ...fileUploadCSS, color:"purple",
                  }
                }}
                onChange={changeFileHandler}
            />

            {imagePrev && (
              <Image src={imagePrev} boxSize = '64' objectFit={'contain'}/>
            )}

            <Button w={'full'} colorScheme='purple' type='submit'>Create</Button>
          </VStack>

        </form>
      </Container>

      <Sidebar />

    </Grid>
  )
}

export default CreateCourse