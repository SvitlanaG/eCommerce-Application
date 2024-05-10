import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './Components/Main';
import ErrorPage from './Components/ErrorPage';
import Login from './Components/Login';
import Register from './Components/Registration';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
