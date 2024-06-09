import { OptionType } from '@/types/optionType';

export const optionsSort: { value: string; label: string }[] = [
  {
    value: 'asc',
    label: 'ascending price',
  },
  {
    value: 'desc',
    label: 'descending price',
  },
  {
    value: 'name',
    label: 'name',
  },
];

export const countryPostalPatterns: Record<string, RegExp> = {
  DE: /^[0-9]{5}$/,
  BY: /^[0-9]{6}$/,
  AM: /^[0-9]{4}$/,
};

export const optionsAddressType: OptionType[] = [
  { value: 'shipping', label: 'Shipping' },
  { value: 'billing', label: 'Billing' },
];

export const optionsAddressDefault: OptionType[] = [
  { value: 'defaultShipping', label: 'Default shipping' },
  { value: 'defaultBilling', label: 'Default billing' },
];

export default {
  optionsSort,
  countryPostalPatterns,
  optionsAddressType,
  optionsAddressDefault,
};
