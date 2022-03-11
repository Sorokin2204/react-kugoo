export type ContactData = {
  title: string;
  phone: Array<{
    phonesubtitle: string;
    phoneFull: string;
    phoneWorktime: string;
  }>;
  address: Array<{
    addressFull: string;
    addressPhone: string;
  }>;
};

export const contactData: ContactData = {
  title: 'Контакты',
  phone: [
    {
      phonesubtitle: 'Call-центр',
      phoneFull: '+7 (800) 505-54-61',
      phoneWorktime: 'Пн-Вс 10:00 - 20:00',
    },
    {
      phonesubtitle: 'Сервисный центр',
      phoneFull: '+7 (499) 350-76-92',
      phoneWorktime: 'Пн-Вс 10:00 - 20:00',
    },
    {
      phonesubtitle: '',
      phoneFull: '',
      phoneWorktime: '',
    },
  ],
  address: [
    {
      addressFull: 'Магазин в Москве \n ул. Ткацкая, 5 стр. 16',
      addressPhone: '+7 (499) 406 15 87',
    },
    {
      addressFull: 'Магазин в Санкт-\nПетербурге\n ул. Фрунзе, 2',
      addressPhone: '+7 (499) 406 15 87',
    },
    {
      addressFull: 'Магазин в Краснодаре\n ул. Восточно-Кругликовская, 86',
      addressPhone: '+ 7 (800) 505 54 61',
    },
  ],
};
