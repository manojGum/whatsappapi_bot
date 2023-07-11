// import React, { useState, useEffect } from "react";
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
import { AddDataContext } from "../contexts/AddDataContext";
import { useContext } from "react";


// addDataContext api


const AddData = ({ user, setLoginUser }) => {
  const navigate = useNavigate();
// context api
const {formData,infoTypeOptions,handleChange}= useContext(AddDataContext)
// end context api
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
      <AddTextForm />
    );
  } else if (formData.infoType === "button") {
    formContent = (
      <AddButtonsForm
      />
    );
  } else if (formData.infoType === "list") {
    formContent = (
      <AddListForm
        // handleListChange={handleListChange}
        // formData={formData}
        // handleChange={handleChange}
        // listCountHandleChange={listCountHandleChange}
        // handleremove={handleremoveListCount}
      />
    );
  } else if (formData.infoType === "document") {
    formContent = (
      <AddDocumentForm />
    );
  } else if (formData.infoType === "image") {
    formContent = (
      <AddImageForm />
    );
  } else if (formData.infoType === "link") {
    formContent = (
      <AddLinkForm />
    );
  } else if (formData.infoType === "video") {
    formContent = (
      <AddVideoForm />
    );
  } else if (formData.infoType === "audio") {
    formContent = (
      <AddAudioForm />
    );
  } else if (formData.infoType === "location") {
    formContent = (
      <AddLocationForm />
    );
  } else if (formData.infoType === "followUp") {
    formContent = (
      <AddFollowUpForm
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
