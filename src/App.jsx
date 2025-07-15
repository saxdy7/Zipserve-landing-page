import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import './App.css'
import './components/menuoptions.jsx'
import MenuOptions from './components/menuoptions.jsx'
import MovingText from './components/Movingtext.jsx'
import Features from './pages/Features.jsx'
import { Cursor } from './components/Cursor.js'
import Benefits from './pages/Benefits.jsx'
import './index.jsx'
import Footer from './pages/footer.jsx'
import Contact from './pages/Contact'
// import Home from './pages/Home' // Ensure this file exists
import About from './pages/About'

// Create a separate component for the home page content
function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [cursorHover, setCursorHover] = useState(false);
  const navigate = useNavigate(); // Use useNavigate hook here
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }
  
  return (
    <div>
      <div className="company-name">Zipserve</div>
      <div className="year-name">©2025</div>
      <button className="sign-in-button" onClick={() => navigate('/sign-in')}>
        <span>SIGN IN</span>
      </button>
      <button className="menu-button" onClick={toggleMenu}>MENU</button>
      <div className={`menu-container ${menuOpen ? 'open' : ''}`}>
        <button className="close-button" onClick={toggleMenu}>CLOSE</button>
        <MenuOptions/>
      </div>
      <div className="content">
        <h1 className="zipserve-title">Zipserve</h1>
        <p>
          Introducing India's pioneering Smart Work Booking Application,<br/>Empowering Trust and Digitilizing the Workforce
        </p>
        <h2>Smart Work<br/>Smarter Hiring!</h2>
      </div>
      <div className="menu-email">
        <span className="magnetic">zipserve@gmail.com</span>
      </div>
      
      <button className="contact-button" onClick={() => navigate('/contact')}>
        <span>Contact Us</span>
      </button>
      <div className="moving-text">
        <MovingText/>
        <Features/>
        <Benefits/>
        <Footer/>
      </div>  
      <Cursor isHovering={cursorHover} />
    </div>
  )
}

function App() {
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          setLoading(false);
          clearInterval(timer);
          return 100;
        }
        return prev + 1;
      });
    }, 20);
    return () => clearInterval(timer);
  }, []);
  
  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
        {loadingProgress}%
      </div>
    );
  }
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/features" element={<Features />} />
        <Route path="/benefits" element={<Benefits />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App