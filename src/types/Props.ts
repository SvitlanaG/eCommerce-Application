import { ChangeEvent } from 'react';
import { Product } from './products';

export type PropsCategories = {
  onSetCategory: (value: string) => void;
  onSetBooks: (value: Product[]) => void;
  language: string;
  priceRange: number | null;
};

export type HandeChange = {
  handleChange: (ev: ChangeEvent<HTMLInputElement>) => void;
};
