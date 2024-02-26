import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { Routes, Route } from 'react-router-dom'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar'
import axios from 'axios'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './components/ProtectedRoute'
import { UserContextProvider } from '../context/userContext'
import Edit from './pages/EditUser'
import Admin from './pages/Admin'

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true

function App() {
  return (
    <UserContextProvider>
<Navbar />
<Toaster position='bottom-right' toastOptions={{duration: 4000}} />
<Routes>
  <Route path='/' element={<Home />} />
  <Route path='/login' element={<Login />} />
  <Route path='/register' element={<Register />} />
  <Route element={<ProtectedRoute />}>
  <Route path='/dashboard' element={<Dashboard />} />
  <Route path='/dashboard/admin/edit/:id' element={<Edit/>} />
  <Route path='/dashboard/admin' element={<Admin />} />
  </Route>
</Routes>
</UserContextProvider>
  )
}

export default App
