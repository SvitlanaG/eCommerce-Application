import { Product } from './products';

export type PropsCategories = {
  onSetBooks: (value: Product[]) => void;
};
