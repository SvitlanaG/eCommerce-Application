import { Dispatch, SetStateAction } from 'react';

export const handleShowPassword = (
  showPassword: boolean,
  setShowPassword: Dispatch<SetStateAction<boolean>>,
) => {
  setShowPassword(!showPassword);
};

export default handleShowPassword;
