import React from 'react'
import { GrFormAdd,GrFormClose } from 'react-icons/gr';

const AddButtonsForm = ({handleButtonChange,formData,handleChange, buttonCountHandleChange,handleremove}) => {
  return (
    <>
    {/* <div>
        <label htmlFor="selectBox">Select an option:</label>
        <select id="selectBox" value={selectedValue} onChange={buttonCountHandleChange} style={{
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
        </select>
      </div> */}
      <label htmlFor="question">Question:</label>
      <input
        type="text"
        id="question"
        name="question"
        value={formData.question}
        style={{width:"95%"}}
        onChange={handleChange}
        required
      />
      <label htmlFor="buttonsResponseText">Buttons Response Text:</label>
      <input
        type="text"
        id="buttonsResponseText"
        name="buttons.responsetext"
        value={formData?.buttons[0]?.responsetext}
        style={{width:"95%"}}
        onChange={handleChange}
      />

      {formData.buttons.buttonslist.map((button, index) => (
        <div key={index} style={{display:"flex"}}>
          <div style={{width:"95%"}}>
          <label htmlFor={`buttonTitle${index + 1}`}>
            Button {index + 1} Title:
          </label>
          <input
            type="text"
            id={`buttonTitle${index + 1}`}
            name={`buttons.buttonslist[${index}].title`}
            value={formData.buttons.buttonslist[`${index}`].title}
            onChange={(e) => handleButtonChange(e, index)}
            required
          />
          </div>
          <div class="form-group col-md-2 mt-4" style={{paddingTop: "3%", display:"flex", width:"1px"}}>
               {
                  formData.buttons.buttonslist.length!==1 &&
                  <div><button  className="btn btn-danger mx-1 btn-sm" onClick={()=>handleremove(index)}><GrFormClose /></button> </div>
               }
               { formData.buttons.buttonslist.length-1===index &&
               <div><button  className="btn btn-success btn-sm" onClick={()=>buttonCountHandleChange()}> <GrFormAdd /></button> </div>
               }
          </div>
        </div>
      ))}
    </>
  )
}

export default AddButtonsForm
