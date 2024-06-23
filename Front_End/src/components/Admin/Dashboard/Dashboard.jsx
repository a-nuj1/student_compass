import { Box, Grid, HStack, Heading, Progress, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import cursor from "../../../assets/images/cursor.png"
import Sidebar from '../Sidebar'
import { RiArrowDownLine, RiArrowUpLine } from 'react-icons/ri'

const Bar = ({title, value, profit})=>{
    return (
     <Box
      py={'4'}
      px={['0', '20']}>
        <Heading size={'sm'} children = {title} mb={'2'}/>
        <HStack w={'full'} alignItems={'center'}>
            <Text children = {profit ? '0%': `-${value}%`}/>
            <Progress w={'full'} value={profit ? value:0} colorScheme='purple' />
            <Text children = {`${value > 100 ? value: 100}%`}/>
        </HStack>
      </Box>
    );
}

function Dashboard() {
  return (
    <Grid
     minH={'100vh'}
     templateColumns={['1fr', '5fr 1fr']}
     css = {{
        cursor: `url(${cursor}), default`
     }}
    >
        <Box boxSizing='border-box' padding={'16'}
          px={['4','0']}
        >
            <Text 
             textAlign={'center'}
             opacity={'0.5'}
             children =  {`Last change was on ${String(new Date()).split('G')[0]}`}
            />

            <Heading 
             children = "Dashboard" 
             ml={['0', '16']} mb={'16'} 
             textAlign={['center', 'left']}
            />

            <Stack
             direction={['column', 'row']}
             minH={'24'}
             justifyContent={['space-evenly']}
            >
                <Databox 
                 title = "Views"
                 qty ={123} qtyper = {40}
                 profit = {true}
                />
                <Databox 
                 title = "Users"
                 qty ={34} qtyper = {80}
                 profit = {true}
                />
                <Databox 
                 title = "Subcription"
                 qty ={12} qtyper = {54}
                 profit = {false}
                />
                
            </Stack>

            <Box
             m={['0', '16']}
             borderRadius={'lg'}
             p={['0', '16']}
             mt={['4','16']}
             boxShadow={'-2px 0 10px rgba(107, 70, 193, 0.5)'}
            >
                <Heading 
                 textAlign={['center', 'left']}
                 size={'md'}
                 children = "Views Graph"
                 pt={['8', '0']}
                 ml={['0','16']}
                
                />
                {/* Gaph line */}
            </Box>

            <Grid templateColumns={'1fr', '2fr 1fr'}>
                <Box p={'4'}>
                    <Heading 
                     textAlign={['center', 'left']}
                     size={'md'}
                     children = "Progress Bar"
                     my={'8'}
                     ml={['0', '16']}
                    />

                    <Box>
                        <Bar profit={true} title = "views" value = {40} />
                        <Bar profit={true} title = "Users" value = {80} />
                        <Bar profit={false} title = "Subscription" value = {54} />
                    </Box>

                </Box>
                <Box 
                  p={['0', '16']}
                  boxSizing='border-box'
                  py={'4'}>
                    <Heading
                     textAlign={'center'}
                     size={'md'} mb={'4'} 
                     children = "Users"
                    />
                    {/* Graph */}
                </Box>
            </Grid>


        </Box>
        <Sidebar/>

    </Grid>
  )
}

export default Dashboard


function Databox({title, qty, qtyper, profit}){
    return (
        <Box
        width={['full', '20%']}
        boxShadow={'-2px 0 10px rgba(107, 70, 193, 0.5)'}
        padding={'8'}
        borderRadius={'lg'}
        >
            <Text children = {title} />
            <HStack>
                <Text fontSize={'2xl'} fontWeight={'bold'}
                    children = {qty}
                />
                <HStack>
                    <Text children = {`${qtyper}%`}/>
                    { 
                        profit ? (<RiArrowUpLine color='green'/>):
                        (<RiArrowDownLine color= 'red'/>)
                    }
                </HStack>
            </HStack>
            <Text children = {`Since Last Month`} opacity={'0.6'}/>
        </Box>
    
    )
}