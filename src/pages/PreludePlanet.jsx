import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa';
import { useSound } from '../context/SoundContext';
import styles from '../css/Prelude.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeHigh, faVolumeXmark, faChevronLeft } from '@fortawesome/free-solid-svg-icons';


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

export function PreludePlanet() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('info');
  const { playNewTrack, stopMusic } = useSound()

  useEffect(() => {
    // Chỉ cần gọi dòng này, nhạc sẽ tự đổi
    playNewTrack(`${import.meta.env.BASE_URL}PlanetBackgroundSoundTrack/PreludeBgSound.mp3`);

    return () => {
      stopMusic(); 
    };
  }, [])

  const handleFirstInteraction = () => {
    audioRef.current.play();
    sessionStorage.setItem('musicPlayed', 'true');
    // Gỡ bỏ sự kiện sau khi đã bật nhạc để tránh chạy lại
    document.removeEventListener('click', handleFirstInteraction);
  };

  useEffect(() => {
    document.addEventListener('click', handleFirstInteraction);
    return () => document.removeEventListener('click', handleFirstInteraction);
  }, []);

  return (
    <div className="planet-page-container" style={{ fontFamily: "'Philosopher', serif" }}>
      {/* 1. ĐÂY LÀ PHẦN VIDEO BACKGROUND */}
      <SoundToggle />
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="background-video"
      >
        <source src={`${import.meta.env.BASE_URL}PlanetBackground/PreludeBg.mp4`} type="video/mp4" />
      </video>

      {/* Lớp phủ mờ (tùy chọn) giúp chữ nổi bật hơn trên nền video */}
      <div className="video-overlay"></div>
      <div className={styles['video-overlay']}></div>
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
      <div className={styles.planetInfoPanel} onClick={(e) => e.stopPropagation()}>
      
      {/* Thanh Menu dọc chứa các nút bấm */}
      <div className={styles.hologramMenu}>
        <button 
          className={`${styles.tabBtn} ${activeTab === 'info' ? styles.active : ''}`}
          onClick={() => setActiveTab('info')}
        >
          Information
        </button>
        <button 
          className={`${styles.tabBtn} ${activeTab === 'favorites' ? styles.active : ''}`}
          onClick={() => setActiveTab('favorites')}
        >
          Favorites
        </button>
        <button 
          className={`${styles.tabBtn} ${activeTab === 'personality' ? styles.active : ''}`}
          onClick={() => setActiveTab('personality')}
        >
          Personality
        </button>
      </div>

      {/* Khu vực hiển thị nội dung thay đổi theo Tab */}
      <div className={styles.hologramContent}>
        {activeTab === 'info' && (
          <div className={`${styles.tabPane} ${styles.fadeIn}`}>
            <h2 className={styles.tabTitle}>Basic Info</h2>
            <div className={styles.infoDivider}></div>
            <ul className={styles.dataList}>
              <li><span className={styles.label}>FullName:</span> Vuong Tuan Kiet</li>
              <li><span className={styles.label}>Birthday:</span> 12 NOV 2007</li>
              <li><span className={styles.label}>Gender:</span> Male</li>
              <li><span className={styles.label}>Siblings:</span> One older brother</li>
              <li><span className={styles.label}>Location:</span> Hanoi, Vietnam</li>
              <li><span className={styles.label}>Role:</span> Full-stack Developer</li>
            </ul>
          </div>
        )}

        {activeTab === 'favorites' && (
          <div className={`${styles.tabPane} ${styles.fadeIn}`}>
            <h2 className={styles.tabTitle}>Favourites</h2>
            <div className={styles.infoDivider}></div>
            <ul className={styles.dataList}>
              <li><span className={styles.label}>Sports:</span>Football, Pickleball</li>
              <li><span className={styles.label}>Pet:</span>Cat, Dog</li>
              <li><span className={styles.label}>Gamer:</span>Nhism, Oner</li>
              <li><span className={styles.label}>Actor:</span>Go Youn-Jung, Cho Yi-Hyun, Tom Holland</li>
              <li><span className={styles.label}>Artist:</span>MCK, Wrxdie, Obtio, Hazel, Htingale</li>
              <li><span className={styles.label}>Movie Genre</span>Romance, Fantasy, Cartoon, Adventure, Drama</li>

            </ul>
          </div>
        )}

        {activeTab === 'personality' && (
          <div className={`${styles.tabPane} ${styles.fadeIn}`}>
            <h2 className={styles.tabTitle}>Personality Matrix</h2>
            <div className={styles.infoDivider}></div>
            <ul className={styles.dataList}>
              <li><span className={styles.label}>Celestial:</span>Sun: Scorpio | Moon: Sagittarius </li>
              <li><span className={styles.label}>MBTI:</span>INFJ</li>
              <li><span className={styles.label}>Character:</span>Gentle, Reserved , Sentimental, Introspective, Highly Sensitive</li>
              <li><span className={styles.label}>RECHARGE:</span> Solitude, Deep rest, Cinematic immersion</li>
            </ul>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}

export default PreludePlanet;