import { Route, Routes } from 'react-router';
import FormsPage from '@/pages/Forms/FormsPage';

const RoutingComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<FormsPage />} />
    </Routes>
  );
};

export default RoutingComponent;
