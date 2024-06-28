const MINIMUM_AGE = 13;

const validateAge = (value: string) => {
  const today = new Date();
  const birthDate = new Date(value);
  const age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    return age - 1 >= MINIMUM_AGE;
  }
  return age >= MINIMUM_AGE;
};

export default validateAge;
