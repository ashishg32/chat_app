import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '../Login'

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Login />} />
    </Routes>
  </BrowserRouter>
)

export default App
