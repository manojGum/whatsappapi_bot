import React from "react";
import "../AddData.css";
import { GrFormAdd,GrFormClose } from 'react-icons/gr';


const AddFollowUpForm = ({
  suggestions,
  handleFlowupChange,
  formData,
  handleChange,
  followUpCountHandleChange,
  handleChangee,
  suggestionId,
  handleremove
}) => {

  return (
    <>
      {/* <div>
        <label htmlFor="selectBox">Select an option:</label>
        <select
          id="selectBox"
          value={selectedValue}
          onChange={followUpCountHandleChange}
          style={{
            width: "200px",
            height: "32px",
            marginLeft: "2rem",
          }}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
        </select>
      </div> */}
      <label htmlFor="question">Question:</label>
      <div>
        <input
          type="text"
          id="question"
          name="question"
          value={formData.question}
          onChange={handleChange}
          required
          style={{width:"95%"}}
        />
        {/* <ul>
        {suggestions.map((suggestion, index) => (
          <li key={index}>{suggestion}</li>
        ))}
      </ul> */}
      </div>

      <h5>FollowUp :- </h5>

      {formData.followUp.map((data, index) => (
        <div key={index} style={{display:"flex"}}>
          <div>

          <label htmlFor={`followUp${index + 1}`}>Question {index + 1}:</label>
          <input
            type="text"
            id={`question${index + 1}`}
            name={`question`}
            value={formData.followUp[`${index}`].question}
            onChange={(e) => handleFlowupChange(e, index)}
            required
          />
          {suggestionId === index ? (
            <ul className="dropdown-row">
              {suggestions.map((suggestion, i) => (
                <div
                  key={i}
                  name=""
                  onClick={() => handleChangee(suggestion.question, index)}
                >
                  {suggestion.question}
                </div>
              ))}
            </ul>
          ) : null}

         
          {/* {index + 1 === formData.followUp.length ? (
            <>
              {" "}
              <label htmlFor={`followUp${index + 2}`}>Response :</label>
              <input
                type="text"
                id={`response${index + 2}`}
                name={`response`} //list.followUp[${index}].
                value={formData.followUp[`${index}`].response}
                onChange={(e) => handleFlowupChange(e, index)}
                required
              />{" "}
            </>
          ) : null} */}

          <label htmlFor={`followUp${index + 2}`}>Response :</label>
          <input
            type="text"
            id={`response${index + 2}`}
            name={`response`} //list.followUp[${index}].
            value={formData.followUp[`${index}`].response}
            onChange={(e) => handleFlowupChange(e, index)}
          />
        </div>
        <div class="form-group col-md-2 mt-4" style={{paddingTop: "3%", display:"flex", width:"1px"}}>
               {
                  formData.followUp.length!==1 &&
                  <div><button  className="btn btn-danger mx-1 btn-sm" onClick={()=>handleremove(index)}><GrFormClose /></button> </div>
               }
               { formData.followUp.length-1===index &&
               <div><button  className="btn btn-success btn-sm" onClick={()=>followUpCountHandleChange()}> <GrFormAdd /></button> </div>
               }
               </div>
          </div>
        
      ))}
      
    </>
  );
};

export default AddFollowUpForm;
