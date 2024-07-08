import './HomePage.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [input, setInput] = useState('');
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    setIsMobile(mq.matches);
    mq.addEventListener("change", () => {
      setIsMobile(mq.matches);
    });
  }, []);

  const submitHandler = () => {
    if (!isMobile) {
      navigate(`/room/${input}`);
    } else {
      alert("This page is only accessible on desktop devices.");
    }
  };

  return (
    <div className="home-page">
      <div className="container">
        <h1 className="title">Welcome to Video Chat Room</h1>
        <div className="input-container">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Enter your name"
            className="input-field"
          />
          <button onClick={submitHandler} className="join-btn">
            Join
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
