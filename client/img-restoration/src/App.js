import React from "react";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Signin from "./Signin";
import Signup from "./Signup";
import Info from "./Info";
import Profile from "./Profile";
import Collage from "./Collage";
import Phone from "./Phone";
import Restore from "./Restore";
import Denoising from "./Denoising";
import Impaint from "./Impaint";
import Verify from "./Verify";
import { AuthContextProvider } from "./Context/AuthContext";
import ProtectedRoute from "./ProtectedRoute";
// import Demo from "./demo";
function App() {
  return (
    <div className="App">
      <AuthContextProvider>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Signup/>} />
      <Route path="/SignIn" element={<Signin/>} />
      <Route path="/Info" element={<ProtectedRoute><Info/></ProtectedRoute>}/>
      <Route path="/Profile" element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
      <Route path="/Collage" element={<ProtectedRoute><Collage/></ProtectedRoute>} />
      <Route path="/Phone" element={<Phone/>} />
      <Route path="/Restore" element={<ProtectedRoute><Restore/></ProtectedRoute>}/>
      <Route path="/Denoising" element={<ProtectedRoute><Denoising/></ProtectedRoute>}/>
      <Route path="/Impaint" element={<Impaint/>}></Route>
      <Route path="/Verify" element={<Verify/>}></Route>
    </Routes>
    </BrowserRouter>
    </AuthContextProvider>
    </div>
  );
}

export default App;
