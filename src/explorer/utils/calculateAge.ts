/**
 * Calcula la edad a partir de la fecha de nacimiento.
 * @param dateOfBirth - Fecha de nacimiento en formato ISO.
 * @returns La edad en años.
 */
export const calculateAge = (dateOfBirth: string): number => {
  const birthDate = new Date(dateOfBirth);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();

  // Ajustar la edad si el cumpleaños aún no ha ocurrido este año.
  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
};
