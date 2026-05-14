function App() {
  return (
    <>
      {/* Khung chứa Background */}
      <iframe
        src={`${import.meta.env.BASE_URL}Stars.html`}
        className="background-iframe"
        title="Stars Background"
      />

      {/* THÊM THẺ IMG NÀY VÀO ĐÂY: Avatar góc trái */}
      <img
        src={`${import.meta.env.BASE_URL}Avatar2.jpg`}
        alt="Avatar Vương Tuấn Kiệt"
        className="profile-avatar"
      />

      {/* Nội dung Portfolio của bạn sẽ nằm ở đây */}
      <div className="portfolio-content">
        <h1>Vương Tuấn Kiệt</h1>
        <p>Full-stack Developer | Web Portfolio</p>
      </div>
    </>
  );
}

export default App;
