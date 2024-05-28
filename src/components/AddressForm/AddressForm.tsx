import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import { clsx } from 'clsx';
import { User } from '@/types/UserType';
import styles from '@/pages/RegistrationPage/RegistrationPage.module.scss';
import stylesAddress from '@/components/AddressForm/AddressForm.module.scss';

const AddressForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({ mode: 'onChange' });

  const [postalPattern] = useState<RegExp | undefined>(undefined);

  /*   const countryPostalPatterns: Record<string, RegExp> = {
    DE: /^[0-9]{5}$/,
    BY: /^[0-9]{6}$/,
    AM: /^[0-9]{4}$/,
  }; */

  const onSubmit: SubmitHandler<User> = async () => {
    return true;
  };

  const [isDefaultAddress, setIsDefaultAddress] = useState(false);
  const [isEditModeAddress, setIsEditModeAddress] = useState(false);
  const handleDefaultAddress = () => {
    setIsDefaultAddress(!isDefaultAddress);
  };

  const editAddress = () => {
    setIsEditModeAddress(!isEditModeAddress);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.inputWrapper}>
        <label htmlFor="country" className={styles.label}>
          <span>Country</span>
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
            disabled={!isEditModeAddress}
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
          <span>Street</span>
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
            disabled={!isEditModeAddress}
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
            disabled={!isEditModeAddress}
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
            disabled={!isEditModeAddress}
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
            checked={isDefaultAddress}
            onChange={handleDefaultAddress}
            id="addressShipping.isDefaultAddress"
            disabled={!isEditModeAddress}
          />
          <span className={styles['toggle-slider']} />
          <span className={styles['toggle-switch-label']}>
            Set as default address
          </span>
        </label>

        <button
          id="edit-button"
          className={clsx(
            styles['button-small'],
            styles['button-primary'],
            stylesAddress['edit-button'],
          )}
          type="submit"
          onClick={editAddress}
        >
          edit
        </button>
      </div>
    </form>
  );
};

export default AddressForm;
