import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AddData.css";
import { useNavigate, useParams } from "react-router-dom";
const Update = ({ user, setLoginUser }) => {
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
        },
        {
          title: "",
        },
      ],
    },
    list: {
      responsetext: "",
      listheading: " ",
      buttonslist: [
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

  const handleButtonChange = (e, index) => {
    const { value } = e.target;
    // console.log('name--',name)
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
    // console.log('name--',name)
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
  const handleFlowupChange = (e, index) => {
    const { name, value } = e.target;
    const updatedFormData = {
      ...formData,
     ...formData.followUp,
        followUp: formData?.followUp.map((followup, idx) =>
          idx === index ? { ...followup, [name]: value } : followup
        ),
    };
    setFormData(updatedFormData);
  };


  const [infoTypeOptions, setInfoTypeOptions] = useState([]);

  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/addinfo/info/${id}`)
      .then((res) => {
        setInfoTypeOptions(res.data.infoType);
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
            buttonslist:  res.data.buttons.buttonslist,
          },
          list: {
            responsetext: res.data.list.responsetext,
            listheading: res.data.list.listheading,
            buttonslist: res.data.list.buttonslist,
          },
          location: res.data.location,
          followUp:res.data.followUp
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const nestedHandleChange = (e) => {
  
    const { name, value } = e.target;
    const {
      list: { responsetext, ...listData },
      ...otherFormData
    } = formData;

    if (name === "list.responsetext") {
      const updatedListData = {
        ...listData,
        responsetext: value,
      };
      const updatedFormData = {
        ...otherFormData,
        list: updatedListData,
      };

      setFormData(updatedFormData);
    } else if (name === "list.listheading") {
      const updatedListData = {
        ...listData,
        listheading: value,
      };
      const updatedFormData = {
        ...otherFormData,
        list: updatedListData,
      };

      setFormData(updatedFormData);
    } else if (name === "buttons.responsetext") {
      const {
        buttons: { responsetext, ...buttonsData },
        ...otherFormData
      } = formData;
      const updatedListData = {
        ...buttonsData,
        responsetext: value,
      };
      const updatedFormData = {
        ...otherFormData,
        buttons: updatedListData,
      };

      setFormData(updatedFormData);
    } else if ((name === "answer.text")) {
      const {
        answer: { text, ...answerData },
        ...otherFormData
      } = formData;
      const updatedListData = {
        ...answerData,
        text: value,
      };
      const updatedFormData = {
        ...otherFormData,
        answer: updatedListData,
      };
      setFormData(updatedFormData);
    }else if ((name === "answer.link")) {
      const {
        answer: { link, ...answerData },
        ...otherFormData
      } = formData;
      const updatedListData = {
        ...answerData,
        link: value,
      };
    
      const updatedFormData = {
        ...otherFormData,
        answer: updatedListData,
      };
      setFormData(updatedFormData);
    }else if ((name === "answer.caption")) {
      const {
        answer: { caption, ...answerData },
        ...otherFormData
      } = formData;
      const updatedListData = {
        ...answerData,
        caption: value,
      };
    
      const updatedFormData = {
        ...otherFormData,
        answer: updatedListData,
      };
      setFormData(updatedFormData);
    }else if ((name === "answer.filename")) {
      const {
        answer: { filename, ...answerData },
        ...otherFormData
      } = formData;
      const updatedListData = {
        ...answerData,
        filename: value,
      };
    
      const updatedFormData = {
        ...otherFormData,
        answer: updatedListData,
      };
      setFormData(updatedFormData);
    }
  };

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${user.token}`,
  };
  const requestData = {
    ...formData,
    infoTypeId: infoTypeOptions,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("formData love", requestData);
    axios
      .put(`http://localhost:5656/api/v1/addinfo/` + id, requestData, {
        headers: headers,
      })
      .then((response) => {
        console.log(response);
        alert(response.data);
        navigate("/home");
      })
      .catch((error) => {
        alert("ERRot", error);
      });
  };

  let formContent;

  if (formData.infoType === "text") {
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
          onChange={nestedHandleChange}
          required
        />
        {/* <input
          type="text"
          id="question"
          name="question"
          value={formData.question}
          onChange={handleChange}
          required
        /> */}
      </>
    );
  } else if (formData.infoType === "button") {
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
        <label htmlFor="buttonsResponseText">Buttons Response Text:</label>
        <input
          type="text"
          id="buttonsResponseText"
          name="buttons.responsetext"
          value={formData?.buttons?.responsetext}
          onChange={nestedHandleChange}
        />

        {formData.buttons.buttonslist.map((button, index) => (
          <div key={index}>
            <label htmlFor={`buttonTitle${index + 1}`}>
              Button {index + 1} Title:
            </label>
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
  } else if (formData.infoType === "list") {
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
          onChange={nestedHandleChange}
        />

        <label htmlFor="text">List Heading :- </label>
        <input
          type="text"
          id="listheading"
          name="list.listheading"
          value={formData?.list?.listheading}
          onChange={nestedHandleChange}
          required
        />

        {formData.list.buttonslist.map((list, index) => (
          <div key={index}>
            <label htmlFor={`buttonTitle${index + 1}`}>
              List Title {index + 1}:
            </label>
            <input
              type="text"
              id={`buttonTitle${index + 1}`}
              name={`title`} //list.buttonslist[${index}].
              value={formData.list.buttonslist[`${index}`].title}
              onChange={(e) => handleListChange(e, index)}
              required
            />
            <label htmlFor={`buttonTitle${index + 1}`}>
              List Description {index + 1} :
            </label>
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
  } else if (formData.infoType === "followUp") {
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


        <label htmlFor="text">List Heading :- </label>

        {formData.followUp.map((data, index) => (
          <div key={index}>
            <label htmlFor={`followUp${index + 1}`}>
              Question {index + 1}:
            </label>
            <input
              type="text"
              id={`question${index + 1}`}
              name={`question`} //list.followUp[${index}].
              value={formData.followUp[`${index}`].question}
              onChange={(e) => handleFlowupChange(e, index)}
              required
            />

           {index+1 === formData.followUp.length ? <> <label htmlFor={`followUp${index + 2}`}>
              Response :
            </label>
            <input
              type="text"
              id={`response${index + 1}`}
              name={`response`} //list.followUp[${index}].
              value={formData.followUp[`${index}`].response}
              onChange={(e) => handleFlowupChange(e, index)}
              required
            /> </> : null}
           
          </div>
        ))}
      </>
    );
  } else if (formData.infoType === "document") {
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
          onChange={nestedHandleChange}
          required
        />

        <label htmlFor="filename">File Name:</label>
        <input
          type="text"
          id="filename"
          name="answer.filename"
          value={formData?.answer?.filename}
          onChange={nestedHandleChange}
          required
        />
        <label htmlFor="caption">Caption:</label>
        <input
          type="text"
          id="caption"
          name="answer.caption"
          value={formData?.answer?.caption}
          onChange={nestedHandleChange}
          required
        />
      </>
    );
  } else if (formData.infoType === "image") {
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
          onChange={nestedHandleChange}
          required
        />
      </>
    );
  } else if (formData.infoType === "link") {
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
          value={formData?.answer?.link}
          placeholder="Enter Sending LInk"
          onChange={nestedHandleChange}
          required
        />
      </>
    );
  } else if (formData.infoType === "video") {
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
          value={formData?.answer?.link}
          placeholder="Enter video link"
          onChange={nestedHandleChange}
          required
        />
      </>
    );
  } else if (formData.infoType === "audio") {
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
          value={formData?.answer?.link}
          placeholder="Enter audio link"
          onChange={nestedHandleChange}
          required
        />
      </>
    );
  } else if (formData.infoType === "location") {
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
      <div>
        <div className="text-center my-4">
          <h3>Update Details</h3>
        </div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="infoType">Select Response Type : </label>
          <select
            style={{
              width: "200px",
              height: "32px",
            }}
            id="infoType"
            name="infoType"
            value={formData.infoType}
            onChange={handleChange}
            required
          >
            <option value={formData.infoType}>{formData.infoType}</option>
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

export default Update;
