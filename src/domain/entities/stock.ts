export class Stock {
  constructor(
    readonly id: string,
    readonly plu: string,
    readonly shopId: string,
    readonly onShelf: number,
    readonly inOrder: number
  ) {}
}
