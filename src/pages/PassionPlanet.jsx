import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa';
import { useSound } from '../context/SoundContext';
import styles from '../css/Passion.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeHigh, faVolumeXmark } from '@fortawesome/free-solid-svg-icons';

function SoundToggle() {
  const { toggleSound, isPlaying } = useSound();
  return (
    <button 
      onClick={toggleSound} 
      className={`${styles['sound-toggle-btn']} ${isPlaying ? 'playing' : ''}`}
      title={isPlaying ? "Tắt nhạc nền" : "Bật nhạc nền"}
    >
      <FontAwesomeIcon 
        icon={isPlaying ? faVolumeHigh : faVolumeXmark} 
        style={{ color: "white" }} 
        // Sửa lỗi: Gọi class SVG qua styles
        className={styles['sound-icon-svg']} 
      />
    </button>
  );
}

const starData = {
  s1: { x: 400, y: 70, label: "Gaming" },
  s2: { x: 430, y: 100, label: "Watching streams" },
  s3: { x: 430, y: 150, label: "Watching movies" },
  s4: { x: 430, y: 200, label: "Anime" },

  s5: { x: 432, y: 230, label: "Listening to music" },
  s6: { x: 300, y: 200, label: "Rap" },
  s7: { x: 265, y: 210, label: "Singing" },
  s8: { x: 230, y: 240, label: "Fashion" },

  s9: { x: 180, y: 380, label: "Sleeping" },
  s10: { x: 160, y: 430, label: "Playing with cats" },
  s11: { x: 140, y: 480, label: "Culinary Exploration" },
  s12: { x: 90, y: 490, label: "Collecting" },

  s13: { x: 40, y: 470, label: "Hanging Out" },
  s14: { x: 5, y: 410, label: "Shopping" },
  s15: { x: 35, y: 380, label: "Exploring" },
  s16: { x: 70, y: 330, label: "Traveling" }
};

export function PassionPlanet() {
  const navigate = useNavigate();
  const { playNewTrack, stopMusic } = useSound();
  const [activeStar, setActiveStar] = useState(null);
  
    useEffect(() => {
      playNewTrack(`${import.meta.env.BASE_URL}PlanetBackgroundSoundTrack/`);

      return () => {
        stopMusic(); 
      };
    }, [])
  
  const handleStarClick = (starKey) => {
    // Nếu đang bấm ở sao này mà bấm lại -> Thu nhỏ về ban đầu
    if (activeStar === starKey) {
      setActiveStar(null);
    } else {
      setActiveStar(starKey);
    }
  };

  const scale = 2.5;
  const targetX = activeStar ? (245 - starData[activeStar].x) : 0;
  const targetY = activeStar ? (260 - starData[activeStar].y) : 0;
  
  return (
    <div className="planet-page-container">
      {/* 1. ĐÂY LÀ PHẦN VIDEO BACKGROUND */}
      <SoundToggle />
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="background-video"
      >
        <source src={`${import.meta.env.BASE_URL}PlanetBackground/PassionBg.mp4`} type="video/mp4" />
      </video>

      {/* Lớp phủ mờ (tùy chọn) giúp chữ nổi bật hơn trên nền video */}
      <div className="video-overlay"></div>
      <div className="profile-header">
        <img
          src={`${import.meta.env.BASE_URL}Avatar2.jpg`}
          alt="Avatar Vương Tuấn Kiệt"
          className="profile-avatar"
        />
        <div className="profile-info">
          <h1>Keit</h1>
          <p>Porfolio Website</p>
        </div>
      </div>
      {/* ==============================================
          BẢN ĐỒ CHÒM SAO CÓ HIỆU ỨNG ZOOM MƯỢT
          ============================================== */}
     <div 
        className={styles['constellation-wrapper']}
        style={{
          /* Dùng translate để di chuyển sao về tâm.
             scale để phóng to.
             Không dùng transform-origin để tránh bị giật.
          */
          transform: activeStar 
            ? `scale(${scale}) translate(${targetX}px, ${targetY}px)` 
            : 'scale(1) translate(0px, 0px)',
          transition: 'transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)' 
        }}
      >
        <svg viewBox="0 0 500 550" className={styles['constellation-svg']}>
          {/* CÁC ĐƯỜNG NỐI */}
          <polyline points="400,70 430,100 430,200 432,230" className={styles['constellation-line']} /> 
          <polyline points="430,150 300,200 265,210 230,240 180,380 160,430 140,480" className={styles['constellation-line']} /> 
          <polyline points="140,480 90,490 40,470 5,410 35,380 70,330" className={styles['constellation-line']} />

          {Object.entries(starData).map(([key, data]) => {
            
            // LOGIC MỚI: Nếu sao nằm sát lề phải (x > 350) -> lật chữ sang trái
            const isRightEdge = data.x > 350;

            return (
              <g 
                key={key} 
                className={`${styles['interactive-group']} ${activeStar === key ? styles['active'] : ''}`}
                onClick={(e) => {
                  e.stopPropagation(); 
                  handleStarClick(key);
                }}
              >
                <g transform={`translate(${data.x}, ${data.y})`}>
                <path 
                  d="M 0 -8 L 2.3 -2.3 L 8 0 L 2.3 2.3 L 0 8 L -2.3 2.3 L -8 0 L -2.3 -2.3 Z"
                  className={styles['star-dot-main']} 
                />
                </g>
                {/* Áp dụng lật chữ thông minh */}
                <text 
                  x={isRightEdge ? data.x - 15 : data.x + 15} 
                  y={data.y + 4} 
                  textAnchor={isRightEdge ? "end" : "start"} 
                  className={styles['star-label']}
                >
                  {data.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}

export default PassionPlanet;