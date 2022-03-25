import { AccountTree, Inventory, ListAlt, Receipt } from '@mui/icons-material';
import { ReactNode } from 'react';

export type AdminMobileNavData = {
  name: string;
  slug: string;
  icon: ReactNode;
  type: 'page' | 'modal';
};

export const adminMobileNavData: AdminMobileNavData[] = [
  {
    name: 'Товары',
    slug: 'product-list',
    icon: <Inventory />,
    type: 'page',
  },
  {
    name: 'Категории',
    slug: 'categories',
    icon: <AccountTree />,
    type: 'modal',
  },
  {
    name: 'Аттрибуты',
    slug: 'attributes',
    icon: <ListAlt />,
    type: 'modal',
  },
  {
    name: 'Характеристики',
    slug: 'specs',
    icon: <ListAlt />,
    type: 'modal',
  },
  {
    name: 'Заказы',
    slug: 'order-list',
    icon: <Receipt />,
    type: 'page',
  },
];
