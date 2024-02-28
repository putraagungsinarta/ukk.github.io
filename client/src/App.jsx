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
import AddBuku from './pages/AddBuku'
import AddKategori from './pages/AddKategori'
import Err404 from './pages/NotFound'
import Bukat from './pages/Bukat'
import User from './pages/User'
import BorrowBook from './pages/BorrowBook'
import Staff from './pages/StaffView'
import Review from './pages/Review'

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
  <Route path='/dashboard/buku' element={<AddBuku />} />
  <Route path='/dashboard/kategori' element={<AddKategori />} />
  <Route path='/dashboard/bukat' element={<Bukat />} />
  <Route path='/dashboard/user' element={<User />} />
  <Route path='/dashboard/user/review/:id' element={<Review />} />
  <Route path='/dashboard/user/pinjam' element={<BorrowBook />} />
  <Route path='/dashboard/staff' element={<Staff />} />
  </Route>
  <Route path='*' element={<Err404 />} />
</Routes>
</UserContextProvider>
  )
}

export default App
