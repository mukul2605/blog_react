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
    <div className='page-container flex flex-col min-h-screen'>
      {/* Fixed Header */}
      <header className='sticky top-0 z-50 backdrop-blur-md bg-slate-900/80 border-b border-slate-700'>
        <Header />
      </header>
      
      {/* Main Content */}
      <main className='flex-1'>
        <Outlet />
      </main>
      
      {/* Fixed Footer */}
      <footer className='mt-auto border-t border-slate-700 bg-slate-900/80 backdrop-blur-md'>
        <Footer />
      </footer>
    </div>
  ) : (
    <div className='page-container flex items-center justify-center min-h-screen'>
      <div className='text-center'>
        <div className='loading-spinner mx-auto mb-4'></div>
        <p className='text-slate-400'>Loading...</p>
      </div>
    </div>
  )

  // return (
  //   <>
  //     <div className='bg-yellow-500'>
  //       New project
  //     </div>
  //   </>
  // )
}

export default App
