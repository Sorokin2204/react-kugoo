export type TopHeaderData = {
  links: Array<{ text: string; path: string }>;
  socialLinks: Array<{ iconUrl: string; url: string }>;
  phone: string;
};

export const topHeaderData: TopHeaderData = {
  links: [
    { text: 'Сервис', path: '/service' },
    { text: 'Сотрудничество', path: '/partners' },
    { text: 'Заказать звонок', path: '/call' },
  ],
  socialLinks: [
    {
      iconUrl: '/static/icons/whatsapp.svg',
      url: 'https://www.whatsapp.com/',
    },
    {
      iconUrl: '/static/icons/viber.svg',
      url: 'https://www.viber.com',
    },
    {
      iconUrl: '/static/icons/telegram.svg',
      url: 'https://telegram.org/',
    },
  ],
  phone: '+7 (800) 505-54-61',
};
