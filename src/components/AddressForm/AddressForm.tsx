import { useEffect, useState } from 'react';
import { clsx } from 'clsx';
import { useForm, SubmitHandler } from 'react-hook-form';
import styles from '@/pages/RegistrationPage/RegistrationPage.module.scss';
import stylesAddress from '@/components/AddressForm/AddressForm.module.scss';
import { Address } from '@/types/UserType';

interface AddressFormProps {
  addressType: 'shipping' | 'billing';
  // eslint-disable-next-line react/require-default-props
  initialValues?: Address;
  isDefaultAddress: boolean;
}

const AddressForm = ({
  addressType,
  initialValues,
  isDefaultAddress,
}: AddressFormProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm<Address>({ mode: 'onChange', defaultValues: initialValues });

  const countryPostalPatterns: Record<string, RegExp> = {
    DE: /^[0-9]{5}$/,
    BY: /^[0-9]{6}$/,
    AM: /^[0-9]{4}$/,
  };

  const [isEditModeAddress, setIsEditModeAddress] = useState(false);
  const selectedCountry = watch('country');

  useEffect(() => {
    if (initialValues) {
      setValue('isDefaultAddress', isDefaultAddress);
    }
  }, [initialValues, isDefaultAddress, setValue]);

  const onSubmit: SubmitHandler<Address> = async (/* data */) => {
    // Handle form submission here
    // console.log(data);
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
              errors.country && styles.error,
            )}
            id="country"
            {...register('country', {
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
          {errors.country && (
            <div className={styles.errorMessage}>{errors.country.message}</div>
          )}
        </label>
        <label htmlFor="streetName" className={styles.label}>
          <span>Street</span>
          <input
            className={clsx(
              styles['input-field'],
              styles['input-field-text'],
              errors.streetName && styles.error,
            )}
            id="streetName"
            type="text"
            {...register('streetName', {
              required: 'This field is required',
            })}
            disabled={!isEditModeAddress}
          />
          {errors.streetName && (
            <div className={styles.errorMessage}>
              {errors.streetName.message}
            </div>
          )}
        </label>

        <label htmlFor="city" className={styles.label}>
          <span>City</span>
          <input
            className={clsx(
              styles['input-field'],
              styles['input-field-text'],
              errors.city && styles.error,
            )}
            id="city"
            type="text"
            {...register('city', {
              required: 'This field is required',
              pattern: {
                value: /^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/,
                message: 'City must not contain special characters or numbers',
              },
            })}
            disabled={!isEditModeAddress}
          />
          {errors.city && (
            <div className={styles.errorMessage}>{errors.city.message}</div>
          )}
        </label>
        <label htmlFor="postalCode" className={styles.label}>
          <span>Postal code</span>
          <input
            className={clsx(
              styles['input-field'],
              styles['input-field-text'],
              errors.postalCode && styles.error,
            )}
            id="postalCode"
            type="text"
            {...register('postalCode', {
              required: 'This field is required',
              pattern: {
                value: countryPostalPatterns[selectedCountry] || /.*/,
                message: 'Invalid postal code',
              },
            })}
            disabled={!isEditModeAddress}
          />
          {errors.postalCode && (
            <div className={styles.errorMessage}>
              {errors.postalCode.message}
            </div>
          )}
        </label>

        <label htmlFor="isDefaultAddress" className={styles['toggle-switch']}>
          <input
            {...register('isDefaultAddress')}
            type="checkbox"
            id="isDefaultAddress"
            disabled={!isEditModeAddress}
          />
          <span className={styles['toggle-slider']} />
          <span className={styles['toggle-switch-label']}>
            Set as default address
          </span>
        </label>
        <button
          id={`${addressType}-edit-button`}
          className={clsx(
            styles['button-small'],
            styles['button-primary'],
            stylesAddress['edit-button'],
          )}
          type="button"
          onClick={editAddress}
        >
          Edit
        </button>
        {/* {isEditModeAddress && (
          <button
            className={clsx(
              styles['button-small'],
              styles['button-primary'],
              stylesAddress['save-button'],
            )}
            type="submit"
          >
            Save
          </button>
        )} */}
      </div>
    </form>
  );
};

export default AddressForm;
