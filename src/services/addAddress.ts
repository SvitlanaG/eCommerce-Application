import { User } from '@/types/UserType';

interface Address {
  id?: string;
  streetName: string;
  postalCode: string;
  city: string;
  country: string;
}

interface AddAddressData {
  customerId: string;
  version: number;
  address: Address;
  defaultShipping?: boolean;
  addShippingAddress?: boolean;
  defaultBilling?: boolean;
  addBillingAddress?: boolean;
}

const addAddress = async (
  data: AddAddressData,
): Promise<{ user: User; addressId: string | null } | null> => {
  try {
    const token = localStorage.getItem('userAccessToken');
    if (!token) {
      throw new Error('No token found');
    }

    const actions: Array<{
      action: string;
      address?: Address;
      addressId?: string;
    }> = [
      {
        action: 'addAddress',
        address: data.address,
      },
    ];

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
      throw new Error('Failed to add address');
    }

    const updatedUser: User = await response.json();

    // Find the newly added address ID
    const addedAddress = updatedUser.addresses.find(
      (addr) =>
        addr.streetName === data.address.streetName &&
        addr.postalCode === data.address.postalCode &&
        addr.city === data.address.city &&
        addr.country === data.address.country,
    );

    const addressId = addedAddress ? addedAddress.id : null;

    if (addressId) {
      const additionalActions: Array<{ action: string; addressId: string }> =
        [];

      if (data.defaultShipping) {
        additionalActions.push({
          action: 'setDefaultShippingAddress',
          addressId,
        });
      }

      if (data.addShippingAddress) {
        additionalActions.push({
          action: 'addShippingAddressId',
          addressId,
        });
      }

      if (data.defaultBilling) {
        additionalActions.push({
          action: 'setDefaultBillingAddress',
          addressId,
        });
      }

      if (data.addBillingAddress) {
        additionalActions.push({
          action: 'addBillingAddressId',
          addressId,
        });
      }

      if (additionalActions.length > 0) {
        const additionalResponse = await fetch(
          `${import.meta.env.VITE_CTP_API_URL}/rssecommercefinal/customers/${data.customerId}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              version: updatedUser.version,
              actions: additionalActions,
            }),
          },
        );

        if (!additionalResponse.ok) {
          throw new Error('Failed to update address actions');
        }

        const updatedUserWithActions: User = await additionalResponse.json();
        return { user: updatedUserWithActions, addressId };
      }
    }

    return { user: updatedUser, addressId };
  } catch (error) {
    return null;
  }
};

export default addAddress;
