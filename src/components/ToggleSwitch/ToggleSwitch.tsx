import React from 'react';
import styles from './ToggleSwitch.module.scss';

interface ToggleSwitchProps {
  label: string;
  isChecked: boolean;
  onChange: (isChecked: boolean) => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  label,
  isChecked,
  onChange,
}) => {
  const inputId = React.useRef(
    `toggle-switch-${Math.random().toString(36).substring(7)}`,
  );

  const handleToggleChange = () => {
    const newCheckedState = !isChecked;
    onChange(newCheckedState);
  };

  return (
    <label htmlFor={inputId.current} className={styles['toggle-switch']}>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleToggleChange}
        id={inputId.current}
      />
      <span className={styles['toggle-slider']} />
      <span className={styles['toggle-switch-label']}>{label}</span>
    </label>
  );
};

export default ToggleSwitch;
