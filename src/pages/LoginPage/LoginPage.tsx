import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import styles from '@/pages/RegistrationPage/RegistrationPage.module.scss';
import Toast from '@/helpers/Toast';
import LoginForm from '@/components/LoginForm/LoginForm';

const LoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('userAccessToken')) {
      setTimeout(() => navigate('/'), 300);
      Toast({ message: 'User already logged in', status: 'error' });
    }
  }, [navigate]);

  return (
    <div className={styles.registration}>
      <h2>Log in to Your Account</h2>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
