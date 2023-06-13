import React from 'react'

const AddImageForm = ({handleChange,formData}) => {
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
