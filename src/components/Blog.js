import React from 'react'
import { Avatar, Box, Card, CardContent, CardHeader, CardMedia, IconButton, Typography } from '@mui/material'

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Blog = ({ title, description, image, userName,isUser,id }) => {
    console.log(title,isUser)

    const navigate = useNavigate();
    const handleEdit = (e)=>{
        navigate(`/myBlogs/${id}`)
    }
    const deleteRequest= async()=>{
        const res = await axios.delete(`http://localhost:5000/api/blog/${id}`).catch(
            err=>console.log(err)
        )
        const data =await  res.data;
        return data
    }
    const handleDelete = (e)=>{
     deleteRequest().then((data)=>console.log(data))
     alert("Post Deleted")
     window.location.reload();
    }
    return (
        <div><Card sx={{
            width: "40%", margin: 'auto', mt: '4', padding: 2, boxShadow: "10px 10px 20px #ccc", ":hover:": {
                boxShadow: "20px 20px 30px #ccc"
            }
        }}>
            <Box display={'flex'}>
      
            </Box>

            {isUser &&(
                <Box display={'flex'}>
                    <IconButton onClick={handleEdit} sx={{ marginLeft:'auto' }}><EditIcon color='secondary'/> </IconButton>
                    <IconButton onClick={handleDelete}><DeleteIcon color='danger'/> </IconButton>
                </Box>
            )}
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: "red" }}>
                            {userName}
                        </Avatar>
                    }
                    title={title}
                // subheader="September 14, 2016"
                />
                <CardMedia
                    component="img"
                    height="400px"
                    width={'40px'}
                    image={image}
                    alt="image"
                />
                <CardContent>
                    <Typography>
                        {description}
                    </Typography>
                </CardContent>

        </Card></div>
    )
}

export default Blog