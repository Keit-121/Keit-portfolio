import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSound } from '../context/SoundContext';
import styles from '../css/Lab.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeHigh, faVolumeXmark, faChevronLeft, faChevronRight, } from '@fortawesome/free-solid-svg-icons';
import { FaGithub } from 'react-icons/fa';


function SoundToggle() {
  const { toggleSound, isPlaying } = useSound();
  return (
    <button
      onClick={toggleSound}
      // Sửa lỗi: Gọi qua styles và dùng ngoặc vuông vì có dấu gạch ngang
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

export function LabPlanet() {
  const navigate = useNavigate();
    const { playNewTrack, stopMusic } = useSound();
    const [activeStar, setActiveStar] = useState(null);
  
    useEffect(() => {
      playNewTrack(`${import.meta.env.BASE_URL}PlanetBackgroundSoundTrack/LabBgSound.mp3`);
  
      return () => {
        stopMusic();
      };
    }, [])
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
        <source src={`${import.meta.env.BASE_URL}PlanetBackground/LabBg.mp4`} type="video/mp4" />
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
            <div className={styles['git-links-wrapper']}>
              <a href="https://github.com/Keit-121" target="_blank" rel="noopener noreferrer" className={styles['git-btn']}><FaGithub /> GitHub Profile</a>
              
              <a href="https://github.com/Keit-121/Keit-portfolio" target="_blank" rel="noreferrer" className={styles['git-btn']}>
                Keit-Portfolio
              </a>
              
              <a href="https://github.com/joblevel-datn-sd11/" target="_blank" rel="noreferrer" className={styles['git-btn']}>
                JobLevel
              </a>
            </div>
    </div>
    
  );
}

export default LabPlanet;