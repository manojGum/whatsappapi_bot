import React, { useContext } from 'react'
import { AddDataContext } from '../../contexts/AddDataContext' 

const AddImageForm = () => {
  const {handleChange,formData} = useContext(AddDataContext)
  return (
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
      value={formData?.answer[0]?.link}
      onChange={handleChange}
      required
    />
  </>
  )
}

export default AddImageForm
