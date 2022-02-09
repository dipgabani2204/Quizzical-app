import './App.css';
import Home from "./components/Home"
import Main from "./components/Main"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/questions" element={<Main />} />
      </Routes>
    </Router>
  );
}

export default App;
