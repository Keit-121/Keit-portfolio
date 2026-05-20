import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import KeitUniverse from './pages/KeitUniverse';
import PreludePlanet from './pages/PreludePlanet';
import PassionPlanet from './pages/PassionPlanet';
import ArcadePlanet from './pages/ArcadePlanet';
import RhythmPlanet from './pages/RhythmPlanet';
import CapsulePlanet from './pages/CapsulePlanet';
import TastePlanet from './pages/TastePlanet';
import LabPlanet from './pages/LabPlanet';
// Nhớ import thêm các trang hành tinh khác khi ông tạo xong nhé!

function App() {
  return (
    <Router>
      <Routes>
        {/* Trang chủ mặc định sẽ load file Home.jsx */}
        <Route path="/" element={<KeitUniverse />} />
        {/* Khi URL là /prelude thì sẽ load file Prelude.jsx */}
        <Route path="/prelude" element={<PreludePlanet />} />
        <Route path="/passion" element={<PassionPlanet />} />
        <Route path="/arcade" element={<ArcadePlanet />} />
        <Route path="/rhythm" element={<RhythmPlanet />} />
        <Route path="/capsule" element={<CapsulePlanet />} />
        <Route path="/taste" element={<TastePlanet />} />
        <Route path="/lab" element={<LabPlanet />} />
      </Routes>
    </Router>
  );
}

export default App;