export interface Product {
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
}

export interface Book {
  key: string;
  masterData: {
    staged: StagedData;
  };
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

export interface StagedData {
  categories: {
    typeId: string;
    id: string;
  }[];
  description: { [locale: string]: string };
  masterVariant: {
    image: [];
    key: string;
    prices: Price[];
    assets: Asset[];
  };
  name: { [locale: string]: string };
}

export interface Data {
  results: Book[];
}
