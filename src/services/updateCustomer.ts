import { User } from '@/types/UserType';

interface UpdateCustomerData {
  id: string;
  version: number;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  email?: string;
}

const updateCustomerData = async (
  data: UpdateCustomerData,
): Promise<User | null> => {
  try {
    const token = localStorage.getItem('userAccessToken');
    if (!token) {
      throw new Error('No token found');
    }

    const updateActions = [];

    if (data.firstName) {
      updateActions.push({ action: 'setFirstName', firstName: data.firstName });
    }

    if (data.lastName) {
      updateActions.push({ action: 'setLastName', lastName: data.lastName });
    }

    if (data.email) {
      updateActions.push({ action: 'changeEmail', email: data.email });
    }

    if (data.dateOfBirth) {
      updateActions.push({
        action: 'setDateOfBirth',
        dateOfBirth: data.dateOfBirth,
      });
    }

    if (updateActions.length === 0) {
      throw new Error('No update actions provided');
    }

    const response = await fetch(
      `${import.meta.env.VITE_CTP_API_URL}/rssecommercefinal/customers/${data.id}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ version: data.version, actions: updateActions }),
      },
    );

    if (!response.ok) {
      throw new Error('Failed to update customer data');
    }

    const updatedUser: User = await response.json();
    return updatedUser;
  } catch (error) {
    console.error('Error updating customer data:', error);
    return null;
  }
};

export default updateCustomerData;
