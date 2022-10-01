
import './App.css';
import Login from "./component/Login";
import Signup from "./component/Signup";
import ViewAcademy from "./component/ViewAcademy";
import Adminacademy from "./component/Adminacademy";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"

function App() {
  return (
    <div className="App">
     <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Signup />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/viewAcademy" element={<ViewAcademy/>}/>  
            <Route path="/adminacademy" element={<Adminacademy/>}/>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
