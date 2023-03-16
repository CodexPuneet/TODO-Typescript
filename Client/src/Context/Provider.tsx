import  { createContext, useState, ReactNode, useContext, useEffect } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router';
import { useToast } from '@chakra-ui/react'

interface contextInterface {

     
     registerUser(userData: any): void,
     LoginUser(userData: any):void,
     getUser():void,
     logout(): void,
     addData(payload: any):void,
     getTask():void,
     user: any,
     changeTask(payload :Boolean, id:String):void,
     deleteTask(id:String):void,
     editTask(payload: String, id:String):void
}

export const ContextProviderG = createContext<contextInterface>({} as contextInterface);

export const useProvider = () => useContext(ContextProviderG);


const CProvider = ({ children }: { children: ReactNode }) => {
     const [user, setUser] = useState<any>({});
     // const [data, setData] = useState<any>([]);
     const navigate = useNavigate()
     const toast = useToast()

   
     const LoginUser = async (userData: String) => {
          try {
               const user: any = await axios.post("https://fine-erin-zebra.cyclic.app/user/login", userData);
               if (!user) return alert("Some thing went wrong");
               if(user.data.token)
               {
                    setUser(user.data)
                    localStorage.setItem('todo', JSON.stringify(user.data))
                    setTimeout(() => {
                         getTask()
                         navigate("/homepage")

                    }, 500)

               }
               else
               {
                    alert('bad Requesr')
               }
              
          } catch (error: any) {
               console.log('error: ', error.message);
          }
     }  

     const registerUser = async (userData: any) => {
          try {
               const user: any = await axios.post("https://fine-erin-zebra.cyclic.app/user/signup", userData);
               if (!user) return alert("Some thing went wrong");
               setUser(user.data._id)
               
          } catch (error: any) {
               console.log('error: ', error.message);
          }
     }

 const getUser = async()=>{
const data= JSON.parse(localStorage.getItem('todo')|| '{}') as MyObject;
     try {
          const user: any = await axios.get("https://fine-erin-zebra.cyclic.app/user", {
               headers:{
                    Authentication : data.token
               }
          })
          if(user)
          {
               setUser(data.user)
          }
           else{
                    getTask()
               }
          
         
     } catch (error: any) {
          console.log('error:', error.message);
     }

 }

     const logout = () => {
          setUser({});
     }

     interface MyObject {
          token: string;
          user: any,
          name: String,
         
        }
        
        

     const addData= async(payload: any)=>{
         const token= JSON.parse(localStorage.getItem('todo')|| '{}') as MyObject;
          try {
               const task:any = await axios({
                    url: "https://fine-erin-zebra.cyclic.app/todo/add",
                    method: "POST",
                    data:payload,
                    headers:{
                         Authorization : token.token
                    }
               })
               
               if (!task) return alert("Some thing went wrong");
               else{
                    getTask()
               }
          } catch (error: any) {
               console.log('error: ', error.message);
          }
  
     }

     const getTask= async()=>{
          const token= JSON.parse(localStorage.getItem('todo')|| '{}') as MyObject;
           try {
                const task:any = await axios({
                     url: "https://fine-erin-zebra.cyclic.app/todo/home",
                     method: "GET",
                     headers:{
                          Authorization : token.token
                     }
 
                })              
                if (!task) return alert("Some thing went wrong");
                else{
     
                    localStorage.setItem('todolist', JSON.stringify(task.data))
                    
  
                }

           } catch (error: any) {
                console.log('error: ', error.message);
           }
   
      }

      const changeTask=async(payload :Boolean, id:String)=>{
          const token= JSON.parse(localStorage.getItem('todo')|| '{}') as MyObject;
          try {
               const task:any = await axios({
                    url: `https://fine-erin-zebra.cyclic.app/todo/${id}`,
                   data:{
                    status:payload
                   },
                    method: "PATCH",
                    headers:{
                         Authorization : token.token
                    }

               })   
                     
               if (!task) return alert("Some thing went wrong");
               else{
                    getTask()
               }
             
            
             
          } catch (error: any) {
               console.log('error: ', error.message);
          }

      }
 
      const  deleteTask=async(id:String)=>{
          const token= JSON.parse(localStorage.getItem('todo')|| '{}') as MyObject;
          try {
               const task:any = await axios({
                    url: `https://fine-erin-zebra.cyclic.app/todo/${id}`,
                    method: "DELETE",
                    headers:{
                         Authorization : token.token
                    }

               })   
                     
               if (!task) return alert("Some thing went wrong");
               else{
                    getTask()
               }
             console.log(task);
             
            
             
          } catch (error: any) {
               console.log('error: ', error.message);
          }

      }
      const editTask=async(payload :String, id:String)=>{
          const token= JSON.parse(localStorage.getItem('todo')|| '{}') as MyObject;
          try {
               const task:any = await axios({
                    url: `https://fine-erin-zebra.cyclic.app/todo/${id}`,
                   data:{
                    task:payload
                   },
                    method: "PATCH",
                    headers:{
                         Authorization : token.token
                    }

               })   
                     
               if (!task) return alert("Some thing went wrong");
               else{
                    
                    getTask()
               }
             
            
             
          } catch (error: any) {
               console.log('error: ', error.message);
          }

      }
 

     return (
          <ContextProviderG.Provider value={{ LoginUser, user, logout, registerUser,getUser, addData, getTask, changeTask, deleteTask, editTask}}>
               {children}
          </ContextProviderG.Provider>
     )

}


export default CProvider;

// https://fine-erin-zebra.cyclic.app/