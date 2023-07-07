import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AddData.css";
import { useNavigate } from "react-router-dom";
import AddTextForm from "./FormComponents/AddTextForm";
import AddButtonsForm from "./FormComponents/AddButtonsForm";
import AddListForm from "./FormComponents/AddListForm";
import AddDocumentForm from "./FormComponents/AddDocumentForm";
import AddImageForm from "./FormComponents/AddImageForm";
import AddLinkForm from "./FormComponents/AddLinkForm";
import AddVideoForm from "./FormComponents/AddVideoForm";
import AddAudioForm from "./FormComponents/AddAudioForm";
import AddLocationForm from "./FormComponents/AddLocationForm";
import AddFollowUpForm from "./FormComponents/AddFollowUpForm";
import { invalidInputSwal, successInputSwal } from "../swal";

const AddData = ({ user, setLoginUser }) => {
  const navigate = useNavigate();
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionId, setsuggestionId] = useState();
  const [formData, setFormData] = useState({
    infoType: "",
    question: "",
    inthub: false,
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
        },
      ],
    },
    list: {
      responsetext: "",
      listheading: " ",
      buttonslist: [{ title: "", description: "" }],
    },
    location: {
      latitude: "",
      longitude: "",
      name: "",
      address: "",
    },
    followUp: [
      {
        question: "",
        response: "",
      },
    ],
  });
  const [selectedValue, setSelectedValue] = useState("");

  const listCountHandleChange = (event) => {
    /*
    // setSelectedValue(event.target.value);
    // let arr = [];
    // for(let i=0; i<event.target.value; i++){
    //   arr.push( { title: "", description: "" })
    // }
    // formData.list.buttonslist = arr;
    */
    formData.list.buttonslist.push({ title: "", description: "" });
    setSelectedValue({ title: "", description: "" });
  };

  const handleremoveListCount = (index) => {
    formData.list.buttonslist.pop(index);
    setSelectedValue({ title: "", description: "" });
  };

  const buttonCountHandleChange = (event) => {
    /*
    // setSelectedValue(event.target.value);
    // let arr = [];
    // for(let i=0; i<event.target.value; i++){
    // arr.push( {
    //   title: "",
    // })
    // }
    // formData.buttons.buttonslist = arr;
    */
    formData.buttons.buttonslist.push({
      title: "",
    });
    setSelectedValue({
      title: "",
    });
  };
  const handleremoveButtonCount = (index) => {
    formData.buttons.buttonslist.pop(index);
    setSelectedValue({
      title: "",
    });
    setSelectedValue({
      title: "",
    });
  };

  const followUpCountHandleChange = () => {
    /*
    // setSelectedValue(event.target.value);
    // let arr = [];
    // for(let i=0; i<event.target.value; i++){
    //   arr.push( {
    //     question: "",
    //     response:""
    //   })
    // }
    // formData.followUp = arr;
    */
    formData.followUp.push({
      question: "",
      response: "",
    });
    setSelectedValue({
      question: "",
      response: "",
    });
  };

  const handleremove = (index) => {
    formData.followUp.pop(index);
    setSelectedValue({
      question: "",
      response: "",
    });
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

  const handleFlowupChange = async (e, index) => {
    const { name, value } = e.target;
    setsuggestionId(index);
    const updatedFormData = {
      ...formData,
      ...formData.followUp,
      followUp: formData?.followUp.map((followup, idx) =>
        idx === index ? { ...followup, [name]: value } : followup
      ),
    };

    getData(formData.followUp[index].question).then((res) =>
      setSuggestions(res.data)
    );

    setFormData(updatedFormData);
  };

  const [infoTypeOptions, setInfoTypeOptions] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/infotype`)
      .then((response) => response.json())
      .then((data) => {
        setInfoTypeOptions(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  function getData(keyw) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/addinfo/autocomplete/${keyw}`
        );
        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  }

  const handleChange = async (e) => {
    let { name, value } = e.target;
    if (e.target.name === "inthub") {
      name = "inthub";
      value = e.target.checked;
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleChangee = (e, index) => {
    const value = e;
    const updatedFormData = {
      ...formData,
      ...formData.followUp,
      followUp: formData?.followUp.map((followup, idx) =>
        idx === index ? { ...followup, question: value } : followup
      ),
    };
    setFormData(updatedFormData);
    setSuggestions([]);
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
      .post(`${process.env.REACT_APP_BACKEND_URL}/addinfo`, requestData, {
        headers: headers,
      })
      .then((response) => {
        if(response.data==="DATA created successfully ...!")
        {
          successInputSwal(response.data);
          navigate("/home");
          console.log(response.data)
        }
        else{
          invalidInputSwal(response.data);
        }
      })
      .catch((error) => {
        invalidInputSwal("Create successfully");
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
      <AddButtonsForm
        formData={formData}
        handleButtonChange={handleButtonChange}
        handleChange={handleChange}
        buttonCountHandleChange={buttonCountHandleChange}
        handleremove={handleremoveButtonCount}
      />
    );
  } else if (formData.infoType === "list") {
    formContent = (
      <AddListForm
        handleListChange={handleListChange}
        formData={formData}
        handleChange={handleChange}
        listCountHandleChange={listCountHandleChange}
        handleremove={handleremoveListCount}
      />
    );
  } else if (formData.infoType === "document") {
    formContent = (
      <AddDocumentForm handleChange={handleChange} formData={formData} />
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
      <AddLocationForm handleChange={handleChange} formData={formData} />
    );
  } else if (formData.infoType === "followUp") {
    formContent = (
      <AddFollowUpForm
        suggestionId={suggestionId}
        suggestions={suggestions}
        handleFlowupChange={handleFlowupChange}
        formData={formData}
        handleChange={handleChange}
        followUpCountHandleChange={followUpCountHandleChange}
        handleChangee={handleChangee}
        handleremove={handleremove}
      />
    );
  }
  return (
    <>
      <div></div>
      {/* <div className='logoutButton' onClick={() => setLoginUser({})}>Logout</div> */}
      <div
        style={{
          marginTop: "20px",
          width: "102%",
        }}
      >
        <form onSubmit={handleSubmit}>
          <label htmlFor="infoType">Select Response Type : </label>
          <select
            style={{
              width: "200px",
              height: "32px",
              marginLeft: "2rem",
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
