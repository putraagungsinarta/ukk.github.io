import { useContext, useState, useEffect } from "react"
import { UserContext } from '../../context/userContext'
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"
import jsPDF from "jspdf"
import 'jspdf-autotable'


export default function Dashboard() {
  const pdf = jsPDF;
  const history = useNavigate();
  const [users, setUsers] = useState([]);
  const [book, setBook] = useState([]);
  const {Users} = useContext(UserContext);
  const navigate = useNavigate();
  const currentDate = new Date().toLocaleDateString();

    useEffect(() => {
      axios.get('/user')
        .then((response) => {
          setUsers(response.data);
        })
        .catch((error) => {
          console.error('Error fetching user profile:', error);
        });
    }, []);

    useEffect(() => {
      axios.get('/buku')
        .then((response) => {
          setBook(response.data);
        })
        .catch((error) => {
          console.error('Error fetching buku:', error);
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
      if(confirm('are you sure you want to delete this user?')){
      axios.delete(`/user/${userId}/delete` ,{
        method: 'DELETE',
      })
        .then((data) => {
          console.log('User deleted:', data);
          setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
        })
        .catch((error) => console.error('Error deleting user:', error));
    }};

    const generatePdf = () => {
      const doc = new pdf();
    
      doc.addImage('/logo.png', 'JPEG', 10, 10, 40, 40);
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text('Daftar Buku', 60, 25);
      doc.text(`${currentDate}`, 60, 35);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
    
      const columns = [ 'id_buku', 'Judul Buku', 'Penulis', 'Penerbit', 'Tahun Terbit' ];
      const rows = book.map(buku => [buku.id_buku, buku.judul, buku.penulis, buku.penerbit, buku.tahunterbit]);
      
        doc.autoTable({
        startY: 60,
        head: [columns],
        body: rows,
      });
    
      doc.save("data-buku.pdf")
    }

    const generatePdfUser = () => {
      const doc = new pdf();
  
      doc.addImage('../../public/logo.png', 'JPEG', 10, 10, 40, 40);
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text('Daftar Pengguna', 60, 25);
      doc.text(`${currentDate}`, 60, 35);
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
    

    const renderDashboardContent = () => {
      if (!Users) {
        return (<div><p>Loading...</p><br/><button onClick={() => window.location.reload(false)} className="btn mb-3">Click to reload!</button></div>);
      }
      
      switch (Users.role) {
        case 'admin':
          return (
            <div>
              <p>What Are You Planning For Today's Activities, Admin?</p>
              <button onClick={directionButton}>Create New User And Manage User Account</button><br />
              <Link to={'/dashboard/buku'}>
              <button>Create New Book And Manage The Listed Book</button><br />
              </Link>
              <Link to={'/dashboard/kategori'}>
                <button>Create A New Book Category</button>
              </Link>
              <Link to={'/dashboard/bukat'}>
                <button>Create A New Book Category Relation</button>
              </Link>
              <h3>Pengguna Yang Terdaftar :</h3>
          <div className="row mt-4 mb-4 ms-1">
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
        <button className="justify-content-center" onClick={generatePdf}>generate buku pdf</button> <br />
        <button className="justify-content-center" onClick={generatePdfUser}> generate userList pdf</button>
          </div>
          </div>
              </div>
          );

        case 'staff':
          return (
            <div>
              <p>What Are You Planning For Today's Activities, Staff?</p>
              <button onClick={directionButton}>Look at the current listed Book on the library</button>
              <Link to={'/dashboard/buku'}>
              <button>Create New Book And Manage The Listed Book</button><br />
              </Link>
              <Link to={'/dashboard/kategori'}>
                <button>Create A New Book Category</button>
              </Link>
              <Link to={'/dashboard/bukat'}>
                <button>Create A New Book Category Relation</button>
              </Link>

              <h3>The current book listed as :</h3>
      <div className="row">
      <div className="col-auto">
          <table className="table-responsive">
          <thead>
          <tr>
            <th>Judul Buku</th>
            <th>Penulis</th>
            <th>Penerbit</th>
            <th>Tahun Terbit</th>
          </tr>
        </thead>
        <tbody>
        {book?.map?.((buku) => (
          
          <tr key={buku._id}>
            <td>{buku.judul}</td>
            <td>{buku.penulis}</td>
            <td>{buku.penerbit}</td>
            <td>{buku.tahunterbit}</td>
          </tr>
        ))}
        </tbody>
        </table>
        <button className="justify-content-center" onClick={generatePdf}>generate buku pdf</button> <br />
          </div>
          </div>
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
