import { useEffect, useState } from 'react';
import { clsx } from 'clsx';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLoggedIn } from '@/store/user/userSlice';
import styles from '@/pages/RegistrationPage/RegistrationPage.module.scss';
import stylesProfile from '@/pages/ProfilePage/ProfilePage.module.scss';
import { User } from '@/types/UserType';
import getCustomer from '@/services/getCustomer';
import AddressForm from '@/components/AddressForm/AddressForm';
import validateAge from '@/helpers/validateAge';
import Toast from '@/helpers/Toast';
import ChangePasswordModal from '@/components/ChangePasswordModal/ChangePasswordModal';
import updateCustomerData from '@/services/updateCustomer';

const ProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!localStorage.getItem('userAccessToken')) {
      setTimeout(() => navigate('/login'), 300);
      Toast({ message: 'You are not logged in', status: 'error' });
    }
  }, [navigate]);

  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] =
    useState(false);
  const handleOpenModal = () => setIsChangePasswordModalOpen(true);
  const handleCloseModal = () => setIsChangePasswordModalOpen(false);

  const logOut = () => {
    localStorage.removeItem('userAccessToken');
    dispatch(setLoggedIn());
    navigate('/login');
  };

  const handleChangePasswordSubmit = () => {
    handleCloseModal();
    logOut();
    Toast({
      message:
        'You have successfully changed your password! Please log in again.',
      status: 'success',
    });
  };

  const [customer, setCustomer] = useState<User | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
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

  const handleUpdateCustomer = async (data: User) => {
    if (customer) {
      const updateData = {
        id: customer.id,
        version: customer.version,
        firstName: data.firstName,
        lastName: data.lastName,
        dateOfBirth: data.dateOfBirth,
        email: data.email,
      };

      const updatedUser = await updateCustomerData(updateData);

      if (updatedUser) {
        setCustomer(updatedUser);
        Toast({
          message: 'Customer data updated successfully',
          status: 'success',
        });
      } else {
        Toast({ message: 'Failed to update customer data', status: 'error' });
      }
    }
  };

  const [isEditModePersonalInfo, setIsEditModePersonalInfo] = useState(false);
  const editPersonalInfo = () =>
    setIsEditModePersonalInfo(!isEditModePersonalInfo);

  const handleCancel = () => {
    if (customer) {
      setValue('email', customer.email);
      setValue('firstName', customer.firstName);
      setValue('lastName', customer.lastName);
      setValue('dateOfBirth', customer.dateOfBirth);
    }
    setIsEditModePersonalInfo(false);
    clearErrors();
  };

  const onSubmit: SubmitHandler<User> = (data) => {
    handleUpdateCustomer(data);
    setIsEditModePersonalInfo(false);
  };

  const getAddressTypes = (addressId: string) => {
    const types: string[] = [];
    if (customer?.shippingAddressIds.includes(addressId))
      types.push('shipping');
    if (customer?.billingAddressIds.includes(addressId)) types.push('billing');
    return types;
  };

  const getDefaultAddresses = (addressId: string) => {
    const addresses: string[] = [];
    if (customer?.defaultShippingAddressId === addressId)
      addresses.push('defaultShipping');
    if (customer?.defaultBillingAddressId === addressId)
      addresses.push('defaultBilling');
    return addresses;
  };

  return (
    <div className={styles.registration}>
      <h2>Your Profile</h2>
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
          {!isEditModePersonalInfo ? (
            <button
              className={clsx(styles['button-small'], styles['button-primary'])}
              type="button"
              onClick={editPersonalInfo}
            >
              Edit
            </button>
          ) : (
            <div className={stylesProfile.buttons}>
              <button
                className={clsx(
                  styles['button-small'],
                  styles['button-secondary'],
                )}
                type="button"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                className={clsx(
                  styles['button-small'],
                  styles['button-primary'],
                )}
                type="submit"
              >
                Save
              </button>
            </div>
          )}
        </div>
      </form>

      <button
        className={clsx(styles['button-large'], styles['button-secondary'])}
        type="button"
        onClick={handleOpenModal}
      >
        Change Password
      </button>

      <ChangePasswordModal
        isOpen={isChangePasswordModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleChangePasswordSubmit}
      />

      <h3>Address Information</h3>
      <div className={styles['max-width']}>
        {customer?.addresses?.map((address, index) => (
          <div key={address.id}>
            <h4>My Address Nr: {index + 1}</h4>
            <AddressForm
              customer={customer}
              initialValues={address}
              addressTypes={getAddressTypes(address.id)}
              defaultAddresses={getDefaultAddresses(address.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;
