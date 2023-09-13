import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface DeliveryPersonnelInterface {
  id?: string;
  user_id: string;
  vehicle_type: string;
  license_number: string;
  availability_status: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface DeliveryPersonnelGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  vehicle_type?: string;
  license_number?: string;
  availability_status?: string;
}
