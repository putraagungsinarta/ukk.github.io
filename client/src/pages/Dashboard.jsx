import { useContext, useState, useEffect } from "react"
import { UserContext } from '../../context/userContext'
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"
import jsPDF from "jspdf"
import 'jspdf-autotable'
import Footer from '../components/Footer'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';



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

    const divStyle = {
      overflowX: 'scroll'
    }
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
              <h3>What Are You Planning For Today's Activities, Admin?</h3>
              <Navbar>
          <Container>
          <Nav className="me-auto">
          <table className="table-responsive table" ><tr>
            <td><Nav.Link variant="outline-white" href="/dashboard/buku">Create New Book And Manage The Listed Book</Nav.Link></td>
            <td><Nav.Link onClick={directionButton}>Create New User And Manage User Account</Nav.Link></td>
            <td><Nav.Link href="/dashboard/kategori">Create A New Book Category</Nav.Link></td>
            <td><Nav.Link href="/dashboard/bukat">Create A New Book Category Relation</Nav.Link></td>
            </tr></table>
          </Nav>
          </Container>
         </Navbar>
              {/* <Link to={'/dashboard/buku'}>
              <button>Create New Book And Manage The Listed Book</button><br />
              </Link>
              <Link to={'/dashboard/kategori'}>
                <button>Create A New Book Category</button>
              </Link>
              <Link to={'/dashboard/bukat'}>
                <button>Create A New Book Category Relation</button>
              </Link> */}
              <h3>Pengguna Yang Terdaftar :</h3>
          <div className="row mt-4 mb-4 ms-1 justify-content-center">
          <div className="col-auto">
          <div className="wow">
          <table className="table-responsive table table-striped" style={divStyle}>
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
        </table> <div className="position-absolute lmao">
                  <button className="lmao" onClick={generatePdf}>generate buku pdf</button>
        </div> <div className="position-absolute lmao1">
        <button className="lmao1" onClick={generatePdfUser}> generate userList pdf</button>
        </div>
          </div>
          </div>
              </div></div>
          );

        case 'staff':
          return (
            <div>
              <p className="text-center justify-content-center">What Are You Planning For Today's Activities, Staff?</p>
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
      <div className="row justify-content-around">
      <div className="col-auto">
          <table className="table-responsive table table-striped" width={'100%'}>
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
    <div className="container"><div className="about-content mt-5 mb-5">
        <h1>Dashboard</h1>
        {!!Users && (<h2>Hi {Users.username}!</h2>)}
        <br />

      {renderDashboardContent()}
    </div></div>
<Footer />
    </div>
  )
}
