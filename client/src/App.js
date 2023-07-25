import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";
import About from "./components/About";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewCard from "./components/NewCard";
import Mycards from "./components/Mycards";
import Favcards from "./components/Favcards";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/about" element={<About />} />
            <Route path="/newcard" element={<NewCard />} />
            <Route path="/myCards" element={<Mycards />} />
            <Route path="/favcards" element={<Favcards />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
