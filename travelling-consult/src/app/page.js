'use client';
import { useState, useEffect } from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaBars, FaRegWindowClose } from 'react-icons/fa';
import './landing.css';

const slides = [
  {
    image: '/images/Accra.jpg', 
    heading: 'Fly Locally in Ghana',
    text: 'Travel between Accra and Kumasi effortlessly with our reliable and convenient local flight services. Enjoy a seamless journey within Ghana with our top-notch service.'
  },
  {
    image: '/images/Germany1.jpg', 
    heading: 'Discover Germany',
    text: 'Experience the rich culture and history of Germany. Our flights offer you a chance to explore cities like Berlin, Munich, and Hamburg with ease and comfort.'
  },
  {
    image: '/images/USA2.jpg', 
    heading: 'Explore the USA',
    text: 'From the bustling streets of New York City to the sunny beaches of California, our flights take you to top destinations across the USA. Enjoy a wide range of travel options and services.'
  },
  {
    image: '/images/UK3.jpg', 
    heading: 'Visit the UK',
    text: 'Discover the charm of the United Kingdom with our flights to London, Edinburgh, and more. Enjoy a comfortable journey and explore historic sites, modern attractions, and beautiful landscapes.'
  },
];

export default function Home() {

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 20000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className="landing" style={{ backgroundImage: `url(${slides[currentIndex].image})` }}>
      <div className="header">
        <div className="header-left">
          <div className="menu" onClick={toggleSidebar}>
            <FaBars />
          </div>
          <div className="Logo">
            <p>ErnestLinks!</p> {/* Update company name */}
            <p className="slogan">Book Your Next Flight</p>
          </div>
        </div>
        <div className="tabs">
          <a href="#">Book Flight</a>
          <a href="#">Manage Booking</a>
          <a href="#">Destinations</a>
          <a href="#">Contact Us</a>
        </div>
        <div className="auth">
          <a href="/sign-in"><button className="login">Login</button></a>
          <a href="/sign-up"><button className="signup">Sign Up</button></a>
        </div>
      </div>
      <div className={`sidebar ${isSidebarVisible ? 'visible' : ''}`}>
        <div className="top">
          <div className="Logo">
            <p>FlyHigh!</p> {/* Update company name */}
            <p className="slogan">Book Your Next Flight</p>
          </div>
          <FaRegWindowClose onClick={toggleSidebar}/>
        </div>
        <div className="items">
          <ul>
            <li>Book Flight</li>
            <li>Manage Booking</li>
            <li>Destinations</li>
            <li>Contact Us</li>
          </ul>
        </div>
      </div>
      <div className="content">
        <div className="before-center">
          <div className="description">
            <h2>{slides[currentIndex].heading}</h2>
            <p>{slides[currentIndex].text}</p>
          </div>
          <div className="socials">
            <FaFacebook />
            <FaInstagram />
            <FaTwitter />
            <FaLinkedin />
          </div>
        </div>
        <div className="center">
          <p>Providing <span>Seamless</span> Flight <span>Experiences</span></p>
        </div>
        <div className="after-center">
          <div className="after-center-left">
            <h2>Our Services:</h2>
            <div className="facilities">
              <p>Flight Booking</p>
              <p>Flight Management</p>
              <p>Customer Support</p>
              <p>Special Offers</p>
              <p>Travel Insurance</p>
              <p>Travel Assistance</p>
              <p>Online Check-In</p>
            </div> 
          </div>
          <div className="after-center-right">
            <a href="/sign-up">Book a Flight &#8599;</a>
            <p>Find the perfect flight for your next journey with our easy-to-use booking system.</p>
          </div>
        </div>
      </div>
      <button className="arrowLeft" onClick={prevSlide}>
        &#8592;
      </button>
      <button className="arrowRight" onClick={nextSlide}>
        &#8594;
      </button>
    </div>
  );
}
