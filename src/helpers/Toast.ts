import { toast, ToastPosition } from 'react-toastify';

enum ToastStatus {
  Info = 'info',
  Error = 'error',
  Success = 'success',
  Warning = 'warning',
}

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

  if (status === ToastStatus.Success) {
    toast.success(message, toastOptions);
  } else if (status === ToastStatus.Error) {
    toast.error(message, toastOptions);
  }
  return null;
};

export default Toast;
