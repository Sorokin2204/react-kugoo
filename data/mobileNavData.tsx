export type MobileNavData = {
  name: string;
  icon: string;
  url: string;
};

export const mobileNavData: MobileNavData[] = [
  {
    name: 'Главная',
    icon: '/static/icons/home.svg',
    url: '/',
  },
  {
    name: 'Каталог',
    icon: '/static/icons/search.svg',
    url: '/electric-scooters',
  },
  {
    name: 'Корзина',
    icon: '/static/icons/cart.svg',
    url: '/cart',
  },
];
