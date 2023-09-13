interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
  ownerAbilities: string[];
  customerAbilities: string[];
  getQuoteUrl: string;
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Delivery Personnel'],
  customerRoles: ['Customer'],
  tenantRoles: ['Restaurant Manager', 'Delivery Personnel'],
  tenantName: 'Restaurant',
  applicationName: 'Fast Food Delivery Services v2',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
  customerAbilities: ['View restaurant menus', 'Place an order', 'Update an order', 'Cancel an order'],
  ownerAbilities: ['Manage Restaurants', 'View Restaurant Orders', 'Update Order Status', 'Delete Invalid Orders'],
  getQuoteUrl: 'https://app.roq.ai/proposal/54aca0cf-908d-46ef-8345-c6fe0f19031d',
};
