import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './Components/Login'
import Register from './Components/Register'
import HomePages from './Pages/HomePages'
import AddDataPages from './Pages/AddDataPage'
import ReadPages from './Pages/ReadPages'
import UpdatePages from './Pages/UpdatePages'

const App = () => {
  const storedData = localStorage.getItem('userData');
  const parsedData = JSON.parse(storedData);
  // console.log("...................",parsedData)

  const [user, setLoginUser] = useState(parsedData)
  return (
    <>
        <Routes>
                  <Route
                    exact
                    path={"/addinfo"}
                    element={
                      user && user.token ? (
                        <AddDataPages setLoginUser={setLoginUser} user={user} />
                      ) : (
                        <Login setLoginUser={setLoginUser} />
                      )
                    }
                  />
                  <Route
                    // exact
                    path="/register"
                    element={<Register setLoginUser={setLoginUser} />}
                  />
                   <Route
                    // exact
                    path="/"
                    element={<Login setLoginUser={setLoginUser} />}
                  />
                   <Route
                    // exact
                    path="/home"
                   
                    element={
                      user && user.token ? (
                        <HomePages setLoginUser={setLoginUser} user={user} />
                      ) : (
                        <Login setLoginUser={setLoginUser} />
                      )
                    }
                  />
                   <Route
                    // exact
                    path="/read/:id"
                    element={<ReadPages  setLoginUser={setLoginUser} user={user}  />}
                  />
                     <Route
                    exact
                    path="/edit/:id"
                    element={<UpdatePages setLoginUser={setLoginUser} user={user} />}
                  />
                </Routes>
    </>
  )
}

export default App