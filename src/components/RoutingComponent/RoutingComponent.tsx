import Weather from '@pages/Weather/Weather';
import Home from '@pages/Home/Home';
import { Route, Routes } from 'react-router';
import NachklausurAntrag from '@/pages/Nachklausur/NachklausurAntrag';
import BachelorAnmeldung from '@/pages/BachelorAnmeldung/BachelorAnmeldung';
import FormsPage from '@/pages/Forms/FormsPage';

const RoutingComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="/weather" element={<Weather />} /> */}
      <Route path="/forms" element={<FormsPage />} />
    </Routes>
  );
};

export default RoutingComponent;
