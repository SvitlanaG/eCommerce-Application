import { useState } from 'react';
import { clsx } from 'clsx';
import { useForm, SubmitHandler } from 'react-hook-form';
import Select, { MultiValue } from 'react-select';
import styles from '@/components/AddAddressModal/AddAddressModal.module.scss';
import { Address } from '@/types/UserType';
import addAddress from '@/services/addAddress';
import Toast from '@/helpers/Toast';
import {
  countryPostalPatterns,
  optionsAddressType,
  optionsAddressDefault,
} from '@/helpers/constants';
import { OptionType } from '@/types/optionType';
import { AddAddressModalProps } from '@/types/Props';
import handleBackdropClick from '@/hooks/useModalConfig';

const AddAddressModal = ({
  customer,
  isOpen,
  onClose,
  onChangeAddress,
}: AddAddressModalProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
    reset,
  } = useForm<Address>({ mode: 'onChange', defaultValues: {} });

  const selectedCountry = watch('country');

  const [selectedAddressTypes, setSelectedAddressTypes] = useState<
    MultiValue<OptionType>
  >([]);
  const [selectedDefaultAddresses, setSelectedDefaultAddresses] = useState<
    MultiValue<OptionType>
  >([]);

  const onSubmit: SubmitHandler<Address> = async (data) => {
    const newAddress = {
      streetName: data.streetName,
      postalCode: data.postalCode,
      city: data.city,
      country: data.country,
    };

    const addressTypes = selectedAddressTypes.map((option) => option.value);
    const defaultAddresses = selectedDefaultAddresses.map(
      (option) => option.value,
    );

    const updatedUser = await addAddress({
      customerId: customer.id,
      version: customer.version,
      address: newAddress,
      defaultShipping: defaultAddresses.includes('defaultShipping'),
      addShippingAddress: addressTypes.includes('shipping'),
      defaultBilling: defaultAddresses.includes('defaultBilling'),
      addBillingAddress: addressTypes.includes('billing'),
    });

    if (updatedUser) {
      onChangeAddress();
      Toast({
        message: 'Address added successfully',
        status: 'success',
      });
      onClose();
    } else {
      Toast({ message: 'Failed to add address', status: 'error' });
    }
  };

  const handleCancel = () => {
    reset();
    onClose();
  };

  const handleAddressTypes = (newValue: MultiValue<OptionType>) => {
    setSelectedAddressTypes(newValue);
    setValue(
      'addressTypes',
      newValue.map((option) => option.value),
    );
  };

  const handleDefaultAddresses = (newValue: MultiValue<OptionType>) => {
    setSelectedDefaultAddresses(newValue);
    setValue(
      'defaultAddresses',
      newValue.map((option) => option.value),
    );
  };

  if (!isOpen) return null;

  return (
    <div
      className={styles['modal-backdrop']}
      onClick={(e) => handleBackdropClick(e, onClose)}
    >
      <div className={styles.modal}>
        <h2>Add new Address</h2>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles['input-wrapper']}>
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
              >
                <option value="" disabled>
                  Select your country:
                </option>
                <option value="DE">Germany</option>
                <option value="BY">Belarus</option>
                <option value="AM">Armenia</option>
              </select>
              {errors.country && (
                <div className={styles['error-message']}>
                  {errors.country.message}
                </div>
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
              />
              {errors.streetName && (
                <div className={styles['error-message']}>
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
                    message:
                      'City must not contain special characters or numbers',
                  },
                })}
              />
              {errors.city && (
                <div className={styles['error-message']}>
                  {errors.city.message}
                </div>
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
              />
              {errors.postalCode && (
                <div className={styles['error-message']}>
                  {errors.postalCode.message}
                </div>
              )}
            </label>
            {/*  eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="addressType" className={styles.label}>
              <span>Address Type</span>
              <Select
                options={optionsAddressType}
                className={styles['multi-select']}
                inputId="addressType"
                isMulti
                value={selectedAddressTypes}
                onChange={handleAddressTypes}
              />
            </label>
            {/*  eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="defaultAddress" className={styles.label}>
              <span>Default Address</span>
              <Select
                options={optionsAddressDefault}
                className={styles['multi-select']}
                inputId="defaultAddress"
                isMulti
                value={selectedDefaultAddresses}
                onChange={handleDefaultAddresses}
              />
            </label>
            <span />
            <div className={styles.buttons}>
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
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAddressModal;
