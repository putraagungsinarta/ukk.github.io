import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import {toast} from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()
    const [data, setData] = useState({
        email: '',
        password: '',
    })

    const loginUser = async (e) => {
        e.preventDefault()
        const { email, password} = data
        try {
          const {data} = await axios.post('/login', { email, password });
          if(data.error) {
            toast.error(data.error)
          } else {
            setData({})
            navigate('/dashboard')
          }
        } catch (error) {
          console.log(error)
        }
    }

    return (
    <div>
        <form onSubmit={loginUser}>
            <div className="card mt-4 mb-4">
            <div className="card-body">
              <h5 className="card-title text-center mb-4">Login</h5>
                <div className="mb-3">
                  <label className="form-label">User Email</label>
                  <input type="text" className="form-control" placeholder="Enter email" value={data.email} onChange={(e) => setData({...data, email: e.target.value})} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input type="password" className="form-control" placeholder="Password" value={data.password} onChange={(e) => setData({...data, password: e.target.value})} />
                </div>
                <button type="submit" className="btn btn-primary w-100">Login</button>
            </div>
          </div>
        </form>
    </div>
  )
}
