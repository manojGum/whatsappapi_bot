import React, { useContext } from 'react'
import { GrFormAdd,GrFormClose } from 'react-icons/gr';
import { AddDataContext } from '../../contexts/AddDataContext';
const AddListForm = () => {
  const {handleListChange,formData,handleChange,listCountHandleChange,handleremoveListCount}=useContext(AddDataContext)
  return (
    <>
        {/* <div>
          <label htmlFor="selectBox">Select an option:</label>
          <select id="selectBox" value={selectedValue} onChange={listCountHandleChange} style={{
            width:"200px",
            height: "32px",
            marginLeft:"2rem"
          }}>
            <option value="4">4</option>
            <option value="6">6</option>
          </select>
        </div> */}
        <label htmlFor="question">Question:</label>
        <input
          type="text"
          id="question"
          name="question"
          value={formData.question}
          onChange={handleChange}
          style={{width:"95%"}}
          required
        />

        <label htmlFor="listResponseText">List Response Text:</label>
        <input
          type="text"
          id="listResponseText"
          name="list.responsetext"
          value={formData?.list[0]?.responsetext}
          style={{width:"95%"}}
          onChange={handleChange}
        />
        <label htmlFor="text">List Heading :- </label>
        <input
          type="text"
          id="listheading"
          name="list.listheading"
          value={formData?.list[0]?.listheading}
          style={{width:"95%"}}
          onChange={handleChange}
          required
        />

        {formData.list.buttonslist.map((list, index) => (
          <div key={index} style={{display:"flex"}}>
            <div>
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
            <div class="form-group col-md-2 mt-4" style={{paddingTop: "3%", display:"flex", width:"1px"}}>
               {
                  formData.list.buttonslist.length!==1 &&
                  <div><button  className="btn btn-danger mx-1 btn-sm" onClick={()=>handleremoveListCount(index)}><GrFormClose /></button> </div>
               }
               { formData.list.buttonslist.length-1===index &&
               <div><button  className="btn btn-success btn-sm" onClick={()=>listCountHandleChange()}> <GrFormAdd /></button> </div>
               }
               </div>
          </div>
        ))}
      </>
  )
}

export default AddListForm
