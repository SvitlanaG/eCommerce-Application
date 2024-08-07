import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Catalog from '@/pages/CatalogPage/CatalogPage';
import LoginPage from '@/pages/LoginPage/LoginPage';
import RegistrationPage from '@/pages/RegistrationPage/RegistrationPage';
import ErrorPage from '@/pages/ErrorPage/ErrorPage';
import ProfilePage from '@/pages/ProfilePage/ProfilePage';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import styles from '@/App.module.scss';
import MainPage from '@/pages/MainPage/MainPage';
import getVisitorIdentifier from '@/services/getIdentifier';
import ProductPage from './pages/ProductPage/ProductPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import BasketPage from '@/pages/BasketPage/BasketPage';
import AboutUsPage from '@/pages/AboutUsPage/AboutUsPage';

function App() {
  useEffect(() => {
    getVisitorIdentifier();
  }, []);
  return (
    <BrowserRouter>
      <div className={styles.app}>
        <Header />
        <main className={styles.main}>
          <div className={styles.container}>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/catalog" element={<Catalog />} />
              <Route path="/catalog/:key" element={<ProductPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegistrationPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/basket" element={<BasketPage />} />
              <Route path="/about-us" element={<AboutUsPage />} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </div>
          <ToastContainer
            position="bottom-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
