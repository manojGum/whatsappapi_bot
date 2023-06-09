import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Dashboard from "./App";

const App = () => {
    const [user, setLoginUser] = useState({})
  return (
    <Routes>
      <Route exact path="/" element={<Login setLoginUser={setLoginUser} />} />
      <Route exact path="/register" element={<Register setLoginUser={setLoginUser} />} />
      <Route exact path="/dashboard" 
       element={
        user && user.token ? (
          <Dashboard setLoginUser={setLoginUser} user={user} />
        ) : (
          <Login setLoginUser={setLoginUser} />
        )
       } />
    </Routes>
  );
};

export default App;
