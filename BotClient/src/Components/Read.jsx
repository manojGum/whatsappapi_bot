import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./AddData.css";
import { Link, useParams } from 'react-router-dom';
const Read = ({ user, setLoginUser }) => {
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
/*
	const handleButtonChange = (e, index) => {
		const { value } = e.target;
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
	*/
	/*
	// const handleListChange = (e, index) => {
	// 	const { name, value } = e.target;
	// 	const updatedFormData = {
	// 		...formData,
	// 		list: {
	// 			...formData.list,
	// 			buttonslist: formData?.list.buttonslist.map((button, idx) =>
	// 				idx === index ? { ...button, [name]: value } : button
	// 			)
	// 		}
	// 	};
	// 	setFormData(updatedFormData);
	// };
	*/

	// const [infoTypeOptions, setInfoTypeOptions] = useState([]);

	const { id } = useParams();
	// const [data, setStudent] = useState([])
	useEffect(() => {
		axios.get(`http://localhost:5656/addinfo/info/${id}`).then(res => {
			// setInfoTypeOptions(res.data._id)
			setFormData({
				...formData,
				infoType: res.data.infoType.infoType,
				question: res.data.question,
				answer: {
					text: res.data.answer.text,
					link: res.data.answer.link,
					filename: res.data.answer.filename,
					caption: res.data.answer.caption,
				},
				buttons: {
					responsetext: res.data.buttons.responsetext,
					buttonslist: res.data.buttons.buttonslist,
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

	// const headers = {
	// 	'Content-Type': 'application/json',
	// 	'Authorization': `Bearer ${user.token}`
	// }
	// const requestData = {
	// 	...formData,
	// 	infoTypeId: infoTypeOptions,
	// };

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
			<ul class="list-group mb-3">
					<li class="list-group-item p-4">
						<div className="p-2 mb-2 bg-primary text-white">{formData.question}</div>
						<p>{formData?.answer?.text}</p>
					</li>
				</ul>
{/* 
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
				/> */}
			</>
		);
	} else if (formData.infoType === 'button') {
		formContent = (
			<>
				<ul class="list-group mb-3">
					<li class="list-group-item p-4">
						<div className="p-2 mb-2 bg-primary text-white">{formData.question}</div>
						<p><label> Response Text :- </label>
						{formData?.buttons[0]?.responsetext}</p>
						
						{formData.buttons.buttonslist.map((button, index) => (
					<div key={index}  style={{ display: "flex", justifyContent:"space-evenly",textJustify:"auto"}}>
						<label htmlFor={`buttonTitle${index + 1}`}>Button {index + 1} Title :- </label>
						<p> {formData.buttons.buttonslist[`${index}`].title}</p>
						{/* <input
							type="text"
							id={`buttonTitle${index + 1}`}
							name={`buttons.buttonslist[${index}].title`}
							value={formData.buttons.buttonslist[`${index}`].title}
							onChange={(e) => handleButtonChange(e, index)}
						/> */}
					</div>
				))}
					</li>
				</ul>
{/* 				
				<label htmlFor="question">Question:</label>
				<input
					type="text"
					id="question"
					name="question"
					value={formData.question}
					onChange={handleChange}
					required
				/> */}
				{/* {console.log('formData---', formData)} */}
				{/* <label htmlFor="buttonsResponseText">Buttons Response Text:</label>
				<input
					type="text"
					id="buttonsResponseText"
					name="buttons.responsetext"
					value={formData?.buttons[0]?.responsetext}
					onChange={handleChange}
				/> */}

				{/* {formData.buttons.buttonslist.map((button, index) => (
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
				))} */}
			</>
		);
	} else if (formData.infoType === 'list') {
		formContent = (
			<>
			<ul class="list-group mb-3">
					<li class="list-group-item p-4">
						<div className="p-2 mb-2 bg-primary text-white">{formData.question}</div>
						<p><label> Response Text :- </label>
						{formData?.list[0]?.responsetext}</p>
						<p><label> List Heading :- </label>
						{formData?.list[0]?.listheading}</p>
						
						{formData.list.buttonslist.map((list, index) => (
					<div key={index}>
						<p htmlFor={`buttonTitle${index + 1}`}>List Title {index + 1} : - 
						<label  style={{ marginLeft: '.5rem' }}>  {formData.list.buttonslist[`${index}`].title}</label>
						</p>


						<p htmlFor={`buttonTitle${index + 1}`}>List Description {index + 1} : - 
						<label  style={{ marginLeft: '.5rem' }}>  {formData.list.buttonslist[`${index}`].description}</label>
						</p>
						{/* <input
							type="text"
							id={`buttonTitle${index + 1}`}
							name={`title`} //list.buttonslist[${index}].
							value={formData.list.buttonslist[`${index}`].title}
							onChange={(e) => handleListChange(e, index)}
							required
						/> */}
						{/* <label htmlFor={`buttonTitle${index + 1}`}>List Description {index + 1} : - </label>
						<input
							type="text"
							id={`buttonTitle${index + 1}`}
							name={`description`} //list.buttonslist[${index}].
							value={formData.list.buttonslist[`${index}`].description}
							onChange={(e) => handleListChange(e, index)}
						/> */}
						
					</div>
				))}
					</li>
				</ul>


				{/* <label htmlFor="question">Question:</label>
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
				/> */}
				{/* <label htmlFor="text">List Heading :- </label>
				<input
					type="text"
					id="listheading"
					name="list.listheading"
					value={formData?.list[0]?.listheading}
					onChange={handleChange}
					required
				/> */}

				{/* {formData.list.buttonslist.map((list, index) => (
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
				))} */}
			</>
		);
	} else if (formData.infoType === 'document') {
		formContent = (
			<>
			<ul class="list-group mb-3">
					<li class="list-group-item p-4">
						<div className="p-2 mb-2 bg-primary text-white">{formData.question}</div>
						<p >Link : - 
						<label  style={{ marginLeft: '.5rem' }}> {formData.answer.link} </label>
						</p>
						<p >File Name: - 
						<label  style={{ marginLeft: '.5rem' }}> {formData.answer.filename} </label>
						</p>
						{/* <p >Caption: - 
						<label  style={{ marginLeft: '.5rem' }}> {formData?.answer[3]?.caption} </label>
						</p> */}
						
					</li>
				</ul>
				{/* <label htmlFor="question">Question:</label>
				<input
					type="text"
					id="question"
					name="question"
					value={formData.question}
					onChange={handleChange}
					required
				/> */}

				{/* <label htmlFor="link">Link:</label>
				<input
					type="url"
					id="link"
					name="answer.link"
					value={formData?.answer[0]?.link}
					onChange={handleChange}
					required
				/> */}

				{/* <label htmlFor="filename">File Name:</label>
				<input
					type="text"
					id="filename"
					name="answer.filename"
					value={formData?.answer[0]?.filename}
					onChange={handleChange}
					required
				/> */}
				{/* <label htmlFor="caption">Caption:</label>
				<input
					type="text"
					id="caption"
					name="answer.caption"
					value={formData?.answer[0]?.caption}
					onChange={handleChange}
					required
				/> */}
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

	return (
		<>
			<div className='w-50 m-auto'>
				<div className="text-center my-4">
					<h3>Views Details</h3>
				</div>
				<label htmlFor="infoType">Response Type :</label>
				<select
					id="infoType"
					style={{
						width:"25%",
						height:"35px",
						alignItems:"center"
					}}
					name="infoType"
					value={formData.infoType}
					onChange={handleChange}
					required
				>

					
					<option value={formData.infoType}>
						{formData.infoType}
					</option>
				</select>
				<br></br>
				<hr></hr>

				{/* <ul class="list-group mb-3">
					<li class="list-group-item p-4">
						<div className="p-2 mb-2 bg-primary text-white">whom to contact first if i am having issue with my assets?</div>
						<p>If you are having issues with your assets, such as equipment or devices provided by the company, it is advisable to first contact your company's IT or technical support department. They are typically responsible for managing and troubleshooting assets and can assist you in resolving any issues you may be experiencing.</p>
					</li>
				</ul> */}
				{formContent}

				{/* <button type="submit">Submit</button> */}
				<Link to="/home" className="btn btn-info me-2">
					Back
				</Link>
			</div>
		</>
	);
}

export default Read