import React from 'react'

const AddTextForm = ({handleChange,formData}) => {
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

    <label htmlFor="text">Text :- </label>
    <input
      type="text"
      id="text"
      name="answer.text"
      value={formData?.answer[0]?.text}
      onChange={handleChange}
      required
    />
    </>
  )
}

export default AddTextForm
