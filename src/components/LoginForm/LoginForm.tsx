import { Link, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { clsx } from 'clsx';
import { User } from '@/types/UserType';
import styles from '@/pages/RegistrationPage/RegistrationPage.module.scss';
import { login } from '@/services/auth';
import openEye from '@/assets/icons/eyeOpen.svg';
import closedEye from '@/assets/icons/eyeClosed.svg';
import { setLoggedIn } from '@/store/user/userSlice';
import validatePassword from '@/helpers/validatePassword';

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<User>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<User> = async (data) => {
    await login(data, navigate);
    if (localStorage.getItem('userAccessToken')) {
      dispatch(setLoggedIn());
      reset();
    }
  };
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h3>Account Credentials</h3>
      <span className={clsx(styles['text-info'], styles['text-info-small'])}>
        Fields marked with * are required.
      </span>
      <div className={styles.inputWrapperLogin}>
        <label htmlFor="email" className={styles.label}>
          <span>Email *</span>
          <input
            className={clsx(
              styles['input-field'],
              styles['input-field-text'],
              errors.email && styles.error,
            )}
            id="email"
            type="email"
            {...register('email', {
              required: 'Email is a required field',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: 'Invalid email address',
              },
            })}
          />
          {errors.email && (
            <div className={styles.errorMessage}>{errors.email.message}</div>
          )}
        </label>

        <label htmlFor="password" className={styles.label}>
          <span>Password *</span>
          <input
            className={clsx(
              styles['input-field'],
              styles['input-field-text'],
              errors.password && styles.error,
            )}
            id="password"
            type={showPassword ? 'text' : 'password'}
            {...register('password', {
              required: 'Password is a required field',
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters long',
              },
              validate: validatePassword,
            })}
          />
          <div className={styles.eye} onClick={handleShowPassword}>
            <img src={showPassword ? openEye : closedEye} alt="eye icon" />
          </div>
          {errors.password && (
            <div className={styles.errorMessage}>{errors.password.message}</div>
          )}
        </label>
      </div>

      <button
        className={clsx(styles['button-large'], styles['button-primary'])}
        type="submit"
      >
        Submit
      </button>

      <div>Don&apos;t have an account?</div>
      <Link className={styles.link} to="/register">
        Sign up
      </Link>
    </form>
  );
};

export default LoginForm;
