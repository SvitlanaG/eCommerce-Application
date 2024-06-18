import { User } from '@/types/UserType';

interface RemoveAddressData {
  customerId: string;
  version: number;
  addressId: string;
}

const removeAddress = async (data: RemoveAddressData): Promise<User | null> => {
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
              action: 'removeAddress',
              addressId: data.addressId,
            },
          ],
        }),
      },
    );

    if (!response.ok) {
      throw new Error('Failed to remove address');
    }

    const updatedUser: User = await response.json();
    return updatedUser;
  } catch (error) {
    return null;
  }
};

export default removeAddress;
