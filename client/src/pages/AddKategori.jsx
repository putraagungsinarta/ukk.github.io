import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-hot-toast'
import axios from 'axios'

export default function AddKategori() {
    const [data, setData] = useState({
      namaKategori: ''
    })
    const  [book, setBook] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('/buku')
          .then((response) => {
            setBook(response.data);
          })
          .catch((error) => {
            console.error('Error fetching buku:', error);
          });
        }, []);
  
    const createKategori = async (e) => {
      e.preventDefault()
      const {namaKategori} = data
    try {
      const {data} = await axios.post('/kategori', { namaKategori })
      if(data.error) {
        toast.error(data.error)
      } else {
        setData({})
        toast.success('Kategori Berhasil Ditambahkan!')
        navigate('/dashboard')
      }
    } catch (error) {
      console.log(error);
      toast.error('Error Membuat Kategori')
    }
  }
  
    return (
      <div>
        <h3>Buat Kategori Buku</h3>
        <form onSubmit={createKategori}>
          <label className='form-label'>Kategori Buku:</label>
          <input type="text" className="form-control" placeholder="Masukkan Kategori" value={data.namaKategori} onChange={(e) => setData({...data, namaKategori: e.target.value})} />
          <button type="submit" className="btn btn-primary w-100">Register Kategori</button>
        </form> <br/>
  
        <h3>Buku Yang Saat Ini Terdaftar:</h3>
        <div className="row p-2">
        <div className="col-auto">
            <table className="table-responsive">
            <thead>
            <tr>
              <th>Judul Buku</th>
              <th>Penulis</th>
              <th>Penerbit</th>
              <th>Tahun Terbit</th>
              <th>Sampul Buku</th>
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
              {buku.image && (     
                <img
                  src={`data:${buku.image.contentType};base64,${buku.image.data}`}
                  alt={buku.judul}
                  width="150"
                  height="150"
                />
              )}
              </td>
            </tr>
          ))}
          </tbody>
          </table>
            </div>
            </div>
      </div>
    )
}