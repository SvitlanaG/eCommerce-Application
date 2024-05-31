export interface Discount {
  predicate: string;
  value: Value;
}

export interface Value {
  money: { centAmount: number }[];
}
