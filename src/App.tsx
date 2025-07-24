import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { VehicleList } from './pages/VehicleList';
import { VehicleDetail } from './pages/VehicleDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<VehicleList />} />
        <Route path="/vehicles/:id" element={<VehicleDetail />} />
      </Routes>
    </Router>
  );
}

export default App;