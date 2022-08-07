import React, { useState } from 'react'
import { Link } from "react-router-dom"
import { AppBar, Box, Button, Tabs, Toolbar, Typography, Tab } from '@mui/material'
import { useDispatch, useSelector } from "react-redux";
import { authActions } from '../store'
const Header = () => {
  const dispath = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  const [value, setValue] = useState()

  return (
    <AppBar
      position='sticky'
      sx={{ background: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%);+" }}>
      <Toolbar>
        <Typography>Blog App</Typography>
        {isLoggedIn && <Box display="flex" marginLeft={'auto'} marginRight={'auto'}>
          <Tabs textColor='inherit' value={value} onChange={(e, val) => { setValue(val) }}>
            <Tab LinkComponent={Link} to="/blogs" label="Blogs" />
            <Tab LinkComponent={Link} to="/myBlogs" label="Mine Blog" />
            <Tab LinkComponent={Link} to="/blogs/add" label="Add Blog" />
          </Tabs>
        </Box>}



        <Box display="flex" marginLeft="auto">
          {!isLoggedIn && <>
          <Button LinkComponent={Link} to="/Auth" variant='contained' sx={{ margin: 1 }} color='warning'>SignIn</Button>
          <Button LinkComponent={Link} to="/Auth" variant='contained' sx={{ margin: 1 }} color='warning'>Sign Up</Button>
           </>  }


          {isLoggedIn && <Button
            onClick={() => dispath(authActions.logout())}
           LinkComponent={Link} to="/auth"
            variant='contained' sx={{ margin: 1 }} color='warning'>LogOut</Button>
          }        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header