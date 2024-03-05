import React, {useState, useEffect, useContext} from 'react'
import { Link, useParams } from 'react-router-dom';
import {toast} from 'react-hot-toast'
import { UserContext } from '../../context/userContext'
import axios from 'axios'

export default function Review() {
  const [book, setBook] = useState([]);
  const [data, setData] = useState({
    ulasan: '',
    rating: ''
  })
  const {Users} = useContext(UserContext);
  const { id } = useParams();

  useEffect(() => {
    const fetchBookDetails = async () => {
        try {  
        const response = await axios.get(`/buku/${id}`)
        setBook(response.data);    
        } catch (error) {
          console.error("Server Error", error)
          toast.error("Error Fetching On Details")
        }
    }
    fetchBookDetails();
  }, [id]);

const createUlasan = async (e) =>{
    const { ulasan, rating } = data
    const id_user = Users.id_user;
    const id_buku = book.id_buku
    try {
      const {data} = await axios.post('/ulasan', { id_user, id_buku, ulasan, rating })
      if(data.error) {
        toast.error(data.error)
      } else {
        setData({})
        toast.success('Ulasan Berhasil Dibuat!')
      }
    } catch (error) {
      console.error(error)
      toast.error("Error Creating Ulasan")
    }
}

const handleOnChange = (e) =>{
    setData({
        ...data, [e.target.name]: e.target.value,
    })
}
    return (
        <div>
            test
        </div>
  )
}
