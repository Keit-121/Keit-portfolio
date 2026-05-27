import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import KeitUniverse from './pages/KeitUniverse';
import PreludePlanet from './pages/PreludePlanet';
import PassionPlanet from './pages/PassionPlanet';
import ArcadePlanet from './pages/ArcadePlanet';
import RhythmPlanet from './pages/RhythmPlanet';
import CapsulePlanet from './pages/CapsulePlanet';
import LabPlanet from './pages/LabPlanet';
import { SoundProvider } from './context/SoundContext';
import { useSound } from './context/SoundContext';

function App() {
  return (
    <SoundProvider>
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
        <Route path="/lab" element={<LabPlanet />} />
      </Routes>
    </Router>
    </SoundProvider>
  );
}

export default App;