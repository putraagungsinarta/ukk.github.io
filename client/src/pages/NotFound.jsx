import React from 'react'
import { Link } from 'react-router-dom'

export default function Err404() {
  return (
    <div>
    <div className="container text-center mt-5">
    <h1 className='display-2'>404</h1>
    <h1 className="display-4">Page Not Found</h1>
    <p className="lead">Oops! Halaman Yang Anda Cari Mungkin Tidak Ada / Tidak Terdaftar.</p>
    <p>Kembali Ke <Link to="/" className="text-primary">Halaman Utama</Link>.</p>
  </div>
    </div>
  )
}
