import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Page/Homepage'
import Login from '../Page/Login'
import Signup from '../Page/Signup'
import Todo from '../Page/Todo'

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Signup />} />
      <Route path="/homepage" element={<Home />} />
      <Route path="/todo" element={<Todo />} />
    </Routes>
  )
}

export default AllRoutes