import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AddData.css";
import { useNavigate } from "react-router-dom";
import AddTextForm from "./FormComponents/AddTextForm";
import AddButtonsForm from "./FormComponents/AddButtonsForm";
import AddListForm from "./FormComponents/AddListForm";
import AddDocumentForm from "./AddDocumentForm";
import AddImageForm from "./FormComponents/AddImageForm";
import AddLinkForm from "./FormComponents/AddLinkForm";
import AddVideoForm from "./FormComponents/AddVideoForm";
import AddAudioForm from "./FormComponents/AddAudioForm";
import AddLocationForm from "./FormComponents/AddLocationForm";

const AddData = ({ user, setLoginUser }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    infoType: "",
    question: "",
    answer: {
      text: "",
      link: "",
      filename: "",
      caption: "",
    },
    buttons: {
      responsetext: "",
      buttonslist: [
        {
          title: "",
        }
      ],
    },
    list: {
      responsetext: "",
      listheading: " ",
      buttonslist: [
        { title: "", description: "" },
        { title: "", description: "" },
        { title: "", description: "" },
        { title: "", description: "" },
      ],
    },
    location: {
      latitude: "",
      longitude: "",
      name: "",
      address: "",
    },
  });
  const [selectedValue, setSelectedValue] = useState("");

  const listCountHandleChange = (event) => {
    setSelectedValue(event.target.value);
    let arr = [];
    for(let i=0; i<event.target.value; i++){
      arr.push( { title: "", description: "" })
    }
    formData.list.buttonslist = arr;
    
  };

  const buttonCountHandleChange  = (event) => {
    setSelectedValue(event.target.value);
    let arr = [];
    for(let i=0; i<event.target.value; i++){
      arr.push( {
        title: "",
      })
    }
    formData.buttons.buttonslist = arr;
   
  };

  const handleButtonChange = (e, index) => {
    const { value } = e.target;
    const updatedFormData = {
      ...formData,
      buttons: {
        ...formData.buttons,
        buttonslist: formData?.buttons.buttonslist.map((button, idx) =>
          idx === index ? { ...button, title: value } : button
        ),
      },
    };
    setFormData(updatedFormData);
  };
  const handleListChange = (e, index) => {
    const { name, value } = e.target;
    const updatedFormData = {
      ...formData,
      list: {
        ...formData.list,
        buttonslist: formData?.list.buttonslist.map((button, idx) =>
          idx === index ? { ...button, [name]: value } : button
        ),
      },
    };
    setFormData(updatedFormData);
  };

  const [infoTypeOptions, setInfoTypeOptions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5656/infotype")
      .then((response) => response.json())
      .then((data) => {
        setInfoTypeOptions(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${user.token}`,
  };
  const requestData = {
    ...formData,
    infoTypeId: infoTypeOptions.find(
      (option) => option.infoType === formData.infoType
    ),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:5656/addinfo`, requestData, {
        headers: headers,
      })
      .then((response) => {
        alert(response.data);
        navigate("/home");
      })
      .catch((error) => {
        alert("Error", error);
      });
  };

  let formContent;

  if (formData.infoType === "text") {
    formContent = (
    <AddTextForm handleChange={handleChange} formData={formData} />
    );
  } else if (formData.infoType === "button") {
    formContent = (
    <AddButtonsForm  formData={formData} handleButtonChange={handleButtonChange} handleChange={handleChange} selectedValue={selectedValue} buttonCountHandleChange ={buttonCountHandleChange}/>
    );
  } else if (formData.infoType === "list") {
    formContent = (
     <AddListForm handleListChange={handleListChange} formData={formData} handleChange={handleChange} listCountHandleChange={listCountHandleChange} selectedValue={selectedValue}/>
    );
  } else if (formData.infoType === "document") {
    formContent = (
     <AddDocumentForm handleChange={handleChange} formData={formData}  />
    );
  } else if (formData.infoType === "image") {
    formContent = (
     <AddImageForm handleChange={handleChange} formData={formData} />
    );
  } else if (formData.infoType === "link") {
    formContent = (
    <AddLinkForm handleChange={handleChange} formData={formData} />
    );
  } else if (formData.infoType === "video") {
    formContent = (
      <AddVideoForm handleChange={handleChange} formData={formData} />
    );
  } else if (formData.infoType === "audio") {
    formContent = (
     <AddAudioForm handleChange={handleChange} formData={formData} />
    );
  } else if (formData.infoType === "location") {
    formContent = (
      <AddLocationForm  handleChange={handleChange} formData={formData} />
    );
  }
  return (
    <>
      <div></div>
      {/* <div className='logoutButton' onClick={() => setLoginUser({})}>Logout</div> */}
      <div
        style={{
          marginTop: "20px",
        }}
      >
        <form onSubmit={handleSubmit}>
          <label htmlFor="infoType">Select Response Type : </label>
          <select
            style={{
              width: "200px",
              height: "32px",
              marginLeft:"2rem"
            }}
            id="infoType"
            name="infoType"
            value={formData.infoType}
            onChange={handleChange}
            required
          >
            <option value="">Select Info Type</option>
            {infoTypeOptions.map((option) => (
              <option key={option._id} value={option.infoType}>
                {option.infoType}
              </option>
            ))}
          </select>
          <br></br>
          <hr></hr>

          {formContent}

          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default AddData;
