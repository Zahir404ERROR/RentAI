import './App.css';
import About from './pages/About.js';
import Heatmap from './pages/Heatmap.js';
import Comparison from './pages/Comparison.js';
import ContactUs from './pages/ContactUs.js';
import Home from './pages/home/Home.js';
import Login from './pages/Login.js';
import Register from './pages/Register.js';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/heatmap" element={<Heatmap />} />
          <Route path="/comparison" element={<Comparison />} />
          <Route path="/ContactUs" element={<ContactUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <Footer />
      </Router>
      
    </div>
  );
}




export default App;
