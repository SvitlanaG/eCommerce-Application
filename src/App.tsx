import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import LoginPage from './pages/LoginPage/LoginPage';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
import Catalog from './pages/Catalog';
import ErrorPage from './pages/ErrorPage';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import styles from './App.module.scss';
import MainPage from './pages/MainPage';
import { getAccessToken } from './services/getData';

function App() {
  useEffect(() => {
    getAccessToken();
  }, []);
  return (
    <BrowserRouter>
      <div className={styles.app}>
        <Header />
        <main className={styles.main}>
          <div className={styles.container}>
            <Routes>
              <Route path="" element={<MainPage />} />
              <Route path="/catalog" element={<Catalog />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegistrationPage />} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </div>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
