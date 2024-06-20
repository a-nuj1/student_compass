import React, { useState } from 'react'
import { Box, Container, Grid, Heading, Text, VStack } from '@chakra-ui/react'


function CourseDetails() {
    const [lectureNumber, setLectureNumber] = useState(0);

    const lectures = [
        {
            _id: "first1",
            title: "sample1",
            description: "this is a sample",
            video:{
                url: 'wgrrda',
            },
        },
        {
            _id: "second2",
            title: "sample2",
            description: "this is a sample",
            video:{
                url: 'wgrrda',
            },
        },
        {
            _id: "thrid3",
            title: "sample3",
            description: "this is a sample",
            video:{
                url: 'wgrrda',
            },
        },
        {
            _id: "four4",
            title: "sample4",
            description: "this is a sample",
            video:{
                url: 'wgrrda',
            },
        },
    ]

  return (
        <Grid minH={'90vh'} templateColumns={['1fr', '3fr 1fr']}>
            <Box>
                <video
                width={'100%'}
                controls
                controlsList="nodownload noremoteplayback"
                disablePictureInPicture
                disableRemotePlayback
                src={lectures[lectureNumber].video.url}
                ></video>

                <Heading
                mt="6" 
                m="4"
                children={`#${lectureNumber + 1} ${
                    lectures[lectureNumber].title
                }`}
                />

                <Heading m="4" children="Description" />
                <Text m="4" children={lectures[lectureNumber].description} />
            </Box>

            <VStack>
                {lectures.map((element, index) => (
                <button
                    onClick={()=>setLectureNumber(index)}
                    key={element._id}
                    style={{
                    width: '100%',
                    padding: '1rem',
                    textAlign: 'center',
                    margin: 0,
                    borderBottom: '1px solid rgba(0,0,0,0.2)',
                    }}
                >
                    <Text noOfLines={1}>
                    #{index + 1} {element.title}
                    </Text>
                </button>
                ))}
            </VStack>
        </Grid>
  )
}

export default CourseDetails