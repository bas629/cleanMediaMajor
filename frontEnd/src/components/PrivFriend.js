import React, { useState, useEffect, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'; 
import { ContextApp } from './ContextApp';
import "../App.css";


function PrivFriend() {
 
    const [pPost, setPpost] = useState([]);
  const [flag, setFlag] = useState(false);
  const { savePost, changeHandler, PrivateFriend, AddFriend, ProtectedFriend, userId,getPublicPost } = useContext(ContextApp);
  const navigate = useNavigate();

  // Shuffle function
  const sortRecentPosts = (posts) => {
    return posts.sort((a, b) => {
      const dateA = new Date(a.search);
      const dateB = new Date(b.search);
  
      // Compare by date first (earlier date first)
      if (dateA.toDateString() === dateB.toDateString()) {
        // If the same day, compare by time (earlier time first)
        return dateA.getTime() - dateB.getTime(); // Ascending order by time
      }
  
      // If different days, sort by date (earlier date first)
      return dateA - dateB; // Ascending order by date
    });
  };

  // Render posts
  function renderPost() {
    if (userId === "") {
      navigate("/");
      return;
    }

    const newObjects = [];
    savePost.forEach((element) => {
      if (ProtectedFriend.includes(element._id)) {
       
          
          const t = {
            name: element.name,
            _id: element._id,
           profile_url: element.profile_url,
         
          }
          newObjects.push(t);
        
      }
    });

    // Shuffle posts
    const sortedPosts = sortRecentPosts(newObjects)
    const reversePosts =  sortedPosts.reverse();
   

    // Remove duplicates
  
    
    setPpost([...reversePosts]);
     setFlag(true)
  }

  // UseEffect to trigger when component mounts or savePost changes
  useEffect(() => {
    getPublicPost();
    renderPost()
   
    
  }, [],[savePost]);

  // Refresh function
    async function refresh() {
     setFlag(false)
       await getPublicPost();
       await  changeHandler();
         renderPost();
           
     }
      
   

  return (
    <>
    <div className="flex flex-col min-h-screen"> {/* Flex container for the entire page */}
    
    {/* Main content area */}
    <div className="flex-grow z-30 relative h-max ">
      <button 
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500" 
        onClick={refresh}
      >
        Refresh
      </button>
    </div>

    {/* Private Friends List */}
    <div className="private-friend-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {pPost.map((p) => (
        <div key={p._id} className="friend-card bg-gray-800 rounded-lg shadow-md p-4 flex flex-col items-center">
          <img src={p.profile_url} alt="Profile" className="profile-img w-24 h-24 rounded-full mb-4 object-cover shadow-lg" />
          <p className="friend-name text-lg text-white font-bold">{p.name}</p>
          <NavLink
            to={`/addFriend/${p._id}`} // Navigate to friend's details
            className="more-info-btn bg-blue-500 text-white px-4 py-2 rounded-lg mt-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            More..
          </NavLink>
        </div>
      ))}
    </div>
    
    {/* Bottom navigation bar */}
    <div className="sticky bottom-0 h-12 bg-black border-t-2 border-blue-700 z-40">
      <ul className="flex justify-around items-center h-full space-x-4 text-white">
        <NavLink to="/upload" className="hover:text-blue-400">
          <img src="https://res.cloudinary.com/dw3gaixoh/image/upload/v1728658672/bjqmftdbzroefok1w0cc.png" className="w-14" alt="upload" />
        </NavLink>
        <NavLink to="/privatePost" className="hover:text-blue-400">
          <img src="https://res.cloudinary.com/dw3gaixoh/image/upload/v1728658718/b3bgplczdptpaczcqomt.png" className="w-14" alt="upload" />
        </NavLink>
        <NavLink to="/publicPost" className="hover:text-blue-400">
          <img src="https://res.cloudinary.com/dw3gaixoh/image/upload/v1728658736/sheydlbltosephyz12ev.png" className="w-14" alt="upload" />
        </NavLink>
        <NavLink to="/protectedPost" className="hover:text-blue-400">
          <img src="https://res.cloudinary.com/dw3gaixoh/image/upload/v1728747295/rivicypojj0nz7syxeh2.png" className="w-14" alt="protected post" />
        </NavLink>
      </ul>
    </div>
  </div>
</>

  )
}

export default PrivFriend