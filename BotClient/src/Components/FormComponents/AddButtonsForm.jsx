import { AddDataContext } from "../../contexts/AddDataContext";
import React ,{ useContext } from "react";
import { GrFormAdd,GrFormClose } from 'react-icons/gr';

const AddButtonsForm = () => {
  const {handleButtonChange,formData,handleChange, buttonCountHandleChange,handleremoveButtonCount}= useContext(AddDataContext)
  return (
    <>
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
                  <div><button  className="btn btn-danger mx-1 btn-sm" onClick={()=>handleremoveButtonCount(index)}><GrFormClose /></button> </div>
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
