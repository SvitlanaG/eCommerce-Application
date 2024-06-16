import { ChangeEvent } from 'react';
import { Product } from './products';
import { User } from '@/types/UserType';

export type PropsCategories = {
  onSetCategory: (value: string) => void;
  onSetBooks: (value: Product[]) => void;
  language: string;
  priceRange: number | null;
  limitBooks: Product[];
  onSetVisibleBtn: (value: boolean) => void;
};

export type HandeChange = {
  handleChange: (ev: ChangeEvent<HTMLInputElement>) => void;
};

export interface AddAddressModalProps {
  customer: User;
  isOpen: boolean;
  onClose: () => void;
  onChangeAddress: () => void;
}
