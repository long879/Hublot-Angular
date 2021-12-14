export interface OrderModelServer {
  madh: number;
  ngaylap: Date;
  ngaygiao: Date;
  tongtien: number;
}

export interface ServerOrderResponse {
  count: number;
  orders: OrderModelServer[];
}

export interface OrderDetailModelServer {
  hinhsp1: string;
  tensp: string;
  dongia: number;
  soluong: number;
  thanhtien: number;
}

export interface ServerOrderDetailResponse {
  count: number;
  ordersDetail: OrderDetailModelServer[];
}
