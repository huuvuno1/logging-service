import {
  Routes,
  Route,
} from "react-router-dom";
import './App.css';
import Home from './pages/Home';
import Login from "./pages/Login";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/*" element={<Home />} />
    </Routes>
  );
}

export default App;
