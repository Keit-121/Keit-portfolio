import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactPlayer from 'react-player'; // THÊM THƯ VIỆN NÀY
import styles from '../css/Rhythm.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faVolumeHigh, faVolumeXmark, faPlay, faPause, faBackwardStep, faForwardStep, faChevronLeft 
} from '@fortawesome/free-solid-svg-icons';

// --- MOCK DATA ---
const artists = [
  { id: 1, name: "Hazel", image: `${import.meta.env.BASE_URL}Logo/ArtistsLogo/Hazel.jpg`, url: "https://www.youtube.com/@hazel29b1" },
  { id: 2, name: "Dewie", image: `${import.meta.env.BASE_URL}Logo/ArtistsLogo/Dewie.jpg`, url: "https://www.youtube.com/@dewie_sayhiii" },
  { id: 3, name: "MCK", image: `${import.meta.env.BASE_URL}Logo/ArtistsLogo/Mck.jpg`, url: "https://www.youtube.com/@hoanglongmck" },
  { id: 4, name: "Obito", image: `${import.meta.env.BASE_URL}Logo/ArtistsLogo/Obito.jpg`, url: "https://www.youtube.com/@TobieeOfficial" },
  { id: 5, name: "Wrxdie", image: `${import.meta.env.BASE_URL}Logo/ArtistsLogo/Wrxdie.jpg`, url: "https://www.youtube.com/@wxrdie" },
  { id: 6, name: "Wren Evans", image: `${import.meta.env.BASE_URL}Logo/ArtistsLogo/Wren Evans.jpg`, url: "https://www.youtube.com/channel/UCtpX-hGGBtH2ZvVX9_5RwFg" },
  { id: 7, name: "24K.Right", image: `${import.meta.env.BASE_URL}Logo/ArtistsLogo/24K.Right.jpg`, url: "https://www.youtube.com/@24kRight" },
];

const songs = [
  { id: 's1', title: "CÓ THỂ", artist: "Hazel", image: `${import.meta.env.BASE_URL}Logo/SongLogo/CÓ THỂ.png`, url: `${import.meta.env.BASE_URL}Songs/Có thể.mp3` },
  { id: 's2', title: "Night In Prague", artist: "MCK", image: `${import.meta.env.BASE_URL}Logo/SongLogo/Night In Prague.avif`, url: `${import.meta.env.BASE_URL}Songs/Night in Prague.mp3` },
  { id: 's3', title: "Thư tay", artist: "Dewie", image: `${import.meta.env.BASE_URL}Logo/SongLogo/Thư Tay.avif`, url: `${import.meta.env.BASE_URL}Songs/Thư Tay.mp3` },
  { id: 's4', title: "Mua Dong Ben Doi", artist: "Dewie", image: `${import.meta.env.BASE_URL}Logo/SongLogo/Mua Dong Ben Doi.avif`, url: `${import.meta.env.BASE_URL}Songs/Mua Dong Ben Doi.mp3` },
  { id: 's5', title: "Thản", artist: "Hazel", image: `${import.meta.env.BASE_URL}Logo/SongLogo/IV. Thản.png`, url: `${import.meta.env.BASE_URL}Songs/IV. Thản.mp3` },
  { id: 's6', title: "SCENE404", artist: "Coldzy", image: `${import.meta.env.BASE_URL}Logo/SongLogo/Scene404.avif`, url: `${import.meta.env.BASE_URL}Songs/Scene404.mp3` },
  { id: 's7', title: "Vừa tìm thấy đã đánh mất", artist: "Wren Evans", image: `${import.meta.env.BASE_URL}Logo/SongLogo/Vừa tìm thấy đã đánh mất.avif`, url: `${import.meta.env.BASE_URL}Songs/Vừa Tìm Thấy Đã Đánh Mất.mp3` },

];

function RhythmPlanet() {
  const navigate = useNavigate();
  
  // STATE ĐIỀU KHIỂN NHẠC YOUTUBE
  const [currentTrack, setCurrentTrack] = useState(songs[1]);
  const [isPlaying, setIsPlaying] = useState(false); // Quản lý Play/Pause cho YouTube
  const [volume, setVolume] = useState(50);
  const [prevVolume, setPrevVolume] = useState(50);

  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        // Play và bắt lỗi nếu trình duyệt lỡ chặn
        audioRef.current.play().catch(error => console.log("Trình duyệt chặn autoplay:", error));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrack]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);
  
  // Chọn bài mới -> Phát luôn
  const handleTrackSelect = (track) => {
    setCurrentTrack(track);
    setIsPlaying(true); 
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (volume > 0) {
      setPrevVolume(volume); 
      setVolume(0);          
    } else {
      setVolume(prevVolume || 50); 
    }
  };

  const handleNextTrack = () => {
    const currentIndex = songs.findIndex(s => s.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % songs.length;
    setCurrentTrack(songs[nextIndex]);
    setIsPlaying(true);
  };

  const handlePrevTrack = () => {
    const currentIndex = songs.findIndex(s => s.id === currentTrack.id);
    const prevIndex = currentIndex === 0 ? songs.length - 1 : currentIndex - 1;
    setCurrentTrack(songs[prevIndex]);
    setIsPlaying(true);
  };

  return (
    <div className={styles['rhythm-page-container']}>
      <audio 
        ref={audioRef} 
        src={currentTrack.url} 
        onEnded={handleNextTrack} // Hết bài tự chuyển bài tiếp
        preload="none" 
      />

      <video autoPlay loop muted playsInline className={styles['background-video']}>
        <source src={`${import.meta.env.BASE_URL}PlanetBackground/RhythmBg2.mp4`} type="video/mp4" />
      </video>
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
      
      {/* MAIN CONTENT AREA */}
      <div className={styles['main-content']}>
        <div className={styles['section']}>
          <h2 className={styles['section-title']}>Favorite Artists</h2>
          <div className={styles['horizontal-scroll']}>
            {artists.map(artist => (
              <a key={artist.id} href={artist.url} target="_blank" rel="noopener noreferrer" className={styles['artist-card']}>
                <div className={styles['artist-image-box']}>
                  <img src={artist.image} alt={artist.name} />
                </div>
                <p>{artist.name}</p>
              </a>
            ))}
          </div>
        </div>

        <div className={styles['section']}>
          <h2 className={styles['section-title']}>Top Tracks</h2>
          <div className={styles['horizontal-scroll']}>
            {songs.map(track => (
              <div 
                key={track.id} 
                className={`${styles['song-card']} ${track.isAlbum ? styles['is-album'] : ''} ${currentTrack.id === track.id ? styles['active'] : ''}`}
                onClick={() => handleTrackSelect(track)}
              >
                <div className={styles['song-image-box']}>
                  <img src={track.image} alt={track.title} />
                  {track.isAlbum && <span className={styles['album-badge']}>ALBUM</span>}
                </div>
                <p className={styles['song-title']}>{track.title}</p>
                <p className={styles['song-artist']}>{track.artist}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- BOTTOM PLAYER BAR --- */}
      <div className={styles['player-bar']}>
        
        <div className={styles['player-track-info']}>
          <div className={`${styles['vinyl-record']} ${isPlaying ? styles['spinning'] : ''}`}>
            <div className={styles['vinyl-label']}>
              <img src={currentTrack.image} alt="Vinyl Label" />
            </div>
            <div className={styles['vinyl-hole']}></div>
          </div>
          
        {/* THÊM LẠI PHẦN CHỮ VÀO ĐÂY */}
            <div className={styles['track-text']}>
              <h3 className={styles['track-title']}>{currentTrack.title}</h3>
              <p className={styles['track-artist']}>{currentTrack.artist}</p>
            </div>
          </div>

        <div className={styles['player-center']}>
          <div className={styles['control-buttons']}>
            <button className={styles['ctrl-btn']} onClick={handlePrevTrack}>
              <FontAwesomeIcon icon={faBackwardStep} />
            </button>
            <button className={styles['play-btn']} onClick={togglePlay}>
              <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
            </button>
            <button className={styles['ctrl-btn']} onClick={handleNextTrack}>
              <FontAwesomeIcon icon={faForwardStep} />
            </button>
          </div>
        </div>

        <div className={styles['player-volume']}>
          <FontAwesomeIcon 
            icon={volume > 0 ? faVolumeHigh : faVolumeXmark} 
            className={styles['vol-icon']} 
            onClick={toggleMute} 
          />
          <input 
            type="range" min="0" max="100" 
            value={volume} 
            onChange={(e) => setVolume(Number(e.target.value))}
            className={styles['volume-slider']}
          />
        </div>

      </div>
    </div>
  );
}

export default RhythmPlanet;