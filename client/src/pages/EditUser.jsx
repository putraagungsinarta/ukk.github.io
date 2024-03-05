import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {toast} from 'react-hot-toast'
import axios from 'axios'
import Footer from '../components/Footer'



const EditUser = ({userId}) =>{
  const { id } = useParams();
  const navigate = useNavigate()
  const [user, setUser] = useState({
      username: '',
      email: '',
      nama_lengkap: '',
  });

  useEffect(() => {
      const fetchUserDetails = async () => {
          try {
              const response = await axios.get(`/user/${id}`);
              setUser(response.data);
          } catch (error) {
              console.error('Error fetching user details:', error);
            toast.error(`Error Fetching User Details`)
          }
      };

      fetchUserDetails();
  }, [id]);

  const handleInputChange = (e) => {
      setUser({
          ...user, [e.target.name]: e.target.value,
      });
  };

  const handleUpdate = async () => {
      try {
          await axios.put(`/user/${id}/update`, user);
          console.log('User updated successfully');
          toast.success('User Updated Successfully!')
          navigate('/dashboard')
      } catch (error) {
          console.error('Error updating user:', error);
          toast.error('Error Updating User')
      }
  };

  return (
      <div>
          <h2>Edit User</h2>
          <label>
              Name:
              <input type="text" name="username" value={user.username} onChange={handleInputChange} />
          </label>
          <br />
          <label>
              Email:
              <input type="email" name="email" value={user.email} onChange={handleInputChange} />
          </label>
          <br />
          <label>
            Nama Lengkap:
            <input type="text" name="nama_lengkap" value={user.nama_lengkap} onChange={handleInputChange} />
          </label>
          <button onClick={handleUpdate}>Update User</button>
          <Footer />
      </div>
  );
};

export default EditUser;