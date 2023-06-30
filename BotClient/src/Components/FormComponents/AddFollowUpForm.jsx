// import React, { useState } from "react";

// const MyForm = () => {
//   const [formData, setFormData] = useState({
//     question: "",
//     responseOptions: [
//       { response: "text", textResponse: "" },
//     ],
//   });

//   const handleInputChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleFollowUpChange = (index, e) => {
//     const { name, value } = e.target;
//     const updatedResponseOptions = [...formData.responseOptions];
//     updatedResponseOptions[index][name] = value;
//     setFormData({
//       ...formData,
//       responseOptions: updatedResponseOptions,
//     });
//   };

//   const addFollowUpOption = () => {
//     setFormData({
//       ...formData,
//       responseOptions: [
//         ...formData.responseOptions,
//         { response: "text", textResponse: "" },
//       ],
//     });
//   };

//   const removeFollowUpOption = (index) => {
//     const updatedResponseOptions = [...formData.responseOptions];
//     updatedResponseOptions.splice(index, 1);
//     setFormData({
//       ...formData,
//       responseOptions: updatedResponseOptions,
//     });
//   };

//   return (
//     <>
//       <label>
//         Question:
//         <input
//           type="text"
//           name="question"
//           value={formData.question}
//           onChange={handleInputChange}
//         />
//       </label>

    //   <h3>Follow-up:</h3>
    //   {formData.responseOptions.map((item, index) => (
    //     <div key={index}>
    //       <label>
    //         Response Type:
    //         <select
    //           name="response"
    //           value={item.response}
    //           onChange={(e) => handleFollowUpChange(index, e)}
    //         >
    //           <option value="text">Text</option>
    //           {/* Add other response options here */}
    //         </select>
    //       </label>
    //       {/* Render the corresponding input fields based on the response type */}
    //       {item.response === "text" && (
    //         <input
    //           type="text"
    //           name="textResponse"
    //           value={item.textResponse}
    //           onChange={(e) => handleFollowUpChange(index, e)}
    //         />
    //       )}
    //       {/* Add other input fields for different response types */}
    //       <button onClick={() => removeFollowUpOption(index)}>Remove</button>
    //     </div>
    //   ))}

//       <button onClick={addFollowUpOption}>Add Follow-up Option</button>
//     </>
//   );
// };

// export default MyForm;



import React from 'react'

const AddFollowUpForm= ({handleFlowupChange,formData,handleChange,followUpCountHandleChange,selectedValue}) => {
  return (
    <>
        <div>
          <label htmlFor="selectBox">Select an option:</label>
          <select id="selectBox" value={selectedValue} onChange={followUpCountHandleChange} style={{
            width:"200px",
            height: "32px",
            marginLeft:"2rem"
          }}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
          </select>
        </div>
        <label htmlFor="question">Question:</label>
        <input
          type="text"
          id="question"
          name="question"
          value={formData.question}
          onChange={handleChange}
          required
        />
        <h5 >FollowUp  :- </h5>

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

           {index+1 == formData.followUp.length ? <> <label htmlFor={`followUp${index + 2}`}>
              Response :
            </label>
            <input
              type="text"
              id={`response${index + 2}`}
              name={`response`} //list.followUp[${index}].
              value={formData.followUp[`${index}`].response}
              onChange={(e) => handleFlowupChange(e, index)}
              required
            /> </> : null}
           
          </div>
        ))}
        
      </>
  )
}

export default AddFollowUpForm
