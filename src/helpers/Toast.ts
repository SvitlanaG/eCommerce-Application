import { toast, ToastPosition } from 'react-toastify';

type ToastOptions = {
  position?: ToastPosition;
  autoClose?: number;
  hideProgressBar?: boolean;
  closeOnClick?: boolean;
  pauseOnHover?: boolean;
  draggable?: boolean;
  progress?: undefined;
  theme?: string;
};

interface IOptions {
  status: 'info' | 'error' | 'success' | 'warning';
  message: string;
}

const Toast = ({ status, message }: IOptions) => {
  const toastOptions: ToastOptions = {
    position: 'bottom-center',
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  };

  if (status === 'success') {
    toast.success(message, toastOptions);
  } else if (status === 'error') {
    toast.error(message, toastOptions);
  }
  return null;
};

export default Toast;
