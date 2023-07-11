import React, { useContext } from 'react'
import { AddDataContext } from '../../contexts/AddDataContext'

const AddVideoForm = () => {
  const {handleChange,formData}=useContext(AddDataContext)
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

    <label htmlFor="link">Link Response:</label>
    <input
      type="url"
      id="link"
      name="answer.link"
      value={formData?.answer[0]?.link}
      placeholder="Enter video link"
      onChange={handleChange}
      required
    />
  </>
  )
}

export default AddVideoForm
