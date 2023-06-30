import React from 'react'

const AddDocumentForm = ({handleChange,formData}) => {
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

        <label htmlFor="filename">File Name:</label>
        <input
          type="text"
          id="filename"
          name="answer.filename"
          value={formData?.answer[0]?.filename}
          onChange={handleChange}
          required
        />
        <label htmlFor="caption">Caption:</label>
        <input
          type="text"
          id="caption"
          name="answer.caption"
          value={formData?.answer[0]?.caption}
          onChange={handleChange}
          required
        />
      </>
  )
}

export default AddDocumentForm
