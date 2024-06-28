import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, vi, Mock } from 'vitest';
import AddressForm from '@/components/AddressForm';
import { User, Address } from '@/types/UserType';
import changeAddress from '@/services/changeAddress';
import removeAddress from '@/services/removeAddress';
import Toast from '@/helpers/Toast';

vi.mock('@/services/changeAddress');
vi.mock('@/services/removeAddress');
vi.mock('@/helpers/Toast');

const mockCustomer: User = {
  id: '123',
  version: 1,
  email: 'test@example.com',
  password: 'password',
  firstName: 'John',
  lastName: 'Doe',
  dateOfBirth: '1990-01-01',
  addresses: [],
  shippingAddressIds: [],
  billingAddressIds: [],
};

const mockAddress: Address = {
  id: '456',
  streetName: 'Test Street',
  city: 'Test City',
  postalCode: '12345',
  country: 'DE',
  isDefaultAddress: false,
  isBillingAddress: false,
  addressTypes: ['shipping'],
  defaultAddresses: ['defaultShipping'],
};

const addressTypes = ['shipping'];
const defaultAddresses = ['defaultShipping'];

describe('AddressForm component', () => {
  it('submits the form with valid data', async () => {
    const mockOnChangeAddress = vi.fn();
    (changeAddress as Mock).mockResolvedValue(mockCustomer);

    render(
      <AddressForm
        customer={mockCustomer}
        initialValues={mockAddress}
        addressTypes={addressTypes}
        defaultAddresses={defaultAddresses}
        onChangeAddress={mockOnChangeAddress}
      />,
    );

    fireEvent.click(screen.getByText(/Edit/i));
    fireEvent.change(screen.getByLabelText(/City/i), {
      target: { value: 'New City' },
    });

    fireEvent.click(screen.getByText(/Save/i));

    await waitFor(() => {
      expect(changeAddress).toHaveBeenCalled();
      expect(mockOnChangeAddress).toHaveBeenCalled();
      expect(Toast).toHaveBeenCalledWith({
        message: 'Address changed successfully',
        status: 'success',
      });
    });
  });

  it('handles address deletion', async () => {
    const mockOnChangeAddress = vi.fn();
    (removeAddress as Mock).mockResolvedValue(mockCustomer);

    render(
      <AddressForm
        customer={mockCustomer}
        initialValues={mockAddress}
        addressTypes={addressTypes}
        defaultAddresses={defaultAddresses}
        onChangeAddress={mockOnChangeAddress}
      />,
    );

    fireEvent.click(screen.getByText(/Delete/i));

    await waitFor(() => {
      expect(removeAddress).toHaveBeenCalled();
      expect(mockOnChangeAddress).toHaveBeenCalled();
      expect(Toast).toHaveBeenCalledWith({
        message: 'Address removed successfully',
        status: 'success',
      });
    });
  });
});
