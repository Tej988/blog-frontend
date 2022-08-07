import React, { useState } from 'react'
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import axios from 'axios';

import { useNavigate } from 'react-router-dom';
const labelstyle = { mb: 1, mt: 2, fontSize: '24px', fontWeight: 'bold' }


const AddBlog = () => {

  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "", description: "", image: ""
  })

 

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

 const sendRequest = async () => {
    const res = await axios.post("https://xenon-blog.herokuapp.com/api/blog/add", {
      title: inputs.title,
      description: inputs.description,
      image: inputs.image,
      user: localStorage.getItem("userId")
    }).catch((err) => console.log(err));
    const data = await res.data;
    return data
  }
  const handleSumbit = (e) => {
    e.preventDefault();
    console.log(inputs)
    sendRequest().then((data) => console.log(data)).then(()=> navigate("/blogs"))
   
  }




  return (
    <div>
      <form onSubmit={handleSumbit}>
        <Box border={3} borderColor="orange" borderRadius={5} boxShadow=" 10px 10px 20px #ccc"
          padding={3} margin={3} display="flex" flexDirection={'column'} width="80%">
          <Typography fontWeight={'bold'} padding='3' color={'grey'} variant='h3' textAlign={'center'}
          >
            Post Blog

          </Typography>
          <InputLabel sx={labelstyle}>Title</InputLabel>
          <TextField name="title" onChange={handleChange} value={inputs.title} margin='auto' variant='outlined' />
          <InputLabel sx={labelstyle}>Description</InputLabel>
          <TextField name="description" onChange={handleChange} value={inputs.description} margin='auto' variant='outlined' />
          <InputLabel sx={labelstyle}>Image</InputLabel>
          <TextField name="image" onChange={handleChange} value={inputs.image} margin='auto' variant='outlined' />

          <Button sx={{ mt: 2, }} variant="contained" type='sumbit'> Sumbit</Button>

        </Box>
      </form>
    </div>
  )
}

export default AddBlog
