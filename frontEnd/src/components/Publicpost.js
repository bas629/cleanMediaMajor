import React, { useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { ContextApp } from './ContextApp';
import PullToRefresh from "react-pull-to-refresh";

function Publicpost() {
  const { userId, savePost, setSavePost, ProtectedFriend, setProtectedFriend, getPublicPost, pPost, flag, AddFriend, Name, setFlag } = useContext(ContextApp);
  const [validImages, setValidImages] = useState({}); // Store valid image URLs

  useEffect(() => {
  getPublicPost(); // Fetch public posts
  // Set flags
 console.log(pPost);   
}, [],);

  useEffect(() => {
    if (pPost.length > 0) {
      checkAllImages(); // Check all image URLs for validity
    }
  }, [pPost]);

  const checkAllImages = async () => {
    const results = {};
    for (const post of pPost) {
      results[post._id] = await isValidImageUrl(post.image_url);
    }
    setValidImages(results); // Store the results
  };

  async function refresh() {
    setFlag(false);
    getPublicPost();
    
  }

  async function isValidImageUrl(url) {
    try {
      const response = await fetch(url);
      return response.ok;
    } 
    catch (error) {
      console.log(error);
      return false;
    }
  }

  return (
    <PullToRefresh onRefresh={refresh}>
 <div className="flex flex-col min-h-screen">
      {/* Main content area */}
     
      <div className="flex-grow z-30 relative h-max">
        <button
          className="bg-blue-500 my-4 scale-75 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={refresh}
        >
          Refresh
        </button>

        <div className="z-30 h-full w-full">
          {flag ? (
            pPost.map((p) => (
              <div key={p._id} className="mb-6  shadow-lg rounded-lg flex flex-col gap-10">
                <div className="flex justify-around">
                  <div className="flex">
                    <img
                      src={p.profile_url}
                      alt={p.name}
                      className="w-12 h-12 rounded-full object-cover mr-4"
                      onError={(e) => {
                        e.target.src = "fallback-image-url";
                      }} // Fallback image
                    />
                    <div className="flex flex-col">
                      <NavLink
                        to={`/addFriend/${p._id}`}
                        className="hover:underline mt-2 block text-white text-xl font-semibold"
                      >
                        {p.name}
                      </NavLink>
                      <p className="text-gray-600 text-sm">{p.date}</p>
                    </div>
                  </div>
                  {ProtectedFriend?.includes(p._id) ? (
                    <button className="bg-blue-500 text-white px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
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
                <p className="text-sm" >{p.title}</p>

                {p.image_url.includes("mp4") ? (
                  <div className="max-w-sm mx-auto p-4">
                    <video
                      src={p.image_url}
                      className="w-full h-auto object-cover rounded-lg shadow-md"
                      width="1440"
                      height="680"
                      controls
                    />
                  </div>
                ) : (
                  <div className="max-w-sm mx-auto p-4">
                    {validImages[p._id] ? (
                      <img
                        className="w-full h-auto object-cover rounded-lg shadow-md"
                        src={p.image_url}
                        alt={p.title}
                        onError={(e) => {
                          e.target.src = "fallback-image-url";
                        }} // Fallback image
                      />
                    ) : (
                      <p>Loding...</p> // Display message for invalid image
                    )}
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
            <img
              src="https://res.cloudinary.com/dw3gaixoh/image/upload/v1728658672/bjqmftdbzroefok1w0cc.png"
              className="w-14"
              alt="upload"
            />
          </NavLink>
          
          <NavLink to="/publicPost" className="hover:text-blue-400">
            <img
              src="https://res.cloudinary.com/dw3gaixoh/image/upload/v1728658736/sheydlbltosephyz12ev.png"
              className="w-14 h-12 bg-slate-400   "
              alt="upload"
            />
          </NavLink>



          <NavLink to="/privatePost" className="hover:text-blue-400">
            <img
              src="https://res.cloudinary.com/dw3gaixoh/image/upload/v1728658718/b3bgplczdptpaczcqomt.png"
              className="w-14"
              alt="upload"
            />
          </NavLink>
         
          <NavLink to="/protectedPost" className="hover:text-blue-400">
            <img
              src="https://res.cloudinary.com/dw3gaixoh/image/upload/v1728747295/rivicypojj0nz7syxeh2.png"
              className="w-14"
              alt="protected"
            />
          </NavLink>
        </ul>
      </div>
    </div></PullToRefresh>
  );
}

export default Publicpost;
