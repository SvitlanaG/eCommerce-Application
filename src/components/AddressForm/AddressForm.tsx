import { useState, useEffect } from 'react';
import { clsx } from 'clsx';
import { useForm, SubmitHandler } from 'react-hook-form';
import Select from 'react-select';
import styles from '@/pages/RegistrationPage/RegistrationPage.module.scss';
import stylesAddress from '@/components/AddressForm/AddressForm.module.scss';
import { Address, User } from '@/types/UserType';
import removeAddress from '@/services/removeAddress';
import Toast from '@/helpers/Toast';

interface AddressFormProps {
  customer: User;
  initialValues: Address;
  addressTypes?: string[];
  defaultAddresses?: string[];
}

interface OptionType {
  value: string;
  label: string;
}

const AddressForm = ({
  customer,
  initialValues,
  addressTypes,
  defaultAddresses,
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

  const optionsAddressType: OptionType[] = [
    { value: 'shipping', label: 'Shipping' },
    { value: 'billing', label: 'Billing' },
  ];

  const optionsAddressDefault: OptionType[] = [
    { value: 'defaultShipping', label: 'Default shipping' },
    { value: 'defaultBilling', label: 'Default billing' },
  ];

  const [isEditModeAddress, setIsEditModeAddress] = useState(false);
  const selectedCountry = watch('country');

  const findOption = (options: OptionType[], value: string) =>
    options.find((option) => option.value === value);

  const initialSelectedAddressTypes = addressTypes
    ?.map((type) => findOption(optionsAddressType, type))
    .filter(Boolean) as OptionType[];

  const initialSelectedDefaultAddresses = defaultAddresses
    ?.map((type) => findOption(optionsAddressDefault, type))
    .filter(Boolean) as OptionType[];

  const [selectedAddressTypes, setSelectedAddressTypes] = useState<
    OptionType[]
  >(initialSelectedAddressTypes);
  const [selectedDefaultAddresses, setSelectedDefaultAddresses] = useState<
    OptionType[]
  >(initialSelectedDefaultAddresses);

  useEffect(() => {
    setSelectedAddressTypes(initialSelectedAddressTypes);
    setSelectedDefaultAddresses(initialSelectedDefaultAddresses);
  }, [initialSelectedAddressTypes, initialSelectedDefaultAddresses]);

  const onSubmit: SubmitHandler<Address> = async (data) => {
    // Handle form submission
    data.addressTypes = selectedAddressTypes.map((option) => option.value);
    data.defaultAddresses = selectedDefaultAddresses.map(
      (option) => option.value,
    );
    console.log(data);
  };

  const handleEditAddress = () => {
    setIsEditModeAddress(!isEditModeAddress);
  };

  const handleCancel = () => {
    setSelectedAddressTypes(initialSelectedAddressTypes);
    setSelectedDefaultAddresses(initialSelectedDefaultAddresses);
    setIsEditModeAddress(false);
  };

  const handleDeleteAddress = async (addressId: string) => {
    const customerId = customer.id;
    const { version } = customer;
    const updatedUser = await removeAddress({
      customerId,
      version,
      addressId,
    });
    if (updatedUser) {
      Toast({
        message: 'Address removed successfully',
        status: 'success',
      });
    } else {
      Toast({ message: 'Failed to remove address', status: 'error' });
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={stylesAddress['wrapper-address-form']}>
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
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor="addressType" className={styles.label}>
          <span>Address Type</span>
          <Select
            options={optionsAddressType}
            className={styles['multi-select']}
            inputId="addressType"
            isMulti
            isDisabled={!isEditModeAddress}
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
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor="defaultAddress" className={styles.label}>
          <span>Default Address</span>
          <Select
            options={optionsAddressDefault}
            className={styles['multi-select']}
            inputId="defaultAddress"
            isMulti
            isDisabled={!isEditModeAddress}
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
        {!isEditModeAddress ? (
          <div className={stylesAddress.buttons}>
            <button
              className={clsx(
                styles['button-small'],
                styles['button-secondary'],
              )}
              type="button"
              onClick={() => handleDeleteAddress(initialValues.id)}
            >
              Delete
            </button>
            <button
              className={clsx(styles['button-small'], styles['button-primary'])}
              type="button"
              onClick={handleEditAddress}
            >
              Edit
            </button>
          </div>
        ) : (
          <div className={stylesAddress.buttons}>
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
                stylesAddress['save-button'],
              )}
              type="submit"
            >
              Save
            </button>
          </div>
        )}
      </div>
    </form>
  );
};

AddressForm.defaultProps = {
  addressTypes: [],
  defaultAddresses: [],
};

export default AddressForm;
