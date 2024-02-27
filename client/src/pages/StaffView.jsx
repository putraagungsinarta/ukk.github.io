import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-hot-toast'
import axios from 'axios'
import jsPDF from 'jspdf'
import 'jspdf-autotable'

export default function Staff() {
  const [book, setBook] = useState([]);
  const [borrowing, setBorrow] = useState([]);
  const [data, setData] = useState({
    namaKategori: ''
  })
  const pdf = jsPDF;
  const currentDate = new Date().toLocaleDateString();
  const navigate = useNavigate();

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
  }
}

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
    axios.get('/pinjam')
      .then((response) => {
        setBorrow(response.data);
      })
      .catch((error) => {
        console.error('Error fetching buku:', error);
      });
    }, []);
  
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

const generatePeminjaman = () => {
  const doc = new pdf();

  doc.addImage('/logo.png', 'JPEG', 10, 10, 40, 40);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Daftar Peminjaman', 60, 25);
  doc.text(`${currentDate}`, 60, 35);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');

  const columns = ['id_peminjaman', 'id_user', 'id_buku', 'Tanggal Pinjam', 'Tanggal Dikembalikan', 'Status Peminjaman'];
  const rows = borrowing.map(pinjaman => [pinjaman.id_pinjaman, pinjaman.id_user, pinjaman.id_buku, pinjaman.tanggal_pinjam, pinjaman.tanggal_pengembalian, pinjaman.status_pinjam]);

  doc.autoTable({
    startY: 60,
    head: [columns],
    body: rows,
    styles: {
      fontSize: 8,
      font: 'helvetica'
  },
  });
  
  doc.save("data-generatePeminjaman.pdf")
}

  return (
    <div>
      {/* <h3>Buat Kategori Buku</h3>
      <form onSubmit={createKategori}>
        <label className='form-label'>Kategori Buku:</label>
        <input type="text" className="form-control" placeholder="Masukkan Kategori" value={data.namaKategori} onChange={(e) => setData({...data, namaKategori: e.target.value})} />
        <button type="submit" className="btn btn-primary w-100">Register Kategori</button>
      </form> <br/> */}

      <h2>Welcome! What will you do today, Staff?</h2> <br />
      <h3>The current book listed as :</h3>
      <div className="row justify-content-center">
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
        <button className="justify-content-center" onClick={generatePdf}>generate buku pdf</button> <br />
        <button className="justify-content-center" onClick={generatePeminjaman}>generate data peminjaman</button>
          </div>
          </div>
    </div>
  )
}