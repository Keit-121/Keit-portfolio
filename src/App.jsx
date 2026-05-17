import { useState } from 'react';
import { FaFacebook, FaTiktok, FaInstagram, FaGithub, FaDiscord, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

 const planetCards = [
  { id: 1, title: 'Prelude Planet', type: 'video', media: 'Introduce.mp4', desc: 'Chào mừng đến với thế giới của Vương Tuấn Kiệt. Khám phá hành trình và định hướng phát triển.' }, 
  { id: 2, title: 'Passion Planet', type: 'video', media: 'Hobby.mp4' }, 
  { id: 3, title: 'Arcade Planet', type: 'image', media: 'Gaming.gif' },
  { id: 4, title: 'Rhythm Planet', type: 'video', media: 'Music.mp4' },
  { id: 5, title: 'Capsule Planet', type: 'video', media: 'Capsule.mp4' },
  { id: 6, title: 'Taste Planet', type: 'video', media: 'Taste2.mp4' },
  { id: 7, title: 'Lab Planet', type: 'video', media: 'Lab.mp4' },
];


function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isWarping, setIsWarping] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // --- THÊM LOGIC VUỐT (SWIPE) CHO MOBILE ---
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Khoảng cách vuốt tối thiểu để nhận diện (tránh việc chạm nhẹ nhầm)
  const minSwipeDistance = 50; 

  const onTouchStart = (e) => {
    setTouchEnd(null); // Reset lại điểm kết thúc mỗi khi chạm mới
    setTouchStart(e.targetTouches[0].clientX); // Lưu tọa độ X lúc bắt đầu chạm
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX); // Cập nhật tọa độ X khi ngón tay di chuyển
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      // Vuốt ngón tay sang TRÁI -> Đi tới hành tinh TỚI
      nextPlanet(); 
    }
    if (isRightSwipe) {
      // Vuốt ngón tay sang PHẢI -> Lùi về hành tinh LÙI
      prevPlanet(); 
    }
  };

  // Hàm xử lý chuyển cảnh
  const changePlanet = (newIndex) => {
    if (isWarping) return; 
    // 2. THÊM DÒNG NÀY: Tự động đóng bảng Text khi chuyển hành tinh
    setIsExpanded(false); 
    
    setIsWarping(true); 
    setTimeout(() => {
      setCurrentIndex(newIndex);
      setIsWarping(false); 
    }, 400); 
  };

  const nextPlanet = () => {
    const nextIndex = currentIndex === planetCards.length - 1 ? 0 : currentIndex + 1;
    changePlanet(nextIndex);
  };

  const prevPlanet = () => {
    const prevIndex = currentIndex === 0 ? planetCards.length - 1 : currentIndex - 1;
    changePlanet(prevIndex);
  };

  const prevIndex = currentIndex === 0 ? planetCards.length - 1 : currentIndex - 1;
  const nextIndex = currentIndex === planetCards.length - 1 ? 0 : currentIndex + 1;

  const renderMedia = (card) => {
    const mediaUrl = `${import.meta.env.BASE_URL}${card.media}`;
    if (card.type === 'video') {
      return <video src={mediaUrl} autoPlay loop muted playsInline className="planet-media" />;
    }
    if (card.type === 'iframe') {
      return <iframe src={mediaUrl} className="planet-media" title={card.title} />;
    }
    // Mặc định là hình ảnh
    return <img src={mediaUrl} alt={card.title} className="planet-media" />;
  };
  return (
    <>
      <iframe
        src={`${import.meta.env.BASE_URL}Stars.html`}
        className="background-iframe"
        title="Stars Background"
      />

      {/* Hiệu ứng chớp sáng toàn màn hình khi Warp */}
      {isWarping && <div className="warp-flash"></div>}

      {/* CÁI HỘP MỚI BỌC CẢ AVATAR VÀ CHỮ */}
      <div className="profile-header">
        <img
          src={`${import.meta.env.BASE_URL}Avatar2.jpg`}
          alt="Avatar Vương Tuấn Kiệt"
          className="profile-avatar"
        />
        
        <div className="profile-info">
          <h1>Vương Tuấn Kiệt</h1>
          <p>Porfolio Website</p>
        </div>
      </div>

      {/* KHU VỰC TRUNG TÂM: SLIDER VỚI PREVIEW */}
      <div 
        className="slider-with-previews"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        
        {/* Preview TRÁI (Giữ nguyên) */}
        {currentIndex > 0 && (
          <div className="planet-sphere preview-planet left-preview" onClick={prevPlanet}>
            {renderMedia(planetCards[prevIndex])}
            <div className="planet-shadow-overlay"></div>
            <h3>{planetCards[prevIndex].title}</h3>
          </div>
        )}

        {/* --- CỤM SÂN KHẤU CHÍNH (Quả cầu + Bảng Text) --- */}
        <div className={`center-stage ${isExpanded ? 'expanded' : ''}`}>
          
          {isExpanded && (
            <div className="close-overlay" onClick={() => setIsExpanded(false)}></div>
          )}

          {/* Quả cầu chính */}
          <div 
            className={`planet-sphere active-planet ${isWarping ? 'warping' : ''}`} 
            key={currentIndex}
            onClick={() => setIsExpanded(!isExpanded)} // 4. CLICK ĐỂ BẬT/TẮT
            style={{ cursor: 'pointer' }} // Biến chuột thành bàn tay để ngta biết là bấm được
          >
            {renderMedia(planetCards[currentIndex])}
            <div className="planet-shadow-overlay"></div>
            <h3 className="planet-name-title">{planetCards[currentIndex].title}</h3>
          </div>

          {/* Bảng thông tin */}
          <div className="planet-info-panel" onClick={(e) => e.stopPropagation()}>
            <h2>{planetCards[currentIndex].title}</h2>
            <div className="info-divider"></div>
            <p>{planetCards[currentIndex].desc}</p>
            <button className="explore-btn">Explore</button>
          </div>
        </div>
        {/* ----------------------------------------------- */}

        {/* Preview PHẢI (Giữ nguyên) */}
        {currentIndex < planetCards.length - 1 && (
          <div className="planet-sphere preview-planet right-preview" onClick={nextPlanet}>
            {renderMedia(planetCards[nextIndex])}
            <div className="planet-shadow-overlay"></div>
            <h3>{planetCards[nextIndex].title}</h3>
          </div>
        )}

      </div>

      <div className="social-links">
        <a href="https://www.tiktok.com/@keit.1217?is_from_webapp=1&sender_device=pc" target="_blank" rel="noopener noreferrer" className="icon-tiktok">
          <FaTiktok />
        </a>
        <a href="https://www.facebook.com/tuan.kiet.343168?locale=vi_VN" target="_blank" rel="noopener noreferrer" className="icon-facebook">
          <FaFacebook />
        </a>
        <a href="https://www.instagram.com/keit_121/" target="_blank" rel="noopener noreferrer" className="icon-instagram">
          <FaInstagram />
        </a>
        <a href="https://github.com/Keit-121" target="_blank" rel="noopener noreferrer" className="icon-github">
          <FaGithub />
        </a>
      </div>
    </>
  );
}

export default App;
