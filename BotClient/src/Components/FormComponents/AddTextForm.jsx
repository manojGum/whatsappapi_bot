
const AddTextForm = ({ handleChange, formData }) => {
 
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
        <div className="sm" style={{
            display: "flex",
            marginBottom: "-3px",
            width:"32%",
            marginLeft:"60%"
      }}>
        <label htmlFor="inthub" style={{width:"92%"}}>INTHUB :-</label>
        <input
          type="checkbox"
          id="inthub"
          name="inthub"
          style={{height: "3vh"}}
          value="true"
          onChange={(e)=>handleChange(e)}
        />
      </div>
{formData.inthub===false ? <> <label htmlFor="text">Text :- </label>
      <input
        type="text"
        id="text"
        name="answer.text"
        value={formData?.answer[0]?.text}
        onChange={handleChange}
        required
      /> </>:null}
     
      
    </>
  );
};

export default AddTextForm;
