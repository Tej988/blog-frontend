import Header from "./components/Header";
import React from 'react'
import { Route, Routes } from "react-router-dom";
import Auth from "./components/Auth";
import UserBlog from "./components/UserBlog";
import Blogs from "./components/Blogs";
import BlogDetail from "./components/BlogDetail";
import AddBlog from "./components/AddBlog";
// import { useSelector } from "react-redux";

function App() {

  // const isLoggedIn = useSelector((state)=>state.isLoggedIn);
  return (
   <>
     <header>
       <Header/>
     </header>

     <main>
       <Routes>
         <Route path="/auth" element={<Auth/>} />
         <Route path="/blogs" element={<Blogs/>} />
         <Route path="/myBlogs" element={<UserBlog/>} />
         <Route path="/myBlogs/:id" element={<BlogDetail/>} />
         <Route path="/blogs/add" element={<AddBlog/>} />
       </Routes>
     </main>
   </>
  );
}

export default App;
