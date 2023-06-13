import React from 'react'

const AddLocationForm = ({handleChange,formData}) => {
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

        <label htmlFor="link">Latitude:</label>
        <input
          type="text"
          id="latitude"
          name="location.latitude"
          value={formData?.location[0]?.latitude}
          onChange={handleChange}
          required
        />
        <label htmlFor="link">Longitude:</label>
        <input
          type="text"
          id="longitude"
          name="location.longitude"
          value={formData?.location[0]?.longitude}
          onChange={handleChange}
          required
        />
        <label htmlFor="link">Name:</label>
        <input
          type="text"
          id="name"
          name="location.name"
          value={formData?.location[0]?.name}
          onChange={handleChange}
          required
        />
        <label htmlFor="link">Address:</label>
        <input
          type="text"
          id="address"
          name="location.address"
          value={formData?.location[0]?.address}
          onChange={handleChange}
          required
        />
      </>
  )
}

export default AddLocationForm
