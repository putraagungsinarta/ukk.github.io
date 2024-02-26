import React, { useContext, useState, useEffect } from "react"
import { UserContext } from '../../context/userContext'
import axios from "axios"
import { useNavigate, useParams, Link } from "react-router-dom"
import {toast} from 'react-hot-toast'
import jsPDF from 'jspdf'
import 'jspdf-autotable'

export default function Admin() {
  const {Users} = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const pdf = jsPDF;

  const [data, setData] = useState({
      username: '',
      email: '',
      password: '',
      nama_lengkap: '',
      alamat: '',
      role: '',
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
        toast.success('New User Added Successfully!')
        navigate('/dashboard')
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    // Fetch user data and role when the component mounts
    axios.get('/user')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user profile:', error);
      });
  }, []);

  const handleDelete = (userId) => {
    axios.delete(`/user/${userId}/delete` ,{
      method: 'DELETE',
    })
      .then((data) => {
        console.log('User deleted:', data);
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
      })
      .catch((error) => console.error('Error deleting user:', error));
  };

    const generatePdf = () => {
    const doc = new pdf();

    doc.addImage('../../public/logo.png', 'JPEG', 10, 10, 40, 40);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Daftar Pengguna', 60, 30);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');

    const columns = ['Username', 'Email', 'Nama Lengkap', 'alamat', 'role'];
    const rows = users.map(user => [user.username, user.email, user.nama_lengkap, user.alamat, user.role]);
    
      doc.autoTable({
      startY: 60,
      head: [columns],
      body: rows,
    });

    doc.save("user-list.pdf")
  }

    return (
    <div>
    <h3>Create an account :</h3>
      <form onSubmit={registerUser}>
            <div className="card mt-4 mb-4">
            <div className="card-body">
              <h5 className="card-title text-center mb-4">Register</h5>
                <div className="mb-3">
                  <label className="form-label">Nama Pengguna</label>
                  <input type="text" className="form-control" placeholder="Enter name" value={data.username} onChange={(e) => setData({...data, username: e.target.value})} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Alamat Pengguna</label>
                  <input type="email" className="form-control" placeholder="Enter email" value={data.email} onChange={(e) => setData({...data, email: e.target.value})} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Nama Lengkap</label>
                  <input type="text" className="form-control" placeholder="Enter your name" value={data.nama_lengkap} onChange={(e) => setData({...data, nama_lengkap: e.target.value})} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Alamat</label>
                  <input type="text" className="form-control" placeholder="Enter your address" value={data.alamat} onChange={(e) => setData({...data, alamat: e.target.value})} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input type="password" className="form-control" placeholder="Password" value={data.password} onChange={(e) => setData({...data, password: e.target.value})} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Role</label>
                  <select className="form-select" onChange={(e) =>setData({...data, role: e.target.value})}>
                    <option value="user">User</option>
                    <option value="staff">Staff</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-primary w-100 mb-3 mt-3">Register</button>
            </div>
          </div>
        </form>
      <h3>The current user listed as :</h3>
      <div className="row justify-content-center">
      <div className="col-auto">
          <table className="table-responsive">
          <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>

          </tr>
        </thead>
        <tbody>
        {users && users.map && users.map((user) => (
          <tr key={user._id}>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>
            <Link to={`/dashboard/admin/edit/${user._id}`}>
            <button className="m-1">Edit</button>
            </Link>
            </td>
            <td>
            <button className="m-1" onClick={() => handleDelete(user._id)}>Delete</button>
            </td>
          </tr>
        ))}
        </tbody>
        </table>
          <button className="justify-content-center" onClick={generatePdf}> generate userList pdf</button>
          </div>
          </div>
    </div>
  )
}
