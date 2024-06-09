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
import { countryPostalPatterns } from '@/helpers/constants';
import { handleShowPassword } from '@/hooks/usePasswordManager';

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

  const watchShippingCountry = watch('addresses.0.country');
  const watchBillingCountry = watch('addresses.1.country');

  useEffect(() => {
    if (watchShippingCountry) {
      setPostalPattern(countryPostalPatterns[watchShippingCountry]);
    }
    if (watchBillingCountry) {
      setPostalBillingPattern(countryPostalPatterns[watchBillingCountry]);
    }
  }, [watchShippingCountry, watchBillingCountry]);

  const onSubmit: SubmitHandler<User> = async (data) => {
    await registration(data, navigate);
    if (localStorage.getItem('userAccessToken')) {
      dispatch(setLoggedIn());
      reset();
    }
  };

  const [isDefaultShippingAddress, setIsDefaultShippingAddress] =
    useState(false);
  const handleDefaultShippingAddress = () => {
    setIsDefaultShippingAddress(!isDefaultShippingAddress);
  };

  const [isDefaultBillingAddress, setIsDefaultBillingAddress] = useState(false);
  const handleDefaultBillingAddress = () => {
    setIsDefaultBillingAddress(!isDefaultBillingAddress);
  };

  const [isBillingAddress, setIsBillingAddress] = useState(false);
  const handleBillingAddress = () => {
    setIsBillingAddress(!isBillingAddress);
    setIsDefaultBillingAddress(false);
    setValue('addresses.1.streetName', '', { shouldValidate: true });
    setValue('addresses.1.city', '', { shouldValidate: true });
    setValue('addresses.1.postalCode', '', { shouldValidate: true });
    setValue('addresses.1.country', '', { shouldValidate: true });
  };

  const [showPassword, setShowPassword] = useState(false);
  const [isConfirmPassword, setIsConfirmPassword] = useState(false);

  const handleShowConfirmPassword = () => {
    setIsConfirmPassword(!isConfirmPassword);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h3>Personal Information</h3>
      <span className={clsx(styles['text-info1'], styles['text-info1-small'])}>
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
          <div
            className={styles.eye}
            onClick={() => handleShowPassword(showPassword, setShowPassword)}
          >
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
        <label htmlFor="countryShipping" className={styles.label}>
          <span>Country *</span>
          <select
            className={clsx(
              styles['input-field'],
              styles['input-field-text'],
              errors.addresses?.[0]?.country && styles.error,
            )}
            id="countryShipping"
            defaultValue=""
            {...register('addresses.0.country', {
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
          {errors.addresses?.[0]?.country && (
            <div className={styles.errorMessage}>
              {errors.addresses[0].country.message}
            </div>
          )}
        </label>

        <label htmlFor="streetShipping" className={styles.label}>
          <span>Street *</span>
          <input
            className={clsx(
              styles['input-field'],
              styles['input-field-text'],
              errors.addresses?.[0]?.streetName && styles.error,
            )}
            id="streetShipping"
            type="text"
            {...register('addresses.0.streetName', {
              required: 'This field is required',
              pattern: {
                value: /^[a-zA-Z0-9\s,'-]*$/,
                message: 'Invalid street name',
              },
            })}
          />
          {errors.addresses?.[0]?.streetName && (
            <div className={styles.errorMessage}>
              {errors.addresses[0].streetName.message}
            </div>
          )}
        </label>

        <label htmlFor="cityShipping" className={styles.label}>
          <span>City *</span>
          <input
            className={clsx(
              styles['input-field'],
              styles['input-field-text'],
              errors.addresses?.[0]?.city && styles.error,
            )}
            id="cityShipping"
            type="text"
            {...register('addresses.0.city', {
              required: 'This field is required',
              pattern: {
                value: /^[a-zA-Z\s-]*$/,
                message: 'Invalid city name',
              },
            })}
          />
          {errors.addresses?.[0]?.city && (
            <div className={styles.errorMessage}>
              {errors.addresses[0].city.message}
            </div>
          )}
        </label>

        <label htmlFor="postalShipping" className={styles.label}>
          <span>Postal Code *</span>
          <input
            className={clsx(
              styles['input-field'],
              styles['input-field-text'],
              errors.addresses?.[0]?.postalCode && styles.error,
            )}
            id="postalShipping"
            type="text"
            {...register('addresses.0.postalCode', {
              required: 'This field is required',
              pattern: postalPattern
                ? {
                    value: postalPattern,
                    message: 'Invalid postal code',
                  }
                : undefined,
            })}
          />
          {errors.addresses?.[0]?.postalCode && (
            <div className={styles.errorMessage}>
              {errors.addresses[0].postalCode.message}
            </div>
          )}
        </label>

        <label
          htmlFor="addressShipping.isDefaultAddress"
          className={styles['toggle-switch']}
        >
          <input
            {...register('addresses.0.isDefaultAddress')}
            type="checkbox"
            checked={isDefaultShippingAddress}
            onChange={handleDefaultShippingAddress}
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
            {...register('addresses.0.isBillingAddress')}
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
                  errors.addresses?.[1]?.country && styles.error,
                )}
                id="countryBilling"
                defaultValue=""
                {...register('addresses.1.country', {
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
              {errors.addresses?.[1]?.country && (
                <div className={styles.errorMessage}>
                  {errors.addresses[1].country.message}
                </div>
              )}
            </label>

            <label htmlFor="streetBilling" className={styles.label}>
              <span>Street *</span>
              <input
                className={clsx(
                  styles['input-field'],
                  styles['input-field-text'],
                  errors.addresses?.[1]?.streetName && styles.error,
                )}
                id="streetBilling"
                type="text"
                {...register('addresses.1.streetName', {
                  required: 'This field is required',
                  pattern: {
                    value: /^[a-zA-Z0-9\s,'-]*$/,
                    message: 'Invalid street name',
                  },
                })}
              />
              {errors.addresses?.[1]?.streetName && (
                <div className={styles.errorMessage}>
                  {errors.addresses[1].streetName.message}
                </div>
              )}
            </label>

            <label htmlFor="cityBilling" className={styles.label}>
              <span>City *</span>
              <input
                className={clsx(
                  styles['input-field'],
                  styles['input-field-text'],
                  errors.addresses?.[1]?.city && styles.error,
                )}
                id="cityBilling"
                type="text"
                {...register('addresses.1.city', {
                  required: 'This field is required',
                  pattern: {
                    value: /^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/,
                    message:
                      'City must not contain special characters or numbers',
                  },
                })}
              />
              {errors.addresses?.[1]?.city && (
                <div className={styles.errorMessage}>
                  {errors.addresses[1].city.message}
                </div>
              )}
            </label>

            <label htmlFor="postalBilling" className={styles.label}>
              <span>Postal Code *</span>
              <input
                className={clsx(
                  styles['input-field'],
                  styles['input-field-text'],
                  errors.addresses?.[1]?.postalCode && styles.error,
                )}
                id="postalBilling"
                type="text"
                {...register('addresses.1.postalCode', {
                  required: 'This field is required',
                  pattern: postalBillingPattern
                    ? {
                        value: postalBillingPattern,
                        message: 'Invalid postal code',
                      }
                    : undefined,
                })}
              />
              {errors.addresses?.[1]?.postalCode && (
                <div className={styles.errorMessage}>
                  {errors.addresses[1].postalCode.message}
                </div>
              )}
            </label>

            <label
              htmlFor="addressBilling.isDefaultAddress"
              className={styles['toggle-switch']}
            >
              <input
                {...register('addresses.1.isDefaultAddress')}
                type="checkbox"
                checked={isDefaultBillingAddress}
                onChange={handleDefaultBillingAddress}
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
        type="submit"
        className={clsx(styles['button-large'], styles['button-primary'])}
      >
        Register
      </button>

      <div>Already have an account?</div>
      <Link className={styles.link} to="/login">
        Login
      </Link>
    </form>
  );
};

export default RegistrationForm;
