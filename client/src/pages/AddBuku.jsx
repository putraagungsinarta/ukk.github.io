import axios from 'axios'
import React, {useState, useEffect} from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'


export default function AddBuku() {
    const navigate = useNavigate()
    const [data, setData] = useState({
        judul: '',
        penulis: '',
        penerbit: '',
        tahunterbit: ''
    })
    // const [image, setImage] = useState('');
  
    // function convertToBase64(e) {
    //   let reader = new FileReader();
    //   reader.readAsDataURL(e.target.files[0]);
    //   reader.onload = () => {
    //     setImage(reader.result)
    //   }
    //   reader.onerror = error => {
    //     console.error("error:", error)
    //     toast.error("there's something wrong with your code", error)
    //   }
    // }
    // const handleImageChange = (event) => {
    //   const file = event.target.files[0];
    //   const reader = new FileReader();
  
    //   reader.onloadend = () => {
    //     setImage(reader.result);
    //   };
  
    //   if (file) {
    //     reader.readAsDataURL(file);
    //   }
    //   reader.onerror = error => {
    //     console.error("error:", error)
    //     toast.error("there's something wrong with your code", error)
    //   }
    // };

    const registerBuku = async (e) => {
        const {judul, penulis, penerbit, tahunterbit} = data
        try {
            const {data} = await axios.post('/buku', { judul, penulis, penerbit, tahunterbit})
            if(data.error) {
              toast.error(data.error)
            } else {
              setData({})
              toast.success('Buku Berhasil Ditambahkan!')
              navigate('/dashboard')
            }
          } catch (error) {
            console.log(error);
          }
    }
  return (
    <div>
         <form onSubmit={registerBuku}>
            <div className="card mt-4 mb-4">
            <div className="card-body">
              <h5 className="card-title text-center mb-4">Register Buku</h5>
                <div className="mb-3">
                  <label className="form-label">Judul Buku</label>
                  <input type="text" className="form-control" placeholder="Enter name" value={data.judul} onChange={(e) => setData({...data, judul: e.target.value})} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Penulis</label>
                  <input type="text" className="form-control" placeholder="Enter email" value={data.penulis} onChange={(e) => setData({...data, penulis: e.target.value})} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Penerbit</label>
                  <input type="text" className="form-control" placeholder="Enter your name" value={data.penerbit} onChange={(e) => setData({...data, penerbit: e.target.value})} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Tahun Terbit</label>
                  <input type="text" className="form-control" placeholder="Enter your address" value={data.tahunterbit} onChange={(e) => setData({...data, tahunterbit: e.target.value})} />
                </div>
                <button type="submit" className="btn btn-primary w-100">Register</button>
            </div>
          </div>
        </form>
    </div>
  )
}