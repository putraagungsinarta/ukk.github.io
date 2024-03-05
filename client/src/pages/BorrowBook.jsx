import axios from 'axios'
import React, { useState, useEffect, useContext } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext';

export default function BorrowBook() {
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const {Users} = useContext(UserContext);
  const [data, setData] = useState({
    id_buku: '',
    id_user: '',
  })
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/buku')
      .then((response) => {
        setBooks(response.data);  
      })
      .catch((error) => {
        console.error('Error fetching buku:', error);
      });
    }, []);
    useEffect(() => {
        axios.get('/user')
          .then((response) => {
            setUsers(response.data);
          })
          .catch((error) => {
            console.error('Error fetching buku:', error);
          });
        }, []);

      const handleBorrow = async () => {
          const {id_buku , id_user} = data
    try {
      const {data} = await axios.post('/pinjam', { id_buku, id_user, });
      if (data.error){
        console.error(error)
      } else {
      setData({})
      toast.success('Book borrowed successfully!');
      }
    } catch (error) {
      console.error('Error borrowing book:', error.message);
      // Handle error (e.g., display error message to the user)
    }
  };

  return (
    <div>    <div className="container"><div className="about-content mt-5 mb-5">
      <h2>Borrow Book</h2>
      <div>
        {books.map((buku) => (
          <div key={buku._id}>
            <h3>{buku.judul}</h3>
            <p>ID Buku: {buku.id_buku}</p>
            <p>Author: {buku.penulis}</p>
            <p>Penerbit: {buku.penerbit}</p> <br />
          </div>
        ))}
            <form onSubmit={handleBorrow}>
            <div className=''>
            <div className="mb-3">
                  <label className="form-label">id_user</label>
                  <input type="text" className="form-control" placeholder="Enter name" value={data.id_user} onChange={(e) => setData({...data, id_user: e.target.value})} />
                </div>
                <div className="mb-3">
                  <label className="form-label">id_buku</label>
                  <input type="text" className="form-control" placeholder="Enter email" value={data.id_buku} onChange={(e) => setData({...data, id_buku: e.target.value})} />
                </div>
            </div>
            <button>Pinjam Buku</button>
            </form>
      </div>
    </div></div></div>
  )
}