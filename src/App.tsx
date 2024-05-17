import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import styles from './App.module.scss';

function App() {
  return (
    <BrowserRouter>
      <div className={styles.app}>
        <Header />
        <main className={styles.main}>
          <div className={styles.container}>
            <Routes>
              <Route path="" element={<MainPage />} />
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
