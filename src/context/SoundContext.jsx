import React, { createContext, useContext, useRef, useState } from 'react';

const SoundContext = createContext();

export function SoundProvider({ children }) {
  // Dùng useRef để giữ đối tượng Audio không bị reset
  const audioRef = useRef(new Audio());
  const [isPlaying, setIsPlaying] = useState(false);

  const playNewTrack = (trackUrl) => {
    const audio = audioRef.current;
    
    // Nếu nhạc đang phát trùng bài thì không làm gì cả
    if (audio.src.includes(trackUrl)) {
      // Bổ sung: Nếu F5 lại đúng trang đó, link nhạc giống nhau nhưng audio đang bị paused
      if (audio.paused) {
        audio.play()
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      }
      return;
    }

    audio.src = trackUrl;
    audio.loop = true;
    audio.volume = 0.05; 
    
    // ĐÂY LÀ CHỖ QUAN TRỌNG NHẤT: Bắt kết quả của lệnh play()
    audio.play()
      .then(() => {
        // Nhạc chạy thành công -> Hiện icon Bật
        setIsPlaying(true);
      })
      .catch(err => {
        // Bị trình duyệt chặn -> Hiện icon Tắt
        console.log("Trình duyệt chặn phát nhạc: Đợi user tương tác");
        setIsPlaying(false);
      });
  };

  const toggleSound = () => {
    const audio = audioRef.current;
    if (audio.paused) {
      audio.play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  // Thêm hàm này để bắt buộc dừng nhạc
  const stopMusic = () => {
    const audio = audioRef.current;
    if (!audio.paused) {
      audio.pause();
    }
    // Có thể thêm dòng audio.currentTime = 0; nếu muốn lần sau vào lại hành tinh nhạc phát từ đầu
    setIsPlaying(false);
    audio.currentTime = 0
  };

  return (
    <SoundContext.Provider value={{ playNewTrack, toggleSound, stopMusic, isPlaying }}>
      {children}
    </SoundContext.Provider>
  );
}

export const useSound = () => useContext(SoundContext);