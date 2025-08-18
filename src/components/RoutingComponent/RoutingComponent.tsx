import Weather from '@pages/Weather/Weather';
import Home from '@pages/Home/Home';
import { Route, Routes } from 'react-router';
import NachklausurAntrag from '@/pages/Nachklausur/NachklausurAntrag';
import BachelorAnmeldung from '@/pages/BachelorAnmeldung/BachelorAnmeldung';

const RoutingComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/weather" element={<Weather />} />
      <Route path="/nachklausur" element={<NachklausurAntrag />} />
      <Route path="/bachelorAnmeldung" element={<BachelorAnmeldung />} />
    </Routes>
  );
};

export default RoutingComponent;
