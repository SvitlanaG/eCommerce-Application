import { User } from '@/types/UserType';

interface ChangeAddressData {
  customerId: string;
  version: number;
  addressId: string;
  address: {
    streetName: string;
    postalCode: string;
    city: string;
    country: string;
  };
}

const changeAddress = async (data: ChangeAddressData): Promise<User | null> => {
  try {
    const token = localStorage.getItem('userAccessToken');
    if (!token) {
      throw new Error('No token found');
    }

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
          actions: [
            {
              action: 'changeAddress',
              addressId: data.addressId,
              address: data.address,
            },
          ],
        }),
      },
    );

    if (!response.ok) {
      throw new Error('Failed to change address');
    }

    const updatedUser: User = await response.json();
    return updatedUser;
  } catch (error) {
    return null;
  }
};

export default changeAddress;
