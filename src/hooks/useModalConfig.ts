export const handleBackdropClick = (
  e: React.MouseEvent<HTMLDivElement>,
  onClose: () => void,
) => {
  if (e.target === e.currentTarget) {
    onClose();
  }
};

export default handleBackdropClick;
