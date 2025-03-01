const account =require('../models/accountpost'); 

  
let setpPost;

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
  function renderPost(PrivateFriend,savePost) {
 

    const newObjects = [];
    savePost.forEach((element) => {
      if (PrivateFriend.includes(element._id)) {
        element.private_Post.forEach((Post) => {
          const dateString = new Date(Post.date).toISOString().split('T')[0];
          const t = {
            name: element.name,
            _id: element._id,
            title: Post.title,
            image_url: Post.post_url,
            date: dateString,
            profile_url: element.profile_url,
            search:Post.date,
          };
          newObjects.push(t);
        });
      }
    });

    // Shuffle posts
    const sortedPosts = sortRecentPosts(newObjects)
    const reversePosts =  sortedPosts.reverse();
   

    // Remove duplicates
       setpPost=reversePosts;
    

  }


exports.PrivatePost= async (req, res) => {
 try{
    const {email} = req.body; 
    const PrivatePost = await account.find(); 
    const PrivateFriend= await  account.findOne({email: email}); 
     const friends = await  PrivateFriend.private_friends;
       renderPost( friends,PrivatePost );
      console.log(setpPost);
   return res.status(200).json({
     post:setpPost


   });


 }
 catch(err){
 
    return res.status(500).json({
    message:"message",     
    error:err.message


    })
   



 






}

}