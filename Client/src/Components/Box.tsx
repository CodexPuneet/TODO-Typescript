import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    Input,
    FormLabel,
    Button,
    useDisclosure,
  } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useToast } from '@chakra-ui/react'
import { useProvider } from "../Context/Provider";

interface EditProps{
  props:String,
  bag(box:Boolean):void,
  box:Boolean,
  fresh:Boolean,
  fog(fresh:Boolean):void,
}

  function EditBox({props,bag,box,fog,fresh}: EditProps) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = React.useRef(null)
    const [task,setTask]= useState<String>("");
    const finalRef = React.useRef(null)
    const {  getTask,editTask } = useProvider();
    const toast = useToast()
    const handleSubmit=(id:String,task:String)=>{
    bag(!box)
      editTask(task, id)
      toast({
        title: 'Congrats.',
        description: "Your Task Has Been Changed Successfully",
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
      
      setTimeout(() => {
        getTask()
       fog(!fresh)

   }, 2000)
      
    }

 

    useEffect(()=>{
        onOpen()   
    },[])
  
    return (
      <>
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader><b>Edit Your Goal !</b> </ModalHeader>
            <ModalCloseButton onClick={()=>bag(!box)}/>
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Task</FormLabel>
                <Input ref={initialRef} onChange={(e)=>setTask(e.target.value)}  placeholder='Task Name' />
              </FormControl>
            </ModalBody> 
            <ModalFooter>
              <Button onClick={()=>{handleSubmit(props,task); onClose()}} colorScheme='pink' mr={3}>
               
                Save
                  
              </Button>
              <Button onClick={()=>{onClose(); bag(!box)}} colorScheme='red'>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }

  export default EditBox;