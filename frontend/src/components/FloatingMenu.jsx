import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function FloatingMenu() {
  const [menuActive, setMenuActive] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setMenuActive(false);
  };

  return (
    <>
      <style>{`
        .floating-menu-btn,
        .floating-menu a {
          position: fixed;
          display: grid;
          place-items: center;
          border-radius: 50%;
          z-index: 1000;
        }
        .floating-menu-btn {
          background-color: #0f1730;
          height: 80px;
          width: 80px;
          top: 15px;
          right: 15px;
          color: #ffffff;
          font-size: 32px;
          border: none;
          transition: 0.3s;
          cursor: pointer;
        }
        .floating-menu a {
          background-color: #ffffff;
          height: 60px;
          width: 60px;
          top: 25px;
          right: 25px;
          font-size: 20px;
          color: #4249ed;
          text-decoration: none;
          transition: 0.5s;
          cursor: pointer;
        }
        .floating-menu-btn.active {
          transform: rotate(45deg);
        }
      `}</style>

      <div className="floating-menu">
        <a
          onClick={() => handleNavigation('/')}
          style={{
            transform: menuActive ? 'translate(-120px, 0)' : 'translate(0, 0)'
          }}
        >
          🏠
        </a>
        <a
          onClick={() => handleNavigation('/services')}
          style={{
            transform: menuActive ? 'translate(-120px, 70px)' : 'translate(0, 0)'
          }}
        >
          💼
        </a>
        <a
          onClick={() => handleNavigation('/about')}
          style={{
            transform: menuActive ? 'translate(-70px, 120px)' : 'translate(0, 0)'
          }}
        >
          ℹ️
        </a>
        <button
          className={`floating-menu-btn ${menuActive ? 'active' : ''}`}
          onClick={toggleMenu}
        >
          +
        </button>
      </div>
    </>
  );
}

export default FloatingMenu;
