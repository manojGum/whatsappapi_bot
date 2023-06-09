import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Home = ({ user,setLoginUser }) => {
    console.log("user............user",user)
    const [data, setData] = useState([])
    const [counter, setCounter] = useState(0)
    useEffect(() => {
        axios.get("http://localhost:5656/addinfo").then(res => {
            console.log(res.data)
            let arr = [...res.data]
            let arr1 = [];
            for(let i=arr.length - 1; i>= 0; i-- ){
                arr1.push(arr[i]);
            }
           
            setData(arr1)
        }).catch(err => console.log(err))
    }, [counter])
    const handleDelete = (id)=>{
        axios.delete(`http://localhost:5656/addinfo/${id}`).then(res => {
            setCounter(counter+1)
        }).catch(err => console.log(err))
    }
    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-item-center'>
            <div className='w-30 bg-white rounded p-1'>
                <h2>Data List</h2>
                <div className='d-flex justify-content-end'>
                   <Link to="/addinfo" className='btn btn-success'> Create +</Link> 
                </div>
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th>Question</th>
                            <th >Answer
                                <span className='d-flex '>
                                <h6 className='px-2'>Text</h6>
                                 <h6 className='px-2'>Link</h6>
                                 <h6 className='px-2'>fileName</h6>
                                </span>
                                 
                            </th>
                            <th className='justify-content-center align-item-center '>Buttons
                                <td>Text</td>
                                <td>Link</td>
                                <td>Answer</td>
                                <td>Response</td>
                            </th>
                            <th>InfoType</th>
                            <th>List</th>
                            <th>Action</th>

                        </tr>
                    </thead>
                    <tbody>
                        {data.map((student, index) => {
                            return <tr key={student
                                ._id}>
                                <td>{student.question}</td>
                                <td>
                                <span className='d-flex '>{
                                    student.answer.text ? <h6 className='px-2'>{student.answer.text}</h6> :<h6 className='px-2'>{student.answer.text}</h6>
                                }
                                
                                 
                                </span>
                                </td>
                                <td>{student.buttons.responsetext}</td>
                                <td>{student.infoType.infoType}</td>
                                <td>{student.list.responsetext}</td>
                                <td className='d-flex'>
                                    <Link to={`/read/${student._id}`} className='btn btn-sm btn-info'>View</Link>
                                    <Link to={`/edit/${student._id}`}  className='btn btn-sm btn-primary mx-2'>Edit</Link>
                                    <button onClick={()=>handleDelete(student._id)} className='btn btn-sm btn-danger'>delete</button>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Home