import axios from 'axios'
import React from 'react'
import { useState } from "react"
import {toast} from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export default function Register() {
  const navigate = useNavigate()
    const [data, setData] = useState({
        username: '',
        email: '',
        password: '',
        nama_lengkap: '',
        alamat: '',
        role: 'user',
    })

    const registerUser = async (e) => {
        e.preventDefault()
        const {username, email, password, nama_lengkap, alamat, role} = data
      try {
        const {data} = await axios.post('/register', { username, email, password, nama_lengkap, alamat, role })
        if(data.error) {
          toast.error(data.error)
        } else {
          setData({})
          toast.success('Register Successful. Log in Now!')
          navigate('/login')
        }
      } catch (error) {
        console.log(error);
      }
    }

  return (
    <div>
        <form onSubmit={registerUser}>
            <div className="card mt-4 mb-4">
            <div className="card-body">
              <h5 className="card-title text-center mb-4">Register</h5>
                <div className="mb-3">
                  <label className="form-label">Username Anda</label>
                  <input type="text" className="form-control" placeholder="Enter name" value={data.username} onChange={(e) => setData({...data, username: e.target.value})} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Alamat Email Anda</label>
                  <input type="email" className="form-control" placeholder="Enter email" value={data.email} onChange={(e) => setData({...data, email: e.target.value})} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Nama Lengkap Anda</label>
                  <input type="text" className="form-control" placeholder="Enter your name" value={data.nama_lengkap} onChange={(e) => setData({...data, nama_lengkap: e.target.value})} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Alamat Anda</label>
                  <input type="text" className="form-control" placeholder="Enter your address" value={data.alamat} onChange={(e) => setData({...data, alamat: e.target.value})} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input type="password" className="form-control" placeholder="Password" value={data.password} onChange={(e) => setData({...data, password: e.target.value})} />
                </div>
                <button type="submit" className="btn btn-primary w-100">Register</button>
            </div>
          </div>
        </form>
    </div>
  )
}
