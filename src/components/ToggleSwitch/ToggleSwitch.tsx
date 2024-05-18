import { useRef } from 'react';
import styles from './ToggleSwitch.module.scss';

interface Props {
  name: string;
  label: string;
  isChecked: boolean;
  onChange: () => void;
}

const ToggleSwitch = ({ name, label, isChecked, onChange }: Props) => {
  const inputId = useRef(
    `toggle-switch-${Math.random().toString(36).substring(7)}`,
  );

  return (
    <label htmlFor={inputId.current} className={styles['toggle-switch']}>
      <input
        name={name}
        type="checkbox"
        checked={isChecked}
        onChange={onChange}
        id={inputId.current}
      />
      <span className={styles['toggle-slider']} />
      <span className={styles['toggle-switch-label']}>{label}</span>
    </label>
  );
};

export default ToggleSwitch;
