import React, { useEffect,useState } from 'react'
import axios from 'axios'
import { useParams,useNavigate } from 'react-router-dom';
import { Box, Button, InputLabel, TextField, Typography } from '@mui/material';

const labelstyle = { mb: 1, mt: 2, fontSize: '24px', fontWeight: 'bold' }


const BlogDetail = () => {
  const navigate = useNavigate()

  const [blog, setBlog] = useState()

  const id = useParams().id;
  console.log(id)


  const [inputs, setInputs] = useState({})



  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }



 
  useEffect(() => {


 
  const fetchDetails = async () => {
    const res = await axios.get(`https://xenon-blog.herokuapp.com/api/blog/${id}`).catch(err => console.log(err))

    const data = await res.data;
    return data;
  }


    fetchDetails().then(data =>{ 
      setBlog((data.blog))
      setInputs({title:data.blog.title, description:data.blog.description})
    })
  },[id])

  const sendRequest = async () =>{
    const res = axios.put(`https://xenon-blog.herokuapp.com/api/blog/update/${id}`,{
      title:inputs.title,
      description:inputs.description
    })
    .catch(err=> console.log(err))

    const data = await (await res).data;
    return data;
  }

  console.log(blog);

  const handleSumbit = (e) => {
    e.preventDefault();
    console.log(inputs)
    sendRequest().then((data) => console.log(data))
    .then(()=> navigate("/myBlogs/"))
  }

  return (
    <div>

{inputs &&

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
          {/* <InputLabel sx={labelstyle}>Image</InputLabel>
          <TextField name="image" onChange={handleChange} value={inputs.image} margin='auto' variant='outlined' /> */}

          <Button sx={{ mt: 2, }} variant="contained" type='sumbit'> Sumbit</Button>

        </Box>
      </form> }
    </div>
  )
}

export default BlogDetail
