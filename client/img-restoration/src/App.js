import React from "react";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Home from "./Home";
import Signin from "./Signin";
import Signup from "./Signup";
import Info from "./Info";
import Profile from "./Profile";
function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/SignUp" element={<Signup/>} />
      <Route path="/SignIn" element={<Signin/>} />
      <Route path="/Info" element={<Info/>} />
      <Route path="/Profile" element={<Profile/>} />
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
