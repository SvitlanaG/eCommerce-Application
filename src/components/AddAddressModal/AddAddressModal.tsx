import { useState } from 'react';
import { clsx } from 'clsx';
import { useForm, SubmitHandler } from 'react-hook-form';
import Select from 'react-select';
import styles from '@/components/AddAddressModal/AddAddressModal.module.scss';
import { Address, User } from '@/types/UserType';
import addAddress from '@/services/addAddress';
import Toast from '@/helpers/Toast';

interface AddAddressModalProps {
  customer: User;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

interface OptionType {
  value: string;
  label: string;
}

const AddAddressModal = ({
  customer,
  isOpen,
  onClose,
}: AddAddressModalProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
    reset,
  } = useForm<Address>({ mode: 'onChange', defaultValues: {} });

  const countryPostalPatterns: Record<string, RegExp> = {
    DE: /^[0-9]{5}$/,
    BY: /^[0-9]{6}$/,
    AM: /^[0-9]{4}$/,
  };

  const optionsAddressType: OptionType[] = [
    { value: 'shipping', label: 'Shipping' },
    { value: 'billing', label: 'Billing' },
  ];

  const optionsAddressDefault: OptionType[] = [
    { value: 'defaultShipping', label: 'Default shipping' },
    { value: 'defaultBilling', label: 'Default billing' },
  ];

  const selectedCountry = watch('country');

  const [selectedAddressTypes, setSelectedAddressTypes] = useState<
    OptionType[]
  >([]);
  const [selectedDefaultAddresses, setSelectedDefaultAddresses] = useState<
    OptionType[]
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
      Toast({
        message: 'Address added successfully',
        status: 'success',
      });
      onClose();
    } else {
      Toast({ message: 'Failed to add address', status: 'error' });
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleCancel = () => {
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalBackdrop} onClick={handleBackdropClick}>
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
                <div className={styles.errorMessage}>
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
                    message:
                      'City must not contain special characters or numbers',
                  },
                })}
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
              />
              {errors.postalCode && (
                <div className={styles.errorMessage}>
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
                onChange={(selected) => {
                  setSelectedAddressTypes(selected as OptionType[]);
                  setValue(
                    'addressTypes',
                    (selected as OptionType[]).map((option) => option.value),
                  );
                }}
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
                onChange={(selected) => {
                  setSelectedDefaultAddresses(selected as OptionType[]);
                  setValue(
                    'defaultAddresses',
                    (selected as OptionType[]).map((option) => option.value),
                  );
                }}
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
