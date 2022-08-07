import React,{useEffect,useState} from 'react'
import axios from 'axios'
import Blog from './Blog'
const UserBlog = () => {

  const [user, setUser] = useState()

//   const id = localStorage.getItem("userId");

//   const sendRequest = async()=>{
//     const res = await axios.get(`http://localhost:5000/api/blog/user/${id}`)
//     .catch((err)=> console.log(err))
//     const data = await res.data;
//     return data;
//   }

  useEffect(() => {
    
    const id = localStorage.getItem("userId");
    
      const sendRequest = async()=>{
    const res = await axios.get(`http://localhost:5000/api/blog/user/${id}`)
    .catch((err)=> console.log(err))
    const data = await res.data;
    return data;
  }
    
    sendRequest().then((data)=> setUser(data.user))
  
  }, [])
  
  console.log(user)
  return (
    <div> {
      user &&user.blogs &&user.blogs.map((blog, index)=>(
        <Blog key={index} 
        // isUser = {localStorage.getItem("userId")===blog.user._id}
        isUser={true}
        title={blog.title} 
        description={blog.description }
         user={blog.user} 
         image={blog.image}/>
      ))
    }</div>
  )
}

export default UserBlog
