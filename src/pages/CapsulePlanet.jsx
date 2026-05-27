import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSound } from '../context/SoundContext';
import styles from '../css/Capsule.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeHigh, faVolumeXmark, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

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

const capsuleMemories = [
  { 
    id: 1, 
    date: "? ??? 2008", 
    image: `${import.meta.env.BASE_URL}Images/CapsuleImg/2008.jpg`, 
    caption: "When Keit was 1 year old" 
  },
  { 
    id: 2, 
    date: "31 DEC 2016", 
    image: `${import.meta.env.BASE_URL}Images/CapsuleImg/31-12-2016.png`, 
    caption: "When Keit was 9 years old" 
  },
  { 
    id: 3, 
    date: "20 NOV 2018", 
    image: `${import.meta.env.BASE_URL}Images/CapsuleImg/20-11-2018.jpg`, 
    caption: "Keit's class in the first year of secondary school" 
  },
  { 
    id: 4, 
    date: "18 MAY 2022", 
    image: `${import.meta.env.BASE_URL}Images/CapsuleImg/18-5-2022.JPG`, 
    caption: "Keit's friend group picture before graduation" 
  },
  { 
    id: 5, 
    date: "10 AUG 2025", 
    image: `${import.meta.env.BASE_URL}Images/CapsuleImg/10-8-2025.jpeg`, 
    caption: "Picture of Keit's friend group on their first trip together" 
  },
  { 
    id: 6, 
    date: "23 FEB 2026", 
    image: `${import.meta.env.BASE_URL}Images/CapsuleImg/23-2-2026.jpg`, 
    caption: "Keit's friend group visiting their homeroom teacher for the New Year." 
  },
  { 
    id: 7, 
    date: "12 APR 2026", 
    image: `${import.meta.env.BASE_URL}Images/CapsuleImg/12-4-2026.jpg`, 
    caption: "Keit's trip to Hai Phong with his friends." 
  },
  { 
    id: 8, 
    date: "10 MAY 2026", 
    image: `${import.meta.env.BASE_URL}Images/CapsuleImg/10-5-2026.jpg`, 
    caption: "Keit's trip to Ha Long with his friends." 
  },
];

export function CapsulePlanet() {
  const navigate = useNavigate();

  const [currentMemory, setCurrentMemory] = useState(0);

  // Chuyển sang kỷ niệm tiếp theo
  const nextMemory = () => {
    setCurrentMemory((prev) => (prev + 1) % capsuleMemories.length);
  };

  // Chuyển về kỷ niệm trước đó
  const prevMemory = () => {
    setCurrentMemory((prev) => (prev - 1 + capsuleMemories.length) % capsuleMemories.length);
  };

  const { playNewTrack, stopMusic } = useSound();
      const [activeStar, setActiveStar] = useState(null);
    
      useEffect(() => {
        playNewTrack(`${import.meta.env.BASE_URL}PlanetBackgroundSoundTrack/CapsuleBgSound.mp3`);
    
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
        <source src={`${import.meta.env.BASE_URL}PlanetBackground/CapsuleBg.mp4`} type="video/mp4" />
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
      <div className={styles['main-content']}>
        {/* Tiêu đề hành tinh */}
        <h1 className={styles['planet-title']}>CAPSULE PLANET</h1>
        <p className={styles['planet-subtitle']}>Memory Capsule</p>

        {/* Cụm điều hướng và khung phim */}
        <div className={styles['memory-scroller']}>
          {/* Nút lùi (Trái) */}
          <button className={styles['nav-btn']} onClick={prevMemory}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>

          {/* KHUNG PHIM / ẢNH CHỮ NHẬT GIỮA MÀN HÌNH */}
          <div className={styles['memory-frame']}>
            <div className={styles['photo-frame']}>
              <img src={capsuleMemories[currentMemory].image} alt="Capsule Memory" />
              {/* NGÀY/THÁNG/NĂM TRÊN ẢNH */}
              <div className={styles['date-overlay']}>
                {capsuleMemories[currentMemory].date}
              </div>
            </div>
            
            {/* DÒNG TEXT MÔ TẢ NỘI DUNG Ở DƯỚI ẢNH */}
            <div className={styles['caption-area']}>
              <p className={styles['caption-text']}>
                {capsuleMemories[currentMemory].caption}
              </p>
            </div>
          </div>

          {/* Nút tiến (Phải) */}
          <button className={styles['nav-btn']} onClick={nextMemory}>
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CapsulePlanet;