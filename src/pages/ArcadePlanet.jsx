import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa';
import { useSound } from '../context/SoundContext';
import styles from '../css/Arcade.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeHigh, faVolumeXmark, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

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

const gameLinks = [
  { 
    id: 'steam', 
    name: "Steam",
    description: "Keit", 
    logo: `${import.meta.env.BASE_URL}Logo/Steam.png`, // Đổi tên file logo của cậu vào đây
    url: "https://steamcommunity.com/profiles/76561199126784080/" 
  },
  { 
    id: 'valorant', 
    name: "Valorant",
    description: "Keit#1217",  
    logo: `${import.meta.env.BASE_URL}Logo/Valorant.jpg`, // Đổi tên file logo của cậu vào đây
    url: "https://tracker.gg/valorant/profile/riot/Keit%231217" 
  },
  { 
    id: 'lol', 
    name: "League of Legends", 
    description: "Go YounJungggg#2204", 
    logo: `${import.meta.env.BASE_URL}Logo/LOL.png`, 
    url: "https://op.gg/vi/lol/summoners/VN/Go%20YounJungggg-2204" 
  },
  { 
    id: 'tft', 
    name: "Teamfight Tactics", 
    description: "Go YounJungggg#2204",
    logo: `${import.meta.env.BASE_URL}Logo/TFT.png`, 
    url: "https://op.gg/vi/tft/summoners/vn/Go%20YounJungggg-2204" 
  },
  { 
    id: 'fc', 
    name: "FC Online",
    description: "PPxGo YounJung", 
    logo: `${import.meta.env.BASE_URL}Logo/FC.png`, 
  },
];

export function ArcadePlanet() {
  const navigate = useNavigate();
  const { playNewTrack, stopMusic } = useSound();
      const [activeStar, setActiveStar] = useState(null);
    
      useEffect(() => {
        playNewTrack(`${import.meta.env.BASE_URL}PlanetBackgroundSoundTrack/ArcadeBgSound.mp3`);
    
        return () => {
          stopMusic();
        };
      }, [])

  const [currentIndex, setCurrentIndex] = useState(0);

  // Hàm lùi game (nút Lên / Trái)
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? gameLinks.length - 1 : prev - 1));
  };

  // Hàm tiến game (nút Xuống / Phải)
  const handleNext = () => {
    setCurrentIndex((prev) => (prev === gameLinks.length - 1 ? 0 : prev + 1));
  };

  const activeGame = gameLinks[currentIndex];
  return (
    <div className="planet-page-container">
      {/* 1. ĐÂY LÀ PHẦN VIDEO BACKGROUND */}
      <SoundToggle/>
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="background-video"
      >
        <source src={`${import.meta.env.BASE_URL}PlanetBackground/ArcadeBg.mp4`} type="video/mp4" />
      </video>

      {/* Lớp phủ mờ (tùy chọn) giúp chữ nổi bật hơn trên nền video */}
      <div className="video-overlay"></div>
       <div className={styles['profile-header']}>
              <button 
                className={styles['back-btn']} 
                onClick={() => navigate('/')} 
                title="Return to Keit Universe"
              >
                <FontAwesomeIcon icon={faChevronLeft} />
                <span>Keit Universe</span>
              </button>
            </div>
      {/* --- THÙNG MÁY ARCADE --- */}
      <div className={styles['arcade-cabinet']}>
        
        {/* Bảng hiệu */}
        <div className={styles['arcade-marquee']}>
          <h1 className={styles['glitch-title']}>JOYFUL</h1>
        </div>

        {/* MÀN HÌNH HIỂN THỊ CHỨA DANH SÁCH GAME (CÓ THỂ CUỘN) */}
        <div className={styles['arcade-screen-bezel']}>
          <div className={styles['arcade-screen']}>
            <div className={styles['scanlines']}></div> {/* Hiệu ứng CRT */}
            
            <div className={styles['screen-content-list']}>
              {gameLinks.map((link) => (
                <a 
                  key={link.id} 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles['cyber-link-btn']}
                >
                  <div className={styles['link-btn-content']}>
                    <div className={styles['link-logo-box']}>
                      <img src={link.logo} alt={link.name} className={styles['game-logo']} />
                    </div>
                    <div className={styles['text-content']}>
                      <span className={styles['btn-name']}>{link.name}</span>
                      <span className={styles['btn-desc']}>{link.description}</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* --- BẢNG ĐIỀU KHIỂN TƯỢNG TRƯNG (CONTROL PANEL) --- */}
        <div className={styles['arcade-control-panel']}>
          
          {/* JOYSTICK (Bên trái, tượng trưng) */}
          <div className={styles['joystick-wrapper']}>
            <div className={styles['joystick-base']}></div>
            <div className={styles['joystick-shaft']}></div>
            <div className={styles['joystick-ball']}></div>
          </div>

          {/* 6 NÚT BẤM CƠ (Bên phải, tượng trưng, 2 hàng 3 cột) */}
          <div className={styles['buttons-grid']}>
            <div className={styles['button-row']}>
              {/* Xóa bỏ ký tự mũi tên ▲, ◄, ▼, ► */}
              <div className={`${styles['arcade-round-btn']} ${styles['btn-red']}`}></div>
              <div className={`${styles['arcade-round-btn']} ${styles['btn-pink']}`}></div>
              <div className={`${styles['arcade-round-btn']} ${styles['btn-yellow']}`}></div>
            </div>
            <div className={styles['button-row']}>
              <div className={`${styles['arcade-round-btn']} ${styles['btn-green']}`}></div>
              <div className={`${styles['arcade-round-btn']} ${styles['btn-blue']}`}></div>
              <div className={`${styles['arcade-round-btn']} ${styles['btn-purple']}`}></div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default ArcadePlanet;