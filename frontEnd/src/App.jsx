import "./App.css";
import React,{useState,useContext} from "react"
import  Imagefloder  from "./components/Imagefloder.js"
import { Route, Routes } from "react-router-dom";
import { NavLink } from 'react-router-dom';

import navbar from './components/navbar.png';
import Publicpost from "./components/Publicpost";
import AddFriend from "./AddFriend.js";
import Logine from "./components/Logine.js";
import UploadPost from "./components/UploadPost.js";
import SignInForm from "./components/SignInForm.js";
import PrivatePost from "./components/PrivatePost.js";
import Protected from "./components/Protected.js";
import { ContextApp } from './components/ContextApp';
import PrivFriend from "./components/PrivFriend.js";
import ProtecFriend from "./components/ProtecFriend.js";
function App() {
 const[navbatFlag,setNavbarFlag]=useState(false);
const{userId,setUserId}=useContext(ContextApp);
 function  openNavbar()
 { if(navbatFlag)
 {
   setNavbarFlag(false);
 }
  else
  {
    setNavbarFlag(true);
  }
  console.log(navbatFlag);

 }
 function cleanUserId()
 {
  setUserId("");
 }

  
return (
  
    <div className=  " bg-gray-900    mx-auto text-white ">

    <ul className="flex flex-row justify-between px-8">
    
    <NavLink to='/'><img src={"https://res.cloudinary.com/dw3gaixoh/image/upload/v1728476117/nao8eivc0ia2je7s4tgj.png"} className="w-24 "></img></NavLink>
    <img src={navbar} onClick={openNavbar} className="w-24 my-auto scale-75" ></img>
         
    </ul>
   
     { 
      
      (navbatFlag &&  userId!="")   &&
        <div className="bg-gray-700  w-[80%px] h-[200px] transition ease-linear   shadow-xl shadow-black  p-10 m-3 rounded-lg flex flex-col gap-5 text-lg">
           <NavLink to="/privateFriend"  > Private Friend</NavLink>
           <NavLink to="/protectedFriend"  > Protected Friend</NavLink>
           <NavLink to="/"  onClick={cleanUserId} > Logout</NavLink>
        </div>
    
       
        

     } 
     
    <Routes>
   <Route path="/"    element={<Logine></Logine>} ></Route>
   <Route path="/publicPost"    element={<Publicpost></Publicpost>} ></Route>
   <Route path="/upload"    element={<UploadPost></UploadPost>} ></Route>
   <Route path="/addFriend/:id"    element={<AddFriend></AddFriend>} ></Route>
   <Route path="/signIn"    element={<SignInForm></SignInForm>} ></Route>
   <Route path="/privatePost"    element={<PrivatePost></PrivatePost>} ></Route>
   <Route path="/protectedPost"    element={<Protected></Protected>} ></Route>
   <Route path="/privateFriend"    element={<PrivFriend></PrivFriend>} ></Route>
   <Route path="/protectedFriend"    element={<ProtecFriend></ProtecFriend>} ></Route>
    </Routes>

   
  
   
   
    
   </div>
  ); 
}

export default App;
