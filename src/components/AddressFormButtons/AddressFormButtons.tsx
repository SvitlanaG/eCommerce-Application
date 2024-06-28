import { clsx } from 'clsx';
import styles from '@/pages/RegistrationPage/RegistrationPage.module.scss';
import stylesAddress from '@/components/AddressForm/AddressForm.module.scss';

interface AddressFormButtonsProps {
  isEditMode: boolean;
  handleDelete: () => void;
  handleEdit: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleCancel: () => void;
}

const AddressFormButtons = ({
  isEditMode,
  handleDelete,
  handleEdit,
  handleCancel,
}: AddressFormButtonsProps) => {
  return (
    <div className={stylesAddress.buttons}>
      {!isEditMode ? (
        <>
          <button
            className={clsx(styles['button-small'], styles['button-delete'])}
            type="button"
            onClick={handleDelete}
          >
            Delete
          </button>
          <button
            className={clsx(styles['button-small'], styles['button-primary'])}
            type="button"
            onClick={handleEdit}
          >
            Edit
          </button>
        </>
      ) : (
        <>
          <button
            className={clsx(styles['button-small'], styles['button-secondary'])}
            type="button"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className={clsx(
              styles['button-small'],
              styles['button-primary'],
              stylesAddress['save-button'],
            )}
            type="submit"
          >
            Save
          </button>
        </>
      )}
    </div>
  );
};

export default AddressFormButtons;
