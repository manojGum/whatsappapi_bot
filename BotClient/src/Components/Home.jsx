import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Home = ({ user, setLoginUser }) => {
	const [data, setData] = useState([])
	const [counter, setCounter] = useState(0)
	useEffect(() => {
		axios.get("http://localhost:5656/addinfo").then(res => {
			let arr = [...res.data]
			let arr1 = [];
			for (let i = arr.length - 1; i >= 0; i--) {
				arr1.push(arr[i]);
			}

			setData(arr1)
		}).catch(err => console.log(err))
	}, [counter])
	const handleDelete = (id) => {
		axios.delete(`http://localhost:5656/addinfo/${id}`).then(res => {
			setCounter(counter + 1)
		}).catch(err => console.log(err))
	}
	return (
		<div className='d-flex vh-100 bg-white justify-content-center align-item-center'>
			<div className='bg-white'>

				<div className='d-flex justify-content-between mb-3'>
					<h2 className='m-0'>Data List</h2>
					<Link to="/addinfo" className='btn btn-success'> + Create</Link>
				</div>
				<table className='table table-striped'>
					<thead>
						<tr>
							<th style={{ width: '20%' }}>Question</th>
							<th style={{ width: '40%' }}>Answer</th>
							<th>Buttons</th>
							<th>InfoType</th>
							<th>List</th>
							<th></th>

						</tr>
					</thead>
					<tbody>
						{data.map((student, index) => {
							return <tr key={student
								._id}>
								<td>{student.question}</td>
								<td>
									<span className='d-flex '>{
										student.answer.text ? <>{student.answer.text}</> : <>{student.answer.text}</>
									}


									</span>
								</td>
								<td>{student.buttons.responsetext}</td>
								<td>{student.infoType.infoType}</td>
								<td>{student.list.responsetext}</td>
								<td>
									<div className='d-flex'>
										<Link to={`/read/${student._id}`} className='btn btn-sm btn-link'><i className="fa fa-eye text-primary" aria-hidden="true"></i></Link>
										<Link to={`/edit/${student._id}`} className='btn btn-sm btn-link mx-2'><i className="fa fa-pencil-square-o text-success" aria-hidden="true"></i></Link>
										<button onClick={() => handleDelete(student._id)} className='btn btn-sm btn-link'><i className="fa fa-trash-o text-danger" aria-hidden="true"></i></button>
									</div>
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