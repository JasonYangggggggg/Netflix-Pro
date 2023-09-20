import { useCallback, useState } from "react";
import Input from "../components/input";
import axios from "axios";
import{signIn} from 'next-auth/react';

import {FcGoogle} from 'react-icons/fc';
import {FaGithub} from 'react-icons/fa';
const Auth = () =>{
  const[email,setEmail] = useState('');
  const[name, setUser] = useState('');
  const[password, setPassword] = useState('');
  const[variant, setVariant] = useState('login');
  const togglevari = useCallback(()=>{
    setVariant((current)=>current == 'login'?'register':'login')
  },[]);

  const login = useCallback(async()=>{
    try {
     await signIn('credentials', {
       email,
       password,
       callbackUrl:'/profile'
     });
    
    } catch (error) {
     console.log(error);
    }
 },[email,password]);

  const register = useCallback(async()=>{
try {
  await axios.post('/api/register',{
    email,
    name,
    password
  });
  login();
} catch (error) {
  console.log(error)
  
}
  },[email,name,password,login]);

 
    return(
        <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-fixed bg-cover bg-no-repeat bg center" >
           <div className="bg-black w-full h-full lg:bg-opacity-50">
          <nav className="px-12 py-5">
            <img src="/images/logo.png" alt="Logo" className="h-12"/>
          </nav>
          <div className="flex justify-center">
            <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
              <h2 className="text-white text-4xl mb-8 font-semibold">
                {variant == 'login'?'Sign in':'Create an account' }
              </h2>
              <div className="flex flex-col gap-4">
              <Input  
                 label="Email"
                 onChange={(val:any)=>setEmail(val.target.value)}
                 id="email"
                 type="email"
                 value={email}
                 />
                {variant == 'register' &&(
              <Input  
                 label="name"
                 onChange={(val:any)=>setUser(val.target.value)}
                 id="name"
                 value={name}
                 />)}
                  <Input  
                 label="Password"
                 onChange={(val:any)=>setPassword(val.target.value)}
                 id="password"
                 type="password"
                 value={password}
                 />
              </div>
              <button onClick={variant === 'login'? login : register} className="
              bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition
              ">{variant == 'login'?'Login':'Sign up'}</button>
              <div className="flex flex-row items-center gap-4 mt-8 justify-center">
                <div onClick={()=> signIn('google',{callbackUrl:'/profile'})} className="w-80 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition gap-2">
                  <FcGoogle size={20} />
                  Continue with Google
                </div>
              </div>
              <p className="text-neutral-500 mt-12">
                {variant == 'login'?'New to Netflix?':'Already have an account?'}
                <span onClick={togglevari}
                className="text-white ml-1 hover:underline cursor-pointer"
                >
                  {variant == 'login'?'Sign up now':'Login'}
                </span>
              </p>
            </div>
          </div>
           </div>
        </div>
    );
}

export default Auth;