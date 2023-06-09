// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";

// const Read = () => {
//   const { id } = useParams();
//   const [data, setStudent] = useState([]);
//   console.log(id);
//   useEffect(() => {
//     axios
//       .get(`http://localhost:5656/addinfo/info/${id}`)
//       .then((res) => {
//         console.log(res.data);
//         setStudent(res.data);
//       })
//       .catch((err) => console.log(err));
//   }, []);

//   const box = {
//     height: "200px",
//     width: "25%",
//     border: " 1px solid white",
//     boxSizing: "border-box",
//     boxShadow:
//       "rgba(0, 0, 0, 0.16) 0px 1px 4px, rgb(51, 51, 51) 0px 0px 0px 3px",
//   };
//   console.log(data);
//   return (
//     <div className="d-flex vh-100 bg-secondary ">
//       <div>
//         <div className="p-2">
//           <h2>Details</h2>
//           <div
//             style={{
//               display: "flex",
//               flexDirection: "row",
//               flexWrap: "wrap",
//             }}
//           >
//             <div style={box}>
//               <h4>Question</h4>
//               <label>Question</label>
//               <span>{data.question}</span>
//             </div>
//             <div style={box}>
//               <h4>Answer</h4>
//               <div>
//                {
//                 if(data.answer.text){

//                 }
//                }
//               </div>

//             </div>

//             <div style={box}>
//               <h4>Question</h4>
//               <span>{data.question}</span>
//             </div>
//             <div style={box}>
//               <h4>Question</h4>
//               <span>{data.question}</span>
//             </div>
//             <div style={box}>
//               <h4>Question</h4>
//               <span>{data.question}</span>
//             </div>
//             <div style={box}>
//               <h4>Question</h4>
//               <span>{data.question}</span>
//             </div>
//             <div style={box}>
//               <h4>Question</h4>
//               <span>{data.question}</span>
//             </div>
//           </div>
//         </div>

//         {/* <table style={tableStyle}>
//       <thead>
//         <tr>
//           <th style={thStyle}>Info Type</th>
//           <th style={thStyle}>Question</th>
//           <th style={thStyle}>Answer Text</th>
//           <th style={thStyle}>Answer Link</th>
//           <th style={thStyle}>Answer Filename</th>
//           <th style={thStyle}>Answer Caption</th>
//           <th style={thStyle}>Response Text</th>
//           <th style={thStyle}>Button 1 Title</th>
//           <th style={thStyle}>Button 2 Title</th>
//           <th style={thStyle}>List Response Text</th>
//           <th style={thStyle}>List Heading</th>
//           <th style={thStyle}>List Item 1 Title</th>
//           <th style={thStyle}>List Item 1 Description</th>
//           <th style={thStyle}>List Item 2 Title</th>
//           <th style={thStyle}>List Item 2 Description</th>
//           <th style={thStyle}>Location Latitude</th>
//           <th style={thStyle}>Location Longitude</th>
//           <th style={thStyle}>Location Name</th>
//           <th style={thStyle}>Location Address</th>
//           <th style={thStyle}>Created At</th>
//           <th style={thStyle}>Updated At</th>
//         </tr>
//       </thead>
//       <tbody>
//         <tr>
//           <td style={tdStyle}>{data.infoType.infoType}</td>
//           <td style={tdStyle}>{data.question}</td>
//           <td style={tdStyle}>{data.answer.text}</td>
//           <td style={tdStyle}>
//             <a href={data.answer.link} style={linkStyle}>
//               {data.answer.link}
//             </a>
//           </td>
//           <td style={tdStyle}>{data.answer.filename}</td>
//           <td style={tdStyle}>{data.answer.caption}</td>
//           <td style={tdStyle}>{data.buttons.responsetext}</td>
//           <td style={tdStyle}>{data.buttons.buttonslist[0].title}</td>
//           <td style={tdStyle}>{data.buttons.buttonslist[1].title}</td>
//           <td style={tdStyle}>{data.list.responsetext}</td>
//           <td style={tdStyle}>{data.list.listheading}</td>
//           <td style={tdStyle}>{data.list.buttonslist[0].title}</td>
//           <td style={tdStyle}>{data.list.buttonslist[0].description}</td>
//           <td style={tdStyle}>{data.list.buttonslist[1].title}</td>
//           <td style={tdStyle}>{data.list.buttonslist[1].description}</td>
//           <td style={tdStyle}>{data.location.latitude}</td>
//           <td style={tdStyle}>{data.location.longitude}</td>
//           <td style={tdStyle}>{data.location.name}</td>
//           <td style={tdStyle}>{data.location.address}</td>
//           <td style={tdStyle}>{data.createdAt}</td>
//           <td style={tdStyle}>{data.updatedAt}</td>
//         </tr>
//       </tbody>
//     </table> */}
//         <Link to="/home" className="btn btn-primary me-2">
//           Back
//         </Link>
//         <Link to={`/edit/${data._id}`} className="btn btn-info">
//           Edit
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Read;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./AddData.css";
import { Link, useParams } from 'react-router-dom';
const Read = ({ user, setLoginUser }) => {
	// const navigate = useNavigate();
	const [formData, setFormData] = useState({
		infoType: '',
		question: '',
		answer: {
			text: '',
			link: '',
			filename: '',
			caption: '',
		},
		buttons: {
			responsetext: "",
			buttonslist: [
				{
					title: ""
				},
				{
					title: ""
				}
			]
		},
		list: {
			responsetext: '',
			listheading: " ",
			buttonslist: [{ title: '', description: '' }, { title: '', description: '' }],
		},
		location: {
			latitude: "",
			longitude: "",
			name: "",
			address: ""
		}
	});

	const handleButtonChange = (e, index) => {
		const { value } = e.target;
		// console.log('name--',name)
		const updatedFormData = {
			...formData,
			buttons: {
				...formData.buttons,
				buttonslist: formData?.buttons.buttonslist.map((button, idx) =>
					idx === index ? { ...button, title: value } : button
				)
			}
		};
		setFormData(updatedFormData);
	};
	const handleListChange = (e, index) => {
		const { name, value } = e.target;
		// console.log('name--',name)
		const updatedFormData = {
			...formData,
			list: {
				...formData.list,
				buttonslist: formData?.list.buttonslist.map((button, idx) =>
					idx === index ? { ...button, [name]: value } : button
				)
			}
		};
		setFormData(updatedFormData);
	};

	const [infoTypeOptions, setInfoTypeOptions] = useState([]);

	const { id } = useParams();
	const [data, setStudent] = useState([])
	useEffect(() => {
		axios.get(`http://localhost:5656/addinfo/info/${id}`).then(res => {
			setInfoTypeOptions(res.data._id)
			setFormData({
				...formData,
				infoType: res.data.infoType.infoType,
				question: res.data.question,
				answer: {
					text: res.data.answer.text,
					link: res.data.answer.text,
					filename: res.data.answer.filename,
					caption: res.data.answer.caption,
				},
				buttons: {
					responsetext: res.data.buttons.responsetext,
					buttonslist: [
						{
							title: res.data.buttons.buttonslist[0].title
						},
						{
							title: res.data.buttons.buttonslist[1].title
						}
					]
				},
				list: {
					responsetext: res.data.list.responsetext,
					listheading: res.data.list.listheading,
					buttonslist: res.data.list.buttonslist,
				},
				location: res.data.location
			})
		}
		).catch(err => console.log(err))
	}, [])

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const headers = {
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${user.token}`
	}
	const requestData = {
		...formData,
		infoTypeId: infoTypeOptions,
	};

	// const handleSubmit = async (e) => {
	//   e.preventDefault();
	//   console.log("formData love", requestData)
	//   axios.post(`http://localhost:5656/addinfo`, requestData, {
	//     headers: headers
	//   })
	//     .then((response) => {
	//       console.log(response)
	//       alert(response.data)
	//       navigate("/home")
	//     }

	//     )
	//     .catch((error) => {
	//       alert("ERRot", error)
	//     })

	// };

	let formContent;


	if (formData.infoType === 'text') {
		formContent = (
			<>
				<label htmlFor="question">Question:</label>
				<input
					type="text"
					id="question"
					name="question"
					value={formData.question}
					onChange={handleChange}
					required
				/>

				<label htmlFor="text">Text :- </label>
				<input
					type="text"
					id="text"
					name="answer.text"
					value={formData?.answer?.text}
					onChange={handleChange}
					required
				/>
			</>
		);
	} else if (formData.infoType === 'button') {
		formContent = (
			<>
				<label htmlFor="question">Question:</label>
				<input
					type="text"
					id="question"
					name="question"
					value={formData.question}
					onChange={handleChange}
					required
				/>
				{/* {console.log('formData---', formData)} */}
				<label htmlFor="buttonsResponseText">Buttons Response Text:</label>
				<input
					type="text"
					id="buttonsResponseText"
					name="buttons.responsetext"
					value={formData?.buttons[0]?.responsetext}
					onChange={handleChange}
				/>

				{formData.buttons.buttonslist.map((button, index) => (
					<div key={index}>
						<label htmlFor={`buttonTitle${index + 1}`}>Button {index + 1} Title:</label>
						<input
							type="text"
							id={`buttonTitle${index + 1}`}
							name={`buttons.buttonslist[${index}].title`}
							value={formData.buttons.buttonslist[`${index}`].title}
							onChange={(e) => handleButtonChange(e, index)}
						/>
					</div>
				))}
			</>
		);
	} else if (formData.infoType === 'list') {
		formContent = (
			<>
				<label htmlFor="question">Question:</label>
				<input
					type="text"
					id="question"
					name="question"
					value={formData.question}
					onChange={handleChange}
					required
				/>

				<label htmlFor="listResponseText">List Response Text:</label>
				<input
					type="text"
					id="listResponseText"
					name="list.responsetext"
					value={formData?.list[0]?.responsetext}
					onChange={handleChange}
				/>
				<label htmlFor="text">List Heading :- </label>
				<input
					type="text"
					id="listheading"
					name="list.listheading"
					value={formData?.list[0]?.listheading}
					onChange={handleChange}
					required
				/>

				{formData.list.buttonslist.map((list, index) => (
					<div key={index}>
						<label htmlFor={`buttonTitle${index + 1}`}>List Title {index + 1}:</label>
						<input
							type="text"
							id={`buttonTitle${index + 1}`}
							name={`title`} //list.buttonslist[${index}].
							value={formData.list.buttonslist[`${index}`].title}
							onChange={(e) => handleListChange(e, index)}
							required
						/>
						<label htmlFor={`buttonTitle${index + 1}`}>List Description {index + 1} :</label>
						<input
							type="text"
							id={`buttonTitle${index + 1}`}
							name={`description`} //list.buttonslist[${index}].
							value={formData.list.buttonslist[`${index}`].description}
							onChange={(e) => handleListChange(e, index)}
						/>
					</div>
				))}
			</>
		);
	} else if (formData.infoType === 'document') {
		formContent = (
			<>
				<label htmlFor="question">Question:</label>
				<input
					type="text"
					id="question"
					name="question"
					value={formData.question}
					onChange={handleChange}
					required
				/>

				<label htmlFor="link">Link:</label>
				<input
					type="url"
					id="link"
					name="answer.link"
					value={formData?.answer[0]?.link}
					onChange={handleChange}
					required
				/>

				<label htmlFor="filename">File Name:</label>
				<input
					type="text"
					id="filename"
					name="answer.filename"
					value={formData?.answer[0]?.filename}
					onChange={handleChange}
					required
				/>
				<label htmlFor="caption">Caption:</label>
				<input
					type="text"
					id="caption"
					name="answer.caption"
					value={formData?.answer[0]?.caption}
					onChange={handleChange}
					required
				/>
			</>
		);
	} else if (formData.infoType === 'image') {
		formContent = (
			<>
				<label htmlFor="question">Question:</label>
				<input
					type="text"
					id="question"
					name="question"
					value={formData.question}
					onChange={handleChange}
					required
				/>

				<label htmlFor="link">Link:</label>
				<input
					type="url"
					id="link"
					name="answer.link"
					value={formData?.answer[0]?.link}
					onChange={handleChange}
					required
				/>
			</>
		);
	} else if (formData.infoType === 'link') {
		formContent = (
			<>
				<label htmlFor="question">Question:</label>
				<input
					type="text"
					id="question"
					name="question"
					value={formData.question}
					onChange={handleChange}
					required
				/>

				<label htmlFor="link">Link Response:</label>
				<input
					type="url"
					id="link"
					name="answer.link"
					value={formData?.answer[0]?.link} placeholder="Enter Sending LInk"
					onChange={handleChange}
					required
				/>
			</>
		);
	} else if (formData.infoType === 'video') {
		formContent = (
			<>
				<label htmlFor="question">Question:</label>
				<input
					type="text"
					id="question"
					name="question"
					value={formData.question}
					onChange={handleChange}
					required
				/>

				<label htmlFor="link">Link Response:</label>
				<input
					type="url"
					id="link"
					name="answer.link"
					value={formData?.answer[0]?.link} placeholder="Enter video link"
					onChange={handleChange}
					required
				/>
			</>
		);
	} else if (formData.infoType === 'audio') {
		formContent = (
			<>
				<label htmlFor="question">Question:</label>
				<input
					type="text"
					id="question"
					name="question"
					value={formData.question}
					onChange={handleChange}
					required
				/>

				<label htmlFor="link">Link Response:</label>
				<input
					type="url"
					id="link"
					name="answer.link"
					value={formData?.answer[0]?.link} placeholder="Enter audio link"
					onChange={handleChange}
					required
				/>
			</>
		);
	} else if (formData.infoType === 'location') {
		formContent = (
			<>
				<label htmlFor="question">Question:</label>
				<input
					type="text"
					id="question"
					name="question"
					value={formData.question}
					onChange={handleChange}
					required
				/>

				<label htmlFor="link">Latitude:</label>
				<input
					type="text"
					id="latitude"
					name="location.latitude"
					value={formData?.location?.latitude}
					onChange={handleChange}
					required
				/>
				<label htmlFor="link">Longitude:</label>
				<input
					type="text"
					id="longitude"
					name="location.longitude"
					value={formData?.location?.longitude}
					onChange={handleChange}
					required
				/>
				<label htmlFor="link">Name:</label>
				<input
					type="text"
					id="name"
					name="location.name"
					value={formData?.location?.name}
					onChange={handleChange}
					required

				/>
				<label htmlFor="link">Address:</label>
				<input
					type="text"
					id="address"
					name="location.address"
					value={formData?.location?.address}
					onChange={handleChange}
					required
				/>

			</>

		);
	}
	// console.log("formdata.........................",formData)
	return (
		<>
			<div className='w-50 m-auto'>
				<div className="text-center my-4">
					<h3>Views Details</h3>
				</div>
				{/* <label htmlFor="infoType">Select Response Type :</label>
				<select
					id="infoType"
					name="infoType"
					value={formData.infoType}
					onChange={handleChange}
					required
				>

					<option value="">Select Info Type</option>
					<option value={formData.infoType}>
						{formData.infoType}
					</option>
				</select>
				<br></br>
				<hr></hr> */}

				<ul class="list-group mb-3">
					<li class="list-group-item p-4">
						<div className="p-2 mb-2 bg-primary text-white">whom to contact first if i am having issue with my assets?</div>
						<p>If you are having issues with your assets, such as equipment or devices provided by the company, it is advisable to first contact your company's IT or technical support department. They are typically responsible for managing and troubleshooting assets and can assist you in resolving any issues you may be experiencing.</p>
					</li>
				</ul>

				{/* <button type="submit">Submit</button> */}
				<Link to="/home" className="btn btn-info me-2">
					Back
				</Link>
			</div>
		</>
	);
}

export default Read