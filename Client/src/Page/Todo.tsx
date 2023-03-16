import {  Modal,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalContent,
  FormLabel,
  FormControl,
  ModalBody,
  Input,
  Button,
  ModalFooter,
  useDisclosure,
  Box,
  Center,
  Radio,
   RadioGroup,
   Flex,
   Text,
   Image
} from '@chakra-ui/react';
import { DeleteIcon,EditIcon } from '@chakra-ui/icons'
import React, { useEffect, useState } from 'react';
import { useToast } from '@chakra-ui/react'
import Navbar from './Navbar'
import { useProvider } from "../Context/Provider";
import EditBox from '../Components/Box';
import pic from '../Resources/to.gif'

type Props = {}

const Todo = (props: Props) => {
  const { isOpen ,onOpen, onClose } = useDisclosure()
    const { addData, getTask,changeTask, deleteTask } = useProvider();
    const [task,setTask]= useState<String>("");
    const [fresh,setFresh]= useState<Boolean>(false);
    const [box, setBox] = useState<Boolean>(false);
    const [tasklist,setTasklist]= useState<{task: String; status:Boolean; _id:String}[]>([]);
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
    const toast = useToast()
    const handleSubmit=()=>{
      const payload={task:task, status:false}
      addData(payload)
      toast({
        title: 'Congrats.',
        description: "Your Task Has Been Recorded",
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
      setTimeout(() => {
        getTask()
        setFresh(!fresh)

   }, 2000)
    }
    const handleChange=(id:String, status:Boolean)=>{
      changeTask(!status, id)
      toast({
        title: 'Bravo.',
        description: "Your Milestone has been Recorded",
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
      setTimeout(() => {
        getTask()
        setFresh(!fresh)

   }, 2000)

  
    }
    const handleDelete=(id:String)=>{
        deleteTask(id)
        toast({
          title: 'Congrats.',
          description: "Task Has Been Trashed",
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
        setTimeout(() => {
          getTask()
          setFresh(!fresh)

     }, 2000)
       
    }
    useEffect(()=>{
      getTask()
      const data=(JSON.parse(localStorage.getItem('todolist')|| '{}'))
      if(data)
      {
        setTasklist(data)
      }
    },[fresh])
  
  

  return (
    <div>
      <Navbar>
      <Button
       onClick={onOpen}
       rounded={'full'}
       px={6}
       bgGradient="linear(to-r, red.400,pink.400)"
        color={'white'}
        _hover={{
          bgGradient: 'linear(to-r,pink.400,red.400)',
          boxShadow: 'xl',
        }}>
    Set Task
  </Button>
  
  <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader><b>Set Your Goal !</b> </ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Task</FormLabel>
                <Input ref={initialRef} onChange={(e)=>setTask(e.target.value)} placeholder='Task Name' />
              </FormControl>
            </ModalBody> 
            <ModalFooter>
              <Button onClick={()=>{handleSubmit();onClose()}} colorScheme='pink' mr={3}>
               
                Save
             
              </Button>
              <Button onClick={onClose} colorScheme='red'>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
<Box mt="50px">

  {
    tasklist.length==0? <Center><Image src={pic} /></Center> : 
    tasklist?.map((el,index)=>{
      return <Center>
      <Box mb={"20px"} w="70%" h="10%" border={"3px solid red"} borderRadius="50px" p="20px" key={index} bgGradient={el.status?'linear(to-l, red.400,pink.400)':'linear(to-r, red.400,pink.400)'} color={'#ffff'}>

  <Text fontSize={"25px"}><b>{el.task.toUpperCase()}</b> </Text>
  <RadioGroup  value={'true'}>
  <Flex justifyContent={"space-evenly"} mt={"12px"}>
  <Radio size='md' value={el.status? 'false' :'true'}   onChange={()=>handleChange(el._id, el.status)}  colorScheme='orange' defaultChecked={el.status==false}>
  <b>Pending</b> 
  </Radio>
  <Radio size='md' value={el.status? 'true' :'false'}  onChange={()=>handleChange(el._id, el.status)} colorScheme='green' defaultChecked={el.status==true} >
  <b>Completed</b> 
  </Radio> 
</Flex> 
</RadioGroup>
<Flex justify={"space-between"}>

<Button bg={'#ee649a'} onClick={()=>setBox(!box)}><EditIcon /></Button>
<Button bg={'#ee649a'} onClick={()=>handleDelete(el._id)}><DeleteIcon  /></Button>
</Flex>
{box?<EditBox props={el._id} box={box} bag={setBox} fresh={fresh} fog={setFresh} />: ""}
       </Box>
        
        </Center>
    }) 
  
  }

</Box>

  </Navbar>
  
  </div>
  )
}

export default Todo