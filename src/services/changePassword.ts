import { User } from '@/types/UserType';

interface ChangePasswordData {
  id: string;
  version: number;
  currentPassword: string;
  newPassword: string;
}

const changePassword = async (
  data: ChangePasswordData,
): Promise<User | null> => {
  try {
    const token = localStorage.getItem('userAccessToken');
    if (!token) {
      throw new Error('No token found');
    }

    const response = await fetch(
      `${import.meta.env.VITE_CTP_API_URL}/rssecommercefinal/customers/password`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      },
    );

    if (!response.ok) {
      throw new Error('Failed to change password');
    }

    const updatedUser: User = await response.json();
    return updatedUser;
  } catch (error) {
    // console.error('Error changing password:', error);
    return null;
  }
};

export default changePassword;
