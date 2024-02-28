import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import {toast} from 'react-hot-toast'
import axios from 'axios'


export default function User() {
  const [book, setBook] = useState([]);
  const [users, setUsers] = useState([]);

useEffect(() => {
  axios.get('/buku')
    .then((response) => {
      setBook(response.data);
      
    })
    .catch((error) => {
      console.error('Error fetching buku:', error);
    });
  }, []);
  useEffect(() => {
    axios.get('/users')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching buku:', error);
      });
    }, []);
  
  return (
    <div>
      <h3>Buku Yang Anda Pinjam Saat Ini :</h3>
      <div className="row justify-content-center">
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
            <td>
            <Link to={`/dashboard/user/review/${buku._id}`}>
            <button>Beri Ulasan</button>
            </Link>
            </td>
          </tr>
        ))}
        </tbody>
        </table>
        <Link to='/dashboard/user/pinjam'>
            <button>Pinjam Buku Baru</button>
        </Link>
          </div>
          </div>
      <h2>Buat Ulasan Mengenai Sebuah Buku: </h2>
      <button>Ulas Sebuah Buku</button>
    </div>
  )
}
