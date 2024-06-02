import { ChangeEvent } from 'react';
import { Product } from './products';

export type PropsCategories = {
  onSetBooks: (value: Product[]) => void;
};

export type HandeChange = {
  handleChange: (ev: ChangeEvent<HTMLInputElement>) => void;
};
