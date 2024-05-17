import { Link } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import { User } from '../../types/UserType';
import styles from './RegistrationPage.module.scss';
import ToggleSwitch from '../../components/ToggleSwitch/ToggleSwitch';

const RegistrationPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    reset,
  } = useForm<User>({ mode: 'onChange' });
  const pass = watch('password');

  const validateAge = (value: string) => {
    const today = new Date();
    const birthDate = new Date(value);
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      return age - 1 >= 13;
    }
    return age >= 13;
  };

  const onSubmit: SubmitHandler<User> = (data) => {
    console.log(data);
    reset();
  };

  const [isCheckedDefaultAddressShipping, setIsCheckedDefaultAddressShipping] =
    useState<boolean>(false);
  const handleSetDefaultAddressShipping = () => {
    setIsCheckedDefaultAddressShipping(!isCheckedDefaultAddressShipping);
  };
  const [isCheckedDefaultAddressBilling, setIsCheckedDefaultAddressBilling] =
    useState<boolean>(false);
  const handleSetDefaultAddressBilling = () => {
    setIsCheckedDefaultAddressBilling((prevState) => !prevState);
  };
  const [isCheckedUseAsBillingAddress, setIsCheckedUseAsBillingAddress] =
    useState<boolean>(false);
  const handleSetBillingAddress = () => {
    setIsCheckedUseAsBillingAddress(!isCheckedUseAsBillingAddress);
  };

  return (
    <div className={styles.registration}>
      <h2>Create New Customer Account</h2>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h3>Personal Information</h3>
        <div className={styles.inputWrapper}>
          <label htmlFor="firstName" className={styles.label}>
            <span>First name</span>
            <input
              className={`${styles['input-field']} ${styles['input-field-text']}`}
              id="firstName"
              type="text"
              {...register('firstName', {
                required: 'This field is required',
                pattern: {
                  value: /^[A-Za-z]+$/,
                  message:
                    'First name must not contain special characters or numbers',
                },
              })}
            />
            {errors.firstName && (
              <div className={styles.errorMessage}>
                {errors.firstName.message}
              </div>
            )}
          </label>

          <label htmlFor="lastName" className={styles.label}>
            <span>Last name</span>
            <input
              className={`${styles['input-field']} ${styles['input-field-text']}`}
              id="lastName"
              type="text"
              {...register('lastName', {
                required: 'This field is required',
                pattern: {
                  value: /^[A-Za-z]+$/,
                  message:
                    'Last name must not contain special characters or numbers',
                },
              })}
            />
            {errors.lastName && (
              <div className={styles.errorMessage}>
                {errors.lastName.message}
              </div>
            )}
          </label>
          <label htmlFor="dateOfBirth" className={styles.label}>
            <span>Date of birth</span>
            <input
              className={`${styles['input-field']} ${styles['input-field-text']}`}
              id="dateOfBirth"
              type="date"
              {...register('dateOfBirth', {
                required: 'This field is required',
                validate: {
                  validAge: (value) =>
                    validateAge(value) || 'You must be at least 13 years old',
                },
              })}
            />
            {errors.dateOfBirth && (
              <div className={styles.errorMessage}>
                {errors.dateOfBirth.message}
              </div>
            )}
          </label>
        </div>
        <h3>Sign-in Information</h3>
        <div className={styles.inputWrapper}>
          <label htmlFor="email" className={styles.label}>
            <span>Email</span>
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
            <span>Password</span>
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

          <label htmlFor="confirmPassword" className={styles.label}>
            <span>Confirm password</span>
            <input
              className={`${styles['input-field']} ${styles['input-field-text']}`}
              id="confirmPassword"
              type="password"
              {...register('confirmPassword', {
                required: 'This field is required',
                validate: (value) => value === pass || 'Passwords do not match',
              })}
            />
            {errors.confirmPassword && (
              <div className={styles.errorMessage}>
                {errors.confirmPassword.message}
              </div>
            )}
          </label>
        </div>
        <h3>Shipping Address</h3>
        <div className={styles.inputWrapper}>
          <label htmlFor="street" className={styles.label}>
            <span>Street</span>
            <input
              className={`${styles['input-field']} ${styles['input-field-text']}`}
              id="street"
              type="text"
              {...register('addressShipping.street', {
                required: 'This field is required',
              })}
            />
            {errors.addressShipping?.street && (
              <div className={styles.errorMessage}>
                {errors.addressShipping?.street.message}
              </div>
            )}
          </label>

          <label htmlFor="city" className={styles.label}>
            <span>City</span>
            <input
              className={`${styles['input-field']} ${styles['input-field-text']}`}
              id="city"
              type="text"
              {...register('addressShipping.city', {
                required: 'This field is required',
                pattern: {
                  value: /^[a-z0-9][a-z0-9\- ]{0,10}[a-z0-9]$/i,
                  message:
                    'City must not contain special characters or numbers',
                },
              })}
            />
            {errors.addressShipping?.city && (
              <div className={styles.errorMessage}>
                {errors.addressShipping?.city.message}
              </div>
            )}
          </label>
          <label htmlFor="code" className={styles.label}>
            <span>Postal code</span>
            <input
              className={`${styles['input-field']} ${styles['input-field-text']}`}
              id="code"
              type="text"
              {...register('addressShipping.postalCode', {
                required: 'This field is required',
                pattern: {
                  value: /^[A-Za-z]+$/,
                  message: 'Invalid postal code',
                },
              })}
            />
            {errors.addressShipping?.postalCode && (
              <div className={styles.errorMessage}>
                {errors.addressShipping?.postalCode.message}
              </div>
            )}
          </label>
          <label htmlFor="country" className={styles.label}>
            <span>Country</span>
            <select
              className={`${styles['input-field']} ${styles['input-field-text']}`}
              id="country"
              defaultValue=""
              {...register('addressShipping.country', {
                required: 'This field is required',
              })}
            >
              <option value="" disabled>
                Select your country:
              </option>
              <option value="DE">Germany</option>
              <option value="BY">Belarus</option>
              <option value="AM">Armenia</option>
            </select>
            {errors.addressShipping?.country && (
              <div className={styles.errorMessage}>
                {errors.addressShipping?.country.message}
              </div>
            )}
          </label>
          <ToggleSwitch
            label="Set as default address"
            isChecked={isCheckedDefaultAddressShipping}
            onChange={handleSetDefaultAddressShipping}
          />
          <ToggleSwitch
            label="Also use as billing address"
            isChecked={isCheckedUseAsBillingAddress}
            onChange={handleSetBillingAddress}
          />
        </div>

        {!isCheckedDefaultAddressBilling && (
          <>
            <h3>Billing Address</h3>
            {/* <pre>{JSON.stringify(isCheckedDefaultAddressBilling, null, 2)}</pre> */}
            <div className={styles.inputWrapper}>
              <label htmlFor="streetBilling" className={styles.label}>
                <span>Street</span>
                <input
                  className={`${styles['input-field']} ${styles['input-field-text']}`}
                  id="streetBilling"
                  type="text"
                  {...register('addressBilling.street', {
                    required: 'This field is required',
                  })}
                />
                {errors.addressBilling?.street && (
                  <div className={styles.errorMessage}>
                    {errors.addressBilling?.street.message}
                  </div>
                )}
              </label>

              <label htmlFor="cityBilling" className={styles.label}>
                <span>City</span>
                <input
                  className={`${styles['input-field']} ${styles['input-field-text']}`}
                  id="cityBilling"
                  type="text"
                  {...register('addressBilling.city', {
                    required: 'This field is required',
                    pattern: {
                      value: /^[a-z0-9][a-z0-9\- ]{0,10}[a-z0-9]$/i,
                      message:
                        'City must not contain special characters or numbers',
                    },
                  })}
                />
                {errors.addressBilling?.city && (
                  <div className={styles.errorMessage}>
                    {errors.addressBilling?.city.message}
                  </div>
                )}
              </label>
              <label htmlFor="codeBilling" className={styles.label}>
                <span>Postal code</span>
                <input
                  className={`${styles['input-field']} ${styles['input-field-text']}`}
                  id="codeBilling"
                  type="text"
                  {...register('addressBilling.postalCode', {
                    required: 'This field is required',
                    pattern: {
                      value: /^[A-Za-z]+$/,
                      message: 'Invalid postal code',
                    },
                  })}
                />
                {errors.addressBilling?.postalCode && (
                  <div className={styles.errorMessage}>
                    {errors.addressBilling?.postalCode.message}
                  </div>
                )}
              </label>
              <label htmlFor="countryBilling" className={styles.label}>
                <span>Country</span>
                <select
                  className={`${styles['input-field']} ${styles['input-field-text']}`}
                  id="countryBilling"
                  defaultValue=""
                  {...register('addressBilling.country', {
                    required: 'This field is required',
                  })}
                >
                  <option value="" disabled>
                    Select your country:
                  </option>
                  <option value="DE">Germany</option>
                  <option value="BY">Belarus</option>
                  <option value="AM">Armenia</option>
                </select>
                {errors.addressBilling?.country && (
                  <div className={styles.errorMessage}>
                    {errors.addressBilling?.country.message}
                  </div>
                )}
              </label>
              <ToggleSwitch
                label="Set as default address"
                isChecked={isCheckedDefaultAddressBilling}
                onChange={handleSetDefaultAddressBilling}
              />
            </div>
          </>
        )}

        <button
          className={`${styles['button-large']} ${styles['button-primary']}`}
          type="submit"
          disabled={!isValid}
        >
          Submit
        </button>

        <div>Already have an account?</div>
        <Link className={styles.link} to="/login">
          Login
        </Link>
      </form>
    </div>
  );
};

export default RegistrationPage;
