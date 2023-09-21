// import React from 'react';
// import playStore from "../../../images/playstore.png";
// import appStore from "../../../images/Appstore.png";
// import "./Footer.css";
// import { FaInstagram, FaGithub, FaLinkedinIn} from "react-icons/fa";

// const Footer = () => {
//     return(
//         <footer id = "footer">
//             <div className = "leftFooter">
//                 <h4>Download Our App</h4>
//                 {/* <p>Coming Soon</p> */}
//                 <img src={playStore} alt="playStore" />
//                 <img src={appStore} alt="appStore" />
//             </div>
//             <div className = "middleFooter">
//                 <h1>Cart Bliss</h1>
//                 <p>Save more with us!</p>
//                 <p> Copyrights &copy; Anmol</p>
//             </div>
//             <div className = "rightFooter">
//                 <h4>Follow US</h4>
//                 <a href = "https://www.instagram.com/anmolchouhann/" target = "_blank" rel = "noreferrer" ><FaInstagram/></a>
//             <a href = "https://www.linkedin.com/anmolchouhan/" target = "_blank" rel = "noreferrer"><FaLinkedinIn/></a>
//             <a href = "https://github.com/chouhananmol" target = "_blank" rel = "noreferrer"><FaGithub/></a>
//             </div>

//         </footer>
//     );
// };

// export default Footer;



// Footer.js
import React from 'react';
import './Footer.css'; // Import the CSS module for styling
import {
  FaLinkedin,
  FaGithub,
  FaInstagram,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function Footer() {

  const navigate = useNavigate();

  const navigateHome = () => {
    navigate('/');
  }

  const navigateSearch = () => {
    navigate('/search');
  }

  const navigateAbout = () => {
    navigate('/about');
  }
  const navigateContact = () => {
    navigate('/contact');
  }



  return (
    <footer className="footer-distributed">
      <div className="footer-right">
        <a href="https://github.com/chouhananmol"><FaGithub className="icon" /></a>
        <a href="https://www.linkedin.com/in/anmolchouhan/"><FaLinkedin className="icon" /></a>
        <a href="https://www.instagram.com/anmolchouhann"><FaInstagram className="icon" /></a>
      </div>
      <div className="footer-left">
        <p className="footer-links">
          <a href='' onClick={navigateHome}>Home</a>
          <a href='' onClick={navigateAbout}>About</a>
          <a href='' onClick={navigateContact}>Contact</a>
          <a href='' onClick={navigateSearch}>Search</a>
        </p>
        <div className='footer-company-name'>
          <p>Cart Bliss &copy; 2023</p>
          <p>Made with ❤️</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
