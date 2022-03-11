export type PhoneData = {
  title: string;
  number: string;
  workTime?: string;
};

export const phoneData: PhoneData[] = [
  {
    title: 'Сервисный центр',
    number: '+ 7 (499) 350 76 92',
  },
  {
    title: 'Оптовый отдел',
    number: '+7 (499) 281-64-52',
    workTime: 'пн-сб 10:00 - 19:00',
  },

  {
    title: 'Сервисный центр',
    number: '+ 7 (499) 350 76 92',
    workTime: 'ср-вс с 10:00 до 19:00',
  },
];
