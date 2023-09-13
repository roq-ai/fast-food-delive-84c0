const mapping: Record<string, string> = {
  'delivery-personnels': 'delivery_personnel',
  'menu-items': 'menu_item',
  orders: 'order',
  'order-items': 'order_item',
  restaurants: 'restaurant',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
