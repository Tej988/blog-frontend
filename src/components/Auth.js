import React, { useState } from 'react'
import { Box } from '@mui/system'
import { Button, TextField, Typography } from '@mui/material'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { authActions } from '../store'
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const dispath = useDispatch();
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false)
  const [inputs, setInputs] = useState({
    name: "", email: "", password: ""
  })


  const sendRequest = async (type = "login") => {
    const res = await axios.post(`http://localhost:5000/api/user/${type}`, {
      name: inputs.name,
      email: inputs.email,
      password: inputs.password
    }).catch(err => console.log(err));

    const data = await res.data;
    return data;

  }
  const handleChange = (e) => {
    setInputs((prevState) => ({

      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const handleSumbit = (e) => {
    e.preventDefault();
    console.log(inputs)
    if (isSignup) {
      sendRequest("signup").then((data)=>localStorage.setItem("userId",data.user._id))
      .then(() => dispath(authActions.login())).then(()=>navigate("/blogs"))
      .then(data => console.log(data))
    }
    else {
      sendRequest()
      .then((data)=>localStorage.setItem("userId",data.user._id))
      .then(() => dispath(authActions.login())).then(()=>navigate("/blogs")).then(data => console.log(data))
    }

  }

  return (
    <div>
      <form onSubmit={handleSumbit}>
        <Box
          maxWidth={350}
          display="flex" flexDirection="column"
          alignItems={'center'}
          justifyContent='center'
          boxShadow={'10px 10px 20px #ccc'}
          padding={3}
          margin='auto'
          marginTop={5}
          borderRadius={5}>

          <Typography variant='h3' padding={3} textAlign='center'>{!isSignup ? "Login" : "SignUp"}</Typography>


          {isSignup &&
            <TextField name='name' value={inputs.name} onChange={handleChange} placeholder='Name' margin='normal' />
          }
          <TextField name='email' value={inputs.email} onChange={handleChange} type={'email'} placeholder='Email' margin='normal' />
          <TextField name='password' value={inputs.password} onChange={handleChange} type={'password'} placeholder='Password' margin='normal' />



          <Button type='submit' variant='contained' sx={{ margin: 3 }} color='warning'>Sumbit</Button>
          <Button onClick={() => setIsSignup(!isSignup)} >Change User to {isSignup ? "Login" : "Signup"}</Button>
        </Box>
      </form>

    </div>



  )
}

export default Auth
