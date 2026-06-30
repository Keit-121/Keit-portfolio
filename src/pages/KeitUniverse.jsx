import { useState, useEffect } from 'react';
import { FaFacebook, FaTiktok, FaInstagram, FaGithub, FaDiscord, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const planetCards = [
  { id: 1, title: 'Prelude Planet', path: '/prelude', type: 'video', media: './PlanetMedia/Introduce.mp4', desc: 'The first planet discovered in the Keit Universe, Prelude Planet, was found on November 12, 2007. This planet is contemplative; sometimes it is bustling, but it is mostly quiet. The person who discovered it reported that the planet has only one animal, which is a piggy The report states that the piggy has been staying single for 19 years since the explorer first found it. This pig just grew up, enjoying life on that planet for 19 years, and continues to look forward to finding his future partner.' },
  { id: 2, title: 'Passion Planet', path: '/passion', type: 'video', media: './PlanetMedia/Hobby.mp4', desc: 'The next planet in the Keit Universe is Passion Planet, which is the closest to Prelude Planet, making it feel as though the two planets are parallel to each other. This planet is full of joy and satisfaction, which is why explorers named it Passion Planet. Anyone who arrives on this planet says it is worth living in, or at least visiting once in a lifetime. Everything here is simply perfect and beautiful.' },
  { id: 3, title: 'Arcade Planet', path: '/arcade', type: 'image', media: './PlanetMedia/Gaming.gif', desc: 'The next one is a planet known as a sub-planet of Passion. Named Arcade Planet, it is one of the sub-planets of Passion Planet. This is the most joyful planet in the universe. Explorers reported that the planet has many residents from various races. Some of the typical races include: "Valoreth", the race with the best gun mechanics; "Tactariom", the race known to be the smartest; and finally, the biggest race on Arcade, "Legendaris". This race includes individuals from many universes and planets who came here and made "Legendaris" the largest race of all.' },
  { id: 4, title: 'Rhythm Planet', path: '/rhythm', type: 'video', media: './PlanetMedia/Music.mp4', desc: 'Rhythm Planet is the second sub-planet of Passion. Unlike the bustling energy of its neighbors, this is a realm of profound and echoing melodies. Upon arriving, you become completely immersed in a serene symphony. The ancient, ruined architectures here serve as natural amplifiers for the wind and rustling leaves. The sounds here gently heal your soul and bring ultimate peace. That profound connection to sound is why it is named Rhythm.' },
  { id: 5, title: 'Capsule Planet', path: '/capsule', type: 'video', media: './PlanetMedia/Capsule.mp4', desc: 'The next planet is the one most similar to Earth, with environmental conditions perfectly suited for humans. This is why explorers have designated it as a habitable planet, potentially a second Earth. In addition, this planet features a unique system designed to store all the memories of its explorers. When a new person arrives, they are scanned by the planet\'s scanner drones and can choose which memories to store. Whenever they want to look back at the past, they can summon a drone to project their memories like a projector.' },
  { id: 6, title: 'Lab Planet', path: '/lab', type: 'video', media: './PlanetMedia/Lab.mp4', desc: 'The last planet in the Keit Universe is Lab Planet, a highly advanced technological hub. This planet is completely full of scientific experiments. When explorers arrive here, they are completely overwhelmed by its advanced technology, making them deeply desire to visit frequently to learn and absorb these cutting-edge innovations. Most of the projects developed here are eventually deployed to other planets to improve the living standards of everyone in the Keit Universe.' },
];

function KeitUniverse() {
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(() => {
    const savedIndex = sessionStorage.getItem('keit_current_planet');
    return savedIndex !== null ? parseInt(savedIndex, 10) : 0;
  });

  useEffect(() => {
    sessionStorage.setItem('keit_current_planet', currentIndex);
  }, [currentIndex]);

  const [isExpanded, setIsExpanded] = useState(false);

  // --- LOGIC VUỐT (SWIPE) CHO MOBILE ---
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;

    if (distance > minSwipeDistance) nextPlanet();
    if (distance < -minSwipeDistance) prevPlanet();
  };

  const changePlanet = (newIndex) => {
    setIsExpanded(false);
    setCurrentIndex(newIndex);
  };

  const nextPlanet = () => {
    const nextIndex = currentIndex === planetCards.length - 1 ? 0 : currentIndex + 1;
    changePlanet(nextIndex);
  };

  const prevPlanet = () => {
    const prevIndex = currentIndex === 0 ? planetCards.length - 1 : currentIndex - 1;
    changePlanet(prevIndex);
  };

  const handleExplore = (path) => {
    navigate(path);
  };

  const renderMedia = (card) => {
    const mediaUrl = `${import.meta.env.BASE_URL}${card.media}`;
    if (card.type === 'video') {
      return <video src={mediaUrl} autoPlay loop muted playsInline className="planet-media" />;
    }
    if (card.type === 'iframe') {
      return <iframe src={mediaUrl} className="planet-media" title={card.title} />;
    }
    return <img src={mediaUrl} alt={card.title} className="planet-media" />;
  };

  return (
    <>
      <iframe src={`${import.meta.env.BASE_URL}Stars.html`} className="background-iframe" title="Stars Background" />

      <div className="profile-header">
        <img src={`${import.meta.env.BASE_URL}Avatar2.jpg`} alt="Avatar Vương Tuấn Kiệt" className="profile-avatar" />
        <div className="profile-info">
          <h1>Keit</h1>
          <p>Portfolio Website</p>
        </div>
      </div>
      {isExpanded && (
        <div 
          className="close-overlay" 
          onClick={() => setIsExpanded(false)}
        ></div>
      )}
      {/* ======================================================== */}
      {/* CAMERA PAN TRACK - ĐƯỜNG RAY TRƯỢT */}
      {/* ======================================================== */}
      <div className="slider-container" onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
        <div
          className="planet-track"
          /* Phép toán trượt: Mỗi hành tinh rộng 50vw. Bù 25vw để căn giữa màn hình */
          style={{ transform: `translateX(calc(25vw - ${currentIndex * 50}vw))` }}
        >
          {planetCards.map((card, index) => {
            const isActive = index === currentIndex;

            return (
              <div
                key={card.id} 
                className={`planet-wrapper ${isActive ? 'active' : ''} ${isExpanded && isActive ? 'expanded' : ''}`}
              >
                {/* Quả Cầu */}
                <div
                  className={`planet-sphere ${isActive ? 'active-planet' : 'preview-planet'}`}
                  onClick={(e) => {
                    e.stopPropagation(); // Rất quan trọng: Ngăn click ở quả cầu nảy lên lớp cha
                    if (isActive) setIsExpanded(!isExpanded);
                    else changePlanet(index);
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  {renderMedia(card)}
                  <div className="planet-shadow-overlay"></div>
                  <h3 className="planet-name-title">{card.title}</h3>
                </div>

                {/* Bảng Thông Tin */}
                {isActive && (
                  <div
                    className="planet-info-panel"
                    onClick={(e) => e.stopPropagation()} // Chặn click bên trong bảng khiến bảng tự đóng
                  >
                    <h2>{card.title}</h2>
                    <div className="info-divider"></div>
                    <p>{card.desc}</p>
                    <button className="explore-btn" onClick={() => handleExplore(card.path)}>
                      Explore
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Mạng xã hội */}
      <div className="social-links">
        <a href="https://www.tiktok.com/@keit.1217?is_from_webapp=1&sender_device=pc" target="_blank" rel="noopener noreferrer" className="icon-tiktok"><FaTiktok /></a>
        <a href="https://www.facebook.com/tuan.kiet.343168?locale=vi_VN" target="_blank" rel="noopener noreferrer" className="icon-facebook"><FaFacebook /></a>
        <a href="https://www.instagram.com/v12.tk_/" target="_blank" rel="noopener noreferrer" className="icon-instagram"><FaInstagram /></a>
        <a href="https://github.com/Keit-121" target="_blank" rel="noopener noreferrer" className="icon-github"><FaGithub /></a>
      </div>
    </>
  );
}

export default KeitUniverse;