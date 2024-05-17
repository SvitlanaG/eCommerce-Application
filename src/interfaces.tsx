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
  createdAt: string;
  createdBy: { isPlatformClient: boolean };
  id: string;
  key: string;
  lastMessageSequenceNumber: number;
  lastModifiedAt: string;
  lastModifiedBy: { isPlatformClient: boolean };
  lastVariantId: number;
  masterData: {
    current: StagedData;
    hasStagedChanges: boolean;
    published: boolean;
    staged: StagedData;
  };
  priceMode: string;
  productType: { typeId: string; id: string };
  version: number;
  versionModifiedAt: string;
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
  categoryOrderHints: { [key: string]: string };
  description: { [locale: string]: string };
  masterVariant: {
    image: [];
    id: number;
    sku: string;
    key: string;
    prices: Price[];
    assets: Asset[];
  };
  metaTitle: { [locale: string]: string };
  name: { [locale: string]: string };
  searchKeywords: { [locale: string]: string[] };
  slug: { [locale: string]: string };
  variants: [];
}

export interface Data {
  count: number;
  limit: number;
  offset: number;
  results: Book[];
}
