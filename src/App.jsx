import { useState } from 'react';
import { FaFacebook, FaTiktok, FaInstagram, FaGithub, FaDiscord, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

 const planetCards = [
  { id: 1, title: 'Prelude Planet', type: 'video', media: 'Introduce.mp4' }, 
  { id: 2, title: 'Passion Planet', type: 'video', media: 'Hobby.mp4' }, 
  { id: 3, title: 'Arcade Planet', type: 'image', media: 'Gaming.gif' },
  { id: 4, title: 'Rhythm Planet', type: 'video', media: 'Music.mp4' }
];


function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Biến mới: Kiểm tra xem tàu có đang thực hiện "Bước nhảy không gian" không
  const [isWarping, setIsWarping] = useState(false);

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
    if (isWarping) return; // Nếu đang bay thì không cho bấm liên tục
    
    setIsWarping(true); // Bật hiệu ứng bay
    
    // Đợi 0.4 giây cho hiệu ứng diễn ra rồi mới đổi nội dung
    setTimeout(() => {
      setCurrentIndex(newIndex);
      setIsWarping(false); // Tắt hiệu ứng bay
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
        
        {currentIndex > 0 && (
          <div className="planet-sphere preview-planet left-preview" onClick={prevPlanet}>
            {renderMedia(planetCards[prevIndex])}
            <div className="planet-shadow-overlay"></div>
            <h3>{planetCards[prevIndex].title}</h3>
          </div>
        )}

        <div className={`planet-sphere active-planet ${isWarping ? 'warping' : ''}`} key={currentIndex}>
          {renderMedia(planetCards[currentIndex])}
          <div className="planet-shadow-overlay"></div>
          <h3>{planetCards[currentIndex].title}</h3>
        </div>

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
