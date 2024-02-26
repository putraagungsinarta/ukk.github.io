import { useContext, useState, useEffect } from "react"
import { UserContext } from '../../context/userContext'
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"

export default function Dashboard() {
  const history = useNavigate();
  const [users, setUsers] = useState([]);
  const {Users} = useContext(UserContext);
  const navigate = useNavigate();

    useEffect(() => {
      axios.get('/user')
        .then((response) => {
          setUsers(response.data);
        })
        .catch((error) => {
          console.error('Error fetching user profile:', error);
        });
    }, []);
  
    const directionButton = () => {
      if (!Users) {
        console.log(`you're not a user`);
      }
      else if (Users.role == 'admin') {
        navigate('/dashboard/admin');
      }
      else if (Users.role == 'staff') {
        navigate('/dashboard/staff');
      }
      else if (Users.role == 'user') {
        navigate('/dashboard/user');
      }
      else if (!Users.role) {
        console.log(`you're not a user`);
      }
    }

    const handleLogout = () => {
      axios.post('/logout')
        .then(() => {
          localStorage.removeItem('token');
          history('/');
        })
        .catch((error) => {
          console.error('Logout error:', error);
        });
    };

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

    const renderDashboardContent = () => {
      if (!Users) {
        return (<div><p>Loading...</p><br/><button onClick={() => window.location.reload(false)} className="btn mb-3">Click to reload!</button></div>);
      }
      
      switch (Users.role) {
        case 'admin':
          return (
            <div>
              <p>You have admin privileges.</p>
              <button onClick={directionButton}>Admin Action</button>
              <h3>Pengguna Yang Terdaftar :</h3>
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
        {users?.map?.((user) => (
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
          </div>
          </div>
              </div>
          );

        case 'staff':
          return (
            <div>
              <p>You have staff privileges.</p>
              <button onClick={directionButton}>Staff Action</button>
            </div>
          );
  
        case 'user':
          return (
            <div>
              <p>You have user privileges.</p>
              <button onClick={directionButton}>User Action</button>
            </div>
          );
  
        default:
          return <p>Error: Unknown user role</p>;
      }
    };

  return (
    <div>
        <h1>Dashboard</h1>
        {!!Users && (<h2>Hi {Users.username}!</h2>)}
        <br />

      {renderDashboardContent()}

        <button onClick={handleLogout}>Logout</button>
    </div>
  )
}
