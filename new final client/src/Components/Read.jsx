import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const Read = () => {
    const {id} = useParams();
    const [student , setStudent] = useState([])
    console.log(id)
    useEffect(()=>{
        axios.get(`http://localhost:5656/addinfo/info/${id}`).then(res=>setStudent(res.data) ).catch(err => console.log(err))
    },[])
  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
        <div className='w-50 bg-white rounded p-3'>
            <div className='p-2'>
            <h2>Details</h2>
            <h2>{student._id}</h2>
            <h2>{student.question}</h2>
            </div>
            <Link to="/home" className='btn btn-primary me-2'>Back</Link>
            <Link to={`/edit/${student._id}`} className='btn btn-info'>Edit</Link>
        </div>
    </div>
  )
}

export default Read