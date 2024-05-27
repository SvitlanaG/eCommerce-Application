import { Link, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { clsx } from 'clsx';
import { User } from '@/types/UserType';
import { registration } from '@/services/auth';
import { setLoggedIn } from '@/store/user/userSlice';
import openEye from '@/assets/icons/eyeOpen.svg';
import closedEye from '@/assets/icons/eyeClosed.svg';
import styles from '@/pages/RegistrationPage/RegistrationPage.module.scss';
import validatePassword from '@/helpers/validatePassword';
import validateAge from '@/helpers/validateAge';

const RegistrationForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm<User>({ mode: 'onChange' });
  const password = watch('password');

  const [postalPattern, setPostalPattern] = useState<RegExp | undefined>(
    undefined,
  );
  const [postalBillingPattern, setPostalBillingPattern] = useState<
    RegExp | undefined
  >(undefined);
  const countryPostalPatterns: Record<string, RegExp> = {
    DE: /^[0-9]{5}$/,
    BY: /^[0-9]{6}$/,
    AM: /^[0-9]{4}$/,
  };
  const watchBilling = watch('addressBilling.country');
  const watchShipping = watch('addressShipping.country');

  useEffect(() => {
    if (watchBilling) {
      setPostalBillingPattern(countryPostalPatterns[watchBilling]);
    }
    if (watchShipping) {
      setPostalPattern(countryPostalPatterns[watchShipping]);
    }
  }, [watchShipping, watchBilling]);

  const onSubmit: SubmitHandler<User> = async (data) => {
    await registration(data, navigate);
    if (localStorage.getItem('userAccessToken')) {
      dispatch(setLoggedIn());
      reset();
    }
  };

  const [isShippingAddress, setIsShippingAddress] = useState(false);
  const handleShippingAddress = () => {
    setIsShippingAddress(!isShippingAddress);
  };
  const [isDefaultAddressBilling, setIsDefaultAddressBilling] = useState(false);

  const handleDefaultAddressBilling = () => {
    setIsDefaultAddressBilling(!isDefaultAddressBilling);
  };
  const [isBillingAddress, setIsBillingAddress] = useState(false);

  const handleBillingAddress = () => {
    setIsBillingAddress(!isBillingAddress);
    setIsDefaultAddressBilling(false);
    setValue('addressBilling.street', '', { shouldValidate: true });
    setValue('addressBilling.city', '', { shouldValidate: true });
    setValue('addressBilling.postalCode', '', { shouldValidate: true });
    setValue('addressBilling.country', '', { shouldValidate: true });
  };

  const [showPassword, setShowPassword] = useState(false);
  const [isConfirmPassword, setIsConfirmPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowConfirmPassword = () => {
    setIsConfirmPassword(!isConfirmPassword);
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h3>Personal Information</h3>
      <span className={clsx(styles['text-info'], styles['text-info-small'])}>
        Fields marked with * are required.
      </span>
      <div className={styles.inputWrapper}>
        <label htmlFor="firstName" className={styles.label}>
          <span>First name *</span>
          <input
            className={clsx(
              styles['input-field'],
              styles['input-field-text'],
              errors.firstName && styles.error,
            )}
            id="firstName"
            type="text"
            {...register('firstName', {
              required: 'This field is required',
              pattern: {
                value: /^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/,
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
          <span>Last name *</span>
          <input
            className={clsx(
              styles['input-field'],
              styles['input-field-text'],
              errors.lastName && styles.error,
            )}
            id="lastName"
            type="text"
            {...register('lastName', {
              required: 'This field is required',
              pattern: {
                value: /^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/,
                message:
                  'Last name must not contain special characters or numbers',
              },
            })}
          />
          {errors.lastName && (
            <div className={styles.errorMessage}>{errors.lastName.message}</div>
          )}
        </label>
        <label htmlFor="dateOfBirth" className={styles.label}>
          <span>Date of birth *</span>
          <input
            className={clsx(
              styles['input-field'],
              styles['input-field-text'],
              errors.dateOfBirth && styles.error,
            )}
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

        <label htmlFor="confirmPassword" className={styles.label}>
          <span>Confirm password *</span>
          <input
            className={clsx(
              styles['input-field'],
              styles['input-field-text'],
              errors.confirmPassword && styles.error,
            )}
            id="confirmPassword"
            type={isConfirmPassword ? 'text' : 'password'}
            {...register('confirmPassword', {
              required: 'This field is required',
              validate: (value) =>
                value === password || 'Passwords do not match',
            })}
          />
          <div className={styles.eye} onClick={handleShowConfirmPassword}>
            <img src={isConfirmPassword ? openEye : closedEye} alt="eye icon" />
          </div>

          {errors.confirmPassword && (
            <div className={styles.errorMessage}>
              {errors.confirmPassword.message}
            </div>
          )}
        </label>
      </div>
      <h3>Shipping Address</h3>
      <div className={styles.inputWrapper}>
        <label htmlFor="country" className={styles.label}>
          <span>Country *</span>
          <select
            className={clsx(
              styles['input-field'],
              styles['input-field-text'],
              errors.addressShipping?.country && styles.error,
            )}
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
        <label htmlFor="street" className={styles.label}>
          <span>Street *</span>
          <input
            className={clsx(
              styles['input-field'],
              styles['input-field-text'],
              errors.addressShipping?.street && styles.error,
            )}
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
          <span>City *</span>
          <input
            className={clsx(
              styles['input-field'],
              styles['input-field-text'],
              errors.addressShipping?.city && styles.error,
            )}
            id="city"
            type="text"
            {...register('addressShipping.city', {
              required: 'This field is required',
              pattern: {
                value: /^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/,
                message: 'City must not contain special characters or numbers',
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
          <span>Postal code *</span>
          <input
            className={clsx(
              styles['input-field'],
              styles['input-field-text'],
              errors.addressShipping?.postalCode && styles.error,
            )}
            id="code"
            type="text"
            {...register('addressShipping.postalCode', {
              required: 'This field is required',
              pattern: postalPattern
                ? {
                    value: postalPattern,
                    message: 'Invalid postal code',
                  }
                : undefined,
            })}
          />
          {errors.addressShipping?.postalCode && (
            <div className={styles.errorMessage}>
              {errors.addressShipping?.postalCode.message}
            </div>
          )}
        </label>

        <label
          htmlFor="addressShipping.isDefaultAddress"
          className={styles['toggle-switch']}
        >
          <input
            {...register('addressShipping.isDefaultAddress')}
            type="checkbox"
            checked={isShippingAddress}
            onChange={handleShippingAddress}
            id="addressShipping.isDefaultAddress"
          />
          <span className={styles['toggle-slider']} />
          <span className={styles['toggle-switch-label']}>
            Set as default address
          </span>
        </label>

        <label
          htmlFor="addressShipping.isBillingAddress"
          className={styles['toggle-switch']}
        >
          <input
            {...register('addressShipping.isBillingAddress')}
            type="checkbox"
            checked={isBillingAddress}
            onChange={handleBillingAddress}
            id="addressShipping.isBillingAddress"
          />
          <span className={styles['toggle-slider']} />
          <span className={styles['toggle-switch-label']}>
            Also use as billing address
          </span>
        </label>
      </div>

      {!isBillingAddress && (
        <>
          <h3>Billing Address</h3>
          <div className={styles.inputWrapper}>
            <label htmlFor="countryBilling" className={styles.label}>
              <span>Country *</span>
              <select
                className={clsx(
                  styles['input-field'],
                  styles['input-field-text'],
                  errors.addressBilling?.country && styles.error,
                )}
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
            <label htmlFor="streetBilling" className={styles.label}>
              <span>Street *</span>
              <input
                className={clsx(
                  styles['input-field'],
                  styles['input-field-text'],
                  errors.addressBilling?.street && styles.error,
                )}
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
              <span>City *</span>
              <input
                className={clsx(
                  styles['input-field'],
                  styles['input-field-text'],
                  errors.addressBilling?.city && styles.error,
                )}
                id="cityBilling"
                type="text"
                {...register('addressBilling.city', {
                  required: 'This field is required',
                  pattern: {
                    value: /^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/,
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
              <span>Postal code *</span>
              <input
                className={clsx(
                  styles['input-field'],
                  styles['input-field-text'],
                  errors.addressBilling?.postalCode && styles.error,
                )}
                id="codeBilling"
                type="text"
                {...register('addressBilling.postalCode', {
                  required: 'This field is required',
                  pattern: postalBillingPattern
                    ? {
                        value: postalBillingPattern,
                        message: 'Invalid postal code',
                      }
                    : undefined,
                })}
              />
              {errors.addressBilling?.postalCode && (
                <div className={styles.errorMessage}>
                  {errors.addressBilling?.postalCode.message}
                </div>
              )}
            </label>

            <label
              htmlFor="addressBilling.isDefaultAddress"
              className={styles['toggle-switch']}
            >
              <input
                {...register('addressBilling.isDefaultAddress')}
                type="checkbox"
                checked={isDefaultAddressBilling}
                onChange={handleDefaultAddressBilling}
                id="addressBilling.isDefaultAddress"
              />
              <span className={styles['toggle-slider']} />
              <span className={styles['toggle-switch-label']}>
                Set as default address
              </span>
            </label>
          </div>
        </>
      )}

      <button
        className={clsx(styles['button-large'], styles['button-primary'])}
        type="submit"
      >
        Submit
      </button>

      <div>Already have an account?</div>
      <Link className={styles.link} to="/login">
        Login
      </Link>
    </form>
  );
};

export default RegistrationForm;
