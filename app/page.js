import Image from 'next/image'
import Signup from './signup/page'
import NavBar from './components/NavBar'
import logo from '../public/images/logo-w.png'


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center space-y-10  p-24">
       <p className='text-6xl font-semibold'> Hello ! </p>
        <p className='text-2xl font-semibold'>Sign up and LogIn forms are implemented there. </p>
        <p className='text-2xl font-semibold'>You can modify them as per your requirement.</p> 
        <p className='text-xl font-semibold'>Happy Coding.....</p>
        
    </main>
  )
}
