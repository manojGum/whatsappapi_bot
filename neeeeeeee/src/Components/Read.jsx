import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const Read = () => {
  const { id } = useParams();
  const [data, setStudent] = useState([])
  console.log(id)
  useEffect(() => {
    axios.get(`http://localhost:5656/addinfo/info/${id}`).then(res => setStudent(res.data)).catch(err => console.log(err))
  },[])

  const box = {
      height: "200px",
      width: "25%",
      border:" 1px solid white",
      boxSizing: "border-box",
      boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px, rgb(51, 51, 51) 0px 0px 0px 3px"
  }
  console.log(data)
  return (
    <div className='d-flex vh-100 bg-secondary '>
      <div>
        <div className='p-2'>
          <h2>Details</h2>
          <div style={{
           display:"flex",
           flexDirection: "row",
           flexWrap: "wrap"
          }} >
            <div style={box}>
              <h4>Question</h4>
              <span>{data.question}</span>
            </div>
            <div style={box}>
              <h4>Question</h4>
              <span>{data.question}</span>
            </div>
            <div style={box}>
              <h4>Question</h4>
              <span>{data.question}</span>
            </div>
            <div style={box}>
              <h4>Question</h4>
              <span>{data.question}</span>
            </div>
            <div style={box}>
              <h4>Question</h4>
              <span>{data.question}</span>
            </div>
            <div style={box}>
              <h4>Question</h4>
              <span>{data.question}</span>
            </div>
            <div style={box}>
              <h4>Question</h4>
              <span>{data.question}</span>
            </div>
            
        
          </div>
        </div>

        {/* <table style={tableStyle}>
      <thead>
        <tr>
          <th style={thStyle}>Info Type</th>
          <th style={thStyle}>Question</th>
          <th style={thStyle}>Answer Text</th>
          <th style={thStyle}>Answer Link</th>
          <th style={thStyle}>Answer Filename</th>
          <th style={thStyle}>Answer Caption</th>
          <th style={thStyle}>Response Text</th>
          <th style={thStyle}>Button 1 Title</th>
          <th style={thStyle}>Button 2 Title</th>
          <th style={thStyle}>List Response Text</th>
          <th style={thStyle}>List Heading</th>
          <th style={thStyle}>List Item 1 Title</th>
          <th style={thStyle}>List Item 1 Description</th>
          <th style={thStyle}>List Item 2 Title</th>
          <th style={thStyle}>List Item 2 Description</th>
          <th style={thStyle}>Location Latitude</th>
          <th style={thStyle}>Location Longitude</th>
          <th style={thStyle}>Location Name</th>
          <th style={thStyle}>Location Address</th>
          <th style={thStyle}>Created At</th>
          <th style={thStyle}>Updated At</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={tdStyle}>{data.infoType.infoType}</td>
          <td style={tdStyle}>{data.question}</td>
          <td style={tdStyle}>{data.answer.text}</td>
          <td style={tdStyle}>
            <a href={data.answer.link} style={linkStyle}>
              {data.answer.link}
            </a>
          </td>
          <td style={tdStyle}>{data.answer.filename}</td>
          <td style={tdStyle}>{data.answer.caption}</td>
          <td style={tdStyle}>{data.buttons.responsetext}</td>
          <td style={tdStyle}>{data.buttons.buttonslist[0].title}</td>
          <td style={tdStyle}>{data.buttons.buttonslist[1].title}</td>
          <td style={tdStyle}>{data.list.responsetext}</td>
          <td style={tdStyle}>{data.list.listheading}</td>
          <td style={tdStyle}>{data.list.buttonslist[0].title}</td>
          <td style={tdStyle}>{data.list.buttonslist[0].description}</td>
          <td style={tdStyle}>{data.list.buttonslist[1].title}</td>
          <td style={tdStyle}>{data.list.buttonslist[1].description}</td>
          <td style={tdStyle}>{data.location.latitude}</td>
          <td style={tdStyle}>{data.location.longitude}</td>
          <td style={tdStyle}>{data.location.name}</td>
          <td style={tdStyle}>{data.location.address}</td>
          <td style={tdStyle}>{data.createdAt}</td>
          <td style={tdStyle}>{data.updatedAt}</td>
        </tr>
      </tbody>
    </table> */}
        <Link to="/home" className='btn btn-primary me-2'>Back</Link>
        <Link to={`/edit/${data._id}`} className='btn btn-info'>Edit</Link>
      </div>
    </div>
  )
}

export default Read