import { Link } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { User } from '../../types/UserType';
import styles from '../RegistrationPage/RegistrationPage.module.scss';

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<User>({ mode: 'onTouched' });

  const onSubmit: SubmitHandler<User> = (data) => {
    console.log(data);
    reset();
  };
  return (
    <div className={styles.registration}>
      <h2>Log in to Your Account</h2>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h3>Account Credentials</h3>
        <span className={`${styles['text-info']} ${styles['text-info-small']}`}>
          Fields marked with * are required.
        </span>
        <div className={styles.inputWrapperLogin}>
          <label htmlFor="email" className={styles.label}>
            <span>Email *</span>
            <input
              className={`${styles['input-field']} ${styles['input-field-text']}`}
              id="email"
              type="email"
              {...register('email', {
                required: 'Emai is required field',
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
              className={`${styles['input-field']} ${styles['input-field-text']}`}
              id="password"
              type="password"
              {...register('password', {
                required: 'Password is required field',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters long',
                },
                validate: {
                  hasUpperCase: (value) =>
                    /[A-Z]/.test(value) ||
                    'Password must contain at least one uppercase letter',
                  hasLowerCase: (value) =>
                    /[a-z]/.test(value) ||
                    'Password must contain at least one lowercase letter',
                  hasDigit: (value) =>
                    /\d/.test(value) ||
                    'Password must contain at least one digit',
                  hasNoWhitespace: (value) =>
                    /^\S*$/.test(value) ||
                    'Password must not contain leading or trailing whitespace',
                  hasSpecialChar: (value) =>
                    /[!@#$%^&*]/.test(value) ||
                    'Password must contain at least one special character',
                },
              })}
            />
            {errors.password && (
              <div className={styles.errorMessage}>
                {errors.password.message}
              </div>
            )}
          </label>
        </div>

        <button
          className={`${styles['button-large']} ${styles['button-primary']}`}
          type="submit"
          disabled={!isValid}
        >
          Submit
        </button>

        <div>Don&apos;t have an account?</div>
        <Link className={styles.link} to="/register">
          Sign up
        </Link>
      </form>
    </div>
  );
};

export default LoginPage;
