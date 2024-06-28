import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import styles from '@/pages/RegistrationPage/RegistrationPage.module.scss';
import Toast from '@/helpers/Toast';
import RegistrationForm from '@/components/RegistrationForm/RegistrationForm';

const RegistrationPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('userAccessToken')) {
      setTimeout(() => navigate('/'), 300);
      Toast({ message: 'User already logged in', status: 'error' });
    }
  }, [navigate]);

  return (
    <div className={styles.registration}>
      <h2>Create New Customer Account</h2>
      <RegistrationForm />
    </div>
  );
};

export default RegistrationPage;
