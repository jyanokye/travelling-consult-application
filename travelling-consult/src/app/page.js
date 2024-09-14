'use client';
import Image from "next/image";
import { useState, useEffect } from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaBars, FaRegWindowClose  } from 'react-icons/fa';
import { RiArrowRightUpLine } from "react-icons/ri";
import './landing.css';

const slides = [
  {
    image: '/images/Nzulezu.webp',
    heading: 'Nzulezu',
    text: 'Nzulezu is renowned for its unique stilted architecture, as the entire village is built over the water on Lake Tadane, creating a breathtaking and culturally rich experience.'
  },
  {
    image: '/images/mole.jpg',
    heading: 'Mole National Park',
    text: 'Mole National Park offers an incredible wildlife experience, where visitors can see elephants, antelopes, and other animals up close during guided walking safaris in their natural habitat.'
  },
  {
    image: '/images/bui.jpg',
    heading: 'Bui National Park',
    text: 'Bui National Park is famous for its stunning scenery along the Black Volta River, where visitors can witness hippos in their natural habitat while also exploring a rich variety of wildlife and bird species.'
  },
  {
    image: '/images/elmina.jpg',
    heading: 'Elmina Castle',
    text: 'Elmina Castle, the oldest European building in sub-Saharan Africa, holds a haunting yet captivating history as a key fortress in the transatlantic slave trade, where thousands of enslaved Africans were imprisoned before being shipped across the Atlantic.'
  },
  {
    image: '/images/lara-banga.jpg',
    heading: 'Larabanga Mosque',
    text: 'Larabanga Mosque, one of the oldest mosques in West Africa, is a striking example of Sudanese-style architecture and holds deep historical and spiritual significance, dating back to the 15th century.'
  },
]

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
            <p>oExplore!</p>
            <p className="slogan">Tour Ghana with us</p>
          </div>
        </div>
        <div className="tabs">
          <a>Tours</a>
          <a>About Us</a>
          <a>Gallery</a>
          <a>Contact</a>
        </div>
        <div className="auth">
          <a href="/sign-in"><button className="login">Login</button></a>
          <a href="/sign-up"><button className="signup">Sign Up</button></a>
        </div>
      </div>
      <div className={`sidebar ${isSidebarVisible ? 'visible' : ''}`}>
        <div className="top">
          <div className="Logo">
            <p>oExplore!</p>
            <p className="slogan">Tour Ghana with us</p>
          </div>
          <FaRegWindowClose onClick={toggleSidebar}/>
        </div>
        <div className="items">
          <ul>
            <li>Tours</li>
            <li>About Us</li>
            <li>Gallery</li>
            <li>Contact</li>
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
          <p>Crafting <span>Memories</span> Not <span>Just</span> Trips</p>
        </div>
        <div className="after-center">
          <div className="after-center-left">
            <h2>The facilities we provide:</h2>
            <div className="facilities">
              <p>Tour guide</p>
              <p>Travel Packages</p>
              <p>Accomodation</p>
              <p>Transportation</p>
              <p>Food</p>
              <p>Insurance</p>
              <p>Online Ordering</p>
            </div> 
          </div>
          <div className="after-center-right">
            <a href="#">Consultation &#8599;</a>
            <p>Speak to a member of our team to help you plan an awesome and fun-filled trip</p>
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