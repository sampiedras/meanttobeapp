import { TextInputType } from "../AppTextInputAnimated/AppTextInputAnimated";

export interface ICountryCodes {
  name: string;
  dial_code: string;
  code: string;
}

export interface MdkPhoneInternationalProps {
  outputPhoneNumber?: (phoneNumber: string) => void;
  initialCountryCode?: ICountryCodes;
  setCountryCode?: (countryCode: ICountryCodes) => void;
  initialPhoneNumber?: string;
  phoneLabel?: string;
  countryLabel?: string;
  type?: TextInputType;
}

export interface ICountries {
  label: string;
  value: string;
}
