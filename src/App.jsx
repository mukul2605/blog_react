import { useEffect, useState } from 'react'
import {useDispatch} from "react-redux"
import authServive from "./appwrite/auth"
import { login, logout } from './store/authSlice'
import './App.css'
import { Footer, Header } from './components/index'
import { Outlet } from 'react-router-dom'
 
function App() {


  const [loading, setLoading] = useState(true)
  const dispatach = useDispatch()

   useEffect( ()=>{
    authServive.getCurrentUser()
    .then((userData)=>{
      if(userData){
        dispatach(login({userData}))
      }
      else{
        dispatach(logout())
      }
    }) 
    .finally(()=>{setLoading(false)})
   },[])
    
   return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
        <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null

  // return (
  //   <>
  //     <div className='bg-yellow-500'>
  //       New project
  //     </div>
  //   </>
  // )
}

export default App
