import React from 'react';

const ElectricCard = ({ member }) => {
  return (
    <div className="electric-card-wrapper">
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id="turbulent-displace" colorInterpolationFilters="sRGB" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise1" seed="1" />
            <feOffset in="noise1" dx="0" dy="0" result="offsetNoise1">
              <animate attributeName="dy" values="700; 0" dur="6s" repeatCount="indefinite" calcMode="linear" />
            </feOffset>
            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise2" seed="1" />
            <feOffset in="noise2" dx="0" dy="0" result="offsetNoise2">
              <animate attributeName="dy" values="0; -700" dur="6s" repeatCount="indefinite" calcMode="linear" />
            </feOffset>
            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise1" seed="2" />
            <feOffset in="noise1" dx="0" dy="0" result="offsetNoise3">
              <animate attributeName="dx" values="490; 0" dur="6s" repeatCount="indefinite" calcMode="linear" />
            </feOffset>
            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise2" seed="2" />
            <feOffset in="noise2" dx="0" dy="0" result="offsetNoise4">
              <animate attributeName="dx" values="0; -490" dur="6s" repeatCount="indefinite" calcMode="linear" />
            </feOffset>
            <feComposite in="offsetNoise1" in2="offsetNoise2" result="part1" />
            <feComposite in="offsetNoise3" in2="offsetNoise4" result="part2" />
            <feBlend in="part1" in2="part2" mode="color-dodge" result="combinedNoise" />
            <feDisplacementMap in="SourceGraphic" in2="combinedNoise" scale="30" xChannelSelector="R" yChannelSelector="B" />
          </filter>
        </defs>
      </svg>

      <style>{`
        .electric-card-wrapper {
          padding: 2px;
          border-radius: 24px;
          position: relative;
          background: linear-gradient(-30deg, rgba(99, 72, 221, 0.4), transparent, rgba(99, 72, 221, 0.4)),
                      linear-gradient(to bottom, rgb(23, 23, 23), rgb(23, 23, 23));
        }
        .electric-inner {
          position: relative;
        }
        .electric-border-outer {
          border: 2px solid rgba(72, 87, 221, 0.5);
          border-radius: 24px;
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          filter: url(#turbulent-displace);
          pointer-events: none;
        }
        .electric-main-card {
          width: 280px;
          height: 380px;
          border-radius: 24px;
          overflow: hidden;
          position: relative;
          background: black;
        }
        .electric-glow-1 {
          border: 2px solid rgba(221, 132, 72, 0.6);
          border-radius: 24px;
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          filter: blur(1px);
          pointer-events: none;
        }
        .electric-glow-2 {
          border: 2px solid #8b7aff;
          border-radius: 24px;
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          filter: blur(4px);
          pointer-events: none;
        }
        .electric-overlay {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          border-radius: 24px;
          opacity: 0.7;
          mix-blend-mode: overlay;
          transform: scale(1.1);
          filter: blur(16px);
          background: linear-gradient(-30deg, white, transparent 30%, transparent 70%, white);
          pointer-events: none;
        }
        .electric-bg-glow {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          border-radius: 24px;
          filter: blur(32px);
          transform: scale(1.1);
          opacity: 0.3;
          z-index: -1;
          background: linear-gradient(-30deg, #8b7aff, transparent, #6348dd);
          pointer-events: none;
        }
        .electric-content {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          pointer-events: none;
        }
        .electric-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .electric-info {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.9), transparent);
          padding: 20px;
          text-align: center;
        }
        .electric-name {
          color: white;
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 5px;
        }
        .electric-role {
          color: rgba(255,255,255,0.7);
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
      `}</style>

      <div className="electric-inner">
        <div className="electric-main-card">
          <img src={member.image} alt={member.name} className="electric-image" />
          <div className="electric-info">
            <div className="electric-name">{member.name}</div>
            <div className="electric-role">{member.role}</div>
          </div>
        </div>
        <div className="electric-border-outer"></div>
        <div className="electric-glow-1"></div>
        <div className="electric-glow-2"></div>
      </div>
      <div className="electric-overlay"></div>
      <div className="electric-bg-glow"></div>
    </div>
  );
};

export default ElectricCard;
