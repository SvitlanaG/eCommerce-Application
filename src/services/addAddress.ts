import { User } from '@/types/UserType';

interface AddAddressData {
  customerId: string;
  version: number;
  address: {
    streetName: string;
    postalCode: string;
    city: string;
    country: string;
  };
}

const addAddress = async (data: AddAddressData): Promise<User | null> => {
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
              action: 'addAddress',
              address: data.address,
            },
          ],
        }),
      },
    );

    if (!response.ok) {
      throw new Error('Failed to add address');
    }

    const updatedUser: User = await response.json();
    console.log(updatedUser);
    return updatedUser;
  } catch (error) {
    return null;
  }
};

export default addAddress;
