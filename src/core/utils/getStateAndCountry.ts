export function getStateAndCountryFromFormattedAddress(
  formattedAddress: string,
) {
  const addressParts = formattedAddress.split(",");
  const country = addressParts[addressParts.length - 1].trim();
  const state = addressParts[addressParts.length - 2].trim();

  return `${state}, ${country}`;
}
