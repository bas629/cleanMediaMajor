import React, { useState,useContext } from 'react'
import CloudinaryUploadWidget from "./CloudinaryUploadWidget";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage, responsive, placeholder } from "@cloudinary/react";
import {NavLink,useNavigate } from 'react-router-dom'; 
import { ContextApp } from './ContextApp';
function UploadPost() {
   
  const [postType,setPostType]=useState("PublicPost");
  const [title,setTitle]=useState("");
  const [flag,setFlag]=useState(false);
  const[post,setPost] = useState([]);
  const{createEmployee}=useContext(ContextApp);
  
  const [publicId, setPublicId] = useState("");
  // Replace with your own cloud name
  const [cloudName] = useState("dw3gaixoh");
  // Replace with your own upload preset
  const [uploadPreset] = useState("lsb1mfod");

  // Upload Widget Configuration
  // Remove the comments from the code below to add
  // additional functionality.
  // Note that these are only a few examples, to see
  // the full list of possible parameters that you
  // can add see:
  //   https://cloudinary.com/documentation/upload_widget_reference

  const [uwConfig] = useState({
    cloudName,
    uploadPreset
    // cropping: true, //add a cropping step
    // showAdvancedOptions: true,  //add advanced options (public_id and tag)
    // sources: [ "local", "url"], // restrict the upload sources to URL and local files
    // multiple: false,  //restrict upload to a single file
    // folder: "user_images", //upload files to the specified folder
    // tags: ["users", "profile"], //add the given tags to the uploaded files
    // context: {alt: "user_uploaded"}, //add the given context data to the uploaded files
    // clientAllowedFormats: ["images"], //restrict uploading to image files only
    // maxImageFileSize: 2000000,  //restrict file size to less than 2MB
    // maxImageWidth: 2000, //Scales the image down to a width of 2000 pixels before uploading
    // theme: "purple", //change to a purple theme
  });

  // Create a Cloudinary instance and set your cloud name.
  const cld = new Cloudinary({
    cloud: {
      cloudName
    }
  });

  const myImage = cld.image(publicId);

 
 




    function ok(event)
     {   if(event.target.name==="post")
        { setPostType(event.target.value);} 
        if(event.target.name==="title")
          { setTitle(event.target.value);} 
        
     } 
      function posted()
      {
        setFlag(true);
      }





  return (
     
    <div className="flex flex-col min-h-screen"> {/* Flex container for the entire page */}
  {/* Main content area */}
  <div className="flex-grow"> {/* This will take up the remaining space */}
    {/* Post Title */}
    <div className="flex flex-col space-y-2 mb-4">
      <label className="text-lg font-semibold text-gray-200">Post Title</label>
      <input
        type="text"
        name="title"
        onChange={ok}
        className="w-full max-w-md px-4 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter title"
      />
    </div>

    {/* Post Type */}
    <div className="flex flex-col space-y-2 mb-4">
      <label className="text-lg font-semibold text-gray-200">Post Type</label>
      <select
        id="post"
        name="post"
        onChange={ok}
        className="w-full text-black max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="PublicPost">Public Post</option>
        <option value="PrivatePost">Private Post</option>
        <option value="ProtectedPost">Protected Post</option>
      </select>
    </div>

    {/* Cloudinary Upload Widget */}
    <div className="mb-4 flex flex-col space-y-2 w-60">
      <label className="text-lg font-semibold text-gray-200">Upload (Image & Short-video only)</label>
      <CloudinaryUploadWidget
        postType={postType}
        title={title}
        flag={flag}
        className="h-10"
        uwConfig={uwConfig}
        setPublicId={setPublicId}
      />
    </div>

    {/* Post Button */}
    <button
      onClick={()=>(createEmployee(postType,title), posted())}
      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
    >
      POST
    </button>

    {flag && <p>Post Successfully Posted</p>}
  </div>

  {/* Bottom navigation bar (sticky at the bottom) */}
  <div className="sticky bottom-0 h-12 bg-black border-t-2 border-blue-700">
    <ul className="flex justify-around items-center h-full space-x-4 text-white">
      <NavLink to="/upload" className="hover:text-blue-400">
        <img src="https://res.cloudinary.com/dw3gaixoh/image/upload/v1728658672/bjqmftdbzroefok1w0cc.png" className="w-14 bg-slate-400  h-12" alt="upload" />
      </NavLink>
      <NavLink to="/privatePost" className="hover:text-blue-400">
        <img src="https://res.cloudinary.com/dw3gaixoh/image/upload/v1728658718/b3bgplczdptpaczcqomt.png" className="w-14" alt="private post" />
      </NavLink>
      <NavLink to="/publicPost" className="hover:text-blue-400">
        <img src="https://res.cloudinary.com/dw3gaixoh/image/upload/v1728658736/sheydlbltosephyz12ev.png" className="w-14" alt="public post" />
      </NavLink>
      <NavLink to="/protectedPost" className="hover:text-blue-400">
        <img src="https://res.cloudinary.com/dw3gaixoh/image/upload/v1728747295/rivicypojj0nz7syxeh2.png" className="w-14" alt="protected post" />
      </NavLink>
    </ul>
  </div>
</div>

  )
}

export default UploadPost