// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// const Home = ({ user, setLoginUser }) => {
//   const [data, setData] = useState([]);
//   const [counter, setCounter] = useState(0);
//   const [loading, setLoading] = useState(false);
//   useEffect(() => {
//     axios
//       .get("http://localhost:5656/addinfo")
//       .then((res) => {
//         let arr = [...res.data];
//         let arr1 = [];
//         for (let i = arr.length - 1; i >= 0; i--) {
//           arr1.push(arr[i]);
//         }

//         setData(arr1);
//         setLoading(true);
//       })
//       .catch((err) => {
//         setLoading(false);
//         console.log(err);
//       });
//   }, [counter]);
//   const handleDelete = (id) => {
//     axios
//       .delete(`http://localhost:5656/addinfo/${id}`)
//       .then((res) => {
//         setCounter(counter + 1);
//       })
//       .catch((err) => console.log(err));
//   };
//   return (
//     <div className="d-flex vh-100 bg-white justify-content-center align-item-center">
//       <div className="bg-white">
//         {loading && (
//           <>
//             <div className="d-flex justify-content-between mb-3">
//               <h2 className="m-0">Data List</h2>
//               <Link to="/addinfo" className="btn btn-success">
//                 {" "}
//                 + Create
//               </Link>
//             </div>
//             <table className="table table-striped">
//               <thead>
//                 <tr>
//                   <th style={{ width: "20%" }}>Question</th>
//                   <th style={{ width: "40%" }}>Answer</th>
//                   {/* <th>Buttons</th> */}
//                   <th>InfoType</th>
//                   {/* <th>List</th> */}
//                   <th></th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {data.map((student, index) => {
//                   return (
//                     <tr key={student._id}>
//                       <td>{student.question}</td>
//                       <td>
//                         <span className="d-flex ">
//                           {student.answer.text ? (
//                             <span>{student.answer.text}</span>
//                           ) : (
//                             <>{student.answer.text}</>
//                           )}
//                         </span>
//                       </td>
//                       {/* <td>{student.buttons.responsetext}</td> */}
//                       <td>{student.infoType.infoType}</td>
//                       {/* <td>{student.list.responsetext}</td> */}
//                       <td>
//                         <div className="d-flex">
//                           <Link
//                             to={`/read/${student._id}`}
//                             className="btn btn-sm btn-link"
//                           >
//                             <i
//                               className="fa fa-eye text-primary"
//                               aria-hidden="true"
//                             ></i>
//                           </Link>
//                           <Link
//                             to={`/edit/${student._id}`}
//                             className="btn btn-sm btn-link mx-2"
//                           >
//                             <i
//                               className="fa fa-pencil-square-o text-success"
//                               aria-hidden="true"
//                             ></i>
//                           </Link>
//                           <button
//                             onClick={() => handleDelete(student._id)}
//                             className="btn btn-sm btn-link"
//                           >
//                             <i
//                               className="fa fa-trash-o text-danger"
//                               aria-hidden="true"
//                             ></i>
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Home;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = ({ user, setLoginUser }) => {
  const [data, setData] = useState([]);
  const [counter, setCounter] = useState(0);
  const [loading, setLoading] = useState(false);
  const [filterValue, setFilterValue] = useState("text");

  useEffect(() => {
    axios
      .get("http://localhost:5656/addinfo")
      .then((res) => {
        let arr = [...res.data];
        let arr1 = [];
        for (let i = arr.length - 1; i >= 0; i--) {
          arr1.push(arr[i]);
        }

        setData(arr1);
        setLoading(true);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, [counter]);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5656/addinfo/${id}`)
      .then((res) => {
        setCounter(counter + 1);
      })
      .catch((err) => console.log(err));
  };

  const filteredData = data.filter(
    (student) => student.infoType.infoType === filterValue
  );

  return (
    <>
    <div className="progress" style={{height:"1.2rem"}}>
        <div className="progress-bar" style={{width:`${filteredData.length}%`,height:"1.2rem"}}>{filteredData.length}%</div>
      </div>
    <div className="d-flex vh-100 bg-white justify-content-center align-item-center">
      <div className="bg-white">
        {loading && (
          <>
            <div className="d-flex justify-content-between mb-3">
              <h2 className="m-0">Data List</h2>
              <Link to="/addinfo" className="btn btn-success">
                {" "}
                + Create
              </Link>
            </div>

            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th style={{ width: "30rem" }}>Question</th>
                  <th>
                    <select
                      value={filterValue}
                      onChange={(e) => setFilterValue(e.target.value)}
                      style={{
                        paddingRight: "5rem",
                        width: "20rem",
                        height: "100%",
                        border: "0.001px solid green",
                      }}
                    >
                      {/* <option value="">Select Answer Type</option> */}
                      {Array.from(
                        new Set(
                          data.map((student) => student.infoType.infoType)
                        )
                      ).map((infoType) => (
                        <option key={infoType} value={infoType}>
                          {infoType}
                        </option>
                      ))}
                    </select>
                  </th>
                  <th>InfoType</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((student, index) => {
                  let answerContent;
                  switch (student.infoType.infoType) {
                    case "text":
                      answerContent = student.answer.text;
                      break;
                    case "list":
                      answerContent = student.list.buttonslist.map((list) => (
                        <div key={list._id}>
                          <ul>
                            <li>
                              {list.title}
                              {/* <ul>
                                <li>{button.description}</li>
                              </ul> */}
                            </li>
                          </ul>
                        </div>
                      ));
                      break;
                    case "button":
                      answerContent = student.buttons.buttonslist.map(
                        (button) => (
                          <div key={button._id}>
                            <ul>
                              <li>{button.title}</li>
                            </ul>
                          </div>
                        )
                      );
                      break;
                    case "link":
                      answerContent = student.answer.link;
                      break;
                    case "document":
                      answerContent = <div>{student.answer.link}</div>;
                      break;
                    case "image":
                      answerContent = <div>{student.answer.link}</div>;
                      break;

                    default:
                      answerContent = "";
                      break;
                  }

                  return (
                    <tr key={student._id}>
                      <td>{student.question}</td>
                      <td
                        style={{
                          width: "80rem",
                        }}
                      >
                        <span>{answerContent}</span>
                      </td>
                      <td>{student.infoType.infoType}</td>
                      <td>
                        <div className="d-flex">
                          <Link
                            to={`/read/${student._id}`}
                            className="btn btn-sm btn-link"
                          >
                            <i
                              className="fa fa-eye text-primary"
                              aria-hidden="true"
                            ></i>
                          </Link>
                          <Link
                            to={`/edit/${student._id}`}
                            className="btn btn-sm btn-link mx-2"
                          >
                            <i
                              className="fa fa-pencil-square-o text-success"
                              aria-hidden="true"
                            ></i>
                          </Link>
                          <button
                            onClick={() => handleDelete(student._id)}
                            className="btn btn-sm btn-link"
                          >
                            <i
                              className="fa fa-trash-o text-danger"
                              aria-hidden="true"
                            ></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
    </>
  );
};

export default Home;
