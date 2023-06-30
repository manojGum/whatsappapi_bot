import React from 'react'
import { PuffLoader } from 'react-spinners';
const Loader = () => {
  return (
    <div className="loader" style={{ textAlign: 'center', marginTop: '200px', marginBlock:'200px'}}>
    <PuffLoader size="150" color="#36d7b7" loading={true} />
  </div>
  )
}

export default Loader