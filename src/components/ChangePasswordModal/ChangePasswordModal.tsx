import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { clsx } from 'clsx';
import styles from './ChangePasswordModal.module.scss';
import validatePassword from '@/helpers/validatePassword';
import openEye from '@/assets/icons/eyeOpen.svg';
import closedEye from '@/assets/icons/eyeClosed.svg';

interface ChangePasswordFormValues {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: SubmitHandler<ChangePasswordFormValues>;
}

const ChangePasswordModal = ({
  isOpen,
  onClose,
  onSubmit,
}: ChangePasswordModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<ChangePasswordFormValues>({ mode: 'onChange' });

  const newPassword = watch('newPassword', '');
  const currentPassword = watch('currentPassword', '');

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const handleShowCurrentPassword = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };

  const handleShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleShowConfirmNewPassword = () => {
    setShowConfirmNewPassword(!showConfirmNewPassword);
  };

  const handleCancel = () => {
    reset();
    onClose();
  };

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.modalBackdrop} onClick={handleBackdropClick}>
      <div className={styles.modal}>
        <h2>Change Password</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputWrapper}>
            <label htmlFor="currentPassword" className={styles.label}>
              <span>Current Password</span>
              <input
                type={showCurrentPassword ? 'text' : 'password'}
                id="currentPassword"
                className={clsx(
                  styles['input-field'],
                  styles['input-field-text'],
                  errors.currentPassword && styles.error,
                )}
                {...register('currentPassword', {
                  required: 'Current password is required',
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters long',
                  },
                  validate: validatePassword,
                })}
              />
              <div className={styles.eye} onClick={handleShowCurrentPassword}>
                <img
                  src={showCurrentPassword ? openEye : closedEye}
                  alt="eye icon"
                />
              </div>
              {errors.currentPassword && (
                <div className={styles.errorMessage}>
                  {errors.currentPassword.message}
                </div>
              )}
            </label>

            <label htmlFor="newPassword" className={styles.label}>
              <span>New Password</span>
              <input
                type={showNewPassword ? 'text' : 'password'}
                id="newPassword"
                className={clsx(
                  styles['input-field'],
                  styles['input-field-text'],
                  errors.newPassword && styles.error,
                )}
                {...register('newPassword', {
                  required: 'New password is required',
                  minLength: {
                    value: 8,
                    message: 'New password must be at least 8 characters',
                  },
                  validate: {
                    notSameAsCurrent: (value) =>
                      value !== currentPassword ||
                      'New password cannot be the same as current password',
                    ...validatePassword,
                  },
                })}
              />
              <div className={styles.eye} onClick={handleShowNewPassword}>
                <img
                  src={showNewPassword ? openEye : closedEye}
                  alt="eye icon"
                />
              </div>
              {errors.newPassword && (
                <div className={styles.errorMessage}>
                  {errors.newPassword.message}
                </div>
              )}
            </label>

            <label htmlFor="confirmNewPassword" className={styles.label}>
              <span>Confirm New Password</span>
              <input
                type={showConfirmNewPassword ? 'text' : 'password'}
                id="confirmNewPassword"
                className={clsx(
                  styles['input-field'],
                  styles['input-field-text'],
                  errors.confirmNewPassword && styles.error,
                )}
                {...register('confirmNewPassword', {
                  required: 'Please confirm your new password',
                  validate: (value) =>
                    value === newPassword || 'Passwords do not match',
                })}
              />
              <div
                className={styles.eye}
                onClick={handleShowConfirmNewPassword}
              >
                <img
                  src={showConfirmNewPassword ? openEye : closedEye}
                  alt="eye icon"
                />
              </div>
              {errors.confirmNewPassword && (
                <div className={styles.errorMessage}>
                  {errors.confirmNewPassword.message}
                </div>
              )}
            </label>
          </div>

          <div className={styles.buttons}>
            <button
              type="button"
              onClick={handleCancel}
              className={clsx(
                styles['button-small'],
                styles['button-secondary'],
              )}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={clsx(styles['button-small'], styles['button-primary'])}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
