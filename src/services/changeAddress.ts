import { User } from '@/types/UserType';

interface Address {
  id?: string;
  streetName: string;
  postalCode: string;
  city: string;
  country: string;
}

interface ChangeAddressData {
  customerId: string;
  version: number;
  addressId: string;
  address: Address;
  defaultShipping?: boolean;
  addShippingAddress?: string | null;
  defaultBilling?: boolean;
  addBillingAddress?: string | null;
  removeShippingAddress?: string | null;
  removeBillingAddress?: string | null;
}

const fetchCustomer = async (customerId: string): Promise<User | null> => {
  try {
    const token = localStorage.getItem('userAccessToken');
    if (!token) {
      throw new Error('No token found');
    }

    const response = await fetch(
      `${import.meta.env.VITE_CTP_API_URL}/rssecommercefinal/customers/${customerId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error('Failed to fetch customer');
    }

    const customer: User = await response.json();
    return customer;
  } catch (error) {
    return null;
  }
};

const changeAddress = async (
  data: ChangeAddressData,
): Promise<{ user: User; addressId: string | null } | null> => {
  try {
    const token = localStorage.getItem('userAccessToken');
    if (!token) {
      throw new Error('No token found');
    }

    const customer = await fetchCustomer(data.customerId);
    if (!customer) {
      throw new Error('Customer not found');
    }

    const actions: Array<{
      action: string;
      address?: Address;
      addressId?: string;
    }> = [
      {
        action: 'changeAddress',
        addressId: data.addressId,
        address: data.address,
      },
    ];

    if (data.removeShippingAddress) {
      actions.push({
        action: 'removeShippingAddressId',
        addressId: data.addressId,
      });
    }

    if (data.removeBillingAddress) {
      if (customer.billingAddressIds.includes(data.addressId)) {
        actions.push({
          action: 'removeBillingAddressId',
          addressId: data.addressId,
        });
      }
    }

    if (data.addShippingAddress) {
      actions.push({
        action: 'addShippingAddressId',
        addressId: data.addressId,
      });
    }

    if (data.addBillingAddress) {
      actions.push({
        action: 'addBillingAddressId',
        addressId: data.addressId,
      });
    }

    actions.push({
      action: 'setDefaultShippingAddress',
      addressId: data.defaultShipping ? data.addressId : undefined,
    });

    actions.push({
      action: 'setDefaultBillingAddress',
      addressId: data.defaultBilling ? data.addressId : undefined,
    });

    const response = await fetch(
      `${import.meta.env.VITE_CTP_API_URL}/rssecommercefinal/customers/${data.customerId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          version: data.version,
          actions,
        }),
      },
    );

    if (!response.ok) {
      throw new Error('Failed to change address');
    }

    const updatedUser: User = await response.json();
    return { user: updatedUser, addressId: data.addressId };
  } catch (error) {
    return null;
  }
};

export default changeAddress;
