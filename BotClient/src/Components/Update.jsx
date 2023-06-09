import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./AddData.css";
import { useNavigate, useParams } from 'react-router-dom';
const Update = ({ user,setLoginUser }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
      infoType: '',
      question: '',
      answer: {
        text: '',
        link: '',
        filename: '',
        caption:'',
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
        listheading:" ",
        buttonslist: [{ title: '', description: '' },{ title: '', description: '' }],
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
    useEffect(() => {
      axios.get(`http://localhost:5656/addinfo/info/${id}`).then(res =>{
        setInfoTypeOptions(res.data.infoType)
        setFormData({...formData,
          infoType:res.data.infoType.infoType,
          question: res.data.question,
          answer:{
            text: res.data.answer.text,
            link:res.data.answer.text,
            filename:res.data.answer.filename,
            caption:res.data.answer.caption,
          },
          buttons: {
            responsetext: res.data.buttons.responsetext,
            buttonslist: [
              {
                title: res.data.buttons.buttonslist[0].title
              },
              {
                title:res.data.buttons.buttonslist[1].title
              }
            ]
          },
          list: {
            responsetext: res.data.list.responsetext,
            listheading:res.data.list.listheading,
            buttonslist: res.data.list.buttonslist,
          },
          location: res.data.location
        })
      } 
      ).catch(err => console.log(err))
    },[])
  
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
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log("formData love", requestData)
      axios.put(`http://localhost:5656/addinfo/`+id, requestData, {
        headers: headers
      })
        .then((response) => {
          console.log(response)
          alert(response.data)
          navigate("/home")
          // setFormData({
          //   infoType: '',
          //   question: '',
          //   answer: {
          //     text: '',
          //     link: '',
          //     filename: '',
          //     caption:'',
          //   },
          //   buttons: {
          //     responsetext: "",
          //     buttonslist: [
          //       {
          //         title: ""
          //       },
          //       {
          //         title: ""
          //       }
          //     ]
          //   },
          //   list: {
          //     responsetext: '',
          //     buttonslist: [{ title: '', description: '' },{ title: '', description: '' }],
          //   },
          // })
        }
       
        )
        .catch((error) => {
          alert("ERRot", error)
        })
  
    };
  
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
          {/* <input
            type="text"
            id="text"
            name="answer.text"
            value={formData?.answer?.text}
            onChange={handleChange}
            required
          /> */}
          <input
            type="text"
            id="question"
            name="question"
            value={formData.question}
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
            value={formData?.buttons?.responsetext}
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
            value={formData?.list?.responsetext}
            onChange={handleChange}
          />
          <label htmlFor="text">List Heading :- </label>
          <input
            type="text"
            id="listheading"
            name="list.listheading"
            value={formData?.list?.listheading}
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
            value={formData?.answer?.link}
            onChange={handleChange}
            required
          />
  
          <label htmlFor="filename">File Name:</label>
          <input
            type="text"
            id="filename"
            name="answer.filename"
            value={formData?.answer?.filename}
            onChange={handleChange}
            required
          />
            <label htmlFor="caption">Caption:</label>
          <input
            type="text"
            id="caption"
            name="answer.caption"
            value={formData?.answer?.caption}
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
            value={formData?.answer?.link}
            onChange={handleChange}
            required
          />
        </>
      );
    }else if (formData.infoType === 'link') {
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
    }else if (formData.infoType === 'video') {
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
            value={formData?.answer?.link} placeholder="Enter video link"
            onChange={handleChange}
            required
          />
        </>
      );
    }else if (formData.infoType === 'audio') {
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
            value={formData?.answer?.link} placeholder="Enter audio link"
            onChange={handleChange}
            required
          />
        </>
      );
    }else if (formData.infoType === 'location') {
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
      <div>
      <div className="text-center my-4">
          <h3>Update Details</h3>
        </div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="infoType">Select Response Type :   </label>
          <select style={{
            width:"200px",
            height: "32px"
          }}
            id="infoType"
            name="infoType"
            value={formData.infoType}
            onChange={handleChange}
            required
          >
          
            <option value="">Select Info Type</option>
            <option  value={formData.infoType}>
                {formData.infoType}
              </option>
          </select>
          <br></br>
          <hr></hr>
  
          {formContent}
  
          <button type="submit">Submit</button>
        </form>
        </div>
      </>
    );
}

export default Update