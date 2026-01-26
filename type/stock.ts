export interface Stock {
  id: string
  nameStock: string
  location: string
}

export type StockInput = Omit<Stock, 'id'>

export type StockUpdate = Partial<StockInput>
