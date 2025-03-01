import React, { useState, useEffect, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'; 
import { ContextApp } from './ContextApp';
import "../App.css";



function PrivatePost() {
  const [pPost, setPpost] = useState([]);
  const [flag, setFlag] = useState(false);
  const { savePost, changeHandler, PrivateFriend, AddFriend, ProtectedFriend, userId,getPublicPost,privatePost,PrivatePost, } = useContext(ContextApp);
  const navigate = useNavigate();


  useEffect(() => {
   PrivatePost();
     setFlag(true);
    
  },[]);

  // Refresh function
    async function refresh() {
     setFlag(false)
     await PrivatePost();
     setFlag(true)  
     }
      
   

  return (
    <div className="flex flex-col min-h-screen"> {/* Flex container for the entire page */}
    {/* Main content area */}
    <div className="flex-grow z-30 relative h-max ">
      <button 
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500" 
        onClick={refresh}
      >
        Refresh
      </button>
  
      <div className="z-30 h-full">
        {flag ? (
          privatePost.map((p) => (
            <div key={p._id} className="mb-6 p-4 shadow-lg rounded-lg flex flex-col gap-10">
              <div className="flex justify-between">
                <div className="flex">
                  <img 
                    src={p.profile_url} 
                    alt={p.name} 
                    className="w-12 h-12 rounded-full object-cover mr-4"
                    onError={(e) => { e.target.src = "fallback-image-url"; }} // Fallback image
                  />
                  <div className="flex flex-col">
                    <NavLink 
                      to={`/addFriend/${p._id}`} 
                      className="hover:underline mt-2 block text-white text-2xl font-semibold"
                    >
                      {p.name}
                    </NavLink>
                    <p className="text-gray-600 text-sm">{p.date}</p>
                  </div>
                </div>
                {ProtectedFriend?.includes(p._id) ? (
                  <button 
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Friend
                  </button>
                ) : (
                  <button 
                    onClick={() => AddFriend(p._id)}  
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Add Friend
                  </button>
                )}
              </div>
              <p>{p.title}</p>
              {p.image_url.includes("mp4") ? (
                <div className="max-w-sm mx-auto p-4">
                  <video 
                    src={p.image_url} 
                    className="w-full h-auto object-cover rounded-lg shadow-md" 
                    width='1440' 
                    height='680' 
                    controls
                  />
                </div>
              ) : (
                <div className="max-w-sm mx-auto p-4">
                  <img 
                    className="w-full h-auto object-cover rounded-lg shadow-md" 
                    src={p.image_url} 
                    alt={p.title} 
                    onError={(e) => { e.target.src = "fallback-image-url"; }} // Fallback image
                  />
                </div>
              )}
              <div className="border-t-2 border-blue-500 my-4"></div>
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center w-full">
            <span className="loader flex justify-center scale-105"></span>
          </div>
        )}
      </div>
    </div>
  
    {/* Bottom navigation bar */}
    <div className="sticky bottom-0 h-12 bg-black border-t-2 border-blue-700 z-40">
      <ul className="flex justify-around items-center h-full space-x-4 text-white">
        <NavLink to="/upload" className="hover:text-blue-400">
          <img src="https://res.cloudinary.com/dw3gaixoh/image/upload/v1728658672/bjqmftdbzroefok1w0cc.png" className="w-14" alt="upload" />
        </NavLink> 
        <NavLink to="/publicPost" className="hover:text-blue-400">
          <img src="https://res.cloudinary.com/dw3gaixoh/image/upload/v1728658736/sheydlbltosephyz12ev.png" className="w-14" alt="upload" />
        </NavLink>
        <NavLink to="/privatePost" className="hover:text-blue-400">
          <img src="https://res.cloudinary.com/dw3gaixoh/image/upload/v1728658718/b3bgplczdptpaczcqomt.png" className="w-14  bg-slate-400  h-12" alt="upload" />
        </NavLink>
       
        <NavLink to="/protectedPost" className="hover:text-blue-400">
        <img src="https://res.cloudinary.com/dw3gaixoh/image/upload/v1728747295/rivicypojj0nz7syxeh2.png" className="w-14"></img>
        </NavLink>
      </ul>
    </div>
  </div>
  
  );
}

export default PrivatePost;
  