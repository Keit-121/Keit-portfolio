import { useState } from 'react';
import { FaFacebook, FaTiktok, FaInstagram, FaGithub, FaDiscord, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

 const planetCards = [
  { id: 1, title: 'Prelude Planet', type: 'video', media: 'Introduce.mp4', desc: 'The first planet discovered in the Keit Universe, Prelude Planet, was found on November 12, 2007. This planet is contemplative; sometimes it is bustling, but it is mostly quiet. The person who discovered it reported that the planet has only one animal, which is a piggy. What makes this planet special is the story of this piggy. The report states that the piggy has been staying single for 19 years since the explorer first found it. This pig just grew up, enjoying life on that planet for 19 years, and continues to look forward to finding his future partner.' }, 
  { id: 2, title: 'Passion Planet', type: 'video', media: 'Hobby.mp4', desc: 'The next planet in the Keit Universe is Passion Planet, which is the closest to Prelude Planet, making it feel as though the two planets are parallel to each other. This planet is full of joy and satisfaction, which is why explorers named it Passion Planet. Anyone who arrives on this planet says it is worth living in, or at least visiting once in a lifetime. Everything here is simply perfect and beautiful.' }, 
  { id: 3, title: 'Arcade Planet', type: 'image', media: 'Gaming.gif', desc: 'The next one is a planet known as a sub-planet of Passion. Named Arcade Planet, it is one of the sub-planets of Passion Planet. This is the most joyful planet in the universe. Explorers reported that the planet has many residents from various races. Some of the typical races include: "Valoreth", the race with the best gun mechanics; "Tactariom", the race known to be the smartest; and finally, the biggest race on Arcade, "Legendaris". This race includes individuals from many universes and planets who came here and made "Legendaris" the largest race of all.' },
  { id: 4, title: 'Rhythm Planet', type: 'video', media: 'Music.mp4', desc: 'Rhythm Planet is the second sub-planet of Passion. This is the most vibrant and sound-filled planet in the universe. Explorers reported that upon arriving on this planet, you will become completely immersed in its sounds. All the sounds here make you want to groove and feel alive. Besides the sounds of nature, the residents here absolutely love music. You can find almost any genre of music here, mostly rap, indie, or even some drill music, which is the reason why this planet is named Rhythm.'},
  { id: 5, title: 'Capsule Planet', type: 'video', media: 'Capsule.mp4', desc: 'The next planet is the one most similar to Earth, with environmental conditions perfectly suited for humans. This is why explorers have designated it as a habitable planet, potentially a second Earth. In addition, this planet features a unique system designed to store all the memories of its explorers. When a new person arrives, they are scanned by the planet\'s scanner drones and can choose which memories to store. Whenever they want to look back at the past, they can summon a drone to project their memories like a projector.' },
  { id: 6, title: 'Taste Planet', type: 'video', media: 'Taste2.mp4', desc: 'The next planet in the Keit Universe is Taste Planet. This planet can be considered a massive haven of food and good vibes. It features a cozy atmosphere with a traditional Japanese aesthetic. Here, you can feel as though you are living in a Minka, enjoying hot cacao while watching the sunset or the falling rain. If you are feeling exhausted, just come and take a break on this planet, and your soul will surely be healed.' },
  { id: 7, title: 'Lab Planet', type: 'video', media: 'Lab.mp4', desc: 'The last planet in the Keit Universe is Lab Planet, a highly advanced technological hub. This planet is completely full of scientific experiments. When explorers arrive here, they are completely overwhelmed by its advanced technology, making them deeply desire to visit frequently to learn and absorb these cutting-edge innovations. Most of the projects developed here are eventually deployed to other planets to improve the living standards of everyone in the Keit Universe.' },
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
