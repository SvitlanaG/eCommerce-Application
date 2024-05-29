import { useEffect, useState } from 'react';
import { clsx } from 'clsx';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styles from '@/pages/RegistrationPage/RegistrationPage.module.scss';
import stylesProfile from '@/pages/ProfilePage/ProfilePage.module.scss';
import { User } from '@/types/UserType';
import getCustomer from '@/services/getCustomer';
import AddressForm from '@/components/AddressForm/AddressForm';
import validateAge from '@/helpers/validateAge';
import Toast from '@/helpers/Toast';

const ProfilePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('userAccessToken')) {
      setTimeout(() => navigate('/'), 300);
      Toast({ message: 'User is not logged in', status: 'error' });
    }
  }, [navigate]);

  const [customer, setCustomer] = useState<User | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<User>({ mode: 'onChange' });

  useEffect(() => {
    getCustomer().then((data) => {
      if (data) {
        setCustomer(data);
        setValue('email', data.email);
        setValue('firstName', data.firstName);
        setValue('lastName', data.lastName);
        setValue('dateOfBirth', data.dateOfBirth);
      }
    });
  }, [setValue]);

  const onSubmit: SubmitHandler<User> = (/* data */) => {
    // console.log(data);
  };

  const [isEditModePersonalInfo, setIsEditModePersonalInfo] = useState(false);

  const editPersonalInfo = () => {
    setIsEditModePersonalInfo(!isEditModePersonalInfo);
  };

  const getAddressById = (id: string) =>
    customer?.addresses.find((address) => address.id === id);

  const defaultShippingAddress = getAddressById(
    customer?.defaultShippingAddressId || '',
  );
  const defaultBillingAddress = getAddressById(
    customer?.defaultBillingAddressId || '',
  );

  return (
    <div className={styles.registration}>
      <h2>Your Profile</h2>
      <pre>{JSON.stringify(customer, null, 2)}</pre>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h3>Personal Information</h3>
        <div className={stylesProfile.inputWrapper}>
          <label htmlFor="firstName" className={styles.label}>
            <span>First name</span>
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
              disabled={!isEditModePersonalInfo}
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
              disabled={!isEditModePersonalInfo}
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
              disabled={!isEditModePersonalInfo}
            />
            {errors.dateOfBirth && (
              <div className={styles.errorMessage}>
                {errors.dateOfBirth.message}
              </div>
            )}
          </label>

          <label htmlFor="email" className={styles.label}>
            <span>Email</span>
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
              disabled={!isEditModePersonalInfo}
            />
            {errors.email && (
              <div className={styles.errorMessage}>{errors.email.message}</div>
            )}
          </label>

          <span />
          <button
            className={clsx(styles['button-small'], styles['button-primary'])}
            type="button"
            onClick={editPersonalInfo}
          >
            Edit
          </button>
        </div>
      </form>

      <h3>Shipping Address</h3>
      {defaultShippingAddress && (
        <AddressForm
          addressType="shipping"
          initialValues={{
            ...defaultShippingAddress,
            isDefaultAddress:
              defaultShippingAddress.id === customer?.defaultShippingAddressId,
          }}
        />
      )}

      <h3>Billing Address</h3>
      {defaultBillingAddress && (
        <AddressForm
          addressType="billing"
          initialValues={{
            ...defaultBillingAddress,
            isDefaultAddress:
              defaultBillingAddress.id === customer?.defaultBillingAddressId,
          }}
        />
      )}
    </div>
  );
};

export default ProfilePage;
