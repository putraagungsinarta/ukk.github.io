import axios from 'axios'
import React, {useState, useEffect} from 'react'
import toast from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'

export default function Bukat() {
    const [book, setBuku] = useState([])
    const [category, setKategori] = useState([])
    const [data, setData] = useState({
      id_buku: '',
      id_kategori: '',
    })
    const navigate = useNavigate();

    useEffect(() => {
      axios.get('/buku')
        .then((response) => {
          setBuku(response.data);
        })
        .catch((error) => {
          console.error('Error fetching buku:', error);
        });
    }, []);
    
    useEffect(() => {
      axios.get('/kategori')
        .then((response) => {
          setKategori(response.data);
        })
        .catch((error) => {
          console.error('Error fetching kategori:', error);
        });
    }, []);

        const handleOnChange = (e) => {
            setData({
                ...data,
                [e.target.name]: e.target.value,
            })
        }

    const registerRelasi = async (e) => {
      const {id_buku, id_kategori} = data
      try {
        const {data} = await axios.post('/bukat', { id_buku, id_kategori })
        if(data.error) {
          toast.error(data.error)
        } else {
          setData({})
          toast.success('Relation Created Successfully!')
          navigate('/dashboard')
        }
      } catch (error) {
        console.log(error);
      }
    }

  return (
    <div>
          <form onSubmit={registerRelasi}>
            <div className="card mt-4 mb-4">
            <div className="card-body">
              <h5 className="card-title text-center mb-4">Register Relasi</h5>
                <div className="mb-3">
                  <label className="form-label">Buku</label>
                  <select className="form-select" name="id_buku" onChange={handleOnChange}>
                  {book.map((buku) => (
                    <option key={buku._id} value={buku.id_buku}>{buku.id_buku}</option> )
                  )}
                  </select>
                  <label className="form-label">Kategori</label>
                  <select className="form-select" name="id_kategori" onChange={handleOnChange}>
                  {category.map((kategori) => (
                    <option key={kategori._id} value={kategori.id_kategori}>{kategori.id_kategori}</option>
                  ))}
                  </select>
                </div>
                <button type="submit" className="btn btn-primary w-100 mb-3 mt-3">Register</button>
            </div>
          </div>
        </form>
    <h1>buku</h1>
      <ul>
        {book && book.map && book.map((buku) => (
          <li key={buku._id}>
            {buku.judul} - (ID : {buku.id_buku})
          </li>
        ))}
      </ul>
      <h1>kategori</h1>
      <ul>
        { category && category.map && category.map((kategori) => (
          <li key={kategori._id}>
            {kategori.namaKategori} - (ID: {kategori.id_kategori})
          </li>
        ))}
      </ul>
    </div>
  )
}
