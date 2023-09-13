import { OrderInterface } from 'interfaces/order';
import { MenuItemInterface } from 'interfaces/menu-item';
import { GetQueryInterface } from 'interfaces';

export interface OrderItemInterface {
  id?: string;
  quantity: number;
  price: number;
  order_id: string;
  menu_item_id: string;
  created_at?: any;
  updated_at?: any;

  order?: OrderInterface;
  menu_item?: MenuItemInterface;
  _count?: {};
}

export interface OrderItemGetQueryInterface extends GetQueryInterface {
  id?: string;
  order_id?: string;
  menu_item_id?: string;
}
