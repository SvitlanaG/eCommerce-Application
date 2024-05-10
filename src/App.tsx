import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/home';
import ErrorPage from './Components/ErrorPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
