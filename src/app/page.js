"use client"

import {Container, FormControl, FormLabel, Heading, VStack} from "@chakra-ui/react" 
import { useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios"
import { ChakraProvider  , Grid , Spinner, Input , Center, Button} from '@chakra-ui/react'
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'


export default function Home() {
  const [todos, setTodos] = useState([])
  const [isLoading, setIsloading] = useState(false)
  const [newTitle, setNewTitle] = useState("")
  const [newDescription, setNewDescription] = useState("")
  
 



const submitFunction = async () => { 
  
  let inputedTitle = document.getElementById("myTitle")
  let inputedDes = document.getElementById("myDes")
  let valueTitle = inputedTitle.value
  let valueDes = inputedDes.value
  setNewTitle(valueTitle)
  setNewDescription(valueDes)
  
  const inputed = { 
    title: valueTitle,
    description: valueDes
  }
try {
  const post = await axiosInstance.post(`/api/todos`,{inputed})
  return response.data
} catch (error) {
  console.log(error)
}

}




  const fetchTodos = async () => {
    setIsloading (true)

    try {
      const todosResponse = await axiosInstance.get("/api/todos")
      setTodos(todosResponse.data)
      setIsloading(false)

    
    } catch (error) {
      console.log(error)
    }
  }
  



const renderTodos = () => { 
  return todos.map((todo) =>{
    return (

    <Table>
      <Tr key={todo.id}>

        <Grid  > 

        <Td  bg='green' >{todo.title}</Td>
        <Td  bg='tomato'>{todo.description}</Td>
  
        </Grid>
  
      </Tr>
      </Table>
    )
  })
}


  useEffect(() => {
    fetchTodos()
    },[])
    


  return (
    <ChakraProvider>  
<Center   bg='tomato' h='100px' color='Black'>Todos App</Center>
      <TableContainer>
  <Table mb="6" variant='striped' colorScheme='teal'>

   {renderTodos()}
   {isLoading ? <Spinner color='red.500' /> : null} 

   
  </Table>

  
</TableContainer>

<form id="myForm" >
  <VStack spacing="4">

  <FormControl>
    <FormLabel >Input Title</FormLabel>
    <Input type="text"  bg='green' id="myTitle" ></Input>
  </FormControl>
  <FormControl>
    <FormLabel >Input Description</FormLabel>
    <Input type="text"  bg='tomato' id="myDes" ></Input>
  </FormControl>
    <Button  onClick={submitFunction} >Submit To List</Button>
  </VStack>
</form>
    </ChakraProvider>
  );
}
