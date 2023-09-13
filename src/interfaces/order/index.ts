import { OrderItemInterface } from 'interfaces/order-item';
import { UserInterface } from 'interfaces/user';
import { RestaurantInterface } from 'interfaces/restaurant';
import { GetQueryInterface } from 'interfaces';

export interface OrderInterface {
  id?: string;
  order_date?: any;
  delivery_date?: any;
  status: string;
  total_price: number;
  customer_id: string;
  restaurant_id: string;
  created_at?: any;
  updated_at?: any;
  coupen?: string;
  delivery_charges?: string;
  order_item?: OrderItemInterface[];
  user?: UserInterface;
  restaurant?: RestaurantInterface;
  _count?: {
    order_item?: number;
  };
}

export interface OrderGetQueryInterface extends GetQueryInterface {
  id?: string;
  status?: string;
  customer_id?: string;
  restaurant_id?: string;
  coupen?: string;
  delivery_charges?: string;
}
