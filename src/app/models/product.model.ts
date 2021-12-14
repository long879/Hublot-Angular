export interface ProductModelServer {
  masp: number;
  malsp: number;
  math: number;
  tenth: string;
  tenlsp: string;
  tensp: string;
  dongia: number;
  hinhsp1: string;
  hinhsp2: string;
  hinhsp3: string;
  hinhsp4: string;
  hinhsp5: string;
  soluong: number;
}

export interface ServerResponse {
  count: number;
  products: ProductModelServer[];
}
