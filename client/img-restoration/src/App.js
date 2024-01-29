import React from "react";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Home from "./Home";
import Signin from "./Signin";
import Signup from "./Signup";
function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/SignUp" element={<Signup/>} />
      <Route path="/SignIn" element={<Signin/>} />
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
