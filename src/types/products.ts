export interface Product {
  id: string;
  categories: {
    typeId: string;
    id: string;
  }[];
  description: { [locale: string]: string };
  name: { [locale: string]: string };
  assetSources: { uri: string }[];
  price: {
    centAmount: number;
    currencyCode: string;
    fractionDigits: number;
  } | null;
  key: string;
  sku: string;
}

export interface Book {
  id: string;
  key: string;
  categories: {
    typeId: string;
    id: string;
  }[];
  description: { [locale: string]: string };
  masterVariant: {
    sku: string;
    image: [];
    key: string;
    prices: Price[];
    assets: Asset[];
  };
  name: { [locale: string]: string };
}

export interface Price {
  country: string;
  id: string;
  key: string;
  value: {
    centAmount: number;
    currencyCode: string;
    fractionDigits: number;
  };
  type: string;
}

export interface Asset {
  id: string;
  key: string;
  name: { [locale: string]: string };
  sources: { uri: string }[];
  tags: string[];
}

export interface Data {
  results: Book[];
}
