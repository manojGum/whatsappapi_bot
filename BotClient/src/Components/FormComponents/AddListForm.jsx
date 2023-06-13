import React from 'react'

const AddListForm = ({handleListChange,formData,handleChange,listCountHandleChange,selectedValue}) => {
  return (
    <>
        <div>
          <label htmlFor="selectBox">Select an option:</label>
          <select id="selectBox" value={selectedValue} onChange={listCountHandleChange} style={{
            width:"200px",
            height: "32px",
            marginLeft:"2rem"
          }}>
            <option value="4">4</option>
            <option value="6">6</option>
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

        <label htmlFor="listResponseText">List Response Text:</label>
        <input
          type="text"
          id="listResponseText"
          name="list.responsetext"
          value={formData?.list[0]?.responsetext}
          onChange={handleChange}
        />
        <label htmlFor="text">List Heading :- </label>
        <input
          type="text"
          id="listheading"
          name="list.listheading"
          value={formData?.list[0]?.listheading}
          onChange={handleChange}
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
  )
}

export default AddListForm
